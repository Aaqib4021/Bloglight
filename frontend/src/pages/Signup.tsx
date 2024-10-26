
import Auth from "../components/Auth";
import Quote from "../components/Quote";

const Signup = () => {
  return <div className="drop-shadow-lg">
    <div className="grid grid-cols-2">
        <div>
            <Auth type="signup"/>
        </div>
        <div>
            <Quote/>
        </div>
    </div>
  </div>
}

export default Signup;
