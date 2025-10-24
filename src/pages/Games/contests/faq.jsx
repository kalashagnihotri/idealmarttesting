import React, { useState, useEffect, useRef } from 'react';
import { FaStar, FaCheckCircle } from 'react-icons/fa';
import { useSearchParams, useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_BACKEND_API_URL || 'https://api.idm.internal.destion.in';

const FAQ = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  
  // Refs for smooth scrolling on mobile
  const formRef = useRef(null);
  const activeInputRef = useRef(null);

  const [consentGiven, setConsentGiven] = useState(null); // null, true, false
  const [formData, setFormData] = useState({
    token: token || '',
    rating: 0,
    experience: '',
    recommendation: '',
    improvements: '',
    features: [],
    additionalComments: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Prevent viewport scaling issues on mobile WebView
  useEffect(() => {
    // Set viewport meta tag for mobile stability
    const viewport = document.querySelector('meta[name=viewport]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }

    // Prevent body scroll when keyboard opens
    const preventScroll = (e) => {
      if (document.activeElement.tagName === 'TEXTAREA' || document.activeElement.tagName === 'INPUT') {
        e.preventDefault();
      }
    };

    // Add touch event listeners for better mobile handling
    document.body.style.position = 'relative';
    document.body.style.overflow = 'auto';
    
    return () => {
      // Cleanup
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
      }
    };
  }, []);

  // Handle input focus for smooth keyboard handling
  const handleInputFocus = (e) => {
    activeInputRef.current = e.target;
    
    // Scroll input into view smoothly on mobile
    setTimeout(() => {
      if (activeInputRef.current) {
        activeInputRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center',
          inline: 'nearest'
        });
      }
    }, 300); // Delay to allow keyboard to open
  };

  const handleInputBlur = () => {
    activeInputRef.current = null;
    // Scroll back to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Redirect if no token is provided
  useEffect(() => {
    if (!token) {
      console.warn('⚠️ No token provided - redirecting to home');
      navigate('/blank', { replace: true });
    }
  }, [token, navigate]);

  // Update token in formData when it changes
  useEffect(() => {
    if (token) {
      setFormData(prev => ({
        ...prev,
        token: token
      }));
    }
  }, [token]);

  const featureOptions = [
    'Real-time Deals',
    'Price Comparison',
    'Shopping List',
    'Store Locator',
    'Savings Dashboard',
    'Rewards Program',
    'Deal Alerts'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Prevent any unwanted scrolling during typing
    e.stopPropagation();
  };

  const handleRatingClick = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleFeatureToggle = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Construct API payload following IdealMart patterns (snake_case)
    const payload = {
      rating: formData.rating,
      experience: formData.experience,
      recommendation: formData.recommendation,
      features_used: formData.features, // Array of selected features
      improvements: formData.improvements,
      additional_comments: formData.additionalComments,
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
      
      setLoading(false);
      setSubmitted(true);

      // Navigate to blank page after 2 seconds
      setTimeout(() => {
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
      // User declined to give feedback, navigate to blank page
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
        className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4"
        style={{
          WebkitOverflowScrolling: 'touch',
          overflow: 'auto'
        }}
      >
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
            {/* Icon */}
            <div className="text-center mb-6">
              <div className="bg-green-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <span className="text-5xl">💬</span>
              </div>
              <h2 className="text-2xl font-bold text-[#253d4e] mb-3 font-Quicksand">
                Share Your Feedback?
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                We'd love to hear about your experience with IdealMart. Your feedback helps us improve our services for you and the community.
              </p>
            </div>

            {/* Consent Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => handleConsent(true)}
                className="w-full bg-gradient-to-r from-[#378157] to-[#2d6647] text-white py-4 rounded-lg font-bold text-base shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 font-Quicksand"
              >
                Yes, I'd like to share feedback
              </button>
              
              <button
                onClick={() => handleConsent(false)}
                className="w-full bg-gray-100 text-gray-700 py-4 rounded-lg font-semibold text-base hover:bg-gray-200 transition-all duration-200 font-Quicksand"
              >
                No, maybe later
              </button>
            </div>

            {/* Info Note */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Your feedback is anonymous and helps us serve you better
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div 
        className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4"
        style={{
          WebkitOverflowScrolling: 'touch',
          overflow: 'auto'
        }}
      >
        <div className="text-center max-w-md">
          <div className="bg-green-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <FaCheckCircle className="text-5xl text-[#378157]" />
          </div>
          <h2 className="text-2xl font-bold text-[#253d4e] mb-3 font-Quicksand">
            Thank You for Your Feedback!
          </h2>
          <p className="text-gray-600 text-sm">
            We appreciate you taking the time to help us improve IdealMart.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-gradient-to-b from-green-50 to-white py-6 px-4"
      style={{
        position: 'relative',
        minHeight: '100vh',
        WebkitOverflowScrolling: 'touch', // Smooth scrolling on iOS
        overflow: 'auto'
      }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#253d4e] mb-3 font-Quicksand">
            We Value Your Feedback
          </h1>
          <p className="text-gray-600 text-sm">
            Help us improve your IdealMart experience by sharing your thoughts
          </p>
        </div>

        {/* Feedback Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
              <p className="font-medium">⚠️ {error}</p>
            </div>
          )}

          {/* Rating */}
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <label className="block text-sm font-semibold text-[#253d4e] mb-3 font-Quicksand">
              How would you rate your overall experience?
            </label>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingClick(star)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <FaStar
                    className={`text-4xl ${
                      star <= formData.rating
                        ? 'text-[#f8c636]'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-center text-xs text-gray-500 mt-2">
              {formData.rating > 0 && `You rated: ${formData.rating} star${formData.rating > 1 ? 's' : ''}`}
            </p>
          </div>

          {/* Experience */}
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <label className="block text-sm font-semibold text-[#253d4e] mb-2 font-Quicksand">
              How was your experience using IdealMart?
            </label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#378157] text-sm"
              style={{ fontSize: '16px' }} // Prevents zoom on iOS
            >
              <option value="">Select an option</option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="average">Average</option>
              <option value="poor">Poor</option>
              <option value="very-poor">Very Poor</option>
            </select>
          </div>

          {/* Recommendation */}
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <label className="block text-sm font-semibold text-[#253d4e] mb-2 font-Quicksand">
              Would you recommend IdealMart to others?
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, recommendation: 'yes' }))}
                className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-all ${
                  formData.recommendation === 'yes'
                    ? 'bg-[#378157] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, recommendation: 'no' }))}
                className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-all ${
                  formData.recommendation === 'no'
                    ? 'bg-[#378157] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                No
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, recommendation: 'maybe' }))}
                className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-all ${
                  formData.recommendation === 'maybe'
                    ? 'bg-[#378157] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Maybe
              </button>
            </div>
          </div>

          {/* Features Used */}
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <label className="block text-sm font-semibold text-[#253d4e] mb-3 font-Quicksand">
              Which features did you find most useful? (Select all that apply)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {featureOptions.map((feature) => (
                <button
                  key={feature}
                  type="button"
                  onClick={() => handleFeatureToggle(feature)}
                  className={`py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                    formData.features.includes(feature)
                      ? 'bg-[#378157] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {feature}
                </button>
              ))}
            </div>
          </div>

          {/* Improvements */}
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <label className="block text-sm font-semibold text-[#253d4e] mb-2 font-Quicksand">
              What can we improve?
            </label>
            <textarea
              name="improvements"
              value={formData.improvements}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder="Share your suggestions for improvement..."
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#378157] text-sm resize-none"
              style={{ fontSize: '16px' }} // Prevents zoom on iOS
            />
          </div>

          {/* Additional Comments */}
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <label className="block text-sm font-semibold text-[#253d4e] mb-2 font-Quicksand">
              Additional Comments (Optional)
            </label>
            <textarea
              name="additionalComments"
              value={formData.additionalComments}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder="Any other feedback you'd like to share..."
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#378157] text-sm resize-none"
              style={{ fontSize: '16px' }} // Prevents zoom on iOS
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !formData.rating || !formData.recommendation}
            className="w-full bg-gradient-to-r from-[#378157] to-[#2d6647] text-white py-4 rounded-lg font-bold text-base shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none font-Quicksand"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Submitting...
              </span>
            ) : (
              'Submit Feedback'
            )}
          </button>
        </form>

        {/* Footer Note */}
        <p className="text-center text-xs text-gray-500 mt-6">
          Your feedback helps us serve you better. Thank you for being a valued member of the IdealMart community!
        </p>
      </div>
    </div>
  );
};

export default Feedback;

