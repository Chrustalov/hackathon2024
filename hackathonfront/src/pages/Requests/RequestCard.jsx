import React from "react";
import { Link, NavLink } from "react-router-dom";

const RequestCard = (props) => {
  function calculateTimeDifference(date) {
    const providedDate = new Date(date);
    const today = new Date();
    const timeDiffInMilliseconds = today - providedDate;

    const timeDiffInSeconds = Math.floor(timeDiffInMilliseconds / 1000);
    const seconds = timeDiffInSeconds % 60;
    const timeDiffInMinutes = Math.floor(timeDiffInSeconds / 60);
    const minutes = timeDiffInMinutes % 60;
    const timeDiffInHours = Math.floor(timeDiffInMinutes / 60);
    const hours = timeDiffInHours % 24;
    const days = Math.floor(timeDiffInHours / 24);

    return {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function formatTimeDifference(date) {
    const timeDifference = calculateTimeDifference(date);

    if (timeDifference.days > 0) {
      return timeDifference.days + " days ago";
    } else if (timeDifference.hours > 0) {
      return timeDifference.hours + " hours ago";
    } else if (timeDifference.minutes > 0) {
      return timeDifference.minutes + " minutes ago";
    } else {
      return timeDifference.seconds + " seconds ago";
    }
  }

  return (
    <div className="col-sm-5 col-md-4 col-10 col-lg-3  ">
      <img
        src={process.env.REACT_APP_API + props.photo}
        className="card-img-top"
        alt="Fissure in Sandstone"
      />
      <div className="">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.body}</p>
        <p className="card-text">
          <small className="text-muted">
            Last updated {formatTimeDifference(props.updated_at)}
          </small>
        </p>
        <p className="card-text">
          {props.tags.map((item) => (
            <span className="badge bg-info text-dark m-1">{item}</span>
          ))}
        </p>
      </div>
      <div className="card-footer">
        <Link
          className="btn btn-outline-dark  mt-1"
          to={{
            pathname: `/view-request-details/${props.id}`,
            state: { request_id: props.id },
          }}
        >
          Go to
        </Link>
      </div>
    </div>
  );
};

export default RequestCard;
