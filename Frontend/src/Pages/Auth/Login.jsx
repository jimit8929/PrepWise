import React, { useState } from 'react'
import Input from '../../components/Inputs/Input.jsx';
import { validateEmail } from '../../utils/helper';

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");



  const handleLogin = async (e) => {
    e.preventDefault();

    // Example basic validation
    if(!validateEmail(email)){
      setError("Please enter a valid email address");
      return;
    }

    if(!password){
      setError("Please enter the password");
    }
    setError("");


    try{
      return password;
    }
    catch(error){
      if(error.response && error.message.data.message){
        setError(error.response.data.message);
      }
      else{
        setError("Something went wrong. Please try again.")
      }
    }
  };

  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
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

        {error && (
          <p className="text-red-500 text-xs">{error}</p>
        )}

        <button
          type="submit"
          className="btn-primary w-full"
        >
          LOGIN
        </button>

        <p className="text-sm text-slate-800 mt-3 text-center">
          Don&apos;t have an account?{" "}
          <button
            type="button" // ✅ prevents form submission
            className="font-medium text-primary underline cursor-pointer"
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
