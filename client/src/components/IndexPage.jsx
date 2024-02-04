import { useEffect, useState } from "react";
import Post from "./Post";

export default function IndexPage() {
  const [post, setPost] = useState([]);
  useEffect(() => {
    fetch('http://localhost:4000/post').then((response) => {
      response.json().then((posts) => {
        console.log(posts);
        //console.log(posts[0].author['username']);
        setPost(posts);
      });
    });
  }, []);
  return (
    <div>
      {post.length > 0 && post.map(post =>(
        <Post {...post} />
      ))}
    </div>
  );
}
