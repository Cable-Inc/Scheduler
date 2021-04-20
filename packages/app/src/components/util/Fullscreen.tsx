import React from "react";

const Fullscreen: React.FC = ({ children }) => {
  return (
    <div className="min-h-screen h-full w-full">
      <div className="flex flex-row justify-center text-center h-full min-h-screen">
        <div className="flex flex-col justify-center h-full min-h-screen w-full">
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Fullscreen;
