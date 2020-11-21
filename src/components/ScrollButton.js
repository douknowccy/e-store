import React from "react";
import { FaAngleDoubleUp } from "react-icons/fa";
import useGlobalUserContext from "../context/user";
function ScrollButton() {
  const { height } = useGlobalUserContext();

  const scrollBackToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    <button
      onClick={scrollBackToTop}
      className={height > 100 ? "scroll-btn show-scroll-btn" : "scroll-btn"}
    >
      <FaAngleDoubleUp />
    </button>
  );
}

export default ScrollButton;
