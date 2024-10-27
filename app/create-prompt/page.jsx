"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreatePrompt = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const [submitting, setSetsubmitting] = useState(false);

    const [post, setPost] = useState({
        prompt:'',
        tag:'',
    });

    const createPrompt = async (e) => {
        e.preventDefault();
        setSetsubmitting(true);

        try {
            const res = await fetch('/api/prompt/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
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
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt