import axios from 'axios';

/**
 * Fetches user profile details from the user management service
 * 
 * @param {number|string} userId - The ID of the user to fetch
 * @param {string} authToken - Authorization token to pass to the profile service
 * @returns {Promise<Object|null>} - User details or null if request fails
 */
export const fetchUserProfile = async (userId, authToken) => {
  try {
    const userServiceUrl = process.env.USER_MANAGEMENT_SERVICE || 'http://localhost:8083';
    
    const response = await axios.get(`${userServiceUrl}/api/profile/details/${userId}`, {
      headers: {
        'Authorization': authToken
      },
     });
    
    return response.data;
  } catch (error) {
    console.error(`Error fetching user profile for ID ${userId}:`, 
      error.response?.status 
        ? `Status ${error.response.status}: ${error.response.statusText}`
        : error.message
    );
    
    // Return null when request fails
    return null;
  }
};

/**
 * Batch fetch user profiles for multiple user IDs
 * 
 * @param {Array<number|string>} userIds - Array of user IDs to fetch
 * @param {string} authToken - Authorization token to pass to the profile service
 * @returns {Promise<Object>} - Object mapping user IDs to their profile data
 */
export const fetchMultipleUserProfiles = async (userIds, authToken) => {
  if (!userIds || !userIds.length) return {};
  
  // Create a map of userId -> profile data
  const uniqueIds = [...new Set(userIds)]; // Remove duplicates
  const profilesMap = {};
  
  // Use Promise.all for concurrent requests
  const promises = uniqueIds.map(async (userId) => {
    const profile = await fetchUserProfile(userId, authToken);
    profilesMap[userId] = profile;
  });
  
  await Promise.all(promises);
  return profilesMap;
};