import axios from "axios";
import { useEffect } from "react";

export default function Success() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  useEffect(() => {
    axios
      .get("/api/user", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        logout();
      });
  });

  return (
    <div className="container mt-4">
      <h1 className="text-center">Success</h1>
      <div className="d-flex justify-content-center">
        <button className="btn btn-dark" onClick={() => logout()}>
          Logout
        </button>
      </div>
    </div>
  );
}
