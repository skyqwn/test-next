import { Post } from "@/api/shoot/type";
import StatusBadge from "./StatusBadge";
import UserProfile from "./UserProfile";

type PostCardProps = Omit<Post, "id">;

const PostCard = ({ userNm, createdAt, status, title, content }: PostCardProps) => {
  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "12px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {/* 헤더 */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <UserProfile userNm={userNm} createdAt={createdAt} />
        <StatusBadge status={status} />
      </div>

      {/* 제목 */}
      <h3 style={{ margin: 0, fontSize: "18px" }}>{title}</h3>

      {/* 내용 */}
      <p style={{ margin: 0, color: "#555", lineHeight: "1.6" }}>{content}</p>
    </div>
  );
};

export default PostCard;
