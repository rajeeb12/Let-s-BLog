import { useContext } from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../Usercontext";
import image1 from "../assets/6310507.jpg";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  async function handleLogin(ev) {
    ev.preventDefault();

    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
      setRedirect(true);
    } else {
      alert("wrong credentials");
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }
  return (
    <div className="login">
      <div className="login-box">
        <img src={image1} />
        <form onSubmit={handleLogin}>
          <h1>Login to Your Account</h1>
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
