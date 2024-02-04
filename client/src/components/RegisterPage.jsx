import { useState } from "react";
import image1 from "../assets/6310507.jpg";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(ev) {
    ev.preventDefault();
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 400) {
      alert("Registration failed");
    } else {
      alert("Registration successfull");
    }
  }

  return (
    <div className="login">
      <div className="login-box">
        <img src={image1} />
        <form onSubmit={handleRegister}>
          <h1>Register New Account</h1>
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button>Click me!</button>
        </form>
      </div>
    </div>
  );
}
