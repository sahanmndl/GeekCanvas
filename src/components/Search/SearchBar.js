import React, {useEffect, useState} from "react";
import axios from "axios";
import {BASE_API_URL} from "../../utils/Constants";
import "./styles.css";

const SearchBar = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const getSearchSuggestions = async () => {
        try {
            await axios.get(`${BASE_API_URL}/blogs/getSearchSuggestions/${searchTerm}`)
                .then((response) => setSuggestions(response.data.suggestions))
                .catch((e) => console.error(e))
        } catch (e) {
            console.error(e)
        }
    }

    const updateClickCount = async (_id) => {
        try {
            const requestBody = {
                id: _id
            }
            await axios.post(`${BASE_API_URL}/blogs/updateBlogClickCount`, requestBody)
                .then((response) => console.log(response.data))
                .catch((e) => console.error(e))
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        if (searchTerm.length !== 0) {
            getSearchSuggestions(searchTerm.trim());
        }
    }, [searchTerm]);

    return (
        <div
            style={{display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <input
                className={'search-input'}
                type="text"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {suggestions.length > 0 && searchTerm.trim().length > 0 && (
                <ul className={'suggestions'}>
                    {suggestions.map(blog => (
                        <li
                            className={'suggestion'}
                            key={blog.id}
                            onClick={() => {
                                window.open(`/blog/open-blog?id=${blog.id}`, '_blank')
                                updateClickCount(blog.id)
                            }}
                        >
                            {blog.title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default SearchBar