"use server"

  // Generate a summary using AI
  export async function generateSummary(content: string): Promise<string> {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1:free",
        messages: [
          {
            role: "user",
            content: `Summarize the following note in 1–2 concise lines: ${content}`
          }
        ]
      })
    });
  
    const json = await res.json();
    console.log(json.choices?.[0]?.message);
    
    const summary = await json.choices?.[0]?.message?.content?.trim() || "No summary available."

    const cleanedSummary = summary.replace(/^\\boxed\{/, "").replace(/[\}\"']$/, "");

    return cleanedSummary;
  }