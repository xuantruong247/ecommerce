import React, { useState } from "react";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status === 201) {
        const { accessToken, refreshToken } = data.data;
        // Lưu token vào localStorage hoặc một nơi khác
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        // Giải mã token để kiểm tra role
        const decoded = JSON.parse(atob(accessToken.split(".")[1])); // Decode JWT
        const userRole = decoded.role;

        // Chuyển hướng đến trang tương ứng
        // if (userRole === "user") {
        //   window.location.href = "/user"; // Trang người dùng
        // } else if (userRole === "admin") {
        //   window.location.href = "/admin"; // Trang quản trị
        // }
        window.location.href = "/";
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred during login");
    }
  };

  return (
    <>
      <div className="container-login-page">
        <main className="main-login-page">
          <section className="login-container">
            <div className="wrapper-login">
              <div className="wrapper-login-title">
                <h3 className="login-title">Sign In</h3>
               
              </div>
              <form onSubmit={handleLogin} className="container-login-field">
                <div className="wrapper-input-email">
                  <label className="email-text" htmlFor="email-field">
                    Email
                  </label>
                  <input
                    className="input-email-field"
                    type="text"
                    placeholder="abc@gmail.com"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="wrapper-input-pwd">
                  <label className="pwd-text" htmlFor="pwd-field">
                    Password
                  </label>
                  <div className="wrapper-input-field">
                    <input
                      className="input-pwd-field"
                      type="password"
                      placeholder="**********"
                      name="pwd"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                {error && <div className="error-message">{error}</div>}
                <button className="btn-login-page">Login</button>
              </form>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default Login;
