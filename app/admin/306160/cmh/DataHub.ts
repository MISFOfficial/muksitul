import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/hooks/useAxios";

export const useGetAllCmsProjects = () => {
  const {
    data: allCmsProjects,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["cms-projects"],
    queryFn: async () => {
      const res = await api.get("/cms-projects/all");
      return res.data.data;
    },
  });

  return { allCmsProjects, isLoading, isError, refetch };
};

export const useGetCmsProjectById = (id: string) => {
  const {
    data: cmsProject,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["cms-projects", id],
    queryFn: async () => {
      const res = await api.get(`/cms-projects/one/${id}`);
      return res.data.data;
    },
    enabled: !!id,
  });

  return { cmsProject, isLoading, isError, refetch };
};

export const useCreateCmsProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: FormData) => {
      const res = await api.post("/cms-projects/create", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cms-projects"] });
    },
  });
};

export const useUpdateCmsProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FormData }) => {
      const res = await api.patch(`/cms-projects/update/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["cms-projects"] });
      queryClient.invalidateQueries({
        queryKey: ["cms-projects", variables.id],
      });
    },
  });
};

export const useDeleteCmsProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/cms-projects/delete/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cms-projects"] });
    },
  });
};
