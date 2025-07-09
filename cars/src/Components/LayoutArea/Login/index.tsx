import axios from "axios";
import { useRef } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const URL = "http://localhost:2200";

export default function LoginPage() {
  const navigate = useNavigate();
    
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function loginUserApi(userPayload: {
    userName: string | undefined;
    password: string | undefined;
  }) {
    try {
      //   setIsLoading(true);
      const response = await axios.post(`${URL}/login`, userPayload);
      if (response.status === 200) {
        navigate("/home");
      }
    } catch (error) {
      alert("Something went wrong!");
    } finally {
      //   setIsLoading(false);
    }
  }

  return (
    <div>
      <h1> Login Page </h1>
      <h2> Please login to your application using the credentials.</h2>
      <input type="text" ref={userNameRef} />
      <input type="text" ref={passwordRef} />
      <button
        onClick={() => {
          loginUserApi({
            userName: userNameRef?.current?.value,
            password: passwordRef?.current?.value,
          });
        }}
      >
        Log in
      </button>
      <button
        onClick={() => {
          localStorage.removeItem("isAuthenticate");
        }}
      >
        Logout
      </button>

      <div>
        <NavLink to="/register">
          <span>Dont have an account? Please register</span>
        </NavLink>
      </div>
    </div>
  );
}
