import { useParams } from "react-router-dom";
import { useBlog } from "../hooks/useBlogs";
import FullBlog from "../components/FullBlog";
import Appbar from "../components/Appbar";

const Blog = () => {
    const {id} = useParams();
    const blog = useBlog({ id : id || "" });

  return <div>
    <Appbar/>
    {blog ? <FullBlog blog={blog} /> : <p>Loading blog...</p>}
  </div>;
};

export default Blog;
