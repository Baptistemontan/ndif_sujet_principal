export const dev = process.env.NODE_ENV !== "production";

export const API_URL = "?";

export const serverURL = dev ? "http://localhost:3000" : "?";
