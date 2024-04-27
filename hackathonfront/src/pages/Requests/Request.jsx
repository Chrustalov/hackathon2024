import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./card.css";
import RequestCard from "./RequestCard";
import RequestSkeleton from "./RequestSkeleton";
const url = process.env.REACT_APP_API + "/api/v1/requests";

function Request() {
    
    const [requests, setRequests] = useState([]);
    const [isFetching, setIsFetching] = React.useState(false);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                setIsFetching(false);
                const {data} = await axios.get(url);
                console.log(data);
                setRequests(data.requests);
                setIsFetching(true);
            } catch (err) {
                alert("Щось пішло не так попробуйте щераз!")
                console.log(err)
            }
        }

        fetchRequests();
    }, []);

    return (
        <div className="container mb-5">
            <h3 className="my-5 fw-bold">Requests</h3>
            {isFetching ? (
                <div className="cards-inner justify-content-center">
                    {
                        requests.map((item) => (
                            <RequestCard key={item.title} {...item}/>
                        ))
                    }
                </div>
                ) : (
                [...Array(6)].map((_, id) => (
                    <RequestSkeleton key={id}/>
                ))
            )}
        </div>
    );
}

export default Request;
