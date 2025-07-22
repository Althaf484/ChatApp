import { axiosInstance } from "../lib/axios";
import { create } from "zustand";
import toast from "react-hot-toast";
import { io } from "socket.io-client";


const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "/"


export  const useAuthStore = create((set, get) => ({
    authUser: null,
    isCheckingAuth: true,

    loading: false,
    isUpdatingProfile: false,

    onlineUsers: [],

    socket: null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data })
            
            get().connectSocket();
        } catch (error) {
            set({ authUser: null })
            console.log("Error in checkAuth:", error)
        } finally {
            set({isCheckingAuth: false})
        }
    },

    signup: async ({ fullName, email, password, confirmPassword }) => {
        set({ loading: true })
        
        if (password !== confirmPassword) {
            set({ loading: false });
            return toast.error("Password do not match");
        }

        try {
            const res = await axiosInstance.post("/auth/signup", { fullName, email, password });
            set({authUser: res.data})
            toast.success("Account created successfully");

            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({loading: false})
        }
    },


    login: async (email, password) => {
        set({ loading: true });

        try {
            const res = await axiosInstance.post("/auth/login", {email, password});
            set({authUser: res.data})
            toast.success("Logged in successfully");

            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({loading: false})
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");

            get().disconnectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true })
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully")
        } catch (error) {
            console.log("Error in update profile");
            toast.error(error.response.data.message);
        } finally {
            set({ isUpdatingProfile: false })
        }
    },


    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id,
            },
        });
        socket.connect();

        set({ socket: socket });

        socket.on("getOnlineUsers", (userIds) => {
            set({onlineUsers: userIds})
        })
    },
    
    disconnectSocket: () => {
        if (socket?.connected) get().socket.disconnect();0
    }
}))