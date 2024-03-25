import { QueryClient, useMutation } from '@tanstack/react-query';
export const queryClient = new QueryClient();
import type { UserData } from '@/types/type';

export const useInsert = <TData>(
  fc: (variable: any) => Promise<TData>,
  queryKey: string
) => {
  const mutation = useMutation<TData, unknown, UserData, unknown>({
    mutationFn: fc,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [queryKey] }),
    onError: () => {
      console.error('오류가 발생했습니다.');
    },
  });
  return { mutation };
};
