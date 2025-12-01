import { Post } from "@/api/shoot/type";

interface StatusBadgeProps {
  status: Post["status"];
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const styles = {
    완료: { backgroundColor: "#E8F5E9", color: "#2E7D32" },
    진행중: { backgroundColor: "#E3F2FD", color: "#1565C0" },
    대기: { backgroundColor: "#FFF8E1", color: "#F57C00" },
  };

  return (
    <span
      style={{
        padding: "6px 12px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "500",
        ...styles[status],
      }}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
