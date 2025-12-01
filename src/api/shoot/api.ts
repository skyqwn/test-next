import { GET, GET_EXTERNAL } from "@/api/httpMethod";
import { API_PATH } from "@/api/path";
import { ServerGridFetchParams, ServerGridFetchResult } from "@/components/common/Grid";

// JSONPlaceholder Post 타입
interface JsonPlaceholderPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

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

  // ============================================
  // JSONPlaceholder 서버사이드 페이지네이션 API
  // ============================================
  getPostsPaginated: async (
    params: ServerGridFetchParams
  ): Promise<ServerGridFetchResult<JsonPlaceholderPost>> => {
    const { page, pageSize, sorting, globalFilter } = params;

    // URL 쿼리 파라미터 생성
    const searchParams = new URLSearchParams();
    searchParams.set("_page", String(page));
    searchParams.set("_limit", String(pageSize));

    // 정렬 파라미터
    if (sorting && sorting.length > 0) {
      searchParams.set("_sort", sorting[0].id);
      searchParams.set("_order", sorting[0].desc ? "desc" : "asc");
    }

    // 필터 파라미터 (title 검색)
    if (globalFilter) {
      searchParams.set("title_like", globalFilter);
    }

    const url = `https://jsonplaceholder.typicode.com/posts?${searchParams.toString()}`;
    const { data, totalCount } = await GET_EXTERNAL<JsonPlaceholderPost[]>(url);

    return { data, totalCount };
  },
}
