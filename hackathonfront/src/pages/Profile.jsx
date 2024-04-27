import React, { useCallback, useEffect, useState } from "react";
import axios from "axios"; // або інша бібліотека для запитів
import { useNavigate, useParams } from "react-router-dom";
import { useToastNotification } from "../hooks/useToastNotification";
import FotoCard from "../components/Profile/FotoCard";
import SocialLinks from "../components/Profile/SocialLinks";
import UserInfo from "../components/Profile/UserInfo";
import ContentLoader from "react-content-loader";
import RequestCard from "./Requests/RequestCard";

const API_URL = process.env.REACT_APP_API + "/api/v1/profiles";

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [requests, setRequests] = useState([]);

  const navigation = useNavigate();
  const { toastError } = useToastNotification();

  const editProfile = useCallback(() => {
    setIsEditing(true);
  }, []);

  const onCancel = useCallback(() => {
    setIsEditing(false);
  }, []);

  const onEditProfile = useCallback((newProfile) => {
    axios
      .patch(
        API_URL + "/" + profile.id,
        { profile: newProfile },
        {
          headers: {
            "content-type": "application/json",
            authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((resp) => resp.data)
      .then((data) => {
        setProfile(data.profile);
        setIsEditing(false);
      })
      .catch((error) => {
        toastError(error.response?.status?.message);
      });
  }, []);

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

  if (!user || !profile) {
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
    <main style={{ minHeight: "600px" }}>
      <section>
        <div className="container py-5">
          <div className="row">
            <FotoCard
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
            </FotoCard>
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
          <div className="row">
            <div className="col justify-content-center ">
              <h2 className="text-center">My posts</h2>
              <button>Create new post</button>
            </div>
          </div>
          <div className="row mt-2 ">
            {requests.map((item) => (
              <RequestCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Profile;
