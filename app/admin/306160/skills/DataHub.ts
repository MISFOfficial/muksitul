import {
  useMutation,
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import api from "@/hooks/useAxios";

export const useGetAllSkills = () => {
  const {
    data: allSkills,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const res = await api.get("/skills/all");
      return res.data.data;
    },
  });

  return {
    allSkills,
    isLoading,
    isError,
    refetch,
  };
};

export const useGetSkillsByCategory = (category: string) => {
  const {
    data: skillsByCategory,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["skills", "category", category],
    queryFn: async () => {
      const res = await api.get(`/skills/category/${category}`);
      return res.data.data;
    },
    enabled: !!category,
  });

  return { skillsByCategory, isLoading, isError, refetch };
};

export const useGetSkillById = (id: string) => {
  const {
    data: skill,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["skills", id],
    queryFn: async () => {
      const res = await api.get(`/skills/one/${id}`);
      return res.data.data;
    },
    enabled: !!id,
  });

  return { skill, isLoading, isError, refetch };
};

export const useCreateSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: FormData) => {
      const res = await api.post("/skills/create", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },
  });
};

export const useUpdateSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FormData }) => {
      const res = await api.patch(`/skills/update/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      queryClient.invalidateQueries({ queryKey: ["skills", variables.id] });
    },
  });
};

export const useDeleteSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/skills/delete/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },
  });
};

export const useSeedSkills = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const res = await api.post("/skills/seed");
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },
  });
};
