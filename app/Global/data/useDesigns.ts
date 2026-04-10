import {
  useMutation,
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import api from "@/hooks/useAxios";

export interface DesignImage {
  _id: string;
  url: string;
  key: string;
  filename: string;
  mimeType: string;
  size: number;
  uploadedAt: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Design {
  _id: string;
  title: string;
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
  __v?: number;
}

export const useGetAllDesigns = () => {
  const {
    data: allDesigns,
    isLoading,
    isError,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["designs"],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      const res = await api.get("/designs/all", {
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
    allDesigns,
    isLoading,
    isError,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  };
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
