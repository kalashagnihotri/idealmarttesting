import React, { useState, useEffect } from 'react';
import { FaStar, FaCheckCircle, FaComments, FaLightbulb, FaUsers, FaHeart, FaRocket } from 'react-icons/fa';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const BASE_URL = import.meta.env.VITE_BACKEND_API_URL || 'https://api.idm.internal.destion.in';

// Generate particles once - static configuration to prevent re-renders
const BACKGROUND_PARTICLES = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  size: 100 + (i * 23) % 150,
  left: (i * 37) % 100,
  top: (i * 53) % 100,
  duration: 25 + i * 3, // Slower durations: 25-52 seconds
  moveX: (i % 3) === 0 ? -40 : (i % 3) === 1 ? 40 : 0,
  moveY: (i % 3) === 0 ? 50 : (i % 3) === 1 ? -50 : 30,
}));

const Feedback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Get token from URL or localStorage for WebView stability
  const urlToken = searchParams.get('token');
  const storedToken = localStorage.getItem('feedback_token');
  const token = urlToken || storedToken;

  // Save token to localStorage on first load if present in URL
  useEffect(() => {
    if (urlToken) {
      localStorage.setItem('feedback_token', urlToken);
    }
  }, [urlToken]);

  const [consentGiven, setConsentGiven] = useState(null); // null, true, false
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [formData, setFormData] = useState({
    token: token || '',
    q1_daily_use: '',
    q2_solve_problem: '',
    q3_community_expectation: '',
    q4_connection_level: '',
    q5_must_have_feature: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState('');
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  // Restore persisted states from localStorage on mount
  useEffect(() => {
    const savedConsent = localStorage.getItem('feedback_consent');
    if (savedConsent !== null) {
      setConsentGiven(JSON.parse(savedConsent));
    }

    const savedStep = localStorage.getItem('feedback_step');
    if (savedStep !== null) {
      setCurrentQuestion(Number(savedStep));
    }

    const savedForm = localStorage.getItem('feedback_form');
    if (savedForm !== null) {
      setFormData(JSON.parse(savedForm));
    }
  }, []);

  // Persist consentGiven to localStorage on change
  useEffect(() => {
    if (consentGiven !== null) {
      localStorage.setItem('feedback_consent', JSON.stringify(consentGiven));
    }
  }, [consentGiven]);

  // Persist currentQuestion to localStorage on change
  useEffect(() => {
    localStorage.setItem('feedback_step', currentQuestion.toString());
  }, [currentQuestion]);

  // Persist formData to localStorage on change
  useEffect(() => {
    localStorage.setItem('feedback_form', JSON.stringify(formData));
  }, [formData]);

  // Set viewport height variable to prevent re-render on Android WebView keyboard open
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVh();
    window.addEventListener('resize', setVh);
    
    return () => window.removeEventListener('resize', setVh);
  }, []);

  const questions = [
    {
      id: 'q1_daily_use',
      question: 'What would make you open the !DealMart app every day — not just for deals, but because it feels like your community?',
      type: 'textarea',
      placeholder: 'Share your thoughts...',
      icon: FaRocket,
      color: 'from-purple-500 to-pink-500',
      emoji: '🚀'
    },
    {
      id: 'q2_solve_problem',
      question: 'If !DealMart could solve one everyday problem for you — big or small — what should it be?',
      type: 'textarea',
      placeholder: 'Tell us about the problem...',
      icon: FaLightbulb,
      color: 'from-yellow-500 to-orange-500',
      emoji: '💡'
    },
    {
      id: 'q3_community_expectation',
      question: 'When you hear "built by the people, for the people," what do you expect from a community app like !DealMart?',
      type: 'textarea',
      placeholder: 'Your expectations...',
      icon: FaUsers,
      color: 'from-blue-500 to-cyan-500',
      emoji: '👥'
    },
    {
      id: 'q4_connection_level',
      question: 'Do you currently feel connected to your local community through apps?',
      type: 'select',
      icon: FaHeart,
      color: 'from-red-500 to-pink-500',
      emoji: '❤️',
      options: [
        { value: '', label: 'Select an option' },
        { value: 'yes_strongly', label: 'Yes, strongly connected' },
        { value: 'somewhat', label: 'Somewhat connected' },
        { value: 'not_really', label: 'Not really connected' },
        { value: 'not_at_all', label: 'Not at all connected' }
      ]
    },
    {
      id: 'q5_must_have_feature',
      question: 'Imagine !DealMart as your go-to local companion — what\'s the one feature or experience it must have to earn that spot on your home screen?',
      type: 'textarea',
      placeholder: 'The one must-have feature...',
      icon: FaStar,
      color: 'from-green-500 to-emerald-500',
      emoji: '⭐'
    }
  ];

  // Redirect only if no token exists in both URL and localStorage
  useEffect(() => {
    if (!token) {
      console.warn('⚠️ No token provided - redirecting to home');
      navigate('/blank', { replace: true });
    }
  }, []); // Empty dependency - only check on mount

  // Update token in formData when it changes
  useEffect(() => {
    if (token) {
      setFormData(prev => ({
        ...prev,
        token: token
      }));
    }
  }, [token]);

  // Fetch user name from token
  useEffect(() => {
    const fetchUserName = async () => {
      if (!token) return;

      try {
        const response = await fetch(`${BASE_URL}/api/accounts/profile/`, {
          headers: {
            'Authorization': `Token ${token}`,
          }
        });

        if (response.ok) {
          const userData = await response.json();
          console.log('👤 User data fetched:', userData);
          
          // Try different possible name fields
          const name = userData.name || userData.user_name || userData.first_name || userData.username || '';
          if (name) {
            setUserName(name);
          }
        }
      } catch (error) {
        console.warn('⚠️ Could not fetch user name:', error);
        // Continue without name, it's not critical
      }
    };

    fetchUserName();
  }, [token]);

  const currentQuestionData = questions[currentQuestion];
  const totalQuestions = questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const isCurrentQuestionAnswered = () => {
    const answer = formData[currentQuestionData.id];
    return answer && answer.trim() !== '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Construct API payload following !DealMart patterns (snake_case)
    const payload = {
      q1_daily_use: formData.q1_daily_use,
      q2_solve_problem: formData.q2_solve_problem,
      q3_community_expectation: formData.q3_community_expectation,
      q4_connection_level: formData.q4_connection_level,
      q5_must_have_feature: formData.q5_must_have_feature,
      submitted_at: new Date().toISOString()
    };

    console.log('📤 Submitting feedback to API:', payload);
    console.log('🔑 Using token:', token ? 'Token present' : 'No token');

    try {
      const response = await fetch(`${BASE_URL}/api/accounts/feedback/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      console.log('📡 API Response Status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('❌ API Error:', errorData);
        throw new Error(errorData?.detail || `API error: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Feedback submitted successfully:', result);
      
      // Extract user name from response if available
      if (result.user_name || result.name) {
        setUserName(result.user_name || result.name);
      }
      
      setLoading(false);
      setSubmitted(true);

      // Navigate to blank page after 2 seconds and clear all feedback data
      setTimeout(() => {
        localStorage.removeItem('feedback_token');
        localStorage.removeItem('feedback_consent');
        localStorage.removeItem('feedback_step');
        localStorage.removeItem('feedback_form');
        navigate('/blank');
      }, 2000);

    } catch (err) {
      console.error('❌ Error submitting feedback:', err);
      setError(err.message || 'Failed to submit feedback. Please try again.');
      setLoading(false);
    }
  };

  const handleConsent = (choice) => {
    if (choice === false) {
      // User declined to give feedback, navigate to blank page and clear token
      localStorage.removeItem('feedback_token');
      localStorage.removeItem('feedback_consent');
      localStorage.removeItem('feedback_step');
      localStorage.removeItem('feedback_form');
      navigate('/games/blank');
    } else {
      // User agreed to give feedback
      setConsentGiven(true);
    }
  };

  // Don't render anything if no token (will redirect)
  if (!token) {
    return null;
  }

  // Consent Screen
  if (consentGiven === null) {
    return (
      <div 
        className="bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center px-4 relative overflow-hidden"
        style={{ minHeight: 'calc(var(--vh) * 100)' }}
      >
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white opacity-10"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full relative z-10"
        >
          <div className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-white/50 backdrop-blur-sm">
            {/* Animated Icon */}
            <motion.div 
              className="text-center mb-6"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <motion.div 
                className="bg-gradient-to-br from-green-400 to-blue-500 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center shadow-lg"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-6xl">💬</span>
              </motion.div>
              <motion.h2 
                className="text-3xl font-bold text-[#253d4e] mb-3 font-Quicksand"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Share Your Feedback?
              </motion.h2>
              <motion.p 
                className="text-gray-600 text-sm leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                We'd love to hear about your experience with !DealMart. Your feedback helps us improve our services for you and the community.
              </motion.p>
            </motion.div>

            {/* Animated Consent Buttons */}
            <motion.div 
              className="space-y-3"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.button
                onClick={() => handleConsent(true)}
                className="w-full bg-gradient-to-r from-[#378157] to-[#2d6647] text-white py-4 rounded-xl font-bold text-base shadow-lg relative overflow-hidden"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(55, 129, 87, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <span className="relative flex items-center justify-center gap-2">
                  ✨ Yes, I'd like to share feedback
                </span>
              </motion.button>
              
              <motion.button
                onClick={() => handleConsent(false)}
                className="w-full bg-gray-100 text-gray-700 py-4 rounded-xl font-semibold text-base hover:bg-gray-200 transition-all duration-200 font-Quicksand"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                No, maybe later
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div 
        className="bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 flex items-center justify-center px-4 relative overflow-hidden"
        style={{ minHeight: 'calc(var(--vh) * 100)' }}
      >
        {/* Celebration particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl"
              initial={{ 
                x: '50%', 
                y: '50%',
                scale: 0,
                opacity: 1
              }}
              animate={{
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
                scale: [0, 1, 0],
                opacity: [1, 1, 0],
                rotate: Math.random() * 360
              }}
              transition={{
                duration: 2,
                delay: i * 0.05,
                ease: "easeOut"
              }}
            >
              {['🎉', '✨', '💚', '🌟', '⭐'][Math.floor(Math.random() * 5)]}
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center max-w-md relative z-10"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <motion.div 
            className="bg-white/20 backdrop-blur-md rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center border-4 border-white/50 shadow-2xl"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span className="text-7xl">🙌</span>
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl"
          >
            <h2 className="text-3xl font-bold text-[#253d4e] mb-3 font-Quicksand">
              Thanks for sharing your voice{userName ? `, ${userName}` : ''}! 🙌
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              Every response brings us one step closer to making !DealMart your community platform — powered by real people, real stories, and real connections. 💛
            </p>
            
            <motion.div
              className="mt-6 flex items-center justify-center gap-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-2xl">✨</span>
              <span className="text-sm font-semibold text-gray-700">Redirecting...</span>
              <span className="text-2xl">✨</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div 
      className={`py-6 px-4 relative overflow-hidden transition-colors duration-700 ${
        currentQuestion === 0 ? 'bg-gradient-to-br from-purple-100 via-pink-50 to-purple-100' :
        currentQuestion === 1 ? 'bg-gradient-to-br from-yellow-100 via-orange-50 to-yellow-100' :
        currentQuestion === 2 ? 'bg-gradient-to-br from-blue-100 via-cyan-50 to-blue-100' :
        currentQuestion === 3 ? 'bg-gradient-to-br from-red-100 via-pink-50 to-red-100' :
        'bg-gradient-to-br from-green-100 via-emerald-50 to-green-100'
      }`}
      style={{ minHeight: 'calc(var(--vh) * 100)' }}
    >
      {/* Floating background elements - optimized for smooth, unified movement */}
      {!keyboardOpen && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {BACKGROUND_PARTICLES.map((particle) => (
            <div
              key={particle.id}
              className={`absolute rounded-full transition-all duration-700 ${
                currentQuestion === 0 ? 'bg-gradient-to-br from-purple-400/20 to-pink-400/20' :
                currentQuestion === 1 ? 'bg-gradient-to-br from-yellow-400/20 to-orange-400/20' :
                currentQuestion === 2 ? 'bg-gradient-to-br from-blue-400/20 to-cyan-400/20' :
                currentQuestion === 3 ? 'bg-gradient-to-br from-red-400/20 to-pink-400/20' :
                'bg-gradient-to-br from-green-400/20 to-emerald-400/20'
              }`}
              style={{
                width: particle.size,
                height: particle.size,
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animation: `float-${particle.id} ${particle.duration}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>
      )}

      <style>{`
        @keyframes float-0 { 
          0%, 100% { transform: translate(0, 0) scale(1); } 
          50% { transform: translate(-40px, 50px) scale(1.1); } 
        }
        @keyframes float-1 { 
          0%, 100% { transform: translate(0, 0) scale(1); } 
          50% { transform: translate(40px, -50px) scale(0.95); } 
        }
        @keyframes float-2 { 
          0%, 100% { transform: translate(0, 0) scale(1); } 
          50% { transform: translate(0, 30px) scale(1.05); } 
        }
        @keyframes float-3 { 
          0%, 100% { transform: translate(0, 0) scale(1); } 
          50% { transform: translate(-40px, 50px) scale(1.08); } 
        }
        @keyframes float-4 { 
          0%, 100% { transform: translate(0, 0) scale(1); } 
          50% { transform: translate(40px, -50px) scale(0.92); } 
        }
        @keyframes float-5 { 
          0%, 100% { transform: translate(0, 0) scale(1); } 
          50% { transform: translate(0, 30px) scale(1.12); } 
        }
        @keyframes float-6 { 
          0%, 100% { transform: translate(0, 0) scale(1); } 
          50% { transform: translate(-40px, 50px) scale(0.98); } 
        }
        @keyframes float-7 { 
          0%, 100% { transform: translate(0, 0) scale(1); } 
          50% { transform: translate(40px, -50px) scale(1.06); } 
        }
        @keyframes float-8 { 
          0%, 100% { transform: translate(0, 0) scale(1); } 
          50% { transform: translate(0, 30px) scale(0.96); } 
        }
        @keyframes float-9 { 
          0%, 100% { transform: translate(0, 0) scale(1); } 
          50% { transform: translate(-40px, 50px) scale(1.04); } 
        }
      `}</style>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Progress Bar */}
        <motion.div 
          className={`mb-8 bg-white/80 rounded-2xl p-6 shadow-lg ${!keyboardOpen ? 'backdrop-blur-sm' : ''}`}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-bold text-[#253d4e] font-Quicksand flex items-center gap-2">
              <span className="text-2xl">{currentQuestionData.emoji}</span>
              Question {currentQuestion + 1} of {totalQuestions}
            </span>
            <motion.span 
              className="text-xs font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 rounded-full"
              key={progress}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
            >
              {Math.round(progress)}% Complete
            </motion.span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
            <motion.div 
              className={`bg-gradient-to-r ${currentQuestionData.color} h-3 rounded-full shadow-lg relative overflow-hidden`}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-50 border-2 border-red-300 text-red-700 px-4 py-3 rounded-2xl text-sm mb-6 shadow-lg"
            >
              <p className="font-medium">⚠️ {error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentQuestion}
            initial={{ opacity: 0, x: 100, rotateY: 90 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            exit={{ opacity: 0, x: -100, rotateY: -90 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-white/50 mb-6 min-h-[450px] flex flex-col relative overflow-hidden"
          >
            {/* Decorative gradient overlay */}
            <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${currentQuestionData.color}`} />

            {/* Question Number Badge with Icon */}
            <motion.div 
              className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${currentQuestionData.color} text-white rounded-2xl font-bold mb-6 shadow-lg`}
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <currentQuestionData.icon className="text-2xl" />
            </motion.div>

            {/* Question Text */}
            <motion.h2 
              className="text-2xl font-bold text-[#253d4e] mb-6 font-Quicksand leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {currentQuestionData.question}
            </motion.h2>

            {/* Answer Input */}
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              {currentQuestionData.type === 'textarea' ? (
                keyboardOpen ? (
                  <textarea
                    name={currentQuestionData.id}
                    value={formData[currentQuestionData.id]}
                    onChange={handleInputChange}
                    placeholder={currentQuestionData.placeholder}
                    rows="6"
                    className="w-full px-5 py-4 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-400 text-sm resize-none font-Quicksand shadow-inner transition-all duration-300"
                    onFocus={() => setKeyboardOpen(true)}
                    onBlur={() => setKeyboardOpen(false)}
                    autoFocus
                  />
                ) : (
                  <motion.textarea
                    name={currentQuestionData.id}
                    value={formData[currentQuestionData.id]}
                    onChange={handleInputChange}
                    placeholder={currentQuestionData.placeholder}
                    rows="6"
                    className="w-full px-5 py-4 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-400 text-sm resize-none font-Quicksand shadow-inner transition-all duration-300"
                    onFocus={() => setKeyboardOpen(true)}
                    onBlur={() => setKeyboardOpen(false)}
                    whileFocus={{ scale: 1.02 }}
                  />
                )
              ) : (
                <div className="relative">
                  {keyboardOpen ? (
                    <select
                      name={currentQuestionData.id}
                      value={formData[currentQuestionData.id]}
                      onChange={handleInputChange}
                      className={`w-full px-5 py-4 border-2 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-300 text-base font-Quicksand font-bold shadow-lg cursor-pointer transition-all duration-300 appearance-none ${
                        formData[currentQuestionData.id] 
                          ? 'border-purple-400 bg-white text-gray-800' 
                          : 'border-gray-300 bg-gradient-to-br from-white to-gray-50 text-gray-500'
                      }`}
                      style={{
                        backgroundImage: formData[currentQuestionData.id] 
                          ? `linear-gradient(to right, rgb(239 68 68), rgb(236 72 153))` 
                          : undefined,
                        WebkitBackgroundClip: formData[currentQuestionData.id] ? 'text' : undefined,
                        backgroundClip: formData[currentQuestionData.id] ? 'text' : undefined,
                        WebkitTextFillColor: formData[currentQuestionData.id] ? 'transparent' : undefined
                      }}
                      onFocus={() => setKeyboardOpen(true)}
                      onBlur={() => setKeyboardOpen(false)}
                      autoFocus
                    >
                      {currentQuestionData.options.map((option) => (
                        <option 
                          key={option.value} 
                          value={option.value}
                          className="bg-white text-gray-800 font-semibold py-3"
                          style={{ WebkitTextFillColor: 'initial', backgroundClip: 'initial' }}
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <motion.select
                      name={currentQuestionData.id}
                      value={formData[currentQuestionData.id]}
                      onChange={handleInputChange}
                      className={`w-full px-5 py-4 border-2 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-300 text-base font-Quicksand font-bold shadow-lg cursor-pointer transition-all duration-300 appearance-none ${
                        formData[currentQuestionData.id] 
                          ? 'border-purple-400 bg-white text-gray-800' 
                          : 'border-gray-300 bg-gradient-to-br from-white to-gray-50 text-gray-500'
                      }`}
                      style={{
                        backgroundImage: formData[currentQuestionData.id] 
                          ? `linear-gradient(to right, rgb(239 68 68), rgb(236 72 153))` 
                          : undefined,
                        WebkitBackgroundClip: formData[currentQuestionData.id] ? 'text' : undefined,
                        backgroundClip: formData[currentQuestionData.id] ? 'text' : undefined,
                        WebkitTextFillColor: formData[currentQuestionData.id] ? 'transparent' : undefined
                      }}
                      onFocus={() => setKeyboardOpen(true)}
                      onBlur={() => setKeyboardOpen(false)}
                      whileFocus={{ scale: 1.02 }}
                    >
                      {currentQuestionData.options.map((option) => (
                        <option 
                          key={option.value} 
                          value={option.value}
                          className="bg-white text-gray-800 font-semibold py-3"
                          style={{ WebkitTextFillColor: 'initial', backgroundClip: 'initial' }}
                        >
                          {option.label}
                        </option>
                      ))}
                    </motion.select>
                  )}
                  {/* Custom dropdown arrow with gradient */}
                  <div className={`absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300`}>
                    <svg 
                      className="w-5 h-5" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      style={{
                        color: formData[currentQuestionData.id] ? 'rgb(220 38 38)' : 'rgb(107 114 128)'
                      }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Navigation Buttons */}
            <motion.div 
              className="flex gap-3 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {currentQuestion > 0 && (
                <motion.button
                  type="button"
                  onClick={handlePrevious}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-200 transition-all font-Quicksand shadow-md"
                  whileHover={{ scale: 1.05, x: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ← Previous
                </motion.button>
              )}
              
              <div className="flex-1" />

              {currentQuestion < totalQuestions - 1 ? (
                <motion.button
                  type="button"
                  onClick={handleNext}
                  disabled={!isCurrentQuestionAnswered()}
                  className={`px-8 py-3 bg-gradient-to-r ${currentQuestionData.color} text-white rounded-xl font-bold text-sm shadow-lg relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed`}
                  whileHover={isCurrentQuestionAnswered() ? { scale: 1.05, x: 5 } : {}}
                  whileTap={isCurrentQuestionAnswered() ? { scale: 0.95 } : {}}
                >
                  {isCurrentQuestionAnswered() && (
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                  <span className="relative">Next →</span>
                </motion.button>
              ) : (
                <motion.button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading || !isCurrentQuestionAnswered()}
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold text-sm shadow-lg relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed font-Quicksand"
                  whileHover={!loading && isCurrentQuestionAnswered() ? { scale: 1.05, boxShadow: "0 20px 40px rgba(16, 185, 129, 0.4)" } : {}}
                  whileTap={!loading && isCurrentQuestionAnswered() ? { scale: 0.95 } : {}}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.div 
                        className="rounded-full h-5 w-5 border-3 border-white border-t-transparent"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Submitting...
                    </span>
                  ) : (
                    <>
                      {isCurrentQuestionAnswered() && (
                        <motion.span
                          className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        />
                      )}
                      <span className="relative">Submit Feedback ✓</span>
                    </>
                  )}
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Progress Dots */}
        <motion.div 
          className="flex justify-center gap-3 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {questions.map((q, index) => (
            <motion.div
              key={index}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                index === currentQuestion
                  ? `h-3 w-12 bg-gradient-to-r ${q.color} shadow-lg`
                  : index < currentQuestion
                  ? `h-3 w-3 bg-gradient-to-r ${q.color}`
                  : 'h-3 w-3 bg-gray-300'
              }`}
              onClick={() => setCurrentQuestion(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </motion.div>

        {/* Footer Note */}
        <motion.p 
          className="text-center text-sm text-gray-600 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          💛 Your feedback helps us build !DealMart as a true community platform
        </motion.p>
      </div>
    </div>
  );
};

export default Feedback;
