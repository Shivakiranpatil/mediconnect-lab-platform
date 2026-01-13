import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

export function useBundles() {
  return useQuery({
    queryKey: [api.bundles.list.path],
    queryFn: async () => {
      const res = await fetch(api.bundles.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch bundles");
      return api.bundles.list.responses[200].parse(await res.json());
    },
  });
}

export function useBundle(id: string) {
  return useQuery({
    queryKey: [api.bundles.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.bundles.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch bundle");
      return api.bundles.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}
