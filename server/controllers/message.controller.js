import User from "../models/user.model.js";
import Message from "../models/message.model.js";

import cloudinary from "../lib/cloudinary.js";
import { getRecieverSocketId, io } from "../lib/socket.js";


export const getUsersForSidebar = async (req, res) => {
    try{
        const loggedInUser = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUser } }).select("-password");
        res.status(200).json(filteredUsers);

    } catch(error) {
        console.log("error in getUsersForSidebar controller",error.message);
        res.status(500).json({error: "Internal server error"});
    }
}

export const getMessages = async (req, res) => {
    try{
        const myId = req.user._id;
        const userToChatId = req.params.id;

        const messages = await Message.find({
            $or: [
                {senderId: myId ,recieverId: userToChatId},
                {senderId: userToChatId ,recieverId: myId}
            ]
        })

        res.status(200).json(messages);

    } catch(error) {
        console.log("error in getMessages controller",error.message);
        res.status(500).json({error: "Internal server error"});
    }
}

export const sendMessage = async (req, res) => {
    try{
        const {image, text} = req.body;
        const recieverId = req.params.id;
        const senderId = req.user._id;

        let imageUrl;
        if(image) {
            const response = await cloudinary.uploader.upload(image);
            imageUrl = response.secure_url;
        }

        const newMessage = new Message({
            senderId,
            recieverId,
            text,
            image: imageUrl
        })

        await newMessage.save();

        const recieverSocketId = getRecieverSocketId(recieverId);
        if (recieverSocketId) {
            io.to(recieverSocketId).emit("newMessage", newMessage)
        }

        res.status(201).json(newMessage)

    } catch(error) {
        console.log("error in sendMessage controller",error.message);
        res.status(500).json({error: "Internal server error"});
    }
}