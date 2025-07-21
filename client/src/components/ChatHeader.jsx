import React from 'react';
import { X } from "lucide-react";
import avatar from '../assets/avatar.png';
import { useAuthStore } from '../store/useAuthStore';
import { useChatStore } from '../store/useChatStore';


const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className='p-2.5 w -full'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>

          {/* Avatar */}
          <div className='avatar'>
            <div className='size-10 rounded-full relative'>
              <img src={selectedUser.profilePic || avatar} alt={selectedUser.fullName} />
            </div>
          </div>

          {/* user info */}
          <div>
            <h3 className='font-medium'>{selectedUser.fullName}</h3>
            <p className='text-sm text-gray-500'>
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* close button */}
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>  
        
      </div>
    </div>
  )
}

export default ChatHeader