import React from "react";
import { Link } from "react-router-dom";

const LatestPost = (props) => {
  return (
    <Link
      className="latest-post-aside media d-flex justify-content-between"
      to={{
        pathname: `/view-request-details/${props.id}`,
        state: { request_id: props.id },
      }}
    >
      <div className="lpa-left media-body">
        <div className="lpa-title">
          <h5>
            <a href="#">{props.title}</a>
          </h5>
        </div>
        <div className="lpa-meta">
          <a className="date" href="#">
            {new Date(props.created_at).toDateString()}
          </a>
        </div>
      </div>
      <div className="lpa-right">
        <a href="#">
          <img
            src={
              "https://hackaton-9507e74b8c0c.herokuapp.com" + props.photo.url
            }
            title=""
            alt=""
          />
        </a>
      </div>
    </Link>
  );
};

export default LatestPost;
