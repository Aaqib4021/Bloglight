import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export interface Blog {
  id: number;
  title: string;
  content: string;
  imageLink:string;
  author: {
    name: string,
  };
}
export const useBlog = ( {id} : {id:string} )=>{
    const [blog,setBlog] = useState<Blog>();
    useEffect(()=>{
        axios.get(`${BACKEND_URL}api/v1/blog/${id}`,{headers:{Authorization:localStorage.getItem("token")}})
        .then(response=>{
            setBlog(response.data.blog)
        })
    },[]);
    return blog
}
export const useBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  useEffect(()=>{
    axios.get(`${BACKEND_URL}api/v1/blog/bulk`,{headers:{Authorization:localStorage.getItem("token")}})
    .then(response=>{
        setBlogs(response.data.blogs)
    })
  },[])
  return {
    blogs
  }
};


export const useUserBlogs = () => {
    const [userblogs ,setUserBlogs] = useState<Blog[]>([])

    useEffect(()=>{
        axios.get(`${BACKEND_URL}api/v1/blog/authorblogs`,{
            headers:{
                Authorization:localStorage.getItem("token")
        }}).then(response =>{
            setUserBlogs(response.data.blogs)
        })
    },[])
    return userblogs;
}
