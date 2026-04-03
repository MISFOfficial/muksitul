import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/hooks/useAxios";

export const useGetAllExperience = () => {
  const {
    data: allExperience,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["experiences"],
    queryFn: async () => {
      const res = await api.get("/experiences/all");
      return res.data.data;
    },
  });

  return { allExperience, isLoading, isError, refetch };
};

export const useGetExperienceById = (id: string) => {
  const {
    data: experience,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["experiences", id],
    queryFn: async () => {
      const res = await api.get(`/experiences/one/${id}`);
      return res.data.data;
    },
    enabled: !!id,
  });

  return { experience, isLoading, isError, refetch };
};

export const useUpdateExperience = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await api.patch(`/experiences/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
      queryClient.invalidateQueries({ queryKey: ["experiences", id] });
    },
  });
};

export const useDeleteExperience = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/experiences/delete/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
    },
  });
};

// create experiance

export const useExperianceCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await api.post("/experiences/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
    },
  });
};
