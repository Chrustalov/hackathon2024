import React, { useEffect, useRef } from "react";
import "./header.css";

function Header() {
  const tabsNewAnimRef = useRef(null);
  const horiSelectorRef = useRef(null);

  useEffect(() => {
    if(!tabsNewAnimRef.current || !horiSelectorRef.current) return;
    const tabsNewAnim = tabsNewAnimRef.current;
    const horiSelector = horiSelectorRef.current;

    const updateActiveItem = (target) => {
      if (!target) return;
      const activeWidthNewAnimHeight = target.clientHeight;
      const activeWidthNewAnimWidth = target.clientWidth;
      const itemPosNewAnimTop = target.offsetTop;
      const itemPosNewAnimLeft = target.offsetLeft;

      horiSelector.style.top = itemPosNewAnimTop + "px";
      horiSelector.style.left = itemPosNewAnimLeft + "px";
      horiSelector.style.height = activeWidthNewAnimHeight + "px";
      horiSelector.style.width = activeWidthNewAnimWidth + "px";
    };

    const handleClick = (e) => {
      const target = e.target.closest("li");
      if (!target) return;
      const lis = tabsNewAnim.querySelectorAll("li");
      lis.forEach((li) => li.classList.remove("active"));
      target.classList.add("active");
      updateActiveItem(target);
    };

    const handleResize = () => {
      updateActiveItem(tabsNewAnim.querySelector(".active"));
    };

    const handleTogglerClick = () => {
      document.querySelector(".navbar-collapse").classList.toggle("show");
      setTimeout(
        () => updateActiveItem(tabsNewAnim.querySelector(".active")),
        0
      );
    };

    tabsNewAnim.addEventListener("click", handleClick);
    window.addEventListener("resize", handleResize);
    document
      .querySelector(".navbar-toggler")
      .addEventListener("click", handleTogglerClick);

    return () => {
      tabsNewAnim.removeEventListener("click", handleClick);
      window.removeEventListener("resize", handleResize);
      document
        .querySelector(".navbar-toggler")
        .removeEventListener("click", handleTogglerClick);
    };
  }, [tabsNewAnimRef, horiSelectorRef]);

  // useEffect(() => {
  //   const path = window.location.pathname.split("/").pop() || "index.html";
  //   const target = document.querySelector(
  //     `#navbarSupportedContent ul li a[href="${path}"]`
  //   );
  //   if (target) {
  //     target.parentElement.classList.add("active");
  //   }
  // }, []);

  return (
    <header className="sticky-top header_underline">
      <nav className="navbar navbar-expand-custom navbar-mainbg">
        <a className="navbar-brand navbar-logo text-white" href="/">
          LOGO
        </a>
        <button
          className="navbar-toggler me-3 btn btn-outline-white "
          type="button"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <svg
            height={"1.5rem"}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
          </svg>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end "
          ref={tabsNewAnimRef}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ml-auto">
            <div className="hori-selector" ref={horiSelectorRef}>
              <div className="left"></div>
              <div className="right"></div>
            </div>
            {["Home", "Request", "Profile", "Login", "Signin"].map((item) => {
              return (
                <li className="nav-item" key={item}>
                  {/* <a className="nav-link" href={item} > */}
                  <a className="nav-link">{item}</a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
