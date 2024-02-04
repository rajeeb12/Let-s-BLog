import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";
import Editor from "./Editor";


export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files,setFile] = useState('');
  const [redirect, setRedirect] = useState(false);
  async function handleNewPost(ev){
    ev.preventDefault();
    const data = new FormData(); // send as blob
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file',files[0]);
    const response = await fetch('http://localhost:4000/newPost',{
        method:'POST',
        body: data,
        credentials: 'include',
    })
    console.log(response.json());
    if(response.ok){
      setRedirect(true);
    }
  }

  if(redirect){
    return <Navigate to='/'/> 
  }

  return (
    <form onSubmit={handleNewPost}>
      <input
        type="title"
        placeholder={"Title"}
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input
        type="summary"
        placeholder={"Summary"}
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      />
      <input type="file" onChange={ev => setFile(ev.target.files)}/>
      <Editor value={content} onChange={setContent} />
      <button type="submit" style={{ marginTop: "5px" }}>Create Post</button>
    </form>
  );
}
