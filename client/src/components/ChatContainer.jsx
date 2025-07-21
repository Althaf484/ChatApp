import React, { useEffect, useRef } from 'react';
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from '../store/useAuthStore';
import avatar from '../assets/avatar.png';

import ChatHeader from "../components/ChatHeader";
import MessageInput from "../components/MessageInput";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className='flex flex-col flex-1 animate-pulse'>
        <ChatHeader />
        <p className='flex items-center flex-1 justify-center'>Loading .....</p>
        <MessageInput />
      </div>
    );
  }

  return (
    <div className='flex flex-col flex-1 overflow-auto'>
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isOwnMessage = message.senderId === authUser._id;

          return (
            <div
              key={message._id}
              className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex items-end gap-2 ${isOwnMessage ? "flex-row-reverse" : "flex-row"}`}>
                {/* Avatar */}
                <div className="size-10 rounded-full border overflow-hidden">
                  <img
                    src={isOwnMessage ? authUser.profilePic || avatar : selectedUser.profilePic || avatar}
                    alt="profile"
                  />
                </div>

                {/* Message bubble and timestamp */}
                <div className="flex flex-col items-start max-w-xs">
                  <div className={`p-2 rounded-lg ${isOwnMessage ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}>
                    {message.image && (
                      <img
                        src={message.image}
                        alt="Attachment"
                        className="max-w-[150px] rounded-md mb-2"
                      />
                    )}
                    {message.text && <p>{message.text}</p>}
                  </div>
                  <span className="text-xs opacity-50 mt-1 ml-1">
                    {formatMessageTime(message.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messageEndRef} />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
