import React, { useCallback, useEffect, useState } from "react";
import axios from "axios"; // або інша бібліотека для запитів
import { useNavigate, useParams } from "react-router-dom";
import { useToastNotification } from "../hooks/useToastNotification";
import FotoCard from "../components/Profile/FotoCard";
import SocialLinks from "../components/Profile/SocialLinks";
import UserInfo from "../components/Profile/UserInfo";
import ContentLoader from "react-content-loader";
import RequestCard from "./Requests/RequestCard";
import Request from "./Requests/Request";
import { useCreateRequest } from "../hooks/useCreateRequest";

const PROFILE_URL = https://hackaton-9507e74b8c0c.herokuapp.com/ + "/api/v1/profiles";
const REQUEST_URL = https://hackaton-9507e74b8c0c.herokuapp.com/ + "/api/v1/requests";

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const navigation = useNavigate();
  const { toastError, toastSuccess } = useToastNotification();
  const { modal, open } = useCreateRequest();

  const editProfile = useCallback(() => {
    setIsEditing(true);
  }, []);

  const onCancel = useCallback(() => {
    setIsEditing(false);
  }, []);

  const onEditProfile = useCallback((newProfile) => {
    console.log("Save new profile",newProfile);
    axios
      .patch(
        PROFILE_URL + "/" + newProfile.id,
        { profile: newProfile },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((resp) => resp.data)
      .then((data) => {
        setProfile(data.profile);
        setIsEditing(false);
        toastSuccess("Profile updated successfully");
      })
      .catch((error) => {
        toastError(error.response?.status?.message);
      });
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      axios
        .get(PROFILE_URL + (id ? "/" + id : ""), {
          headers: id
            ? { "content-type": "application/json" }
            : {
                "content-type": "application/json",
                authorization: localStorage.getItem("token"),
              },
        })
        .then((resp) => resp.data)
        .then((data) => {
          console.log(data);
          setUser(data.user);
          setProfile(data.profile);
        })
        .catch((error) => {
          toastError("Please sign in to view this page");
          navigation("/signin");
        });
    };
    fetchUser();
  }, [id, navigation]);

  const [links, setLinks] = useState([
    "https://www.facebook.com/",
    "https://www.g.com/",
    "https://www.instagram.com/",
  ]);

  const addLink = useCallback((newLink) => {
    setLinks((prev) => [...prev, newLink]);
  }, []);

  const removeLink = useCallback((index) => {
    setLinks((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const editLink = useCallback((index, newLink) => {
    setLinks((prev) => prev.map((link, i) => (i === index ? newLink : link)));
  }, []);

  if (!user) {
    return (
      <ContentLoader
        speed={2}
        width={350}
        height={380}
        viewBox="0 0 390 440"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="0" y="8" rx="8" ry="8" width="400" height="550" />
      </ContentLoader>
    );
  }

  return (
    <>
    <main style={{ minHeight: "600px" }}>
      <section>
        <div className="container py-5">
          <div className="row">
            {!isEditing && <FotoCard
              aboutMe={profile?.about_me}
              avatarUrl={profile?.avatar.url}
              name={user.name}
              isEditing={isEditing && !id}
              onEditProfile={editProfile}
            >
              <SocialLinks
                links={links}
                addLink={addLink}
                editLink={editLink}
                removeLink={removeLink}
              />
            </FotoCard>}
            <UserInfo
              profile={profile}
              isEditing={isEditing}
              onEditProfile={onEditProfile}
              onCancel={onCancel}
            />
          </div>
        </div>
      </section>
      <section>
        <div className="container py-5">
          <div className="row justify-content-end me-2">
            <button className="btn btn-outline-dark col-auto" onClick={open}>
              Create new
            </button>
          </div>
          <div className="row">
            {user ? <Request filter={{ id: user.id }} /> : null}
          </div>
        </div>
      </section>
    </main>
    {modal}
    </>
  );
};

export default Profile;
