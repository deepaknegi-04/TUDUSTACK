import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { todoSelector } from "../store/todoAtom";
import axios from "axios";
import { API_BASE } from "../config";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Checkbox,
    FormControlLabel,
    IconButton,
    Divider,
} from "@mui/material";

export default function UpdateTodoModal({ open, onClose, todo }) {
    const [todos, setTodos] = useRecoilState(todoSelector);

    const [title, setTitle] = useState(todo?.title || "");
    const [description, setDescription] = useState(todo?.description || "");
    const [completed, setCompleted] = useState(todo?.completed || false);

    // Update local state whenever "todo" changes
    useEffect(() => {
        if (todo) {
            setTitle(todo.title || "");
            setDescription(todo.description || "");
            setCompleted(todo.completed || false);
        }
    }, [todo]);

    const handleUpdate = async () => {
        if (!title || !description) {
            alert("Title and description are required!");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            const res = await axios.put(
                `${API_BASE}/todo/update/${todo._id}`,
                { title, description, completed },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setTodos((prev) =>
                prev.map((t) => (t._id === todo._id ? res.data.updated : t))
            );

            // 🔑 Close dialog first to avoid blocking by alert
            if (onClose) onClose();

            // Optional: show feedback after closing without blocking the close
            setTimeout(() => alert("Todo updated ✅"), 0);


        } catch (error) {
            if (error?.response?.status === 401) {
                alert("Session expired. Please log in again.");
                localStorage.removeItem("token");
                window.location.href = "/login";
                return;
            }
            console.error("Error updating todo:", error);
            alert(error?.response?.data?.msg || "Failed to update todo");
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    overflow: 'hidden',
                    backgroundImage: 'none',
                    boxShadow: (theme) => theme.shadows[8]
                }
            }}
        >
            <div className="flex items-center justify-between px-4 pt-4">
                <DialogTitle className="p-0 m-0">Edit Todo</DialogTitle>
                <IconButton aria-label="Close" onClick={onClose} size="small">
                    <span className="text-xl leading-none">×</span>
                </IconButton>
            </div>
            <Divider />
            <DialogContent className="space-y-4 pt-4">
                <TextField
                    fullWidth
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    variant="outlined"
                    placeholder="Enter a concise title"
                    margin="dense"
                />
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    variant="outlined"
                    placeholder="Add a helpful description"
                    margin="dense"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={completed}
                            onChange={(e) => setCompleted(e.target.checked)}
                        />
                    }
                    label="Mark as completed"
                />
            </DialogContent>
            <Divider />
            <DialogActions className="px-4 py-3">
                <Button onClick={onClose} variant="outlined">
                    Cancel
                </Button>
                <Button onClick={handleUpdate} variant="contained" color="primary">
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
}
