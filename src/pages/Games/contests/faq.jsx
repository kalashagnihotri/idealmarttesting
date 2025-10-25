import React, { useState, useEffect } from 'react';
import { FaStar, FaCheckCircle } from 'react-icons/fa';
import { useSearchParams, useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_BACKEND_API_URL || 'https://api.idm.internal.destion.in';

const FAQ = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const [consentGiven, setConsentGiven] = useState(null);
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

  // Redirect if no token is provided
  useEffect(() => {
    if (!token) {
      console.warn('⚠️ No token provided - redirecting to home');
      navigate('/', { replace: true });
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

  // Viewport height stabilizer for mobile WebViews (keyboard safe)
  useEffect(() => {
    const setVh = () => {
      try {
        const height = (window.visualViewport?.height ?? window.innerHeight) * 0.01;
        document.documentElement.style.setProperty('--vh', `${height}px`);
      } catch (e) {
        // noop
      }
    };
    setVh();
    window.visualViewport?.addEventListener('resize', setVh);
    window.addEventListener('resize', setVh);
    return () => {
      window.visualViewport?.removeEventListener('resize', setVh);
      window.removeEventListener('resize', setVh);
    };
  }, []);

  // Optional: tighten meta viewport to reduce zoom/reflow issues during input
  useEffect(() => {
    const meta = document.querySelector('meta[name="viewport"]');
    const original = meta?.getAttribute('content') || '';
    if (meta) {
      meta.setAttribute(
        'content',
        'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
      );
    }
    return () => {
      if (meta) {
        meta.setAttribute('content', original || 'width=device-width, initial-scale=1');
      }
    };
  }, []);

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

    const payload = {
      rating: formData.rating,
      experience: formData.experience,
      recommendation: formData.recommendation,
      features_used: formData.features,
      improvements: formData.improvements,
      additional_comments: formData.additionalComments,
      submitted_at: new Date().toISOString()
    };

    console.log('📤 Submitting FAQ feedback to API:', payload);
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
      console.log('✅ FAQ feedback submitted successfully:', result);
      
      setLoading(false);
      setSubmitted(true);

      setTimeout(() => {
        navigate('/games/blank', { replace: true });
      }, 2000);

    } catch (err) {
      console.error('❌ Error submitting FAQ feedback:', err);
      setError(err.message || 'Failed to submit feedback. Please try again.');
      setLoading(false);
    }
  };

  const handleConsent = (choice) => {
    if (choice === false) {
      navigate('/games/blank');
    } else {
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
        className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4 py-8"
        style={{
          minHeight: 'calc(var(--vh, 1vh) * 100)',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          overscrollBehaviorY: 'contain',
        }}
      >
        <div className="max-w-lg w-full">
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-6">
              <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center shadow-lg">
                <span className="text-6xl">📝</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                Quick Feedback
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Help us improve IdealMart by sharing your experience. It only takes a minute!
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => handleConsent(true)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all"
              >
                ✨ Yes, I'll help
              </button>
              
              <button
                onClick={() => handleConsent(false)}
                className="w-full bg-gray-100 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-all"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center px-4"
        style={{
          minHeight: 'calc(var(--vh, 1vh) * 100)',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          overscrollBehaviorY: 'contain',
        }}
      >
        <div className="text-center max-w-md">
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <div className="bg-green-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <FaCheckCircle className="text-6xl text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              Thank You! 🎉
            </h2>
            <p className="text-gray-600">
              Your feedback helps us make IdealMart better for everyone.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4"
      style={{
        minHeight: 'calc(var(--vh, 1vh) * 100)',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        overscrollBehaviorY: 'contain',
      }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Share Your Thoughts
          </h1>
          <p className="text-gray-600">
            Your feedback matters to us
          </p>
        </div>

        {/* Feedback Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-2 border-red-200 text-red-700 px-5 py-4 rounded-xl">
              <p className="font-semibold">⚠️ {error}</p>
            </div>
          )}

          {/* Rating Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <label className="block text-lg font-bold text-gray-800 mb-4">
              How would you rate your experience?
            </label>
            <div className="flex justify-center gap-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingClick(star)}
                  className="focus:outline-none transition-all transform hover:scale-110"
                >
                  <FaStar
                    className={`text-5xl ${
                      star <= formData.rating
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            {formData.rating > 0 && (
              <p className="text-center text-sm text-gray-500 mt-3">
                You rated: {formData.rating} star{formData.rating > 1 ? 's' : ''}
              </p>
            )}
          </div>

          {/* Experience Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <label className="block text-lg font-bold text-gray-800 mb-3">
              Overall Experience
            </label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors text-base"
              style={{ fontSize: 16, touchAction: 'manipulation' }}
            >
              <option value="">Select your experience</option>
              <option value="excellent">😍 Excellent</option>
              <option value="good">😊 Good</option>
              <option value="average">😐 Average</option>
              <option value="poor">😕 Poor</option>
              <option value="very-poor">😞 Very Poor</option>
            </select>
          </div>

          {/* Recommendation Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <label className="block text-lg font-bold text-gray-800 mb-3">
              Would you recommend us?
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, recommendation: 'yes' }))}
                className={`py-4 rounded-xl font-bold transition-all ${
                  formData.recommendation === 'yes'
                    ? 'bg-green-500 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                👍 Yes
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, recommendation: 'maybe' }))}
                className={`py-4 rounded-xl font-bold transition-all ${
                  formData.recommendation === 'maybe'
                    ? 'bg-yellow-500 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                🤔 Maybe
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, recommendation: 'no' }))}
                className={`py-4 rounded-xl font-bold transition-all ${
                  formData.recommendation === 'no'
                    ? 'bg-red-500 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                👎 No
              </button>
            </div>
          </div>

          {/* Features Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <label className="block text-lg font-bold text-gray-800 mb-3">
              Which features do you love? (Select all)
            </label>
            <div className="grid grid-cols-2 gap-3">
              {featureOptions.map((feature) => (
                <button
                  key={feature}
                  type="button"
                  onClick={() => handleFeatureToggle(feature)}
                  className={`py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                    formData.features.includes(feature)
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {feature}
                </button>
              ))}
            </div>
          </div>

          {/* Improvements Textarea */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <label className="block text-lg font-bold text-gray-800 mb-3">
              What can we improve?
            </label>
            <textarea
              name="improvements"
              value={formData.improvements}
              onChange={handleInputChange}
              placeholder="Share your suggestions..."
              rows="4"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 resize-none transition-colors text-base"
              style={{ fontSize: 16, touchAction: 'manipulation' }}
              inputMode="text"
              enterKeyHint="done"
            />
          </div>

          {/* Additional Comments Textarea */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <label className="block text-lg font-bold text-gray-800 mb-3">
              Anything else? (Optional)
            </label>
            <textarea
              name="additionalComments"
              value={formData.additionalComments}
              onChange={handleInputChange}
              placeholder="Any other thoughts..."
              rows="3"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 resize-none transition-colors text-base"
              style={{ fontSize: 16, touchAction: 'manipulation' }}
              inputMode="text"
              enterKeyHint="done"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !formData.rating || !formData.recommendation}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-5 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                Submitting...
              </span>
            ) : (
              '🚀 Submit Feedback'
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-8">
          💙 Thank you for helping us improve IdealMart!
        </p>
      </div>
    </div>
  );
};

export default FAQ;
