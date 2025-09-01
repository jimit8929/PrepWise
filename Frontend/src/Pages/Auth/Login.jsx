import React, { useContext, useState } from "react";
import Input from "../../components/Inputs/Input.jsx";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPaths.js";

import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/useContext.jsx";
import SpinnerLoader from "../../components/Loader/SpinnerLoader.jsx";

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

   const [loading, setLoading] = useState(false); 


  const {updateUser} = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Example basic validation
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
    }
    setError("");
    setLoading(true);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      const serverMessage = error?.response?.data?.message;
      if (serverMessage) {
        setError(serverMessage);
      } else if (error?.message) {
        setError(error.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
    finally{
      setLoading(false);
    }
  };

  return (
   <div className="w-full max-w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center mx-auto overflow-x-hidden">
      <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
      <p className="text-sm text-slate-700 mt-1 mb-6">
        Please enter your details to log in
      </p>

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <Input
          type="text"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email Address"
          placeholder="john@example.com"
        />

        <Input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="Min 8 Characters"
        />

        {error && <p className="text-red-500 text-xs">{error}</p>}

        <button type="submit" className="btn-primary w-full disabled:opacity-80"
        disabled={loading}>
           {loading ? (
            <>
              <SpinnerLoader />
              <span>Logging in...</span>
            </>
          ) : (
            "LOGIN"
          )}
        </button>

        <p className="text-sm text-slate-800 mt-3 flex items-center justify-center gap-1">
          Don&apos;t have an account?{""}
          <button
            type="button" // ✅ prevents form submission
            className="font-bold text-primary underline cursor-pointer"
            onClick={() => setCurrentPage("signup")}
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
