import { useQuery } from "@tanstack/react-query";
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
      const res = await api.get("/experiences/all");
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
      const res = await api.get(`/experiences/${id}`);
      return res.data.data;
    },
  });

  return { allProjects, isLoading, isError, refetch };
};
