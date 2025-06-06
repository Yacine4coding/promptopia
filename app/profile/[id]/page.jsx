"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

// Forces the page to be dynamic, bypassing static data requirements
export const dynamic = 'force-dynamic';

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [userPosts, setUserPosts] = useState([]);

  const fixId = async () => {
    const { id } = await params
  }
  const fetchPosts = async () => {
    const { id } = await params;
    const response = await fetch(`/api/users/${id}/posts`);
    const data = await response.json();

    setUserPosts(data);
  };

  useEffect(() => {
    if (fixId()) fetchPosts();
  }, [fixId()]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Profile
        name={userName}
        desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
        data={userPosts}
      />
    </Suspense>
    
  );
};

export default UserProfile;