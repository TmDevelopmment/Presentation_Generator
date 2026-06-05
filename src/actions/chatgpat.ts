"use server";

import { client } from "@/lib/prisma";
import { ContentItem, ContentType, Slide } from "@/lib/types";
import { currentUser } from "@clerk/nextjs/server";
import OpenAI from "openai";
import { v4 as uuidv4 } from "uuid";
import { GoogleGenAI } from '@google/genai';

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",

  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000",
    "X-Title": "AI Presentation App",
  },
});

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateCreativeAiPrompt = async (prompt: string) => {
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

const existingLayouts = [
  {
    id: uuidv4(),
    slideName: "Blank card",
    type: "blank-card",
    className: "p-8 mx-auto flex justify-center items-center min-h-[200px]",
    content: {
      id: uuidv4(),
      type: "column" as ContentType,
      name: "Column",
      content: [
        {
          id: uuidv4(),
          type: "title" as ContentType,
          name: "Title",
          content: "",
          placeholder: "Untitled Card",
        },
      ],
    },
  },

  {
    id: uuidv4(),
    slideName: "Accent left",
    type: "accentLeft",
    className: "min-h-[300px]",
    content: {
      id: uuidv4(),
      type: "column" as ContentType,
      name: "Column",
      restrictDropTo: true,
      content: [
        {
          id: uuidv4(),
          type: "resizable-column" as ContentType,
          name: "Resizable column",
          restrictToDrop: true,
          content: [
            {
              id: uuidv4(),
              type: "image" as ContentType,
              name: "Image",
              content:
                "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              alt: "Title",
            },
            {
              id: uuidv4(),
              type: "column" as ContentType,
              name: "Column",
              content: [
                {
                  id: uuidv4(),
                  type: "heading1" as ContentType,
                  name: "Heading1",
                  content: "",
                  placeholder: "Heading1",
                },
                {
                  id: uuidv4(),
                  type: "paragraph" as ContentType,
                  name: "Paragraph",
                  content: "",
                  placeholder: "start typing here",
                },
              ],
              className: "w-full h-full p-8 flex justify-center items-center",
              placeholder: "Heading1",
            },
          ],
        },
      ],
    },
  },

  {
    id: uuidv4(),
    slideName: "Accent Right",
    type: "accentRight",
    className: "min-h-[300px]",
    content: {
      id: uuidv4(),
      type: "column" as ContentType,
      name: "Column",
      content: [
        {
          id: uuidv4(),
          type: "resizable-column" as ContentType,
          name: "Resizable column",
          restrictToDrop: true,
          content: [
            {
              id: uuidv4(),
              type: "column" as ContentType,
              name: "Column",
              content: [
                {
                  id: uuidv4(),
                  type: "heading1" as ContentType,
                  name: "Heading1",
                  content: "",
                  placeholder: "Heading1",
                },
                {
                  id: uuidv4(),
                  type: "paragraph" as ContentType,
                  name: "Paragraph",
                  content: "",
                  placeholder: "start typing here",
                },
              ],
              className: "w-full h-full p-8 flex justify-center items-center",
              placeholder: "Heading1",
            },
            {
              id: uuidv4(),
              type: "image" as ContentType,
              name: "Image",
              restrictToDrop: true,
              content:
                "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              alt: "Title",
            },
          ],
        },
      ],
    },
  },

  {
    id: uuidv4(),
    slideName: "Image and text",
    type: "imageAndText",
    className: "min-h-[200px] p-8 mx-auto flex justify-center items-center",
    content: {
      id: uuidv4(),
      type: "column" as ContentType,
      name: "Column",
      content: [
        {
          id: uuidv4(),
          type: "resizable-column" as ContentType,
          name: "Image and text",
          className: "border",
          content: [
            {
              id: uuidv4(),
              type: "column" as ContentType,
              name: "Column",
              content: [
                {
                  id: uuidv4(),
                  type: "image" as ContentType,
                  name: "Image",
                  className: "p-3",
                  content:
                    "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  alt: "Title",
                },
              ],
            },
            {
              id: uuidv4(),
              type: "column" as ContentType,
              name: "Column",
              content: [
                {
                  id: uuidv4(),
                  type: "heading1" as ContentType,
                  name: "Heading1",
                  content: "",
                  placeholder: "Heading1",
                },
                {
                  id: uuidv4(),
                  type: "paragraph" as ContentType,
                  name: "Paragraph",
                  content: "",
                  placeholder: "start typing here",
                },
              ],
              className: "w-full h-full p-8 flex justify-center items-center",
              placeholder: "Heading1",
            },
          ],
        },
      ],
    },
  },

  {
    id: uuidv4(),
    slideName: "Text and image",
    type: "textAndImage",
    className: "min-h-[200px] p-8 mx-auto flex justify-center items-center",
    content: {
      id: uuidv4(),
      type: "column" as ContentType,
      name: "Column",
      content: [
        {
          id: uuidv4(),
          type: "resizable-column" as ContentType,
          name: "Text and image",
          className: "border",
          content: [
            {
              id: uuidv4(),
              type: "column" as ContentType,
              name: "",
              content: [
                {
                  id: uuidv4(),
                  type: "heading1" as ContentType,
                  name: "Heading1",
                  content: "",
                  placeholder: "Heading1",
                },
                {
                  id: uuidv4(),
                  type: "paragraph" as ContentType,
                  name: "Paragraph",
                  content: "",
                  placeholder: "start typing here",
                },
              ],
              className: "w-full h-full p-8 flex justify-center items-center",
              placeholder: "Heading1",
            },
            {
              id: uuidv4(),
              type: "column" as ContentType,
              name: "Column",
              content: [
                {
                  id: uuidv4(),
                  type: "image" as ContentType,
                  name: "Image",
                  className: "p-3",
                  content:
                    "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  alt: "Title",
                },
              ],
            },
          ],
        },
      ],
    },
  },

  {
    id: uuidv4(),
    slideName: "Two columns",
    type: "twoColumns",
    className: "p-4 mx-auto flex justify-center items-center",
    content: {
      id: uuidv4(),
      type: "column" as ContentType,
      name: "Column",
      content: [
        {
          id: uuidv4(),
          type: "title" as ContentType,
          name: "Title",
          content: "",
          placeholder: "Untitled Card",
        },
        {
          id: uuidv4(),
          type: "resizable-column" as ContentType,
          name: "Text and image",
          className: "border",
          content: [
            {
              id: uuidv4(),
              type: "paragraph" as ContentType,
              name: "Paragraph",
              content: "",
              placeholder: "Start typing...",
            },
            {
              id: uuidv4(),
              type: "paragraph" as ContentType,
              name: "Paragraph",
              content: "",
              placeholder: "Start typing...",
            },
          ],
        },
      ],
    },
  },

  {
    id: uuidv4(),
    slideName: "Two columns with headings",
    type: "twoColumnsWithHeadings",
    className: "p-4 mx-auto flex justify-center items-center",
    content: {
      id: uuidv4(),
      type: "column" as ContentType,
      name: "Column",
      content: [
        {
          id: uuidv4(),
          type: "title" as ContentType,
          name: "Title",
          content: "",
          placeholder: "Untitled Card",
        },
        {
          id: uuidv4(),
          type: "resizable-column" as ContentType,
          name: "Text and image",
          className: "border",
          content: [
            {
              id: uuidv4(),
              type: "column" as ContentType,
              name: "Column",
              content: [
                {
                  id: uuidv4(),
                  type: "heading3" as ContentType,
                  name: "Heading3",
                  content: "",
                  placeholder: "Heading 3",
                },
                {
                  id: uuidv4(),
                  type: "paragraph" as ContentType,
                  name: "Paragraph",
                  content: "",
                  placeholder: "Start typing...",
                },
              ],
            },
            {
              id: uuidv4(),
              type: "column" as ContentType,
              name: "Column",
              content: [
                {
                  id: uuidv4(),
                  type: "heading3" as ContentType,
                  name: "Heading3",
                  content: "",
                  placeholder: "Heading 3",
                },
                {
                  id: uuidv4(),
                  type: "paragraph" as ContentType,
                  name: "Paragraph",
                  content: "",
                  placeholder: "Start typing...",
                },
              ],
            },
          ],
        },
      ],
    },
  },

  {
    id: uuidv4(),
    slideName: "Three column",
    type: "threeColumns",
    className: "p-4 mx-auto flex justify-center items-center",
    content: {
      id: uuidv4(),
      type: "column" as ContentType,
      name: "Column",
      content: [
        {
          id: uuidv4(),
          type: "title" as ContentType,
          name: "Title",
          content: "",
          placeholder: "Untitled Card",
        },
        {
          id: uuidv4(),
          type: "resizable-column" as ContentType,
          name: "Text and image",
          className: "border",
          content: [
            {
              id: uuidv4(),
              type: "paragraph" as ContentType,
              name: "",
              content: "",
              placeholder: "Start typing...",
            },
            {
              id: uuidv4(),
              type: "paragraph" as ContentType,
              name: "",
              content: "",
              placeholder: "Start typing...",
            },
            {
              id: uuidv4(),
              type: "paragraph" as ContentType,
              name: "",
              content: "",
              placeholder: "Start typing...",
            },
          ],
        },
      ],
    },
  },
];

const generateImageUrl = async (prompt: string): Promise<string> => {
  try {

    const improvedPrompt = `
    Create a highly realistic, professional image based on the
    following description. The image should took as if captured in
    real life, with attention to detail, lighting, and texture.
    
    Description: ${prompt}

    Important Notes:
    -The image must be in a photorealistic style and visually compelling.
    -Ensure all text, signs, or visible writing in the image are in English.
    -Pay special attention to lighting, shadows, and textures to make the image as lifelike as possible.
    -Avoid elements that appear abstract, cartoonish, or overly artistic. The image should be suitable for professional presentations.
    -Focus on accurately depicting the concept described, including specific objects, environment, mood, and context. Maintain relevance to the description provided.
    
    Example Use Cases: Business presentations, educational slides, professional designs.
    `
    const dalleResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: improvedPrompt,
      n: 1,
      size: "1024x1024",
    });

    console.log("Image generation response:", dalleResponse.data[0]?.url);

    return dalleResponse.data[0]?.url || "https://via.placeholder.com/1024";

  } catch (error) {
    console.error("Error generating image:", error);
    return "https://via.placeholder.com/1024";
  }
}


const findImageComponents = (layout: ContentItem) : ContentItem[] => {
  const images = []
  if (layout.type === "image") {
    images.push(layout);
  }

  if (Array.isArray(layout.content)) {
    layout.content.forEach((child) => {
      images.push(...findImageComponents(child as ContentItem));
    });
  } else if (layout.content && typeof layout.content === "object") {
    images.push(...findImageComponents(layout.content));
  }

  return images
}

const replaceImagePlaceholders = async (layout: Slide) => {
  const imageComponents = findImageComponents(layout.content);
  console.log("Found image components:", imageComponents);

  for (const component of imageComponents) {
    console.log("Replacing content for image component:", component.alt);
    component.content = await generateImageUrl(component.alt || "Presentation image");
  }
};

export const generateLayoutJson = async (outlineArray: string[]) => {
  const prompt = `
  You are a highly creative AI that generates JSON-based layouts for presentations. I will provide you with an array of outlines, and for each outline, you must generate a unique and creative layout. Use the existing layouts as examples for structure and design, and generate unique designs based on the provided outlines.
  
  ### Guidelines:
  1. Write layouts based on the specific outline provided.
  2. Use diverse and engaging designs, ensuring each layout is unique.
  3. Adhere to the structure of the existing layouts, but feel free to innovate and create new design elements.
  4. Fill placeholder data into content fields where required.
  5. Generate unique image placeholders for the 'content' property of image components and also alt text according to the outline.
  6. Ensure the proper formatting and schema alignment for the output JSON.
  
  ### Example Layouts:
  ${JSON.stringify(existingLayouts, null, 2)}
  
  ### Outline Array:
  ${JSON.stringify(outlineArray)}
  
  For each entry in the outline array, generate:
  - A unique JSON layout with creative designs.
  - Properly filled content, including placeholders for image components.
  - Clear and well-structured JSON data.
  For Images
  - The alt text should describe the image clearly and concisely.
  - Focus on the main subject(s) of the image and any relevant details such as colors, emotions, or actions depicted.
  - Ensure the alt text is relevant to the content of the presentation and enhances the understanding of the image's purpose within the layout.
  - Avoid using terms like "image of" or "picture of" and instead focus directly on the content and meaning.
  
  Output the layout in JSON format. Ensure there are no duplicate layouts across the array.
  `;

  try {
    // Using gemini-2.5-flash as the standard fast/capable model for text/JSON tasks
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        // System instructions are passed inside the config object
        systemInstruction: "You generate JSON layouts for presentation",
        // Enforce JSON output so Gemini returns a pure, parseable JSON string
        responseMimeType: "application/json",
      }
    });

    const responseContent = response.text;

    if (!responseContent) {
      return {
        status: 400,
        error: "No response from Gemini",
      };
    }

    let jsonResponse;
    try {
      // Because responseMimeType is set to application/json, 
      // we can parse it safely without needing regex string cleanup.
      jsonResponse = JSON.parse(responseContent.trim());
      await Promise.all(jsonResponse.map(replaceImagePlaceholders));
      
    } catch (error) {
      return {
        status: 500,
        error: "Invalid JSON response from Gemini",
      };
    }

    return {
      status: 200,
      data: jsonResponse,
    };
  } catch (error) {
    console.error("Error generating layout JSON:", error);
    return {
      status: 500,
      error: "Failed to generate layout JSON",
    };
  }
};


export const generateLayout = async (projectId: string, theme: string) => {
  try {
    if (!projectId) {
      return {
        status: 400,
        data: { error: "Project ID is required" },
      };
    }

    const user = await currentUser();
    if (!user) {
      return {
        status: 403,
        data: { error: "User not authenticated" },
      };
    }

    const userExist = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
    });

    if (!userExist || !userExist?.subscription) {
      return {
        status: 403,
        error: !userExist
          ? "User not found"
          : "User does not have an active subscription"
      };
    }

    const project = await client.project.findUnique({
      where: {
        id: projectId,
        isDeleted: false,
      },
    });

    if (!project) {
      return {
        status: 404,
        data: { error: "Project not found" },
      };
    }

    if (!project.outlines || project.outlines.length === 0) {
      return {
        status: 400,
        data: { error: "Project does not have outlines" },
      };
    }

    const layouts = await generateLayoutJson(project.outlines);

    if (layouts.status !== 200) {
      return layouts;
    }

    await client.project.update({
      where: {
        id: projectId,
      },
      data: {
        slides: layouts.data,
        themeName: theme,
      },
    });

    return {
      status: 200,
      data: layouts.data,
    };
  } catch (error) {
    console.error("Error generating layout:", error);
    return {
      status: 500,
      data: { error: "Failed to generate layout" },
    };
  }
};
