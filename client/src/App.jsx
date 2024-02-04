import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import IndexPage from "./components/IndexPage";
import Login from "./components/Login";
import RegisterPage from "./components/RegisterPage";
import { UserContextProvider } from "./UserContext";
import CreatePost from "./components/CreatePost";
import PostPage from "./components/PostPage";
import EditPage from "./components/EditPage";

function App() {
  return (
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/register"} element={<RegisterPage />} />
            <Route path={"/create"} element={<CreatePost />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/edit/:id" element={<EditPage />} />
          </Route>
        </Routes>
      </UserContextProvider>
  );
}

export default App;
