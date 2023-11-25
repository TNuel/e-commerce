import React from "react";

function NavLinks() {
  return (
    <div>
      <div className="flex">
        <div className="flex justify-center items-center w-10 h-10 rounded-full bg-secondary/50">
          {/* <img :src="prop.src" :alt="navText"> */}
        </div>
        <div className="ml-4 text-xl font-bold tracking-tight leading-none flex flex-col">
          {/* {{ prop.navText }} */}
        </div>
      </div>
    </div>
  );
}

export default NavLinks;
