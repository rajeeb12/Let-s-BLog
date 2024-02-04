import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Navigate, useParams } from "react-router-dom";
import Editor from "./Editor";


export default function EditPage() {
  const {id}= useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFile] = useState("");
  const [redirect, setRedirect] = useState(false);
  
  useEffect(()=>{
    fetch(`http://localhost:4000/post/${id}`).then(response => {
        response.json().then(postInfo =>{
            console.log(postInfo);
            setTitle(postInfo.title);
            setSummary(postInfo.summary);
            setContent(postInfo.content);
        })
    })
  },[])
  
  async function updatePost(ev){
    ev.preventDefault();
    console.log(content); 
    const data = new FormData(); // send as blob
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id',id);
    if(files?.[0])
    {
        data.set('file', files?.[0]);
    }
    data.set('file',files?.[0]);
    const response = await fetch(`http://localhost:4000/post`,{
        method:'PUT',
        body: data,
        credentials: 'include',
    })
    if(response.ok)
    {
        setRedirect(true);
    }
    
  }

  if (redirect) {
    return <Navigate to={"/post/"+id}/>;
  }
  return (
    <form onSubmit={updatePost}>
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
      <input type="file" onChange={(ev) => setFile(ev.target.files)} />
      <Editor onChange={setContent} value={content}/>
      <button type="submit" style={{ marginTop: "5px" }}>
        Update Post
      </button>
    </form>
  );
}
