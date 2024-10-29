import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";


// GET (read)
export const GET = async (request, { params }) => {
    try {
        
        await connectToDB();
        const { id } = await params
        const prompt = await Prompt.findById(id).populate('creator');
        if (!prompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        console.error("Error fetching prompt:", error);
        return new Response("Failed to fetch all prompt", { status: 500 });
    }
}

// PATCH (update)
export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();
    try {
        await connectToDB();

        // Find the existing prompt by ID
        const { id } = await params
        const existingPrompt = await Prompt.findById(id);

        if (!existingPrompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response("Successfully updated the Prompts", { status: 200 });
    } catch (error) {
        console.error("Error updating prompt:", error);
        return new Response("Failed to update prompt", { status: 500 });
    }
}

// DELETE (delete)

export const DELETE = async (request, { params }) => {
    try {

        await connectToDB();

        const { id } = await params
        await Prompt.findByIdAndDelete(id);


        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        console.error("Error deleting prompt:", error);
        return new Response("Failed to delete prompt", { status: 500 });
    }
}

