import React, {useEffect, useState} from "react";
import axios from "axios";
import {BASE_API_URL} from "../../utils/Constants";
import {Box, Card, CardContent, CardMedia, LinearProgress, Link, Typography} from "@mui/material";
import Tags from "../Tags/Tags";
import {useNavigate} from "react-router-dom";
import Colors from "../../utils/Colors";
import "./styles.css";

const RightBarBlogs = () => {

    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const getBlogs = async () => {
        setLoading(true)
        try {
            await axios.get(`${BASE_API_URL}/blogs/getBlogs`)
                .then((response) => setData(response.data.blogs))
                .catch((e) => console.error(e))
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getBlogs()
    }, [])

    if (loading) {
        return <LinearProgress/>;
    }

    const shuffledData = data.sort(() => 0.5 - Math.random())
    const selectedBlogs = shuffledData.slice(0, 4)

    return (
        <>
            <Typography component="div" sx={{
                fontWeight: '500',
                fontSize: '24px',
                color: 'black',
                marginBottom: '10px',
                marginLeft: '8px',
                fontFamily: "Calibri, sans-serif"
            }}>
                You might also like
            </Typography>
            {selectedBlogs.length > 0 ? (
                selectedBlogs.map((blog) => (
                    <Card
                        className={"glassmorph_style"}
                        key={blog._id}
                        elevation={4}
                        sx={{
                            backgroundColor: 'transparent',
                            marginLeft: '8px',
                            marginRight: '8px',
                            marginBottom: '16px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'box-shadow 0.3s ease',
                            '&:hover': {
                                boxShadow: '0 0 10px rgba(128, 128, 128, 0.8)',
                            },
                            borderWidth: 0
                        }}
                        onClick={() => window.open(`/blog/open-blog?id=${blog._id}`, '_blank')}
                    >
                        <CardMedia
                            sx={{height: '150px'}}
                            image={blog.pic}
                            title="image"
                        />
                        <CardContent>
                            <Typography
                                sx={{
                                    color: 'black',
                                    fontWeight: '500',
                                    display: '-webkit-box',
                                    overflow: 'hidden',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: 2,
                                }}
                                variant="h6"
                            >
                                {blog.title}
                            </Typography>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                gap: '8px',
                                marginTop: '10px'
                            }}>
                                {blog.tags.map((tag, index) => (
                                    <Tags title={tag}/>
                                ))}
                            </Box>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <Typography sx={{color: Colors.YELLOW}} variant="subtitle1">No blogs found.</Typography>
            )}
            {selectedBlogs.length > 0 && (
                <Box style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    marginTop: '10px'
                }}>
                    <Link
                        component="button"
                        variant="body1"
                        color={Colors.YELLOW}
                        sx={{fontWeight: '700', fontSize: 13, marginLeft: '8px', marginRight: '8px'}}
                        underline="none"
                        onClick={() => navigate("/blogs/allBlogs")}
                    >
                        VIEW MORE BLOGS
                    </Link>
                </Box>
            )}
        </>
    )
}

export default RightBarBlogs