"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const EditPrompt = () => {
    const router = useRouter();
    const [submitting, setSetsubmitting] = useState(false);
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    const [post, setPost] = useState({
        prompt:'',
        tag:'',
    });

    useEffect(() => {
        console.log("here --------------------");
        
        const getParompDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();
            setPost({
                prompt: data.prompt,
                tag: data.tag,
            });
        }
        if(promptId) getParompDetails()
    },[promptId])

    const updatePrompt = async (e) => {
        e.preventDefault();
        setSetsubmitting(true);

        
        if(!promptId)return alert('Prompt ID not found');

        try {
            const res = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                }),
            });

            if (res.ok) {
                router.push('/')
            }
        } catch (err) {
            console.log("failed to create prompt", err);
        }finally{
            setSetsubmitting(false);
        }
    }

  return (
    <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
    />
  )
}

export default EditPrompt