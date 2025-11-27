"use client";

import React, { useState } from "react";
import { useLoginMutation } from "../query/authQeury";

const LoginForm = () => {
  const [usrEml, setId] = useState<string>("");
  const [pw, setPassword] = useState<string>("");

  const loginMutation = useLoginMutation();

  const handleSubmit = () => {
    loginMutation.mutate({ usrEml, pw });
  };

  return (
    <div>
      <input
        placeholder="Id"
        value={usrEml}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={pw}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>확인</button>
    </div>
  );
};

export default LoginForm;
