import React from "react";
import C2CLogo from "../../assets/c2c-logo.svg";

function Footer() {
  return (
    <div>
      <footer className="">
        <div className="flex w-full px-6 lg:px-40 lg:pt-10 mt-10 lg:space-x-40 lg:h-96 h-48">
          <div>
            <img src={C2CLogo} className="lg:scale-125" alt="Crop2Cash logo" />
          </div>
          <div className="w-full">
            <h1 className="text-center my-5 text-sm lg:text-base font-semibold inline-flex tracking-tight text-textSecondary leading-none ">
              Need help?
            </h1>
            <ul className="text-sm flex flex-col space-y-4 text-left tracking-tight text-textSecondary leading-none ">
              <li>
                <a
                  href="#about"
                  className="link hover:border-b hover:border-textSecondary"
                >
                  Chat with us
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="link hover:border-b hover:border-textSecondary"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
