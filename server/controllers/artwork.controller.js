const Artwork = require("../models/artwork.model");
const Bid = require("../models/bid.model");
const Notification = require("../models/notification.model");
const cloudinary = require("../util/cloudinary.config");

exports.getThreeArtwork = async (req, res) => {
  try {
    // Fetch all artworks
    const allArtworks = await Artwork.find().populate("auctionId");

    // Randomly pick 3
    const shuffled = allArtworks.sort(() => 0.5 - Math.random());
    const randomThree = shuffled.slice(0, 3);

    res.status(200).json(randomThree);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

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

    // Get logged-in user artworks
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
      Artwork.find({ ...query, owner: { $ne: userId }, inAuction: false, sold: false })
        .sort(sortBy)
        .skip(skip)
        .limit(Number(limit)),
      Artwork.countDocuments({ ...query, owner: { $ne: userId }, inAuction: false, sold: false })
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
    const { q, category, medium, style, orientation, size, sort = 'createdAt', order = 'desc', page = 1, limit = 12 } = req.query;

    const query = {};

    // If a search query is provided, use MongoDB text search
    if (q) query.$text = { $search: q };

    // Build filters
    if (category) query.category = category;
    if (medium) query.medium = medium;
    if (style) query.style = style;
    if (orientation) query.orientation = orientation;
    if (size) query.size = size;

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);
    const sortBy = { [sort]: order === 'asc' ? 1 : -1 };

    // Query and count
    const [artworks, total] = await Promise.all([
      Artwork.find({ auctionId, ...query, owner: { $ne: userId }, sold: false })
        .sort(sortBy)
        .skip(skip)
        .limit(Number(limit)),
      Artwork.countDocuments({ auctionId, ...query, owner: { $ne: userId }, sold: false })
    ]);

    res.status(200).json({
      artworks,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
    });

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
    const artworkId = req.params.id;
    const userId = req.user.id;

    // Find the artwork
    const artwork = await Artwork.findById(artworkId).populate("owner", "_id");
    if (!artwork || !artwork.inAuction) {
      return res.status(404).json({ message: "Artwork not found or not in auction" });
    }

    if (artwork?.owner.toString() === userId) {
      return res.status(404).json({ message: "Not authorized to bid this artwork" });
    }

    const lastBid = await Bid.findOne({ artwork: artworkId }).sort({ createdAt: -1 });
    if (lastBid && lastBid?.bidder.toString() === userId) {
      return res.status(403).json({ message: "You already placed the last bid" });
    }

    // set the current bid ammount
    if (artwork.currnetBid === 0) {
      artwork.currnetBid = artwork.openingBid;
    } else if (artwork.currnetBid < 500) {
      artwork.currnetBid += 20;
    } else if (artwork.currnetBid >= 500 && artwork.currnetBid < 1000) {
      artwork.currnetBid += 50;
    } else if (artwork.currnetBid >= 1000 && artwork.currnetBid < 5000) {
      artwork.currnetBid += 100;
    } else if (artwork.currnetBid >= 5000 && artwork.currnetBid < 10000) {
      artwork.currnetBid += 500;
    } else if (artwork.currnetBid >= 10000 && artwork.currnetBid < 50000) {
      artwork.currnetBid += 1000;
    } else {
      artwork.currnetBid += 5000;
    }

    // Create a new bid
    const bid = await Bid.create({
      bidder: userId,
      artwork: artworkId,
      amount: artwork.currnetBid,
    });

    await Notification.create({
      user: userId,
      type: "bid",
      title: "Bid placed",
      message: `Your bid of ₹${artwork.currnetBid} for artwork "${artwork.title}" was placed successfully.`
    });

    await Notification.create({
      user: artwork.owner._id,
      type: "bid",
      title: "New bid",
      message: `₹${artwork.currnetBid} bid was placed on your artwork "${artwork.title}".`
    });

    // update the currnetBid and save the artwork
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