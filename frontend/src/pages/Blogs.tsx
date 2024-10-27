import Appbar from "../components/Appbar";
import { useBlogs } from "../hooks/useBlogs";
import BlogCard from "../components/BlogCard"
import { useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

type DateTypes = {
    year: "numeric" | "2-digit";
    month: "numeric" | "2-digit" | "short" | "long" | "narrow";
    day: "numeric" | "2-digit";
};


const Blogs = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        axios.get(`${BACKEND_URL}me`,{
            headers:{Authorization:localStorage.getItem("token")}
           }).
           then(response =>{
            if(response.data.isloggedin === true){
                navigate("/blogs");
            }else{
                navigate("/signin");
            }
           })
    },[])
    
    const {blogs} = useBlogs();

    function getRandomDate(start = new Date(2024, 0, 1), end = new Date()) {
        const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        const options: DateTypes = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US',options); // e.g., "Dec 12, 2024"
    }
  return <div>
    <Appbar/>
    {blogs.map(blog=>  <BlogCard key={blog.id} id={blog.id} title={blog.title} content={blog.content} name={blog.author.name || "Anonymous"} publishedDate={getRandomDate()} imageLink = {blog.imageLink}/>)
    }
  </div>;
};

export default Blogs;
