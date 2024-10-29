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
                // navigate("/blogs");
            }else{
                navigate("/signin");
            }
           })
    },[])


    if(!blog){
        return <div>
            <Appbar/>
            <BlogSkeleton/>
        </div>
    }
  return <div>
    <Appbar/>
    <FullBlog blog={blog} />
  </div>;
};
const BlogSkeleton = ()=>{
    return <div className="p-8 flex justify-between items-center">
        <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
            <div className="flex">
                <div className="h-4  bg-gray-200 rounded-full w-80 mb-4"></div>

            </div>
            <div className="text-xl font-semibold pt-2">
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            </div>
            <div className="text-md font-thin">
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            </div>
            <div className="text-slate-500 text-sm font-thin pt-4">
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            </div>
        </div>
        <div className="w-80 h-52 animate-pulse bg-gray-200 rounded-lg">
            <div className="h-4 bg-gray-200 rounded-full w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
        </div>
    </div>
}

export default Blog;
