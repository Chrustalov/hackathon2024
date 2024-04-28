import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./details_card.css";
import RequestSkeleton from "./RequestSkeleton";
import LatestPost from "./LatestPost";
import { useContext } from "react";
import { UserContext } from "../../App";
import RequestCard from "./RequestCard";
import { useToastNotification } from "../../hooks/useToastNotification";
const url = process.env.REACT_APP_API + "/api/v1/requests/";

const RequestDetails = () => {
  const { id } = useParams();
  const { contextValue } = useContext(UserContext);
  const [request, setRequest] = useState({});
  const [profile, setProfile] = useState({});
  const [author, setAuthor] = useState({});
  const [executor, setExecutor] = useState({});
  const [executor_profile, setExecutorProfile] = useState({});
  const [tags, setTags] = useState([]);
  const [latest_posts, setLatestPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();
  const { toastError } = useToastNotification();
  async function startExecute() {
    console.log(contextValue);
    const c_url =
      process.env.REACT_APP_API +
      "/api/v1/requests/" +
      request.id +
      "/start_execute";
    const { data } = await axios.patch(
      c_url,
      {}, // Порожній об'єкт даних, оскільки ви не відправляєте додаткові дані
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    setExecutor(data.executor);
    setRequest(data.request);
    setExecutorProfile(data.profile);
  }
  async function endExecute() {
    const c_url =
      process.env.REACT_APP_API +
      "/api/v1/requests/" +
      request.id +
      "/end_execute";
    const { data } = await axios.patch(c_url);
    setRequest(data.request);
  }
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        console.log(contextValue.user);
        setIsFetching(false);
        const { data } = await axios.get(url + id);
        console.log(data);
        setExecutor(data.executor);
        setRequest(data.request);
        setTags(data.tags);
        setLatestPosts(data.latest_posts);
        setAuthor(data.user);
        setProfile(data.user_profile);
        setIsFetching(true);
        setExecutorProfile(data.executor_profile);
      } catch (err) {
        //alert("Щось пішло не так, спробуйте ще раз!");
        toastError(err.response?.data?.message);
        console.log(err);
      }
    };

    fetchRequests();
  }, [id]);

  useEffect(() => {
    navigate(`/view-request-details/${id}`);
  }, [id, navigate]);

  return (
    <div className="blog-single gray-bg m-5">
      {isFetching ? (
        <div className="container">
          <div className="row align-items-start">
            <div className="col-lg-8 m-15px-tb">
              <article className="article">
                <div className="article-img">
                  <img
                    src={process.env.REACT_APP_API + request.photo.url}
                    title=""
                    alt=""
                  />
                </div>
                <div className="article-title">
                  <h2>{request.title}</h2>
                  <div className="media">
                    <div className="media-body">
                      {request.completed ? (
                        <h5>This request has already been completed</h5>
                      ) : (
                        <h5>This request has not yet been completed</h5>
                      )}
                      {executor &&
                      contextValue.user &&
                      contextValue.user.id == executor.id &&
                      request.completed == false ? (
                        <button
                          className="btn btn-outline-dark mt-3 mb-2"
                          onClick={endExecute}
                        >
                          Finish execution
                        </button>
                      ) : (
                        <></>
                      )}
                      <span>{new Date(request.created_at).toDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="article-content">{request.body}</div>
                <div className="nav tag-cloud">
                  {tags.map((item) => (
                    <span className="badge bg-info text-dark m-1">
                      {item.name}
                    </span>
                  ))}
                </div>
              </article>
              <div className="widget widget-latest-post">
                <div className="widget-title">
                  <h3>Latest Post</h3>
                </div>
                {/* <div className="widget-body ">
                  {latest_posts.map((item) => {
                    console.log(item);
                    return (
                      <LatestPost key={item.title} {...item} />
                      //<RequestCard key={item.title} {...item} tags={[]} />
                    );
                  })}
                </div> */}
                <div className="row mt-5  justify-content-center ">
                  {latest_posts.map((item) => {
                    item.tags = []
                    console.log(item);
                    return <RequestCard key={item.title} {...item} photo={item.photo.url} />;
                  })}
                </div>
              </div>
            </div>
            <div className="col-lg-4 m-15px-tb blog-aside">
              <div className="widget widget-author">
                <div className="widget-title">
                  <h3>Author</h3>
                </div>
                <div className="widget-body">
                  <div className="media align-items-center d-flex">
                    <div className="avatar">
                      <img
                        src={process.env.REACT_APP_API + profile.avatar.url}
                        title=""
                        alt=""
                      />
                    </div>
                    <div className="media-body">
                      <h6>
                        Hello, I'm
                        <br /> {profile.first_name} {profile.last_name}
                      </h6>
                    </div>
                  </div>
                  <p>About me: {profile.about_me}</p>
                  <a
                    href={"tel:" + profile.phone_number}
                    className="btn btn-outline-primary mt-3"
                  >
                    Call: +{profile.phone_number}
                  </a>
                  <a
                    href={"mail:" + author.email}
                    className="btn btn-outline-secondary mt-3"
                  >
                    Email: +{author.email}
                  </a>
                  <p className="text-muted mt-4">City: {profile.city}</p>
                </div>
              </div>
              {executor ? (
                <div className="widget widget-author">
                  <div className="widget-title">
                    <h3>Executor</h3>
                  </div>
                  <div className="widget-body">
                    <div className="media align-items-center d-flex">
                      <div className="avatar">
                        <img
                          src={
                            process.env.REACT_APP_API +
                            executor_profile.avatar.url
                          }
                          title=""
                          alt=""
                        />
                      </div>
                      <div className="media-body mx-auto">
                        <h6>
                          Hello, I'm
                          <br /> {executor_profile.first_name}{" "}
                          {executor_profile.last_name}
                        </h6>
                      </div>
                    </div>
                    <p>About me: {executor_profile.about_me}</p>
                    <a
                      href={"tel:" + executor_profile.phone_number}
                      className="btn btn-outline-primary mt-3"
                    >
                      Call: +{executor_profile.phone_number}
                    </a>
                    <a
                      href={"mail:" + executor.email}
                      className="btn btn-outline-secondary mt-3"
                    >
                      Email: +{executor.email}
                    </a>
                    <p className="text-muted mt-4">
                      City: {executor_profile.city}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="widget widget-author">
                  <div className="widget-title">
                    <h3>Executor</h3>
                  </div>
                  <div className="widget-body d-flex justify-content-center align-items-center">
                    <div className="media ">
                      <div className="media-body text-center">
                        <h6>
                          Unfortunately, this request has yet to be fulfilled by
                          anyone
                        </h6>
                        <p className="text-muted mt-4">
                          If a performer appears, we will notify you
                        </p>

                        {contextValue.user &&
                        contextValue.user.role == "volunteer" ? (
                          <button
                            className="btn btn-outline-dark mt-3"
                            onClick={startExecute}
                          >
                            Start execution
                          </button>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <RequestSkeleton key={id} />
      )}
    </div>
  );
};

export default RequestDetails;
