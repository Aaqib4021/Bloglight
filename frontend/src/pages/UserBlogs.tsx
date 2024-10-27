import { useNavigate } from "react-router-dom";
import Appbar from "../components/Appbar";
import { EnhancedBlogCard } from "../components/BlogCard";
import { useUserBlogs } from "../hooks/useBlogs";
import { useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
type DateTypes = {
    year: "numeric" | "2-digit";
    month: "numeric" | "2-digit" | "short" | "long" | "narrow";
    day: "numeric" | "2-digit";
};

const UserBlogs = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        axios.get(`${BACKEND_URL}me`,{
            headers:{Authorization:localStorage.getItem("token")}
           }).
           then(response =>{
            if(response.data.isloggedin === true){
                navigate("/userblogs");
            }else{
                navigate("/signin");
            }
           })
    },[])
    const userblogs = useUserBlogs();
    function getRandomDate(start = new Date(2024, 0, 1), end = new Date()) {
        const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        const options:DateTypes = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US',options); // e.g., "Dec 12, 2024"
    }

    if(!userblogs){
        return
    }



  return <div>
    <Appbar/>
    {userblogs.map(blog =><EnhancedBlogCard key={blog.id} id={blog.id} title={blog.title} content={blog.content} name="You" publishedDate={getRandomDate()} imageLink={blog.imageLink}/> )}
  </div>;
};

export default UserBlogs;
