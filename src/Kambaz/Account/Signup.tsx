import { Link } from "react-router-dom";
import { Form } from 'react-bootstrap';
export default function Signup() {
  return (
    <div id="wd-signup-screen">
      <h1>Sign up</h1>
      <Form.Control id="wd-username"
             placeholder="username"
             className="mb-2"/>
      <Form.Control id="wd-password"
             placeholder="password" type="password"
             className="mb-2"/>
      <Form.Control id="wd-password"
             placeholder="verify password" type="password"
             className="mb-2"/>
      <Link id="wd-signup-btn"
            to="/Kambaz/Account/Profile"
            className="btn btn-primary w-100 mb-2">
            Sign up </Link>
      <Link id="wd-signin-btn"
            to="/Kambaz/Account/Signin"
            className="btn btn-primary w-100 mb-2">
            Sign in </Link><br />
    </div>
);}