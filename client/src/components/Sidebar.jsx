import React, { useEffect } from 'react';
import { useChatStore } from "../store/useChatStore";
import { User } from "lucide-react";
import avatar from '../assets/avatar.png';
import { useAuthStore } from '../store/useAuthStore';

const Sidebar = () => {
  const {getUsers, users, selectedUser, setSelectedUser, isUsersLoading} = useChatStore()
  
  const {onlineUsers} = useAuthStore()

  useEffect(() => {
    getUsers()
  },[getUsers])
  
  if (isUsersLoading) {
    return (
      <div className='flex items-center justify-center animate-pulse
      h-full w-20 lg:w-72 transition-all uration-300'>
        Loading....
      </div>
    )
  }
  return (
    <aside className='h-full w-20 lg:w-72 flex flex-col transition-all uration-300'>
      <div className='w-full p-5'>
        
        <div className='flex items-center gap-2'>
          <User className='size-6' />
          <span className='font-medium hidden lg:block'>Contacts</span>
        </div>
      </div>

      <div className='overflow-y-auto w-full py-3'>
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
            w-full p-3 flex items-center gap-3 hover:bg-gray-600 transition-colors
            ${selectedUser?._id === user._id ? "bg-gray-600 ring-1 ring-gray-600" : ""}  
            `}
          >

            <div className='relative mx-auto lg:mx-0'>
              <img
                src={User.profilePic || avatar}
                alt={user.name}
                className='size-12 object-cover rounded-full'
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 block w-3 
                h-3 rounded-full bg-green-500 ring-2 ring-white"
                >
                </span>
              )}
            </div>

              {/* user info only visible on larger screen */}
            <div className='hidden lg:block text-left min-w-0'>
              <div className='font-medium truncate'>{user.fullName}</div>
              <div className='text-sm text-zinc-400'>
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
            
          </button>
        ))}
      </div>
    </aside>
  )
}

export default Sidebar