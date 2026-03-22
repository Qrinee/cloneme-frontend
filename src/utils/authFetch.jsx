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

    if (response.status === 403) {
        console.log("Access token expired, attempting refresh...");
        console.log(await refreshToken());
    }

    return response;
};


// Wrapper hook to use navigate
export const useAuthFetch = () => {
    const navigate = useNavigate();
    return (url, options = {}) => authFetch(url, options, navigate);
};