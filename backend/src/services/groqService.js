const requireEnv = () => {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not defined in backend environment variables.");
  }
  return apiKey;
};

/**
 * Classifies an image using Groq's Llama 3.2 Vision Model.
 * @param {string} base64Image - The Base64 image data URL (e.g. data:image/jpeg;base64,...)
 * @returns {Promise<string>} The single-word detected product noun
 */
const analyzeImage = async (base64Image) => {
  const apiKey = requireEnv();

  const bodyPayload = {
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Identify the primary consumer product visible in this image. Respond with ONLY a single, simple noun in lowercase (e.g., 'shoe', 'shirt', 'laptop', 'coffee', 'watch', 'camera', 'bag', 'salt', 'oil', 'honey', 'fan', 'ac', 'tv'). Do not write any other words, punctuation, explanations, or formatting. If there are multiple products, pick the most prominent one."
          },
          {
            type: "image_url",
            image_url: {
              url: base64Image
            }
          }
        ]
      }
    ],
    model: "meta-llama/llama-4-scout-17b-16e-instruct",
    temperature: 0.0,
    max_tokens: 10
  };

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(bodyPayload)
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Groq API error: ${response.status} - ${errText}`);
  }

  const result = await response.json();
  const text = result.choices?.[0]?.message?.content || "";
  
  // Sanitize the response by removing whitespace and any trailing punctuation
  const cleanedWord = text.trim().toLowerCase().replace(/[^\w\s-]/g, "");
  console.log(`[Groq Vision] Detected keyword: "${cleanedWord}"`);
  return cleanedWord;
};

module.exports = {
  analyzeImage
};
