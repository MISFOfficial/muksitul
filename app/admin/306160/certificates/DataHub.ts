import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/hooks/useAxios";

export const useGetAllCertificates = () => {
  const {
    data: allCertificates,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["certificates"],
    queryFn: async () => {
      const res = await api.get("/certificates/all");
      return res.data.data;
    },
  });

  return { allCertificates, isLoading, isError, refetch };
};

export const useGetCertificateById = (id: string) => {
  const {
    data: certificate,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["certificates", id],
    queryFn: async () => {
      const res = await api.get(`/certificates/one/${id}`);
      return res.data.data;
    },
    enabled: !!id,
  });

  return { certificate, isLoading, isError, refetch };
};

export const useCreateCertificate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: FormData) => {
      const res = await api.post("/certificates/create", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certificates"] });
    },
  });
};

export const useDeleteCertificate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/certificates/delete/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certificates"] });
    },
  });
};
export const useUpdateCertificate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FormData }) => {
      const res = await api.patch(`/certificates/update/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["certificates"] });
      queryClient.invalidateQueries({
        queryKey: ["certificates", variables.id],
      });
    },
  });
};
