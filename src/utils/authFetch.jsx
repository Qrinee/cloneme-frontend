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

// Corrected authFetch function
const authFetch = async (url, options = {}, navigate, isRetry = false) => {
    let response = await fetch(url, {
        ...options,
        credentials: "include",
    });

    // Handle 401 Unauthorized - redirect to login (except for /mydata endpoint)
    if (response.status === 401) {
        // Skip redirect for /mydata endpoint - used for auth check
        if (!url.includes('/mydata')) {
            console.log("Unauthorized (401), redirecting to login...");
            if (navigate) {
                navigate('/login');
            } else {
                window.location.href = '/login';
            }
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
            // Refresh failed, redirect to login
            console.log("Refresh failed, redirecting to login...");
            if (navigate) {
                navigate('/login');
            } else {
                window.location.href = '/login';
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