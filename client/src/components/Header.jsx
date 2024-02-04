import { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import Logout from "./Logout";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  //  const userName = "Rajeeb";
  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    const response = fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    if(response.ok)
    {
      setRedirect(true);
    }
    setUserInfo(null);
  }
  if(redirect)
  {
    <Navigate to="/" />
  }
  const userName = userInfo?.username;
  return (
    <header>
      <Link to="/" className="logo">
        LET'S BLOG{" "}
      </Link>
      <nav>
        {userName && (
          <>
            <Link className="create-logo" to="/create" >Create to new post</Link>
            <Link className="about-us-logo" to="/about">About us</Link>
            <Logout onClick={logout} />
          </>
        )}
        {!userName && (
          <>
            <Link className="login-logo" to="/login">
              Login
            </Link>
            <Link className="register-logo" to="/register">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
