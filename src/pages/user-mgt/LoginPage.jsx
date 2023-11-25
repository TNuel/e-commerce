import React, { useState } from "react";
import { Link } from "react-router-dom";
import Crop2CashLogo from "../../assets/c2c-logo.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const readyToSubmit = !userEmail || !password;

  const handleLogin = async (event) => {
    event.preventDefault();
    setBtnDisabled(true);
    setIsLoading(true);
    console.log("something pressed");

    try {
      // Your login logic using axios or fetch goes here

      // Mocked success response
      const loginData = {
        username: userEmail,
        password: password,
      };
      console.log("login data =>", loginData);
      const success = await axios.post(
        "https://fakestoreapi.com/auth/login",
        loginData
      );
      console.log("success data ==>", success);

      // Mocked localStorage token
      const token = success.data.token;
      localStorage.setItem("token", token);

      setSuccessMessage("Login Successfully!");
      navigate("/main/landing-page");

      console.log("after checking token =>", token);

      setTimeout(() => {
        setSuccessMessage("");
      }, 4000);

      setBtnDisabled(false);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      setBtnDisabled(false);

      if (error.response && error.response.status === 401) {
        setErr("Invalid credentials");
      }

      setTimeout(() => {
        setErr("");
      }, 3000);
    }
  };

  return (
    <div className="w-screen min-h-screen lg:grid lg:grid-cols-3">
      <div className="hidden lg:flex justify-center items-center bg-secondary">
        <div>
          <img src={Crop2CashLogo} alt="Crop2Cash Logo" className="" />
        </div>
      </div>

      <div className="font-urbanist h-screen px-6 lg:px-0 lg:col-span-2 my-auto flex flex-col justify-center items-center bg-gradient-to-tr from-white via-white to-secondary/5 lg:to-secondary/25">
        <div className="lg:self-center mx-auto w-full lg:max-w-lg">
          <div className="lg:-ml-20">
            <div className="my-5 lg:my-10">
              <div className="mb-6">
                <h2 className="text-3xl font-semibold mb-3 text-secondary">
                  Welcome Back
                </h2>
                <p className="font-urbanist text-textPrimary/70 text-sm md:text-base font-medium leading-5 tracking-normal text-left">
                  Enter your Credentials below to get Started
                </p>
              </div>

              <div
                className={
                  err
                    ? "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                    : "hidden"
                }
              >
                <span
                  className={
                    err === "Request failed with status code 404"
                      ? "block sm:inline"
                      : "block sm:inline"
                  }
                >
                  {err === "Request failed with status code 404"
                    ? "incorrect login credentials"
                    : err}
                </span>
              </div>

              <div
                className={
                  successMessage
                    ? "bg-green-100 border border-green-400 text-green-500 px-4 py-3 rounded relative"
                    : "hidden"
                }
              >
                <span className="">{successMessage}</span>
              </div>

              <form onSubmit={handleLogin} className="py-4">
                <div className="relative text-textPrimary">
                  <label className="text-left" htmlFor="userEmail">
                    Email Address
                  </label>
                  <input
                    id="userEmail"
                    type="text"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full p-3 lg:py-4 my-2 text-sm md:text-base ring-1 ring-gray-300 rounded-xl placeholder-gray-300 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none"
                  />
                </div>

                <div className="relative my-5 text-textPrimary">
                  <label className="text-left" htmlFor="password">
                    Password
                  </label>
                  <input
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full p-3 lg:py-4 my-2 ring-1 text-sm md:text-xl ring-gray-300 rounded-xl placeholder-gray-300 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none"
                  />
                  <span onClick={() => setShowPassword(!showPassword)}>
                    <i
                      className={`absolute cursor-pointer top-[2.8rem] md:top-[3.5rem] right-[1rem] fa ${
                        showPassword ? "fa-eye" : "fa-eye-slash"
                      }`}
                    ></i>
                  </span>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <div className="hidden form-group form-check">
                    <input
                      type="checkbox"
                      className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      id="exampleCheck2"
                    />
                    <label
                      className="form-check-label inline-block text-gray-800"
                      htmlFor="exampleCheck2"
                    >
                      Remember me
                    </label>
                  </div>
                  <a href="#!" className="text-textPrimary">
                    Forgot your password?
                  </a>
                </div>

                <div className="my-10">
                  <button
                    disabled={readyToSubmit || isLoading || btnDisabled}
                    type="submit"
                    className="w-full px-6 py-3 lg:py-4 rounded-xl bg-secondary/75 transition hover:bg-secondary focus:border-secondary active:bg-secondary disabled:bg-secondary/25"
                  >
                    <div
                      className={isLoading ? "flex justify-center" : "hidden"}
                    >
                      <svg
                        aria-hidden="true"
                        className="mx-auto w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-secondary"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    </div>
                    <span
                      className={
                        !isLoading
                          ? "flex justify-center text-white transition duration-200 ease-in-out"
                          : "hidden"
                      }
                    >
                      Log In
                    </span>
                  </button>
                </div>
                <div className="flex justify-end">
                  <p className="text-sm font-semibold text-textPrimary mt-2 pt-1 mb-0">
                    Don't have an account?
                    <Link
                      to="/register"
                      className="text-secondary/80 mx-2 hover:text-secondary hover:border-b-2 hover:border-secondary focus:text-secondary transition duration-200 ease-in-out"
                    >
                      Register
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
