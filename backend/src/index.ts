
import { Hono } from 'hono';
import { cors } from 'hono/cors'

import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import { verify } from 'hono/jwt';
const app = new Hono<{
    Bindings:{
        JWT_SECRET:string,
        DATABASE_URL:string
    },Variables:{
        userId:string
    }
}>();

app.use(cors());
app.get("/me",async(c)=>{
    const header  = c.req.header("authorization") || "";
    const token  = header.split(" ")[1];
    try{

        const user = await verify(token, c.env.JWT_SECRET);
        if(user.id){
            c.status(200)
            return c.json({
                userId:user.id,
                isloggedin:true
            })
        }else{
            c.status(403)
            return c.json({
                message:"please login",
                isloggedin:false
            })
        }
    }
        catch(err){
            return c.json({})
        }

});
app.route("/api/v1/user",userRouter);
app.route("/api/v1/blog",blogRouter);




export default app;
