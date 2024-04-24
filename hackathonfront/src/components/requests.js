import React from 'react'

function Requests(props) {
    return <div>
        <h1>Requests:</h1>
        {props.requests.map((req)=>{
            return <div> 
                <h2>{req.title}</h2>
                <p>{req.body}</p>
            </div>;
        })}
    </div>;
}

export default Requests;