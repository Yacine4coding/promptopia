"use client"

import { useState, useEffect } from 'react'
import { useSession } from '@node_modules/next-auth/react'
import { useRouter } from '@node_modules/next/navigation'

import Profile from '@components/profile'

const MyProfile = () => {

  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();

  const fetchPosts = async () => {
    const response = await fetch(`api/users/${session?.user.id}/posts`);
    const data = await response.json();
    setPosts(data);
  }

  
  useEffect(() => {
    if(session?.user.id)fetchPosts();
  }, []);

  const handleEdit = () => {

  }

  const handleDelete = async () => {
    
  }
  return (
    <Profile
      name="My"
      desc="welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile