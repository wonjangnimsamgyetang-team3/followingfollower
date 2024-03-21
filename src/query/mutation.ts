import { UserData } from "@/app/types/type";
import { QueryClient, useMutation } from "@tanstack/react-query";
export const queryClient = new QueryClient();

export const useInsert = <TData>(
  fc: (variable: any) => Promise<TData>,
  queryKey: string
) => {
  // const mutation = useMutation({
  const mutation = useMutation<TData, unknown, UserData, unknown>({
    mutationFn: fc,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [queryKey] }),
    onError: () => {
      console.error("오류가 발생했습니다.");
    },
  });
  return { mutation };
};
