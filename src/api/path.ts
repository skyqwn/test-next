export const API_PATH = {
  shoot: {
    posts: () => '/auth/token',
    postDetail: (id: number) => `/posts/${id}`,
  },
  user: {
    me: () => '/user/me',
  },
};
