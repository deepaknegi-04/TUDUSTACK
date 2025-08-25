// Frontend config: only use VITE_ vars
export const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

export default { API_BASE };
