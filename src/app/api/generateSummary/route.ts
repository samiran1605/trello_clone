import { NextResponse } from "next/server";
import openai from "../../../../openai";

export async function POST(request: Request) {
  const { todos } = await request.json();
  console.log(todos);

  // communicate with openAI GPT-4
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0.8,
    n: 1,
    stream: false,
    messages: [
      {
        role: "system",
        content: `When responding, welcome the user always as Mr.Samiran and say welcome to the Loyal Honey App! Limit the response to 200 characters`,
      },
      { role: "user", content: "Who won the world series in 2020?" },
      {
        role: "user",
        content: `Hi there, provided a summary of the following todos. Count how many todos are in each category such as To do, in progress and done, then tell the user to have a productive day! Here's the data: ${JSON.stringify(
          todos
        )}`,
      },
    ],
  });

  console.log("DATA IS", response);
  console.log(response.choices[0].message.content);
  return NextResponse.json(response.choices[0].message);
}
