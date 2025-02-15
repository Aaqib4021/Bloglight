
import Auth from "../components/Auth";
import Quote from "../components/Quote";

const Signin = () => {
  return <div className="drop-shadow-lg">
     <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
            <Auth type="signin"/>
        </div>
        <div>
            <Quote/>
        </div>
    </div>
  </div>;
};

export default Signin;
