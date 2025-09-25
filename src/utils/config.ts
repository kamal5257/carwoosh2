// src/config/config.ts


const CONFIG = {
    APP_NAME: "CarWoosh",

    // Base URLs
    BASE_URL: "https://carwoosh.onrender.com",
    GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",

    // API Endpoints
    API: {
        REGISTER: "/api/users/register",
        LOGIN: "/api/users/authenticate",
        GOOGLE_LOGIN: "/api/users/google-login",
    },

    // Storage Keys
    STORAGE_KEYS: {
        TOKEN: "token",
        USER: "user",
    },
};

console.log("Config Loaded:", CONFIG);

export default CONFIG;
