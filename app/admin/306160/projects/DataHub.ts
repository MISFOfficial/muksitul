import { useMutation, useQuery, useInfiniteQuery } from "@tanstack/react-query";
import api from "@/hooks/useAxios";

export const useGetAllProjects = () => {
  const {
    data: allProjects,
    isLoading,
    isError,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["projects"],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      const res = await api.get("/projects/all", {
        params: {
          limit: 10,
          skip: pageParam,
        },
      });
      return res.data.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 10 ? allPages.length * 10 : undefined;
    },
  });

  return {
    allProjects,
    isLoading,
    isError,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  };
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

// update projects
export const useUpdateProject = (id: string) => {
  return useMutation({
    mutationFn: async (data: FormData) => {
      const res = await api.patch(`/projects/update/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
  });
};

// delete projects
export const useDeleteProject = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/projects/delete/${id}`);
      return res.data;
    },
  });
};
