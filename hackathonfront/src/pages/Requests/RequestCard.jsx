import React from "react";

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
            seconds: seconds
        };
    }

    function formatTimeDifference(date) {
        const timeDifference = calculateTimeDifference(date);

        if (timeDifference.days > 0) {
            return timeDifference.days + " днів тому";
        } else if (timeDifference.hours > 0) {
            return timeDifference.hours + " годин тому";
        } else if (timeDifference.minutes > 0) {
            return timeDifference.minutes + " хвилин тому";
        } else {
            return timeDifference.seconds + " секунд тому";
        }
    }

    return (
        <div className="card mb-3">
            <img src={'http://localhost:3000' + props.photo} className="img-fluid rounded-start" alt="..." />
            <div className="card-body p-4 h-100">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.body}</p>
                <p className="card-text">
                    <small className="text-muted">
                    Останнє оновлення {formatTimeDifference(props.updated_at)}
                    </small>
                </p>
                <p className="card-text">
                    {
                        props.tags.map((item) => (
                            <span className="badge bg-info text-dark m-1">{item}</span>
                        ))
                    }
                </p>
                <button className="btn btn-primary mt-auto">Перейти</button>
            </div>
        </div>
    );
}

export default RequestCard;