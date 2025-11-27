import { POST } from "../httpMethod"
import { ILogin } from "@/app/login/query/type"

export const AuthApi = {
  login: async (data: ILogin) => {
    return await POST('auth/login', data);
  }
}