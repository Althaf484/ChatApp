import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Camera, User, Mail } from "lucide-react";

const ProfilePage = () => {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const [selectedImage, setSelectedimage] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedimage(base64Image)
      try {
      await updateProfile({ profilePic: base64Image });
      } catch (err) {
        console.error("Error updating profile:", err);
      }
    }
  }

  return (
    <div className='h-screen pt-20'>
      <div className='max-w-2xl mx-auto p-4 py-8'>
        <div className='bg-base-300 rounded-xl p-6 space-y-8'>

          {/* div for heading */}
          <div className='text-center'>
            <h1 className='text-2xl font-semibold'>Profile</h1>
            <p className='mt-2'>Your profile information</p>
          </div>

          {/* avatar upload section */}
          <div className='flex flex-col items-center gap-4'>
            <div className='relative'>
              <img
                src={selectedImage || authUser.profilePic || "/avatar.png"}
                className='size-32 rounded-full object-cover border-4'
              />
              <label
                htmlFor='avatar-upload'
                className={`
                absolute bottom-0 right-0 z-50 bg-base-content hover:scale-105
                p-2 rounded-full cursor-pointer transition-all duration-300
                ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}  
                `}
              >
                <Camera className='size-5 bg-black text-base-200' />
                <input
                  type='file'
                  id='avatar-upload'
                  className='hidden'
                  accept='image/*'
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className='text-sm text-zinc-400'>
              {isUpdatingProfile ? "Uploading" : "Click the camera icon to update your photo"}
            </p>
          </div>
          
          <div className='space-y-6'>
            <div className='space-y-a.5'>
              <div className='text-sm text-zinc-400 flex items-center gap-2'>
                <User className='size-4'/>
                FulName
              </div>
              <p className='px-4 py-2.5 bg-base-200 rounded-lg border'>{authUser?.fullName}</p>
            </div>
          </div>

          <div className='space-y-6'>
            <div className='space-y-a.5'>
              <div className='text-sm text-zinc-400 flex items-center gap-2'>
                <Mail className='size-4'/>
                Email Address
              </div>
              <p className='px-4 py-2.5 bg-base-200 rounded-lg border'>{authUser?.email}</p>
            </div>
          </div>

          <div className='mt-6 bg-base-300 rounded-xl p-6'>
            <h2 className='text-lg font-medium mb-4'>Account Information</h2>
            <div className='space-y-3 text-sm'>

              <div className='flex items-center justify-between py-2'>
                <span>Member Since</span>
                <span className='text-green-500'>{authUser.createdAt?.split("T")[0]}</span>
              </div>

              <div className='flex items-center justify-between py-2'>
                <span>Account Status</span>
                <span className='text-green-500'>Active</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProfilePage