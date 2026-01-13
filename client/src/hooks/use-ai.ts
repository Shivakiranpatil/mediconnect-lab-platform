import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useAiQuestions() {
  return useQuery({
    queryKey: [api.ai.questions.path],
    queryFn: async () => {
      const res = await fetch(api.ai.questions.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch AI questions");
      return api.ai.questions.responses[200].parse(await res.json());
    },
  });
}

export function useAiRecommend() {
  return useMutation({
    mutationFn: async (answers: Record<string, string>) => {
      const res = await fetch(api.ai.recommend.path, {
        method: api.ai.recommend.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
        credentials: "include",
      });
      
      if (!res.ok) throw new Error("Failed to get recommendations");
      return api.ai.recommend.responses[200].parse(await res.json());
    },
  });
}
