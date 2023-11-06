import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OAI_API_KEY,
});

export default async function handler(request, response) {
  const { content } = request.query;
  console.log("content: ", content);
  const newPrompt = content.replace(/-/g, " ");
  console.log("newPrompt", newPrompt);
  const aiImage = await generateImage(newPrompt);
  console.log("Image", aiImage);
  response.status(200).json(aiImage);
}

async function generateImage(newImagePrompt) {
  try {
    const newImage = await openai.images.generate({
      prompt: "painting of " + newImagePrompt + " on colored background",
      n: 1,
      size: "512x512",
    });
    return newImage;
  } catch (error) {
    console.log(error);
  }
}
