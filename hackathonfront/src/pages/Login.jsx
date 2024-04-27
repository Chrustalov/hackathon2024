import React, { useCallback, useEffect, useState } from "react";
import { Eye, Facebook, Google, Twitter } from "../components/icons";
import { Link, useLocation, useNavigate, useNavigation, useResolvedPath } from "react-router-dom";
import axios from "axios";
import { useToastNotification } from "../hooks/useToastNotification";

function Login() {
  const {toastSuccess , toastError} = useToastNotification();

  const location = useLocation();
  const navigation = useNavigate();

  useEffect(() => {
    setIsNewUser(location.pathname === "/signup");
  }, [location]);

  const [isNewUser, setIsNewUser] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const onChangename = useCallback((e) => {
    setName(e.target.value);
  }, []);
  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);
  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const changeForm =() => {
    navigation(location.pathname === "/signup" ? "/signin" : "/signup", { replace: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isNewUser) {
      Login({ email, password, name }, "/signup");
    } else {
      Login({ email, password });
    }
    return false;
  };

  return (
    <main className="d-flex align-content-center justify-content-center my-3">
      <div
        className="position-relative overflow-hidden mw-100 rounded"
        style={{
          width: "80%",
          minHeight: "550px",
          boxShadow: "0 14px 28px #5161ce",
        }}
        id="container"
      >
        <div
          className={"form-container"}
          style={
            !isNewUser
              ? { transition: "all 1.6s ease-in-out", opacity: 0, zIndex: 2 }
              : {
                  transition: "all 1.6s ease-in-out",
                  transform: "translateX(100%)",
                  opacity: 1,
                  zIndex: 5,
                  animation: "show 1.6s",
                }
          }
        >
          <form
            className="d-flex justify-content-center align-content-center flex-column py-3 h-100 text-center gap-2"
            onSubmit={handleSubmit}
          >
            <h1 className="fw-bold fs-5 m-0">Create Account</h1>
            <div className="mx-2">
              {[
                <Facebook fill={"#000"} />,
                <Twitter fill={"#000"} />,
                <Google fill={"#000"} />,
              ].map((icon) => (
                <Link
                  to={"/"}
                  className="d-inline-flex align-content-center justify-content-center mx-3 footer-links"
                >
                  {icon}
                </Link>
              ))}
            </div>
            <span>Or use your email for registration:</span>
            <label htmlFor="name1" id="name-label">
              <input
                className="rounded w-50 p-2 login-input "
                type="text"
                id="name1"
                placeholder="Name"
                name="name"
                value={name}
                onChange={onChangename}
                required
              />
            </label>
            <label htmlFor="email1" id="email-label">
              <input
                className="rounded w-50 p-2 login-input "
                type="email"
                id="email1"
                placeholder="Email"
                aria-label="Email"
                name="email"
                value={email}
                onChange={onChangeEmail}
                required
              />
            </label>

            <label
              className="position-relative"
              htmlFor="password1"
              id="password-label"
            >
              <input
                className="rounded w-50 p-2 login-input "
                type={!showPassword ? "password" : "text"}
                id="password1"
                placeholder="Password"
                name="password"
                title="Password must contain at least 8 characters, including digits, uppercase, and lowercase letters"
                value={password}
                onChange={onChangePassword}
                pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$"
                required
              />
              <button
                className="position-absolute btn rounded-circle border-0  "
                onClick={togglePassword}
              >
                <Eye fill={"#000"} isOpen={showPassword} />
              </button>
            </label>
            <div>
              <button
                className="login-input btn btn-outline-dark w-50"
                style={{
                  transition: "transform 0.5s ease-in",
                }}
              >
                Sign Up
              </button>
              <div className="text-center text-dark d-sm-none d-block mt-3">
                If you are registered, you can{" "}
                <Link
                  className="text-dark text-decoration-none footer-links"
                  onClick={changeForm}
                >
                  Sign In
                </Link>
              </div>
            </div>
          </form>
        </div>

        <div
          className={"form-container"}
          style={{
            zIndex: 2,
            transition: "all 1.6s ease-in-out",
            transform: isNewUser ? "translateX(100%)" : "translateX(0)",
            opacity: isNewUser ? 0 : 1,
          }}
        >
          <form
            className="d-flex justify-content-center align-content-center flex-column py-3 h-100 text-center gap-3"
            onSubmit={handleSubmit}
          >
            <h1 className="fw-bold fs-5 m-0">Sign in</h1>
            <div className="mx-2">
              {[
                <Facebook fill={"#000"} />,
                <Twitter fill={"#000"} />,
                <Google fill={"#000"} />,
              ].map((icon) => (
                <Link
                  to={"/"}
                  className="d-inline-flex align-content-center justify-content-center mx-3 footer-links"
                >
                  {icon}
                </Link>
              ))}
            </div>
            <span>Or use your account:</span>
            <label htmlFor="email" id="email-label">
              <input
                className="rounded w-50 p-2 login-input "
                type="email"
                id="email"
                placeholder="Email"
                aria-label="Email"
                name="email"
                value={email}
                onChange={onChangeEmail}
                required
              />
            </label>

            <label
              className="position-relative"
              htmlFor="password"
              id="password-label"
            >
              <input
                className=" rounded w-50 p-2 login-input"
                type={!showPassword ? "password" : "text"}
                id="password"
                placeholder="Password"
                name="password"
                value={password}
                pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$"
                title="Password must contain at least 8 characters, including digits, uppercase, and lowercase letters"
                onChange={onChangePassword}
                required
              />
              <button
                className="position-absolute btn rounded-circle border-0  "
                onClick={togglePassword}
              >
                <Eye fill={"#000"} isOpen={showPassword} />
              </button>
            </label>

            <Link className="text-black me-4 footer-links">
              Forgot your password?
            </Link>
            <div>
              <button
                className="login-input btn btn-outline-dark w-50"
                style={{
                  transition: "transform 0.5s ease-in",
                }}
              >
                Sign In
              </button>
              <div className="text-center text-dark d-sm-none d-block mt-3">
                If you aren't registered, you can{" "}
                <Link
                  className="text-dark text-decoration-none footer-links"
                  onClick={changeForm}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </form>
        </div>

        <div
          className="position-absolute top-0 start-50 w-50 h-100 overflow-hidden d-none d-sm-block "
          style={{
            zIndex: 10,
            transition: "transform 1.6s ease-in-out",
            transform: isNewUser ? "translateX(-100%)" : "none",
          }}
        >
          <div
            className="overlay"
            style={{ transform: isNewUser ? "translateX(50%)" : "none" }}
          >
            <div
              className="position-absolute d-flex flex-column align-content-center justify-content-center text-center top-0 h-100 w-50 px-0 py-3"
              style={{
                transition: "transform 1.6s ease-in-out",
                transform: isNewUser ? "translateX(0)" : "translateX(-20%)",
              }}
            >
              <h1 className="fw-bold fs-5 m-0">Welcome!</h1>
              <p className="mx-2">Login with your personal info</p>
              <div>
                <button
                  className="login-input btn btn-outline-light w-50"
                  style={{
                    transition: "transform 0.5s ease-in",
                  }}
                  onClick={changeForm}
                >
                  Sign In
                </button>
              </div>
            </div>

            <div
              className="position-absolute d-flex flex-column align-content-center justify-content-center text-center top-0 h-100 w-50 px-0 py-3"
              style={{
                transition: "transform 1.6s ease-in-out",
                right: 0,
                transform: isNewUser ? "translateX(20%)" : "translateX(0)",
              }}
            >
              <h1 className="fw-bold fs-5 m-0">Hello!</h1>
              <p className="mx-2">Enter your personal details and start</p>
              <div>
                <button
                  className="login-input btn btn-outline-light w-50"
                  style={{
                    transition: "transform 0.5s ease-in",
                  }}
                  onClick={changeForm}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>

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
      </div>
    </main>
  );

  async function Login({ name, password, email }, endPoint = "/login") {
    try {
      const response = await axios
        .post(
          process.env.REACT_APP_API + endPoint,
          {
            user: {
              name,
              password,
              email,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .catch((err) => err.response);

      console.log("response", response);

      const data = response.data;
      if (response.status > 300) throw data;
      console.log(response.headers.get("Authorization"));
      localStorage.setItem("token", response.headers.get("Authorization"));
      toastSuccess(data?.status?.message);
      navigation("/");
    } catch (err) {
      console.log("error", err);
      toastError(err?.status?.message);
    }
  }
}

export default Login;
