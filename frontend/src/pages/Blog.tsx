import { useNavigate, useParams } from "react-router-dom";
import { useBlog } from "../hooks/useBlogs";
import FullBlog from "../components/FullBlog";
import Appbar from "../components/Appbar";
import { useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

const Blog = () => {
    const {id} = useParams();
    const blog = useBlog({ id : id || "" });
    const navigate = useNavigate()
    useEffect(()=>{
        axios.get(`${BACKEND_URL}me`,{
            headers:{Authorization:localStorage.getItem("token")}
           }).
           then(response =>{
            if(response.data.isloggedin === true){
                navigate("/blog/:id");
            }else{
                navigate("/signin");
            }
           })
    },[])

  return <div>
    <Appbar/>
    {blog ? <FullBlog blog={blog} /> : <p>Loading blog...</p>}
  </div>;
};

export default Blog;
