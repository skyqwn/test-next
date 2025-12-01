export interface Post {
  id: number;
  userNm: string;
  title: string;
  content: string;
  createdAt: string;
  status: "대기" | "진행중" | "완료";
}