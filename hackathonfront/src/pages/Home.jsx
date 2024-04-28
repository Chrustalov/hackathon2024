import React from "react";
import SearchRequests from "../components/Home/SearchRequests";

function Home() {
  return (
    <main
      className="container-fluid align-content-center"
      style={{ height: "80vh" }}
    >
      <div className="container-fluid  justify-content-center align-content-center my-5 py-5 ">
        <h1 className="text-center">
          <label htmlFor="main-search" className="position-relative w-100 ">
            {"Helping each other can make world better"
              .split("")
              .map((letter, index, arr) => (
                <span
                  className="position-relative d-inline-block uppercase mt-2"
                  key={index}
                  style={{
                    animation: `${arr.length * 0.5}s waviy ${
                      index * 0.5
                    }s  infinite`,
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
          </label>
        </h1>
      </div>
      <SearchRequests/>
      <div
        className="ripple-background position-fixed  h-100 w-100 top-0  "
        style={{ zIndex: "-1" }}
      >
        <div className="circle xxlarge shade1"></div>
        <div className="circle xlarge shade2"></div>
        <div className="circle large shade3"></div>
        <div className="circle medium shade4"></div>
        <div className="circle small shade5"></div>
      </div>
    </main>
  );
}

export default Home;
