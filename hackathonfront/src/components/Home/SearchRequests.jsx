import React, { useState } from 'react';
import axios from 'axios';
import './search.css';
import FoundRequest from "./FoundRequest";

const SearchRequests = () => {
    const url = https://hackaton-9507e74b8c0c.herokuapp.com/ + "/api/v1/requests?title=";

    const [query, setQuery] = useState('');
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState(null);

    const handleSearch = async (event) => {
        try {
            await setQuery(event.target.value);

            if (event.target.value === '') {
                return;
            }

            const { data } = await axios.get(url + event.target.value);
            setRequests(data.requests);
            setError(null);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('Error fetching products');
        }
    };

    return (
        <div>
            <div className="input-group rounded justify-content-center mb-4">
                <input
                    type="search"
                    className="form-control rounded w-50 flex-grow-0"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="search-addon"
                    id="main-search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    onInput={handleSearch}
                />
                <span
                    onClick={handleSearch}
                    className="input-group-text border-0 bg-transparent "
                    id="search-addon"
                >
                  <label htmlFor="main-search">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        height={"1.5rem"}
                    >
                      <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6 .1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
                    </svg>
                  </label>
                </span>
            </div>
            {error && <div>{error}</div>}
            {requests.length !== 0 ? (
                <div className="list-items">
                    {requests.map((item) => (
                        <FoundRequest key={item.title} {...item}/>
                    ))}
                </div>
            ) : (
                ''
            )}
        </div>
    );
};

export default SearchRequests;
