import React from "react";
import errorImg from "../assets/images/404.jpg";

export default function NotFound() {
  return (
    <>
      <div className="container flex justify-center items-center ">
        <img src={errorImg} alt="error photo" className="w-2/3" />
      </div>
    </>
  );
}
