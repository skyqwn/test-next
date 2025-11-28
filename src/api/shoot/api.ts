import { GET } from "@/api/httpMethod";

export const shootAPi = {
  getPosts: async () => {
    // 50% 확률로 에러 발생
    // if (Math.random() < 0.5) {
    //   throw new Error('랜덤 에러 발생! (50% 확률)');
    // }
    return await GET('auth/token');
  },

  getUser: async () => {
    return await GET('user/me');
  },

  getAlbums: async () => {
    return await GET('albums');
  },

  getTodos: async () => {
    return await GET('todos?_limit=10');
  }
}
