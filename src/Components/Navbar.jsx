import React, { useState } from "react";
import logo from "../assets/images/transaction.png";
import avatar from "../assets/images/avatar.png";

export default function Navbar() {
  const [dark, setDark] = React.useState(false);

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
    document.body.classList.toggle("bg-black");
  };
  return (
    <>
      <nav className="bg-violet-300 border-gray-200 dark:bg-violet-900 z-40 fixed top-0 left-0 right-0 shadow">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse ms-7 lg:ms-0">
            <img src={logo} className="h-8" alt="Logo" />
            <span className="self-center text-base lg:text-2xl font-semibold whitespace-nowrap dark:text-white">
              Transaction
            </span>
          </div>
          <div className="flex justify-center items-center gap-2 lg:order-2 space-x-3 lg:space-x-0 rtl:space-x-reverse">
            <div className="flex flex-col md:flex-row justify-center items-center ">
              <p className="self-center md:me-2 order-2 md:-order-1 font-semibold text-xs md:text-base dark:text-white">
                Nada Ayman
              </p>

              <img
                className="w-8 h-8 lg:w-12 lg:h-12 rounded-full bg-gray-600"
                src={avatar}
                alt="user photo"
              />
            </div>
            <div class="flex flex-row justify-between toggle">
              <label for="dark-toggle" class="flex items-center cursor-pointer">
                <div class="relative">
                  <input
                    onClick={darkModeHandler}
                    type="checkbox"
                    name="dark-mode"
                    id="dark-toggle"
                    class="checkbox hidden"
                  />
                  <div class="block border-[1px] dark:border-white border-gray-900 w-10 h-6 rounded-full"></div>
                  <div class="dot absolute left-1 top-1 dark:bg-white bg-gray-800 w-4 h-4 rounded-full transition"></div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
