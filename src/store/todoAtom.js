import { atom, selector } from 'recoil';
import axios from 'axios';
import { API_BASE } from "../config";


// Keep the same export name for compatibility, but make it writable
export const todoSelector = atom({
    key: "todoSelector",
    default: selector({
        key: "todoSelector/default",
        get: async () => {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${API_BASE}/todo/getTodos`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);

            return response.data.todos || [];
        }
    })
});
