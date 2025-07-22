const Artwork = require("../models/artwork.model");
const cloudinary = require("../util/cloudinary.config");

exports.addArtwork = async (req, res) => {
  try {
    const { auctionId, auctionName, owner, title, price, openingBid, artist, category, size, medium, style, orientation, description } = req.body;

    const thumbnailFile = req.files?.thumbnail?.[0];
    const imageFiles = req.files?.images;

    if (
      !owner || !title || !artist || !category || !size || !medium || !style ||
      !orientation || !description || !thumbnailFile || !imageFiles
    ) {
      return res.status(400).json({ message: "All fields and files are required" });
    }

    let isAuction = !!auctionId && !!auctionName && !!openingBid;

    // Validate price or openingBid
    if (isAuction) {
      if (openingBid <= 0) {
        return res.status(400).json({ message: "Opening bid must be greater than 0" });
      }
    } else {
      if (!price || price <= 0) {
        return res.status(400).json({ message: "Price must be greater than 0" });
      }
    }

    // Upload thumbnail
    const artworkThumbnailImage = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'artora-artwork-thumbnail' },
        (error, result) => {
          if (error) reject(new Error("Thumbnail upload failed"));
          else resolve(result.secure_url);
        }
      );
      stream.end(thumbnailFile.buffer);
    });

    // Upload images
    const artworkImages = await Promise.all(
      imageFiles.map(file =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'artora-artwork-images' },
            (error, result) => {
              if (error) reject(new Error("Image upload failed"));
              else resolve(result.secure_url);
            }
          );
          stream.end(file.buffer);
        })
      )
    );

    const artworkData = {
      owner,
      title,
      artist,
      category,
      size,
      medium,
      style,
      orientation,
      description,
      thumbnail: artworkThumbnailImage,
      images: artworkImages,
      inAuction: isAuction
    };

    if (isAuction) {
      artworkData.auctionId = auctionId;
      artworkData.auctionName = auctionName;
      artworkData.openingBid = openingBid;
    } else {
      artworkData.price = price;
    }

    const artwork = await Artwork.create(artworkData); // Create an artwork

    res.status(201).json({ message: "Artwork added successfully", artwork });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getArtworks = async (req, res) => {
  try {
    const { owner, artist, q, category, medium, style, orientation, size, priceMin, priceMax, sort = 'createdAt', order = 'desc', page = 1, limit = 12 } = req.query;

    const query = {};

    // If a search query is provided, use MongoDB text search
    if (q) query.$text = { $search: q };
    if (owner) query.owner = owner; // Filter by owner if provided

    // Build filters
    if (artist) query.artist = artist;
    if (category) query.category = category;
    if (medium) query.medium = medium;
    if (style) query.style = style;
    if (orientation) query.orientation = orientation;
    if (size) query.size = size;

    // Filter by price range if provided
    if (priceMin || priceMax) {
      query.price = {};
      if (priceMin) query.price.$gte = Number(priceMin);
      if (priceMax) query.price.$lte = Number(priceMax);
    }

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);
    const sortBy = { [sort]: order === 'asc' ? 1 : -1 };

    // Query and count
    const [artworks, total] = await Promise.all([
      Artwork.find(query)
        .sort(sortBy)
        .skip(skip)
        .limit(Number(limit)),
      Artwork.countDocuments(query)
    ]);

    res.status(200).json({
      artworks,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getArtworkById = async (req, res) => {
  try {
    const { id } = req.params;

    const artwork = await Artwork.findById(id); // Find the artwork by id

    if (!artwork) {
      return res.status(400).json({ message: "Artwork not found" });
    }

    res.status(200).json({ artwork });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

exports.updateArtwork = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;

    // Uploaded files
    const thumbnailFile = req.files?.thumbnail?.[0];
    const imageFiles = req.files?.images;

    // Allow only safe fields
    const allowedFields = [
      "title", "price", "artist", "category", "size", "medium", "style",
      "orientation", "description", "auctionName", "auctionStartDate",
      "auctionEndDate", "openingBid", "inAuction", "auctionId"
    ];

    const sanitizedUpdate = {};
    for (const key of allowedFields) {
      if (updateFields[key] !== undefined) {
        sanitizedUpdate[key] = updateFields[key];
      }
    }

    const isAuction = sanitizedUpdate.inAuction === "true" || sanitizedUpdate.inAuction === true;

    // Validate price/bid
    if (isAuction) {
      if (!sanitizedUpdate.openingBid || sanitizedUpdate.openingBid <= 0) {
        return res.status(400).json({ message: "Opening bid must be greater than 0" });
      }
      sanitizedUpdate.price = undefined; // remove direct price if switching to auction
    } else {
      if (!sanitizedUpdate.price || sanitizedUpdate.price <= 0) {
        return res.status(400).json({ message: "Price must be greater than 0" });
      }
      sanitizedUpdate.openingBid = undefined; // remove auction field if switching to direct
    }

    // Upload thumbnail if updated
    if (thumbnailFile) {
      const artworkThumbnailImage = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "artora-artwork-thumbnail" },
          (error, result) => {
            if (error) reject(new Error("Thumbnail upload failed"));
            else resolve(result.secure_url);
          }
        );
        stream.end(thumbnailFile.buffer);
      });
      sanitizedUpdate.thumbnail = artworkThumbnailImage;
    }

    // Upload new images if provided
    if (imageFiles && imageFiles.length > 0) {
      const artworkImages = await Promise.all(
        imageFiles.map(file =>
          new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { folder: "artora-artwork-images" },
              (error, result) => {
                if (error) reject(new Error("Image upload failed"));
                else resolve(result.secure_url);
              }
            );
            stream.end(file.buffer);
          })
        )
      );
      sanitizedUpdate.images = artworkImages;
    }

    // Update artwork
    const updatedArtwork = await Artwork.findByIdAndUpdate(id, sanitizedUpdate, {
      new: true,
      runValidators: true,
    });

    if (!updatedArtwork) {
      return res.status(404).json({ message: "Artwork not found" });
    }

    res.status(200).json({ message: "Artwork updated successfully", artwork: updatedArtwork });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deleteAuction = async (req, res) => {
  try {
    const { id } = req.params;

    // Find artwork by id and delete
    const deletedArtwork = await Artwork.findByIdAndDelete(id);

    if (!deletedArtwork) {
      res.status(404).json({ message: "Artwork not found" });
    }

    res.status(200).json({ message: "Artwork deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

exports.getMyArtworks = async (req, res) => {
  try {
    const myId = req.user._id;

    const artworks = await Artwork.find({ owner: myId }); // Find all the artworks for owner

    if(!artworks){
      return res.status(404).json({message: "No artworks found"});
    }

    res.status(200).json({artworks});
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}