// Decode JWT token to get user information
export const decodeToken = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};

// Get user role from token
export const getUserRole = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const decoded = decodeToken(token);
    // Check for role in various formats
    if (decoded?.role) return decoded.role;
    if (decoded?.authorities?.[0]?.authority) return decoded.authorities[0].authority;
    if (decoded?.roles?.[0]) return decoded.roles[0]; // Check roles array
    return null;
};

// Check if user is authenticated
export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) return false;

    // Check if token is expired
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
};

// Get user email from token
export const getUserEmail = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const decoded = decodeToken(token);
    return decoded?.sub || decoded?.email || null;
};

// Logout user
export const logout = () => {
    localStorage.removeItem('token');
};
