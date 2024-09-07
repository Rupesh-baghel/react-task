


import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './App.css';

const Api_Key = "EnY00uQscTwvgPtkzhdnUeJ4FHyklR3XaPqnPsvKFcw";

const SearchPage = () => {
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    const handleClick = () => {
        axios.get(`https://api.unsplash.com/search/photos?page=1&query=${search}&client_id=${Api_Key}`)
            .then(response => {
                console.log(response.data.results);
                setData(response.data.results);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div className='search-wrapper'>
            <div className="container">
                    <h1 className='text-center'>Search Page</h1>
                <div className="form-wrapper">
                           Name: <span>Rupesh Kumar</span>  <br />
                        Email: <span>rupeshkumar98900@gmail.com</span>
                </div>
                <hr />

                <div className="search-bar">
                    <input
                        type="text"
                        value={search}
                        name="search"
                        onChange={handleChange}
                        placeholder="Enter Your Search Term"
                        autoComplete='off'

                    />
                    <button onClick={handleClick}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>

                <div className="image-grid">
                    {data.map(image => (
                        <div key={image.id} className="image-card">
                            <img src={image.urls.small} alt={image.alt_description} />
                            <Link to={`/caption/${image.id}`}>
                                <button>Add Caption</button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
