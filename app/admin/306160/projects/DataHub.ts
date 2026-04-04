import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/hooks/useAxios";

export const useGetAllProjects = () => {
  const {
    data: allProjects,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await api.get("/projects/all");
      return res.data.data;
    },
  });

  return { allProjects, isLoading, isError, refetch };
};

export const useGetProjectsById = (id: string) => {
  const {
    data: allProjects,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["projects", id],
    queryFn: async () => {
      const res = await api.get(`/projects/one/${id}`);
      return res.data.data;
    },
  });

  return { allProjects, isLoading, isError, refetch };
};

// create projects

export const useCreateProjects = () => {
  return useMutation({
    mutationFn: async (data: FormData) => {
      const res = await api.post("/projects/create", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
  });
};
