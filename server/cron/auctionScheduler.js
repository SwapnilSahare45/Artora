const cron = require("node-cron");
const Artwork = require("../models/artwork.model");
const Bid = require("../models/bid.model");
const Order = require("../models/order.model");
const Notification = require("../models/notification.model");

cron.schedule("* * * * *", async () => {
    const now = new Date();

    const artworks = await Artwork.find({ inAuction: true }).populate("auctionId");

    const expiredArtworks = artworks.filter(
        art =>
            art.auctionId &&
            art.auctionId.endDate <= now &&
            !art.auctionId.ended
    );

    // Get the highest bid for an artwork when auction expired 
    for (const artwork of expiredArtworks) {
        const highestBid = await Bid.findOne({ artwork: artwork._id })
            .sort({ amount: -1 })
            .populate("bidder");

        // Mark the auction as ended
        artwork.inAuction = false;
        artwork.auctionId.ended = true;
        artwork.sold = true;

        await artwork.auctionId.save(); // save updated auction
        await artwork.save(); // save artwork changes

        if (highestBid) {
            // create a order for highest bid
            await Order.create({
                buyer: highestBid.bidder._id,
                seller: artwork.owner,
                artwork: artwork._id,
                amount: highestBid.amount,
                paymentStatus: "pending",
                auction: true,
            });

            // Create a notifications
            await Notification.create({
                user: highestBid.bidder._id,
                type: "order",
                title: "You won the auction!",
                message: `You have won the artwork "${artwork.title}" for ₹${highestBid.amount}. Please proceed to payment.`,
            });

            await Notification.create({
                user: artwork.owner,
                type: "order",
                title: "Auction completed",
                message: `Your artwork "${artwork.title}" has been sold for ₹${highestBid.amount}.`,
            });
        }
    }
});
