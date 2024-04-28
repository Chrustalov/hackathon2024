import React from "react";
import {Link} from "react-router-dom";

const FoundRequest = (props) => {
    return (
        <Link
            className="card full-width"
            to={{
                pathname: `/view-request-details/${props.id}`,
                state: { request_id: props.id }
            }}
        >
            <div className="card-body">
                <div className="d-flex align-items-center">
                    <img src={'https://hackaton-9507e74b8c0c.herokuapp.com/' + props.photo}  className="full-search-img" alt="Fissure in Sandstone"/>
                    <div className="d-flex flex-column mx-4">
                        <h5 className="card-title">{props.title}</h5>
                        <p className="card-text">{props.body}</p>
                    </div>
                    <p className="card-text">
                        {
                            props.tags.map((item) => (
                                <span className="badge bg-info text-dark m-1">{item}</span>
                            ))
                        }
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default FoundRequest;
