import { GET } from "@/api/httpMethod";
import { API_PATH } from "@/api/path";

export const shootAPi = {
  getPosts: async () => {
    // 50% 확률로 에러 발생
    if (Math.random() < 0.5) {
      throw new Error('랜덤 에러 발생! (50% 확률)');
    }
    return await GET(API_PATH.shoot.posts());
  },

  getPostById: async (id: number) => {
    return await GET(API_PATH.shoot.postDetail(id));
  },

  getUser: async () => {
    return await GET(API_PATH.user.me());
  },

  getAlbums: async () => {
    return await GET('/albums');
  },

  getTodos: async () => {
    return await GET('/todos?_limit=10');
  },

  // 테스트용 mutation (50% 확률 에러)
  testErrorMutation: async () => {
    if (Math.random() < 0.5) {
      throw new Error('Mutation 에러 테스트!');
    }
    return '성공!';
  },
}
