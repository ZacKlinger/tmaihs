import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SITE_ROUTES = [
  { path: "/classroom-resources", keywords: ["classroom", "resources", "tools", "lesson", "activity", "activities", "teaching", "materials"], description: "Classroom resources and teaching materials" },
  { path: "/learning-studio", keywords: ["course", "courses", "micro-course", "certified", "certificate", "learn", "training", "module"], description: "Micro-courses and certification" },
  { path: "/prompt-engineering", keywords: ["prompt", "prompting", "engineering", "craft", "write", "better prompts"], description: "Prompt engineering guide" },
  { path: "/what-is-ai", keywords: ["what is ai", "artificial intelligence", "basics", "introduction", "beginner", "explain ai"], description: "Introduction to AI" },
  { path: "/why-ai-matters", keywords: ["why ai", "importance", "matters", "education", "future", "impact"], description: "Why AI matters in education" },
  { path: "/ethics/data-privacy", keywords: ["privacy", "data", "student data", "ferpa", "security", "protect"], description: "Data privacy and student protection" },
  { path: "/ethics/plagiarism", keywords: ["plagiarism", "academic integrity", "cheating", "honesty", "citation"], description: "Academic integrity and AI" },
  { path: "/ethics/environmental", keywords: ["environment", "environmental", "carbon", "energy", "sustainability", "climate"], description: "Environmental considerations of AI" },
  { path: "/ethics/social-implications", keywords: ["social", "bias", "equity", "fairness", "society", "implications"], description: "Social implications of AI" },
  { path: "/community", keywords: ["community", "discuss", "forum", "share", "teachers", "connect"], description: "Community discussions" },
];

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();
    
    if (!query || typeof query !== "string") {
      return new Response(
        JSON.stringify({ type: "error", message: "Query is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      // Fallback to keyword matching if no API key
      const lowerQuery = query.toLowerCase();
      const matchedRoute = SITE_ROUTES.find(route => 
        route.keywords.some(kw => lowerQuery.includes(kw))
      );

      if (matchedRoute) {
        return new Response(
          JSON.stringify({ type: "route", destination: matchedRoute.path }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ 
          type: "suggestions", 
          suggestions: [
            { title: "Explore Classroom Resources", path: "/classroom-resources" },
            { title: "Start Learning", path: "/learning-studio" }
          ]
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Use AI to interpret the query
    const systemPrompt = `You are a helpful assistant for an AI education resource library for teachers. 
Your job is to understand what the teacher is looking for and direct them to the right place.

Available sections:
${SITE_ROUTES.map(r => `- ${r.path}: ${r.description}`).join("\n")}

Based on the user's query, respond with ONE of these JSON formats:

1. If you can identify a specific page they need:
{"type": "route", "destination": "/the-path"}

2. If you have multiple relevant suggestions:
{"type": "suggestions", "suggestions": [{"title": "Page Title", "path": "/path"}, ...]}

3. If you can provide a brief helpful answer (max 100 chars):
{"type": "answer", "answer": "Brief helpful response"}

Respond ONLY with valid JSON, no other text.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: query }
        ],
      }),
    });

    if (!response.ok) {
      console.error("AI gateway error:", response.status);
      // Fallback to keyword matching
      const lowerQuery = query.toLowerCase();
      const matchedRoute = SITE_ROUTES.find(route => 
        route.keywords.some(kw => lowerQuery.includes(kw))
      );

      return new Response(
        JSON.stringify(matchedRoute 
          ? { type: "route", destination: matchedRoute.path }
          : { type: "suggestions", suggestions: [{ title: "Classroom Resources", path: "/classroom-resources" }] }
        ),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const aiData = await response.json();
    const content = aiData.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in AI response");
    }

    // Parse the AI response
    try {
      const parsed = JSON.parse(content.trim());
      return new Response(
        JSON.stringify(parsed),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } catch {
      // If parsing fails, return a fallback
      return new Response(
        JSON.stringify({ 
          type: "suggestions", 
          suggestions: [{ title: "Explore Classroom Resources", path: "/classroom-resources" }] 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

  } catch (error) {
    console.error("Search assistant error:", error);
    return new Response(
      JSON.stringify({ type: "error", message: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
