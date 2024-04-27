import React, { useCallback, useEffect, useState } from "react";
import axios from "axios"; // або інша бібліотека для запитів
import { useNavigate, useParams } from "react-router-dom";
import { useToastNotification } from "../hooks/useToastNotification";

const API_URL = process.env.REACT_APP_API + "/api/v1/profiles";

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigation = useNavigate();
  const {toastError} = useToastNotification();

  useEffect(() => {
    const fetchUser = async () => {
      axios
        .get(API_URL + (id ? "/" + id : ""), {
          headers: id
            ? { "content-type": "application/json" }
            : {
                "content-type": "application/json",
                authorization: localStorage.getItem("token"),
              },
        })
        .then((resp) => resp.data)
        .then((data) => setUser(data))
        .catch((error) => {
          toastError("Please sign in to view this page");
          navigation("/signin");
        });
    };
    fetchUser();
  }, [id]);

  return (
    <main>
      <div className="container-md mt-5">
        <div className="row">
          <div className="col-md-6">
            <img
              src="user_avatar.jpg"
              alt="User Avatar"
              className="img-fluid mb-3 rounded-circle"
              style={{ maxWidth: "100px" }}
            />
          </div>
          <div className="col-md-6">
            <a href="/edit_profile" className="btn btn-sm btn-primary">
              Редагувати профіль
            </a>
          </div>
        </div>
        <div className="row">
          <div className="col-md-5">
            <div className="user-info">
              <h1>Ім'я Користувача</h1>
              <p>Email: user@example.com</p>
              <p>Дата народження: 01/01/1990</p>
              {user?.user?.name}
            </div>
          </div>
          <div className="col-md-7">
            <p>Про себе: Додаткові дані про користувача...</p>
            {/* Тут можуть бути інші дані профілю */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
