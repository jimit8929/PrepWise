import React, { useContext, useState } from "react";
import Hero_Img from "../assets/Prepwise_LandingPage.png";
import { useNavigate } from "react-router-dom";
import { LuSparkles } from "react-icons/lu";

import { APP_FEATURES } from "../utils/data.js";
import Model from "../components/Model.jsx";

import Login from "./Auth/Login.jsx"
import SignUp from "./Auth/SignUp.jsx"
import { UserContext } from "../context/useContext.jsx";

import ProfileInfoCard from "../components/Cards/ProfileInfoCard.jsx";

const LandingPage = () => {
  const navigate = useNavigate();
  const [openAuthModel, setOpenAuthModel] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const {user} = useContext(UserContext);

  const handleCTA = () => {
    if(!user){
      setOpenAuthModel(true);
    }
    else{
      navigate("/dashboard");
    }
  };

  return (
    <>
      {/* Main Hero Section */}
      <div className="w-full min-h-screen bg-[#FFFCEF] relative overflow-hidden flex items-start justify-around pt-8">
        {/* Background blur — centered */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[140%] h-[500px] bg-amber-200/20 blur-[65px] pointer-events-none z-0" />

        <div className="max-w-6xl w-full px-6 relative z-10">
          {/* Header */}
          <header className="flex justify-between items-center py-6 mb-12 md:mb-16">
            <div className="text-3xl text-black font-bold">PrepWise AI</div>

             {user ? ( <ProfileInfoCard/> ) : ( 
              <button
              className="bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full 
                         hover:bg-black hover:text-white border border-transparent transition-colors cursor-pointer"
              onClick={() => setOpenAuthModel(true)}
            >
              Login / SignUp
            </button>
             )}
          </header>

          {/* Hero content */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Left text */}
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-6">
                <div className="flex items-center gap-2 text-[13px] text-amber-600 font-semibold bg-amber-100 px-3 py-3 rounded-full border border-amber-300">
                  <LuSparkles /> AI Powered
                </div>
              </div>

              <h1 className="text-5xl md:text-5xl text-black font-medium mb-8 leading-tight max-w-[520px]">
                Ace Interviews With <br />
                <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#FF9324_0%,_#FCD760_100%)] bg-[length:200%_200%] animate-text-shine font-semibold">
                  AI - Powered
                </span>{" "}
                Learning
              </h1>

              <p className="text-[17px] text-gray-900 mb-8 max-w-md">
                Get Role-Specific Questions, expand answers when you need them,
                dive deeper into concepts, and organize everything your way.
                From preparation to mastery – your ultimate interview toolkit is
                here.
              </p>

              <button
                className="bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-full 
                           hover:bg-yellow-100 hover:text-black border border-yellow-50 hover:border-yellow-300 
                           transition-colors cursor-pointer"
                onClick={handleCTA}
              >
                Get Started
              </button>
            </div>

            {/* Right image */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-end">
              <img
                src={Hero_Img}
                alt="Hero dashboard"
                className="md:w-[80vw] max-w-xl rounded-xl shadow-lg relative z-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full min-h-full bg-[#FFFCEF] pt-12 md:pt-0">
        <div className="container mx-auto px-4 pt-10 pb-16">
          <section>
            <h2 className="text-2xl md:text-3xl font-medium text-center mb-12">
              Features That Make You Shine
            </h2>

            <div className="flex flex-col items-center gap-12">
              {/* First Row (3 features) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-[75%]">
                {APP_FEATURES.slice(0, 3).map((feature) => (
                  <div
                    key={feature.id}
                    className="bg-[#FFFEF8] p-6 rounded-xl shadow-sm hover:shadow-lg shadow-amber-100 transition 
                         border border-amber-100"
                  >
                    <h3 className="text-lg font-semibold mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Second Row (2 features) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-[75%]">
                {APP_FEATURES.slice(3).map((feature) => (
                  <div
                    key={feature.id}
                    className="bg-[#FFFEF8] p-6 rounded-xl shadow-sm hover:shadow-lg shadow-amber-100 transition 
                         border border-amber-100"
                  >
                    <h3 className="text-lg font-semibold mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="text-xl bg-gray-50 text-center p-5 mt-5">
        Made With ❤️... Jimit Mehta
      </div>

      <Model isOpen={openAuthModel} onClose={() => {
        setOpenAuthModel(false);
        setCurrentPage("login");
      }} hideHeader>

        <div>
          {currentPage === "login" && (
            <Login setCurrentPage={setCurrentPage}/>
          )}

          {currentPage === "signup" && (
            <SignUp setCurrentPage={setCurrentPage}/>
          )}
        </div>
      </Model>
    </>
  );
};

export default LandingPage;
