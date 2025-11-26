import { GET } from "@/api/httpMethod";

export const shootAPi = {
  getPosts: async () => {
    return await GET('/posts');
  },

  getUsers: async () => {
    return await GET('/users');
  },

  getAlbums: async () => {
    return await GET('/albums');
  },

  getTodos: async () => {
    return await GET('/todos?_limit=10');
  }
}
