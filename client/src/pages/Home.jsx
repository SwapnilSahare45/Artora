import hero from '../assets/hero.png';
import { Link } from 'react-router-dom';
import FeatureCard from '../components/FeatureCard';
import ArtworkCard from '../components/ArtworkCard';
import TestimonialCard from '../components/TestimonialCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuthStore } from '../store/authStore';
import { useArtworkStore } from "../store/artworkStore";
import { useEffect } from 'react';
import { useFeedbackStore } from '../store/feedbackStore';

const Home = () => {
  // states from auth store
  const { profile, user } = useAuthStore();
  // states from artwork store
  const { getThreeArtwork, artworks } = useArtworkStore();
  // states from feedback store
  const { getThreeFeedback, feedbacks } = useFeedbackStore();

  useEffect(() => {
    profile();
    getThreeArtwork();
    getThreeFeedback();
  }, [profile, getThreeArtwork, getThreeFeedback]);

  console.log(feedbacks)

  return (
    <main className='bg-gray-50 text-black dark:bg-gray-900 dark:text-white'>
      <Navbar />

      {/* Hero section */}
      <section className='pt-24 grid grid-cols-1 md:grid-cols-2 md:min-h-[calc(100vh-6rem)]'>
        <img src={hero} alt="Hero" className='md:h-full object-cover' />
        <div className='flex flex-col items-center justify-center gap-4 py-4 px-2 md:p-0'>
          <h2 className='text-4xl text-primary font-semibold text-center'>Discover, Bid, and Own Masterpieces</h2>
          <p className='text-center px-4 lg:px-24'>Join the global community of art lovers and artists. Explore, bid, and purchase unique artworks from around the world.</p>
          {
            user && !user?.isVerified && (
              <Link to="/register" className='bg-primary py-2 px-6 text-white tracking-widest'>Join</Link>
            )
          }
        </div>
      </section>

      {/* Features */}
      <section className='pb-12 pt-6 md:py-12'>
        <h1 className='text-4xl font-semibold mb-6 text-center md:mb-8'>Key Features</h1>
        <div className='grid grid-cols-1 gap-4 px-4 md:grid-cols-3 md:px-8 lg:px-24'>
          <FeatureCard title="Direct Art Sales" description="Artists can list their artwork for direct purchase, allowing buyers to acquire unique pieces instantly without waiting for auctions to end." />
          <FeatureCard title="Live Auctions" description="Engage in competitive, real-time bidding for exclusive artwork, with transparent auction timelines and instant notifications." />
          <FeatureCard title="Artist Communication" description="Connect directly with artists through our integrated messaging system to ask questions, request commissions, or discuss artwork details." />
        </div>
      </section>

      {/* Artworks */}
      <section className='pb-12'>
        <h1 className='text-4xl font-semibold mb-8 text-center'>Featured Artworks</h1>
        <div className='grid grid-cols-1 gap-4 px-4 md:grid-cols-3 md:px-8 lg:px-24'>
          {
            artworks.map((art) => (
              <ArtworkCard
                key={art._id}
                image={art.thumbnail}
                title={art.title}
                artist={art.artist}
                amount={
                  art.inAuction ? (
                    art.currnetBid === 0 ? art.openingBid : art.currnetBid
                  ) : art.price
                }
                timeLeft={art.auctionId?.endDate}
              />
            ))}
        </div>
      </section>

      {/* Why Artora */}
      <section className='pb-12'>
        <h1 className='text-4xl font-semibold mb-8 text-center'>Why Choose The ARTORA?</h1>
        <div className='grid grid-cols-1 gap-4 px-4 md:grid-cols-3 md:px-8 lg:px-24'>
          <FeatureCard title="🎨 Curated Selection" description="Handpicked, authentic artworks from emerging and established artists worldwide." />
          <FeatureCard title="🔒 Secure Transactions" description="Bid and purchase with confidence on our encrypted, trusted platform." />
          <FeatureCard title="🤝 Expert Support" description="Our art specialists guide you at every step of your auction experience." />
          <FeatureCard title="⚖️ Transparent Bidding" description="Real-time updates and fair, open bidding for all participants." />
          <FeatureCard title="🌍 Global Community" description="Connect with collectors, artists, and enthusiasts from around the world." />
        </div>
      </section>

      {/* Testimonials */}
      <section className='pb-12'>
        <h3 className='text-4xl font-semibold mb-8 text-center'>What Our Users Say</h3>
        <div className='grid grid-cols-1 gap-4 px-4 md:grid-cols-3 md:px-8 lg:px-24'>
          {feedbacks && feedbacks.user &&
            feedbacks.map((feedback) => (
              <TestimonialCard
                key={feedback._id}
                name={feedback?.user.name}
                role={feedback?.user.role}
                image={feedback?.user.avatar}
                quote={feedback?.feedback}
              />
            ))}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Home;