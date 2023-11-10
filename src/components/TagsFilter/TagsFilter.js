import React from "react";
import {Box, Divider, Link} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import Colors from "../../utils/Colors";
import logo from "../../assets/logo.png";

const TagsFilter = () => {

    const allTags = [
        'Artificial Intelligence',
        'Machine Learning',
        'Web Development',
        'Mobile Development',
        'Data Structures',
        'Algorithms',
        'Competitive Programming'
    ];

    const location = useLocation()
    const navigate = useNavigate();

    const handleTagClick = (tag) => {
        navigate(`/blogs/tagged/${tag}`);
    };

    return (
        <div style={{paddingLeft: '8.5%', paddingRight: '8.5%', paddingTop: '10px'}}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
            }}>
                <a href="/" onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "/";
                }}>
                    <img
                        style={{
                            height: '40px',
                            width: '40px',
                            alignItems: 'center',
                            justifyContent: 'center',
                            display: 'flex'
                        }}
                        loading={"lazy"}
                        src={logo}
                        alt="Logo"
                    />
                </a>
                <Box
                    sx={{
                        display: 'flex',
                        overflowX: 'auto',
                        padding: '10px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'horizontal',
                        gap: '24px'
                    }}
                >
                    {allTags.map((tag, index) => {
                        const formattedPath = decodeURIComponent(location.pathname);
                        const isSelected = formattedPath.includes(tag)

                        return (
                            <Link
                                key={index}
                                component="button"
                                variant="body1"
                                color={isSelected ? Colors.PRIMARY_BLUE : 'black'}
                                sx={{fontSize: 14, fontWeight: '500'}}
                                underline="none"
                                onClick={() => handleTagClick(tag)}
                            >
                                {tag.toUpperCase()}
                            </Link>
                        )
                    })}
                </Box>
            </Box>
            <Divider sx={{backgroundColor: '#8c8c8c', height: 0.1, borderRadius: 100, marginTop: '10px'}}/>
        </div>
    )
}

export default TagsFilter