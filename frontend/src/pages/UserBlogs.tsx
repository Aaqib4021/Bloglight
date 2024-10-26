import Appbar from "../components/Appbar";
import { EnhancedBlogCard } from "../components/BlogCard";
import { useUserBlogs } from "../hooks/useBlogs";

const UserBlogs = () => {
    const userblogs = useUserBlogs();
    function getRandomDate(start = new Date(2024, 0, 1), end = new Date()) {
        const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US',options); // e.g., "Dec 12, 2024"
    }

    if(!userblogs){
        return
    }
  return <div>
    <Appbar/>
    {userblogs.map( blog => <EnhancedBlogCard key={blog.id} id={blog.id} title={blog.title} content={blog.content} name="You" publishedDate={getRandomDate()}/> )}
  </div>;
};

export default UserBlogs;
