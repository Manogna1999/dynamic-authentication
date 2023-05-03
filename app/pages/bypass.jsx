import axios from "axios";
import { useEffect, useState } from "react";

export default function Success() {
  const [token, setToken] = useState("");
  const [localToken, setLocalToken] = useState("");
  const login = (e) => {
    e.preventDefault();
    localStorage.setItem("token", token);
    window.location.href = "/success";
  };

  useEffect(() => {
    setLocalToken(localStorage.getItem("token"));
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center">Success</h1>
      <div className="d-flex justify-content-center">
        <div className="col-6">
          <p
            // wrap text
            className="text-break"
          >
            Token in local storage:{" "}
            <span className="text-success">{localToken}</span>
          </p>
          <form onSubmit={login}>
            <div className="form-group">
              <label htmlFor="token">Token</label>
              <input
                type="text"
                className="form-control"
                id="token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
