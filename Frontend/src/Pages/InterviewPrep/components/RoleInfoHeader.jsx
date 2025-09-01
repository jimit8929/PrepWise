import React from "react";

const RoleInfoHeader = ({
  role,
  topicsToFocus,
  experience,
  questions,
  lastUpdated,
}) => {
  return (
    <div className="bg-white relative md:mx-8">
      <div className="container mx-auto md:px-0 px-4">
        <div className="h-[200px] flex flex-col justify-center relative z-10">
          <div className="flex items-start">
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <div className="flex flex-col mb-4">
                  <h2 className="text-2xl font-medium">{role}</h2>
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {topicsToFocus}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <div className="text-[10px] font-semibold text-white bg-black px-3 py-1 rounded-full">
              Experience : {experience} {experience == 1 ? "Year" : "Years"}
            </div>

            <div className="text-[10px] font-semibold text-white bg-black px-3 py-1 rounded-full">
              {questions} Q&A
            </div>

            <div className="text-[10px] font-semibold text-white bg-black px-3 py-1 rounded-full">
              Last Updated: {lastUpdated}
            </div>
          </div>
        </div>

        <div className="block md:hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-0 w-full h-[100px] flex items-center justify-between px-6 overflow-hidden">
            <div className="w-16 h-16 bg-lime-400 rounded-full blur-[70px] opacity-90 -translate-x-6 transform" />
            <div className="w-20 h-20 bg-teal-400 rounded-full blur-[60px] opacity-80 translate-x-6 transform" />
          </div>

          <div className="absolute bottom-0 left-0 w-full h-[100px] flex items-center justify-between px-6 overflow-hidden">
            <div className="w-20 h-20 bg-cyan-300 rounded-full blur-[50px] opacity-80 -translate-x-4 transform" />
            <div className="w-16 h-16 bg-fuchsia-600 rounded-full blur-[45px] opacity-85 translate-x-8 transform" />
          </div>
        </div>

        {/* Desktop / md+ view (right side) */}
        <div className="hidden md:flex w-[30vw] h-[200px] items-center justify-center bg-white overflow-hidden absolute top-0 right-0">
          <div className="w-16 h-16 bg-lime-400 blur-[65px] animate-blob1" />
          <div className="w-16 h-16 bg-teal-400 blur-[65px] animate-blob2" />
          <div className="w-16 h-16 bg-cyan-300 blur-[45px] animate-blob3" />
          <div className="w-16 h-16 bg-fuchsia-200 blur-[45px] animate-blob1" />
        </div>
      </div>
    </div>
  );
};

export default RoleInfoHeader;
