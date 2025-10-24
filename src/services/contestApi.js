import axios from 'axios';
// import { 
//   dummyContestParticipation, 
// //   dummyContestParticipationSuccess, 
//   dummyContestDetails,
// //   dummyExistingParticipant,
// //   getRandomScenario
// } from '../data/dummyContestData';

const BASE_URL = import.meta.env.VITE_BACKEND_API_URL || 'https://api.idm.internal.destion.in';

// Enable/disable dummy data mode (set to true for testing without APIs)
const USE_DUMMY_DATA = import.meta.env.VITE_USE_DUMMY_DATA === 'true' || false;

// Get auth token from sessionStorage or URL parameter
const getAuthToken = (urlToken = null) => {
  // Priority: URL token > sessionStorage token
  return urlToken || sessionStorage.getItem('authToken');
};

// Simulate API delay for realistic experience
const simulateDelay = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

// Check if user is already a participant in the contest
export const checkContestParticipation = async (urlToken = null) => {
  // Use dummy data if enabled
//   if (USE_DUMMY_DATA) {
//     console.log('🔧 Using dummy data for contest participation check');
//     // const scenario = getRandomScenario();
//     console.log(`📊 Using scenario: ${scenario.scenarioName}`);
//     return scenario.participation;
//   }

  try {
    const token = getAuthToken(urlToken);
    if (!token) {
      throw new Error('Authentication token is required. Please provide a valid token.');
    }

    const response = await axios({
      method: 'GET',
      url: `${BASE_URL}/api/games/contest-participate/`,
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
      params: {
        url: "/contests/diwali"
      }
    });

    return response.data;
  } catch (error) {
    console.error('❌ API Error in contest participation check:', error);
    
    // Handle specific error cases
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || error.response.statusText;
      
      switch (status) {
        case 401:
          throw new Error('Unauthorized: Invalid or expired authentication token. Please log in again.');
        case 403:
          throw new Error('Access denied: You do not have permission to access this contest.');
        case 404:
          throw new Error('Contest not found: The specified contest ID does not exist.');
        case 400:
          throw new Error(`Bad request: ${message || 'Invalid contest parameters provided.'}`);
        case 500:
          throw new Error('Server error: Our servers are experiencing issues. Please try again later.');
        default:
          throw new Error(`Request failed: ${message || `HTTP ${status} error occurred.`}`);
      }
    } else if (error.request) {
      throw new Error('Network error: Unable to connect to the server. Please check your internet connection.');
    } else {
      throw new Error(`Request setup error: ${error.message}`);
    }
  }
};

// Submit contest participation consent
export const submitContestParticipation = async (consent, contestId, urlToken = null) => {
  // Use dummy data if enabled
//   if (USE_DUMMY_DATA) {
//     console.log('🔧 Using dummy data for contest participation submission');
//     return dummyContestParticipationSuccess;
//   }

  try {
    const token = getAuthToken(urlToken);
    if (!token) {
      throw new Error('Authentication token is required. Please provide a valid token.');
    }

    const response = await axios({
      method: 'POST',
      url: `${BASE_URL}/api/games/contest-participate/`,
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        consent,
        contest_id: contestId
      }
    });

    return response.data;
  } catch (error) {
    console.error('❌ API Error in contest participation submission:', error);
    
    // Handle specific error cases
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || error.response.statusText;
      
      switch (status) {
        case 401:
          throw new Error('Unauthorized: Invalid or expired authentication token. Please log in again.');
        case 403:
          throw new Error('Access denied: You do not have permission to participate in this contest.');
        case 404:
          throw new Error('Contest not found: The specified contest ID does not exist.');
        case 400:
          throw new Error(`Bad request: ${message || 'Invalid participation data provided.'}`);
        case 409:
          throw new Error('Already registered: You are already participating in this contest.');
        case 500:
          throw new Error('Server error: Our servers are experiencing issues. Please try again later.');
        default:
          throw new Error(`Request failed: ${message || `HTTP ${status} error occurred.`}`);
      }
    } else if (error.request) {
      throw new Error('Network error: Unable to connect to the server. Please check your internet connection.');
    } else {
      throw new Error(`Request setup error: ${error.message}`);
    }
  }
};

// Get contest details (called after successful participation)
export const getContestDetails = async (urlToken = null) => {
  // Use dummy data if enabled
//   if (USE_DUMMY_DATA) {
//     console.log('🔧 Using dummy data for contest details');
//     return dummyContestDetails;
//   }

  try {
    const token = getAuthToken(urlToken);
    if (!token) {
      throw new Error('Authentication token is required. Please provide a valid token.');
    }

    const response = await axios({
      method: 'GET',
      url: `${BASE_URL}/api/games/contest-details/`,
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('❌ API Error in contest details:', error);
    
    // Handle specific error cases
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || error.response.statusText;
      
      switch (status) {
        case 401:
          throw new Error('Unauthorized: Invalid or expired authentication token. Please log in again.');
        case 403:
          throw new Error('Access denied: You do not have permission to view contest details.');
        case 404:
          throw new Error('Contest details not found: No contest information available for your account.');
        case 400:
          throw new Error(`Bad request: ${message || 'Invalid request parameters.'}`);
        case 500:
          throw new Error('Server error: Our servers are experiencing issues. Please try again later.');
        default:
          throw new Error(`Request failed: ${message || `HTTP ${status} error occurred.`}`);
      }
    } else if (error.request) {
      throw new Error('Network error: Unable to connect to the server. Please check your internet connection.');
    } else {
      throw new Error(`Request setup error: ${error.message}`);
    }
  }
};