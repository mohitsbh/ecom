import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSearch, FaTimes } from "react-icons/fa";

const Search = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const delay = setTimeout(() => {
            if (searchTerm.trim()) {
                navigate(`/search?s=${searchTerm}`);
            }
        }, 500);

        return () => clearTimeout(delay);
    }, [searchTerm, navigate]);

    const handleChange = (ev) => {
        setSearchTerm(ev.target.value);
    };

    const clearSearch = () => {
        setSearchTerm("");
        navigate("/search"); // Reset search results
    };

    return (
        <div className="input-group w-50 mx-auto">
            <span className="input-group-text bg-light">
                <FaSearch />
            </span>
            <input
                type="text"
                className="form-control"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleChange}
            />
            {searchTerm && (
                <button className="btn btn-danger" onClick={clearSearch}>
                    <FaTimes />
                </button>
            )}
        </div>
    );
};

export default Search;
