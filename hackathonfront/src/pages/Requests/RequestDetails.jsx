import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import "./details_card.css";
import RequestSkeleton from "./RequestSkeleton";
import LatestPost from "./LatestPost";
const url = process.env.REACT_APP_API + "/api/v1/requests/";

const RequestDetails = () => {
    const { id } = useParams();
    const [request, setRequest] = useState({});
    const [profile, setProfile] = useState({});
    const [author, setAuthor] = useState({});
    const [tags, setTags] = useState([]);
    const [latest_posts, setLatestPosts] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const navigate = useNavigate(); // Використовуйте useNavigate замість useHistory

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                setIsFetching(false);
                const { data } = await axios.get(url + id);
                console.log(data.latest_posts);

                setRequest(data.request);
                setTags(data.tags);
                setLatestPosts(data.latest_posts);
                setAuthor(data.user);
                setProfile(data.user_profile);
                setIsFetching(true);
            } catch (err) {
                alert("Щось пішло не так, спробуйте ще раз!");
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
                                    <img src={'http://localhost:3000' + request.photo.url} title="" alt="" />
                                </div>
                                <div className="article-title">
                                    <h2>{request.title}</h2>
                                    <div className="media">
                                        <div className="media-body">
                                            <span>{new Date(request.created_at).toDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="article-content">
                                    { request.body }
                                </div>
                                <div className="nav tag-cloud">
                                    {
                                        tags.map((item) => (
                                            <span className="badge bg-info text-dark m-1">{item.name}</span>
                                        ))
                                    }
                                </div>
                            </article>
                        </div>
                        <div className="col-lg-4 m-15px-tb blog-aside">
                            <div className="widget widget-author">
                                <div className="widget-title">
                                    <h3>Author</h3>
                                </div>
                                <div className="widget-body">
                                    <div className="media align-items-center d-flex">
                                        <div className="avatar">
                                            <img src={'http://localhost:3000' + profile.avatar.url} title="" alt="" />
                                        </div>
                                        <div className="media-body">
                                            <h6>Hello, I'm<br /> {profile.first_name} {profile.last_name}</h6>
                                        </div>
                                    </div>
                                    <p>Про мене: { profile.about_me }</p>
                                    <a href={'tel:' + profile.phone_number} className="btn btn-outline-primary mt-3">
                                        Подзвонити: +{profile.phone_number}
                                    </a>
                                    <a href={'mail:' + author.email} className="btn btn-outline-secondary mt-3">
                                        Написати: +{author.email}
                                    </a>
                                    <p className="text-muted mt-4">Місто: { profile.city }</p>
                                </div>
                            </div>
                            <div className="widget widget-latest-post">
                                <div className="widget-title">
                                    <h3>Latest Post</h3>
                                </div>
                                <div className="widget-body">
                                    {
                                        latest_posts.map((item) => (
                                            <LatestPost key={item.title} {...item}/>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <RequestSkeleton key={id}/>
            )}
        </div>
    );
};

export default RequestDetails;
