import {
  useMutation,
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import api from "@/hooks/useAxios";

export interface CmsProjectImage {
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

export interface CmsProject {
  _id: string;
  title: string;
  images: CmsProjectImage[];
  tags: string[];
  year: string;
  platform: "WordPress" | "Shopify" | "Webflow" | "Wix" | "Squarespace";
  badge?: { text: string; color: string } | null;
  description: string;
  liveUrl?: string | null;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export const useGetAllCmsProjects = (limit: number = 10) => {
  const {
    data: allCmsProjects,
    isLoading,
    isError,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["cms-projects", limit],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      const res = await api.get("/cms/all", {
        params: {
          limit,
          skip: pageParam,
        },
      });
      return res.data.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === limit ? allPages.length * limit : undefined;
    },
  });

  return {
    allCmsProjects,
    isLoading,
    isError,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  };
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
      const res = await api.get(`/cms/one/${id}`);
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
      const res = await api.post("/cms/create", data, {
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
      const res = await api.patch(`/cms/update/${id}`, data, {
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
      const res = await api.delete(`/cms/delete/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cms-projects"] });
    },
  });
};


export const useGetCmsCount = () => {
  const { data: count, isLoading, isError, refetch } = useQuery({
    queryKey: ["cms-count"],
    queryFn: async () => {
      const res = await api.get("/cms/count");
      return res.data.data.count;
    },
  });

  return { count, isLoading, isError, refetch };
}


