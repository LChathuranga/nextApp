import Prompt from "@models/Prompt";
import { connectToDB } from "@utils/database"

// Read (GET)
export const GET = async (req, { params }) => {
    try {
        await connectToDB();
        const prompt = await Prompt.findById(params.id).populate('creator');
        if (!prompt) new Response("Prompt not found!", { status: 404 })
        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch all prompts!", { status: 500 });
    }
}

// Update(PATCH)
export const PATCH = async (req, { params }) => {
    const { prompt, tag } = await req.json();

    try {
        await connectToDB();
        const existingPrompt = await Prompt.findById(params.id)
        if (!existingPrompt) new Response("Prompt not Found!", { status: 404 })

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), { status: 200 });
    } catch (error) {
        return new Response("Prompt can not be updated!", { status: 500 })
    }
}

// Delete (DELETE)

export const DELETE = async (req, { params }) => {
    try {
        await connectToDB();
        await Prompt.findByIdAndRemove(params.id);

        return new Response("Successfully deleted Prompt", { status: 200 });
    } catch (error) {
        return new Response("Prompt can not be deleted!", { status: 500 });
    }
}