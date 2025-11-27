import { useMutation } from "@tanstack/react-query";
import { AuthApi } from "@/api/auth/api";
import { ILogin } from "./type";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (data: ILogin) => AuthApi.login(data),
    onSuccess: () => console.log('로그인 성공')
  });
}