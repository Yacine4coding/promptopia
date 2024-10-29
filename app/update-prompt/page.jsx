"use client";

import { Suspense } from "react";
import EditPrompt from "@components/EditPrompt"; 

const EditPromptWrapper = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <EditPrompt />
  </Suspense>
);

export default EditPromptWrapper;