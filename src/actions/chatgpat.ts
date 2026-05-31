"use server";

import OpenAI from "openai";

export const generateCreativeAiPrompt = async (prompt: string) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",

    defaultHeaders: {
      "HTTP-Referer": "http://localhost:3000",
      "X-Title": "AI Presentation App",
    },
  });

  const finalPrompt = `Create a coherent and relavant outline for the following prompt: ${prompt}. The outline should be consit of at least 6 points, with each point written as a single sentence.Ensure the outline is well-structured and directly related to the topic.
    Return the output in the following JSON format:
    
    {
        "outlines": [
            "Point 1",
            "Point 2",
            "Point 3",
            "Point 4",
            "Point 5",
            "Point 6"
        ]
    } 
    
    Ensure that the JSON is valid and properly formatted.Do not include any other text or explanations outside the JSON`;

  try {
    const completion = await openai.chat.completions.create({
      model: "openrouter/free",
      messages: [
        {
          role: "system",
          content:
            "You are a helpul AI that generates outlines for presentation",
        },
        {
          role: "user",
          content: finalPrompt,
        },
      ],
    });

    const responseContent = completion.choices[0].message?.content;

    // Try to parse the response as JSON
    if (responseContent) {
      try {
        const cleanedContent = responseContent
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();
        const jsonResponse = JSON.parse(cleanedContent);
        return {
          status: 200,
          data: jsonResponse,
        };
      } catch (error) {
        console.error("Failed to parse JSON:", error);
        return {
          status: 500,
          data: { error: "Invalid JSON response from OpenAI" },
        };
      }
    }
  } catch (error) {
    console.error("Error generating creative AI prompt:", error);
    return {
      status: 500,
      data: { error: "Failed to generate AI prompt" },
    };
  }
};
