import { useNavigate } from "react-router";

const refreshToken = async () => {
    try {
        const response = await fetch(import.meta.env.VITE_URL + "/refresh", {
            method: 'GET',
            credentials: "include",
        });

        return response.ok;
    } catch {
        return false;
    }
};

// Endpoints that should allow guest access (no redirect on 401)
const guestAllowedEndpoints = [
    '/api/chats/',
    '/api/chats',
];

const isGuestAllowedEndpoint = (url) => {
    return guestAllowedEndpoints.some(endpoint => url.includes(endpoint));
};

// Corrected authFetch function
const authFetch = async (url, options = {}, navigate, isRetry = false) => {
    let response = await fetch(url, {
        ...options,
        credentials: "include",
    });

    // Handle 401 Unauthorized - redirect to login (except for guest-allowed endpoints)
    if (response.status === 401) {
        // Skip redirect for /mydata endpoint and chat endpoints - used for auth check and guest mode
        if (!url.includes('/mydata') && !isGuestAllowedEndpoint(url)) {
            console.log("Unauthorized (401), redirecting to login...");
            if (navigate) {
                navigate('/login');
            } else {
                window.location.href = '/login';
            }
        } else {
            console.log("Unauthorized (401) on guest-allowed endpoint, allowing guest access...");
        }
        return response;
    }

    // Handle 403 - try to refresh token
    if (response.status === 403 && !isRetry) {
        console.log("Access token expired, attempting refresh...");
        const refreshed = await refreshToken();
        if (refreshed) {
            // Retry the original request
            return authFetch(url, options, navigate, true);
        } else {
            // Refresh failed, redirect to login (unless it's a guest-allowed endpoint)
            if (!isGuestAllowedEndpoint(url)) {
                console.log("Refresh failed, redirecting to login...");
                if (navigate) {
                    navigate('/login');
                } else {
                    window.location.href = '/login';
                }
            }
        }
    }

    return response;
};


// Wrapper hook to use navigate
export const useAuthFetch = () => {
    const navigate = useNavigate();
    return (url, options = {}) => authFetch(url, options, navigate);
};