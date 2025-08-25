

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import { API_BASE } from "../config";


export const DeleteTodo = ({ id, onDelete }) => {
    const handleDelete = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.delete(`${API_BASE}/todo/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                alert("Todo deleted successfully");
                if (onDelete) {
                    onDelete(id); // update parent state (remove todo from list)
                }
            }
        } catch (error) {
            if (error?.response?.status === 401) {
                alert("Session expired. Please log in again.");
                localStorage.removeItem("token");
                window.location.href = "/login";
                return;
            }
            console.error("Delete failed:", error);
            alert(error?.response?.data?.msg || "Failed to delete todo");
        }
    };

    return (
        <IconButton aria-label="delete" size="large" onClick={handleDelete}>
            <DeleteIcon />
        </IconButton>
    );
};
