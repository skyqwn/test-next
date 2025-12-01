interface UserProfileProps {
  userNm: string;
  createdAt: string;
}

const UserProfile = ({ userNm, createdAt }: UserProfileProps) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <div
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          backgroundColor: "#e0e0e0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "14px",
          fontWeight: "bold",
        }}
      >
        {userNm[0]}
      </div>
      <div>
        <div style={{ fontWeight: "600" }}>{userNm}</div>
        <div style={{ fontSize: "12px", color: "#888" }}>{createdAt}</div>
      </div>
    </div>
  );
};

export default UserProfile;
