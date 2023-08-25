import React, {useEffect, useState} from "react";
import {Card, CardContent, Divider, LinearProgress, Typography} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import axios from "axios";
import {BASE_API_URL} from "../../../utils/Constants";

const DailyTrendingBlogs = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const getBlogs = async () => {
        setLoading(true)
        try {
            await axios.get(`${BASE_API_URL}/blogs/getDailyTrendingBlogs`)
                .then((response) => setData(response.data.blogs))
                .catch((e) => console.error(e))
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
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
        getBlogs()
    }, [])

    if (loading) {
        return <LinearProgress/>;
    }

    return (
        <div>
            <Typography component="div" sx={{
                fontWeight: '700',
                fontSize: '40px',
                color: 'white',
                fontFamily: "Calibri, sans-serif"
            }}>
                Trending Today
            </Typography>
            <Divider sx={{backgroundColor: '#8c8c8c', height: 2, marginTop: '10px', marginBottom: '20px'}}/>
            {data.length > 0 && (
                <Carousel
                    autoPlay={true}
                    animation="slide"
                    sx={{height: '550px', backgroundColor: 'transparent'}}
                >
                    {data.map((blog, index) => (
                        <Card
                            key={index}
                            sx={{
                                cursor: 'pointer',
                                transition: 'box-shadow 0.3s ease',
                                '&:hover': {
                                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                                }
                            }}
                            onClick={() => {
                                window.open(`/blog/open-blog?id=${blog._id}`, '_blank')
                                updateClickCount(blog._id)
                            }}
                        >
                            <img
                                src={blog.pic}
                                alt="picture"
                                loading={"lazy"}
                                style={{
                                    width: '100%',
                                    height: '520px',
                                    borderRadius: '4px',
                                    backgroundColor: 'transparent',
                                    objectFit: 'cover'
                                }}
                            />
                            <CardContent
                                style={{
                                    position: 'absolute',
                                    bottom: '0',
                                    background: 'rgba(0, 0, 0, 0.4)',
                                    marginBottom: '5px',
                                    borderRadius: 8
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: 'white',
                                        display: '-webkit-box',
                                        overflow: 'hidden',
                                        WebkitBoxOrient: 'vertical',
                                        WebkitLineClamp: 2
                                    }}
                                >
                                    {blog.title}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Carousel>
            )}
        </div>
    )
}

export default DailyTrendingBlogs