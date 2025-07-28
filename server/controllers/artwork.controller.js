const Artwork = require("../models/artwork.model");
const Bid = require("../models/bid.model");
const cloudinary = require("../util/cloudinary.config");

exports.addArtwork = async (req, res) => {
  try {
    const owner = req.user._id;
    const { auctionId, title, price, openingBid, artist, category, size, medium, style, orientation, description } = req.body;

    const thumbnailFile = req.files?.thumbnail?.[0];
    const imageFiles = req.files?.images;

    if (
      !owner || !title || !artist || !category || !size || !medium || !style ||
      !orientation || !description || !thumbnailFile || !imageFiles
    ) {
      return res.status(400).json({ message: "All fields and files are required" });
    }

    let isAuction = !!auctionId && !!openingBid;

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

exports.getMyArtworks = async (req, res) => {
  try {
    const userId = req.user._id;

    const artworks = await Artwork.find({ owner: userId });
    if (!artworks) return res.status(404).json({ message: "No artworks found" });

    res.status(200).json({ artworks });
  } catch (error) {
    res.status(500).json({ message: "server error", error: error.message });
  }
}

exports.getArtworks = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { q, category, medium, style, orientation, size, priceMin, priceMax, sort = 'createdAt', order = 'desc', page = 1, limit = 12 } = req.query;

    const query = {};

    // If a search query is provided, use MongoDB text search
    if (q) query.$text = { $search: q };

    // Build filters
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
      Artwork.find({ ...query, owner: { $ne: userId } })
        .populate("auctionId")
        .sort(sortBy)
        .skip(skip)
        .limit(Number(limit)),
      Artwork.countDocuments({ ...query, owner: { $ne: userId } })
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

exports.getArtworkByAuction = async (req, res) => {
  try {
    const userId = req.user._id;
    const auctionId = req.params.id;

    const artworks = await Artwork.find({ auctionId, owner: { $ne: userId } });
    if (!artworks) {
      return res.status(404).json({ message: "No artworks found" });
    }

    res.status(200).json({ artworks });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

exports.getArtworkById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the artwork by id
    const artwork = await Artwork.findById(id).populate("auctionId");

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
    const userId = req.user.id;
    const { id } = req.params;

    const artwork = await Artwork.findById(id);
    if (!artwork) {
      return res.status(404).json({ message: "Artwork not found" });
    }

    if (artwork.owner.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to update this artwork" });
    }

    const updateFields = req.body;

    const allowedFields = [
      "title", "price", "artist", "category", "size", "medium",
      "style", "orientation", "description, thumbnail, images"];

    // Only allow updates to specific fields
    const sanitizedUpdate = {};
    for (const key of allowedFields) {
      if (updateFields[key] !== undefined) {
        sanitizedUpdate[key] = updateFields[key];
      }
    }

    // Upload thumbnail
    const thumbnailFile = req.files?.thumbnail?.[0];
    if (thumbnailFile) {
      const thumbnailUrl = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "artora-artwork-thumbnail" },
          (err, result) => err ? reject(err) : resolve(result.secure_url)
        );
        stream.end(thumbnailFile.buffer);
      });
      sanitizedUpdate.thumbnail = thumbnailUrl;
    }

    // Upload images
    const imageFiles = req.files?.images;
    if (imageFiles && imageFiles.length > 0) {
      const imageUrls = await Promise.all(
        imageFiles.map(file =>
          new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { folder: "artora-artwork-images" },
              (err, result) => err ? reject(err) : resolve(result.secure_url)
            );
            stream.end(file.buffer);
          })
        )
      );
      sanitizedUpdate.images = imageUrls;
    }

    const updatedArtwork = await Artwork.findByIdAndUpdate(id, sanitizedUpdate, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      message: "Artwork updated successfully",
      artwork: updatedArtwork
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deleteArtwork = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const artwork = await Artwork.findById(id);
    if (!artwork) {
      return res.status(404).json({ message: "Artwork not found" });
    }

    if (artwork.owner.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to delete this artwork" });
    }

    // Delete artwork by id
    await Artwork.deleteOne({ _id: id });

    res.status(200).json({ message: "Artwork deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

exports.placeBid = async (req, res) => {
  try {
    const { amount } = req.body;
    const artworkId = req.params.id;
    const userId = req.user.id;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid bid amount" });
    }

    // Find the artwork
    const artwork = await Artwork.findById(artworkId);
    if (!artwork || !artwork.inAuction) {
      return res.status(404).json({ message: "Artwork not found or not in auction" });
    }

    if (artwork.owner.toString() === userId) {
      return res.status(404).json({ message: "Not authorized to bid this artwork" });
    }

    // Check if bid is higher than currnetBid or openingBid
    const minBid = artwork.currnetBid || artwork.openingBid;
    if (amount <= minBid) {
      return res.status(400).json({ message: `Bid must be greater then ${minBid}` });
    }

    // Create a new bid
    const bid = await Bid.create({
      bidder: userId,
      artwork: artworkId,
      amount,
    });

    // Update artwork's current bid
    artwork.currnetBid = amount;
    await artwork.save();

    res.status(201).json({
      message: "Bid placed successfully",
      bid,
      currnetBid: artwork.currnetBid,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

exports.getBids = async (req, res) => {
  try {
    const artwork = req.params.id;

    const bids = await Bid.find({ artwork });
    if (!bids) return res.status(404).json("Bids not found");

    res.status(200).json({ bids });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}