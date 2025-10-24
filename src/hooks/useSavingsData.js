import { useState, useEffect } from 'react';

const BASE_URL = import.meta.env.VITE_BACKEND_API_URL || 'https://api.idm.internal.destion.in';

export const useSavingsData = () => {
  const [data, setData] = useState(null);
  const [allResults, setAllResults] = useState([]); // Store all fetched results
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [nextUrl, setNextUrl] = useState(null);

  const fetchSavingsData = async (url = null, isLoadMore = false) => {
    try {
      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
        setAllResults([]); // Reset results on initial fetch
      }
      setError(null);
      
      // Get auth token from sessionStorage
      const token = sessionStorage.getItem('authToken');
      
      if (!token) {
        throw new Error('Authentication required. Please log in to view your savings data.');
      }

      // Handle pagination URL construction to avoid CORS issues
      let apiUrl;
      if (url && url.includes('page=')) {
        // Extract page parameter from the provided URL and construct with our BASE_URL
        const urlObj = new URL(url);
        const pageParam = urlObj.searchParams.get('page');
        apiUrl = `${BASE_URL}/api/orders/users/savings/details/?page=${pageParam}`;
        console.log('🔄 Reconstructed pagination URL:', apiUrl);
      } else {
        apiUrl = url || `${BASE_URL}/api/orders/users/savings/details/`;
      }

      console.log('📡 Making API call to:', apiUrl);
      console.log('🔑 Using token:', token ? 'Token present' : 'No token');
      console.log('🌐 Is pagination request:', isLoadMore);

      // Call the actual API with better error handling
      let response;
      try {
        response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
          },
          // Add credentials if needed for CORS
          credentials: 'same-origin',
        });
      } catch (fetchError) {
        console.error('❌ Fetch error (CORS/Network):', fetchError);
        throw new Error(`Network error: ${fetchError.message}. Please check your connection.`);
      }

      console.log('📤 Response status:', response.status);
      console.log('🔗 Response URL:', response.url);

      if (!response.ok) {
        console.error('❌ API Error Response:', {
          status: response.status,
          statusText: response.statusText,
          url: response.url
        });
        
        if (response.status === 401) {
          throw new Error('Session expired. Please log in again.');
        } else if (response.status === 403) {
          throw new Error('Access denied. You don\'t have permission to view this data.');
        } else if (response.status >= 500) {
          throw new Error('Server error. Our team has been notified. Please try again later.');
        } else {
          throw new Error(`Unable to fetch savings data (Error: ${response.status}). Please try again.`);
        }
      }

      const result = await response.json();
      
      console.log('📊 API Response:', {
        count: result.count,
        next: result.next,
        previous: result.previous,
        resultsLength: result.results?.length,
        isLoadMore
      });
      
      if (isLoadMore) {
        // Append new results to existing ones
        const combinedResults = [...allResults, ...result.results];
        console.log('📈 Combined results count:', combinedResults.length);
        setAllResults(combinedResults);
        setData({
          ...result,
          results: combinedResults
        });
      } else {
        // Set initial data and results
        setData(result);
        setAllResults(result.results);
      }
      
      // Update pagination state
      setHasMore(!!result.next);
      setNextUrl(result.next);
      
      console.log('🔄 Pagination state:', {
        hasMore: !!result.next,
        nextUrl: result.next
      });
      
    } catch (err) {
      console.error('API call failed:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMoreResults = () => {
    if (nextUrl && !loadingMore) {
      fetchSavingsData(nextUrl, true);
    }
  };

  useEffect(() => {
    fetchSavingsData();
  }, []);

  return { 
    data, 
    loading, 
    loadingMore,
    error, 
    hasMore,
    refetch: () => fetchSavingsData(),
    loadMore: loadMoreResults
  };
};