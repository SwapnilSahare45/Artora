const Artwork = require("../models/artwork.model");
const cloudinary = require("../util/cloudinary.config");

exports.addArtworkDirect = async (req, res) => {
  try {
    const { owner, title, price, artist, category, size, medium, style, orientation, description } = req.body;

    // Get the uploaded thumbnail and images file from req.files
    const thumbnailFile = req.files?.thumbnail?.[0];
    const imageFiles = req.files?.images;

    if (!owner || !title || !price || !artist || !category || !size || !medium || !style || !orientation || !description || !thumbnailFile || !imageFiles) {
      return res.status(400).json({ message: "All fields and files are required" });
    }

    // Validate the price greater then 0
    if (price <= 0) {
      return res.status(400).json({ message: "Price must be greater than 0" });
    }

    // Upload the artwork thumbnail image to cloudinary
    const artworkThumbnailImage = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'artora-artwork-thumbnail' },
        (error, result) => {
          if (error) {
            reject(new Error("Thumbnail upload failed"));
          } else {
            resolve(result.secure_url);
          }
        }
      );
      stream.end(thumbnailFile.buffer);
    })

    // Upload the artwork images to cloudinary
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

    // Create a artwork
    const artwork = await Artwork.create({ owner, title, price, artist, category, size, medium, style, orientation, description, thumbnail: artworkThumbnailImage, images: artworkImages });

    res.status(201).json({ message: "Artwork added successfully", artwork });

  } catch (error) {
    res.status(500).json({ message: "server error", error: error.message });
  }
}

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
    res.status(500).json({ message: 'Server Error', error: error.message });
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
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
}

exports.updateArtwork = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;

    // Get the uploaded thumbnail and images file from req.files
    const thumbnailFile = req.files?.thumbnail?.[0];
    const imageFiles = req.files?.images;

    // Only allow specific fields to be updated
    const allowedFields = [
      "title", "price", "artist", "category", "size", "medium", "style",
      "orientation", "description", "auctionName", "auctionStartDate",
      "auctionEndDate", "openingBid", "inAuction"
    ];

    // Sanitize update fields to only allow specific fields
    const sanitizedUpdate = {};
    for (const key of allowedFields) {
      if (updateFields[key] !== undefined) {
        sanitizedUpdate[key] = updateFields[key];
      }
    }

    // If a new thumbnail file is uploaded, upload it to Cloudinary and update the thumbnail field
    if (thumbnailFile) {
      const artworkThumbnailImage = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'artora-artwork-thumbnail' },
          (error, result) => {
            if (error) {
              reject(new Error("Thumbnail upload failed"));
            } else {
              resolve(result.secure_url);
            }
          }
        );
        stream.end(thumbnailFile.buffer);
      });
      sanitizedUpdate.thumbnail = artworkThumbnailImage;
    }

    // If a new artwork images file is uploaded, upload it to Cloudinary and update the artwork images field
    if (imageFiles && imageFiles.length > 0) {
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
      sanitizedUpdate.images = artworkImages;
    }

    // Update the artwork document in the database
    const updatedArtwork = await Artwork.findByIdAndUpdate(id, sanitizedUpdate, {
      new: true,           // Return the updated document
      runValidators: true, // Run schema validators on update
    });

    if (!updatedArtwork) {
      return res.status(404).json({ message: "Artwork not found" });
    }

    res.status(200).json({ message: "Artwork updated successfully", artwork: updatedArtwork });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
}