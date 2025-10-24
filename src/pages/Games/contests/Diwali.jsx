import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Sparkles, 
  Gift, 
  Calendar, 
  Star, 
  Zap, 
  Crown, 
  Trophy,
  Wallet,
  CreditCard,
  Smartphone,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  Flame,
  Loader2,
  User,
  Award,
  ShoppingBag
} from 'lucide-react';
import { checkContestParticipation, submitContestParticipation, getContestDetails } from '../../../services/contestApi';

const DiwaliContest = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [participation, setParticipation] = useState(null); // null, true, false
  const [showRules, setShowRules] = useState(false);
  const [animatingFireworks, setAnimatingFireworks] = useState(false);
  // const [crackers, setCrackers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [contestDetails, setContestDetails] = useState(null);
  const [isParticipant, setIsParticipant] = useState(false);
  const [contestId, setContestId] = useState(null);
  
  // Get token from URL query parameters
  const URL_TOKEN = searchParams.get('token');

  // Create crackers for background animation (toned down for performance)
  // useEffect(() => {
  //   const crackerElements = Array.from({ length: 5 }, (_, i) => ({
  //     id: i,
  //     x: 20 + Math.random() * 60, // Keep crackers more centered
  //     delay: Math.random() * 12 + 3, // Longer delays between crackers
  //     duration: 6 + Math.random() * 4
  //   }));
  //   // setCrackers(crackerElements);
  // }, []);

  // Check participation status on component mount
  useEffect(() => {
    checkParticipationStatus();
  }, []);

  // Trigger fireworks animation when user participates
  useEffect(() => {
    if (participation === true) {
      setAnimatingFireworks(true);
      setTimeout(() => setAnimatingFireworks(false), 1000);
    }
  }, [participation]);

  const checkParticipationStatus = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Validate token from URL parameters
      if (!URL_TOKEN) {
        setError('Authentication token is missing from URL. Please use a valid contest link.');
        return;
      }
      
      // Check if user is already a participant - API will return contest_id in response
      const participationData = await checkContestParticipation(URL_TOKEN);
      
      // Extract contest_id from the response
      if (participationData?.contest_id) {
        setContestId(participationData.contest_id);
      }
      
      // Check if user has previously denied participation
      if (participationData?.has_denied) {
        console.log('User has previously denied participation, redirecting to blank page');
        navigate('/games/blank');
        return;
      }
      
      if (participationData?.is_participant) {
        setIsParticipant(true);
        setParticipation(true);
        // Get contest details for existing participant
        const details = await getContestDetails(URL_TOKEN);
        setContestDetails(details);
      } else {
        setIsParticipant(false);
        setParticipation(null);
      }
    } catch (error) {
      console.error('Error checking participation:', error);
      setError('Failed to load contest information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleParticipation = async (choice) => {
    if (!contestId) {
      setError('Contest ID is not available. Cannot register for contest.');
      return;
    }

    if (!URL_TOKEN) {
      setError('Authentication token is missing. Cannot register for contest.');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      
      // Submit participation consent (both true and false)
      await submitContestParticipation(choice, contestId, URL_TOKEN);
      
      if (choice === false) {
        // After successful API call, redirect to blank page
        navigate('/games/blank');
        return;
      }
      
      // For consent: true, get contest details after successful participation
      const details = await getContestDetails(URL_TOKEN);
      setContestDetails(details);
      setParticipation(choice);
      setIsParticipant(true);
      
    } catch (error) {
      console.error('Error submitting participation:', error);
      setError('Failed to submit participation response. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const rewardTiers = [
    {
      icon: <Wallet className="h-8 w-8 text-yellow-400" />,
      title: "Wallet Payments",
      subtitle: "Maximum Rewards!",
      color: "from-yellow-400 to-orange-500",
      glow: "shadow-yellow-500/50"
    },
    {
      icon: <Smartphone className="h-8 w-8 text-green-400" />,
      title: "Apple Pay/Google Pay",
      subtitle: "Medium Rewards",
      color: "from-green-400 to-emerald-500",
      glow: "shadow-green-500/50"
    },
    {
      icon: <CreditCard className="h-8 w-8 text-blue-400" />,
      title: "Credit Card",
      subtitle: "Standard Rewards",
      color: "from-blue-400 to-indigo-500",
      glow: "shadow-blue-500/50"
    }
  ];

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-900 via-red-900 to-purple-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="text-8xl mb-6"
            >
              🪔
            </motion.div>
            <div className="flex items-center justify-center gap-3 text-white text-xl">
              <Loader2 className="h-6 w-6 animate-spin" />
              Loading Diwali Contest...
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-900 via-red-900 to-purple-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto px-6"
        >
          <div className="bg-red-500/20 backdrop-blur-lg rounded-3xl p-8 border border-red-400/30">
            <div className="text-6xl mb-4">😔</div>
            <h2 className="text-2xl font-bold text-white mb-4">Oops! Something went wrong</h2>
            <p className="text-red-200 mb-6">{error}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-red-500 to-rose-600 text-white px-8 py-3 rounded-xl font-semibold"
            >
              Try Again
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-red-900 to-purple-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Decorative Rangoli Patterns */}
        <div className="absolute top-10 left-10 text-yellow-400 text-6xl opacity-20 rotate-45">❋</div>
        <div className="absolute top-20 right-16 text-orange-400 text-4xl opacity-30 rotate-12">✦</div>
        <div className="absolute bottom-20 left-20 text-red-400 text-5xl opacity-25 -rotate-12">❀</div>
        <div className="absolute bottom-32 right-10 text-yellow-500 text-7xl opacity-20 rotate-45">✻</div>
        <div className="absolute top-1/3 left-1/4 text-orange-300 text-3xl opacity-20 rotate-90">❋</div>
        <div className="absolute top-2/3 right-1/4 text-red-300 text-4xl opacity-25 -rotate-45">✦</div>
        {/* Crackers going up and bursting */}
        {/* {crackers.map((cracker) => (
          <motion.div
            key={cracker.id}
            className="absolute text-3xl"
            initial={{ x: `${cracker.x}vw`, y: "100vh", opacity: 0 }}
            animate={{ 
              y: ["100vh", "30vh", "25vh"],
              opacity: [0, 1, 0],
              scale: [0.8, 1, 1.5]
            }}
            transition={{
              duration: cracker.duration,
              delay: cracker.delay,
              repeat: Infinity,
              ease: ["easeOut", "easeIn", "easeOut"],
              times: [0, 0.7, 1]
            }}
            style={{ left: `${cracker.x}%` }}
          >
            {cracker.id % 2 === 0 ? "🎆" : "🎇"}
          </motion.div>
        ))} */}

        {/* Animated Stars - Reduced for performance */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute text-yellow-300 text-sm"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.8, 0], 
              scale: [0, 1.2, 0],
              rotate: 180 
            }}
            transition={{
              duration: 4,
              delay: Math.random() * 8,
              repeat: Infinity,
              repeatDelay: Math.random() * 6
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          >
            ✨
          </motion.div>
        ))}

        {/* Fireworks Animation */}
        <AnimatePresence>
          {animatingFireworks && (
            <>
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={`firework-${i}`}
                  className="absolute text-6xl"
                  initial={{ 
                    x: "50vw", 
                    y: "50vh", 
                    scale: 0, 
                    opacity: 1 
                  }}
                  animate={{ 
                    x: `${20 + Math.random() * 60}vw`,
                    y: `${10 + Math.random() * 40}vh`,
                    scale: [0, 1.5, 0],
                    opacity: [1, 1, 0],
                    rotate: 360
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    ease: "easeOut"
                  }}
                >
                  🎆
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-4 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          {/* Title with Stable Diyas and Glow Effect */}
          <div className="relative mb-6">
            {/* Left Stable Diya */}
            <motion.div
              className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 text-6xl md:text-7xl"
              animate={{ 
                filter: [
                  "drop-shadow(0 0 10px #fbbf24) brightness(1)",
                  "drop-shadow(0 0 20px #f59e0b) brightness(1.2)", 
                  "drop-shadow(0 0 10px #fbbf24) brightness(1)"
                ],
                y: [0, -2, 0]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              🪔
            </motion.div>

            {/* Right Stable Diya */}
            <motion.div
              className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 text-6xl md:text-7xl"
              animate={{ 
                filter: [
                  "drop-shadow(0 0 10px #fbbf24) brightness(1)",
                  "drop-shadow(0 0 20px #f59e0b) brightness(1.2)", 
                  "drop-shadow(0 0 10px #fbbf24) brightness(1)"
                ],
                y: [0, -2, 0]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            >
              🪔
            </motion.div>

            {/* Main Title */}
            <motion.div
              animate={{ 
                textShadow: [
                  "0 0 20px #fbbf24",
                  "0 0 40px #f59e0b", 
                  "0 0 20px #fbbf24"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 mb-4 px-16 md:px-24">
                🎉 Diwali Contest 2025 🎉
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2">
                Celebrate & Win with <span className="text-yellow-400">!DealMart!</span> 🎁
              </h2>
            </motion.div>
          </div>

          <motion.p
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-xl text-purple-100 leading-relaxed max-w-3xl mx-auto"
          >
            This Diwali, we're making your celebrations sweeter and brighter!<br/>
            Join our special Diwali Contest and collect exclusive rewards like 
            <span className="text-yellow-300 font-semibold"> free sweets & Diwali crackers</span> — 
            just by shopping on !DealMart.
          </motion.p>
        </motion.div>

        {/* Participation Section */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-red-500/10 backdrop-blur-lg rounded-3xl p-8 mb-12 border border-yellow-400/30 shadow-2xl shadow-orange-500/20 max-w-4xl mx-auto"
        >
          {!isParticipant && participation === null && (
            <>
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-center mb-6"
              >
                <div className="text-6xl mb-4">👉</div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Would you like to participate in our Diwali Contest?
                </h3>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex gap-4 justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(34, 197, 94, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleParticipation(true)}
                  disabled={submitting}
                  className="flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-green-500/50 transition-all duration-300 disabled:opacity-50"
                >
                  {submitting ? <Loader2 className="h-6 w-6 animate-spin" /> : <CheckCircle className="h-6 w-6" />}
                  Yes
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(239, 68, 68, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleParticipation(false)}
                  disabled={submitting}
                  className="flex items-center gap-3 bg-gradient-to-r from-red-500 to-rose-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-red-500/50 transition-all duration-300 disabled:opacity-50"
                >
                  <XCircle className="h-6 w-6" />
                  NO
                </motion.button>
              </motion.div>
            </>
          )}

          {/* Contest Details for Participants */}
          {isParticipant && contestDetails && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 15 }}
              className="space-y-8"
            >
              <div className="text-center">
                <div className="text-8xl mb-6">🎉</div>
                <h3 className="text-3xl font-bold text-green-400 mb-4">
                  You're In The Contest!
                </h3>
                <p className="text-lg text-green-100">
                  Great news! You're actively participating in the Diwali Contest 2025. Keep shopping to earn more rewards!
                </p>
              </div>

              {/* User Stats */}
              <div className="grid md:grid-cols-3 gap-6">
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-gradient-to-br from-blue-500/20 to-indigo-600/20 backdrop-blur-lg rounded-2xl p-6 border border-blue-400/30 text-center"
                >
                  <User className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                  <h4 className="text-white font-bold text-lg mb-2">Your Profile</h4>
                  <p className="text-blue-200 text-sm">{contestDetails.data?.user?.name}</p>
                  <p className="text-blue-300 text-xs">{contestDetails.data?.user?.email}</p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 backdrop-blur-lg rounded-2xl p-6 border border-green-400/30 text-center"
                >
                  <ShoppingBag className="h-8 w-8 text-green-400 mx-auto mb-3" />
                  <h4 className="text-white font-bold text-lg mb-2">Orders Made</h4>
                  <p className="text-green-200 text-2xl font-bold">{contestDetails.data?.orders || 0}</p>
                  <p className="text-green-300 text-xs">Contest Orders</p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-gradient-to-br from-yellow-500/20 to-orange-600/20 backdrop-blur-lg rounded-2xl p-6 border border-yellow-400/30 text-center"
                >
                  <Award className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
                  <h4 className="text-white font-bold text-lg mb-2">Points Earned</h4>
                  <p className="text-yellow-200 text-2xl font-bold">{contestDetails.data?.points || 0}</p>
                  <p className="text-yellow-300 text-xs">Reward Points</p>
                </motion.div>
              </div>

              {/* Contest Info */}
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-600/20 backdrop-blur-lg rounded-2xl p-6 border border-purple-400/30">
                <h4 className="text-white font-bold text-xl mb-4 flex items-center gap-3">
                  <Trophy className="h-6 w-6 text-yellow-400" />
                  Contest Information
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-white">
                  <div>
                    <p className="text-purple-200 text-sm">Contest Name</p>
                    <p className="font-semibold">{contestDetails.data?.contest?.name}</p>
                  </div>
                  <div>
                    <p className="text-purple-200 text-sm">Reward Date</p>
                    <p className="font-semibold">{new Date(contestDetails.rewardDetails?.rewardDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* Contest Description */}
              {contestDetails.rewardDetails?.description && (
                <div className="bg-gradient-to-r from-orange-500/20 to-red-600/20 backdrop-blur-lg rounded-2xl p-6 border border-orange-400/30">
                  <h4 className="text-white font-bold text-xl mb-4 flex items-center gap-3">
                    <Gift className="h-6 w-6 text-orange-400" />
                    Contest Details
                  </h4>
                  <div className="text-orange-100 text-sm leading-relaxed whitespace-pre-line">
                    {contestDetails.rewardDetails.description}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* New Participant Success */}
          {participation === true && !isParticipant && contestDetails && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 15 }}
              className="text-center"
            >
              <div className="text-8xl mb-6">🎉</div>
              <h3 className="text-3xl font-bold text-green-400 mb-4">
                Registration Successful!
              </h3>
              <p className="text-lg text-green-100 mb-6">
                Congratulations! You're now part of the Diwali Contest 2025. 
                Start shopping to collect your festive rewards! 🎁
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-xl font-semibold"
              >
                View My Contest Dashboard
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {/* Contest Period Banner */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 rounded-2xl p-6 mb-12 text-center shadow-2xl shadow-orange-500/30 border border-yellow-400/40 max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <Calendar className="h-8 w-8 text-white" />
            <h3 className="text-2xl font-bold text-white">Contest Period</h3>
          </div>
          <div className="text-3xl font-bold text-white mb-2">
            📅 October 1st – October 20th, 2025
          </div>
          <div className="text-lg text-orange-100">
            🪔 Reward Redemption: Diwali Day (details to be announced)
          </div>
        </motion.div>

        {/* Rules Section Toggle */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-center mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowRules(!showRules)}
            className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white px-8 py-4 rounded-2xl font-bold text-xl shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-3 mx-auto"
          >
            <motion.div
              animate={{ rotate: showRules ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              📝
            </motion.div>
            {showRules ? 'Hide' : 'View'} Contest Rules & How It Works
          </motion.button>
        </motion.div>

        {/* Rules Section */}
        <AnimatePresence>
          {showRules && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden"
            >
              <div className="space-y-8 max-w-6xl mx-auto">
                {/* Rule 1: Keep Ordering */}
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 backdrop-blur-lg rounded-2xl p-8 border border-green-400/30"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-green-500 p-3 rounded-full">
                      <Zap className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Keep Ordering & Earn More</h3>
                  </div>
                  <p className="text-lg text-green-100 leading-relaxed">
                    Place orders from <span className="font-bold text-green-300">October 1st to October 20th</span> to accumulate Diwali rewards.
                    The more you order, the bigger your festive gift!
                  </p>
                </motion.div>

                {/* Rule 2: Payment Tiers */}
                <motion.div
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-r from-purple-500/20 to-pink-600/20 backdrop-blur-lg rounded-2xl p-8 border border-purple-400/30"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-purple-500 p-3 rounded-full">
                      <Crown className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Different Order Types = Different Rewards</h3>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    {rewardTiers.map((tier, index) => (
                      <motion.div
                        key={index}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        whileHover={{ y: -10, scale: 1.05 }}
                        className={`bg-gradient-to-br ${tier.color} p-6 rounded-xl text-white shadow-xl ${tier.glow} hover:shadow-2xl transition-all duration-300`}
                      >
                        <div className="text-center">
                          <div className="mb-4">{tier.icon}</div>
                          <h4 className="font-bold text-lg mb-2">{tier.title}</h4>
                          <p className="text-sm opacity-90">{tier.subtitle}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-6 bg-yellow-500/20 border border-yellow-400/50 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-3 text-yellow-200">
                      <Sparkles className="h-5 w-5" />
                      <span className="font-semibold">(Tip: Use wallet for maximum Diwali bonus!)</span>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Rule 3: Redemption */}
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gradient-to-r from-orange-500/20 to-red-600/20 backdrop-blur-lg rounded-2xl p-8 border border-orange-400/30"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-orange-500 p-3 rounded-full">
                      <MapPin className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Rewards Redemption</h3>
                  </div>
                  <p className="text-lg text-orange-100 leading-relaxed">
                    All collected rewards can be redeemed on <span className="font-bold text-orange-300">Diwali Day</span> at selected !DealMart partner stores/locations.
                    Rewards cannot be claimed before or after the specified date & time.
                  </p>
                </motion.div>

                {/* Rule 4: Guaranteed Rewards */}
                <motion.div
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-r from-blue-500/20 to-indigo-600/20 backdrop-blur-lg rounded-2xl p-8 border border-blue-400/30"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-blue-500 p-3 rounded-full">
                      <Gift className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Guaranteed Festive Rewards</h3>
                  </div>
                  <p className="text-lg text-blue-100 leading-relaxed">
                    Every participant who orders during the contest period is guaranteed a Diwali gift 🎁.
                    <br/><span className="font-bold text-blue-300">More Orders = More Rewards</span>
                    <br/>Keep placing orders to boost your reward balance and celebrate Diwali with free sweets and crackers!
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-center mt-16 mb-8"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 p-1 rounded-3xl inline-block shadow-2xl shadow-orange-500/40"
          >
            <div className="bg-gradient-to-br from-amber-900/80 to-orange-900/80 backdrop-blur-lg rounded-3xl px-8 py-6">
              <h3 className="text-2xl font-bold text-white mb-4">
                🎊 Ready to Start Your Festive Shopping Journey? 🎊
              </h3>
              <motion.button
                whileHover={{ scale: 1.1, boxShadow: "0 25px 50px rgba(251, 191, 36, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/games/blank')}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-10 py-4 rounded-2xl font-bold text-xl shadow-lg hover:shadow-yellow-500/50 transition-all duration-300"
              >
                🛒 Start Shopping Now!
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default DiwaliContest;
