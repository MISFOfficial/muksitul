import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/hooks/useAxios";

export interface DesignImage {
  url: string;
  public_id: string;
}

export interface Design {
  _id: string;
  title: string;
  image: DesignImage;
  images: DesignImage[];
  tags: string[];
  year: string;
  badge?: { text: string; color: string } | null;
  description: string;
  tools: string[];
  behanceUrl?: string | null;
  dribbbleUrl?: string | null;
  figmaUrl?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export const useGetAllDesigns = () => {
  const {
    data: allDesigns,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["designs"],
    queryFn: async () => {
      const res = await api.get("/designs/all");
      return res.data.data;
    },
  });

  return { allDesigns, isLoading, isError, refetch };
};

export const useGetDesignById = (id: string) => {
  const {
    data: design,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["designs", id],
    queryFn: async () => {
      const res = await api.get(`/designs/one/${id}`);
      return res.data.data;
    },
    enabled: !!id,
  });

  return { design, isLoading, isError, refetch };
};

export const useCreateDesign = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: FormData) => {
      const res = await api.post("/designs/create", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["designs"] });
    },
  });
};

export const useUpdateDesign = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FormData }) => {
      const res = await api.patch(`/designs/update/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["designs"] });
      queryClient.invalidateQueries({ queryKey: ["designs", variables.id] });
    },
  });
};

export const useDeleteDesign = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/designs/delete/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["designs"] });
    },
  });
};
