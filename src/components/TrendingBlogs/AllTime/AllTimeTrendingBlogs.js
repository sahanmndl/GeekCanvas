import React, {useEffect, useState} from "react";
import {Box, Card, CardContent, Divider, LinearProgress, Typography} from "@mui/material";
import axios from "axios";
import {BASE_API_URL} from "../../../utils/Constants";
import Colors from "../../../utils/Colors";
import Tags from "../../Tags/Tags";

const AllTimeTrendingBlogs = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const getBlogs = async () => {
        setLoading(true)
        try {
            await axios.get(`${BASE_API_URL}/blogs/getAllTimeTrendingBlogs`)
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
                color: 'black',
                fontFamily: "Calibri, sans-serif"
            }}>
                Top Blogs
            </Typography>
            <Divider sx={{backgroundColor: '#8c8c8c', height: 2, marginTop: '10px'}}/>
            {data.length > 0 ? (
                data.map((blog) => (
                    <Card
                        key={blog._id}
                        sx={{
                            backgroundColor: 'transparent',
                            marginLeft: '8px',
                            marginRight: '8px',
                            marginBottom: '8px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'box-shadow 0.3s ease'
                        }}
                        elevation={0}
                        onClick={() => {
                            window.open(`/blog/open-blog?id=${blog._id}`, '_blank')
                            updateClickCount(blog._id)
                        }}
                    >
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
                        <Divider sx={{backgroundColor: '#8c8c8c', height: '1px', marginLeft: '8px', marginRight: '8px'}}/>
                    </Card>
                ))
            ) : (
                <div style={{margin: '8px', alignItems: 'center', justifyContent: 'center'}}>
                    <Typography sx={{color: Colors.YELLOW, fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"}}
                                variant="subtitle1">No blogs found.</Typography>
                </div>
            )}
        </div>
    )
}

export default AllTimeTrendingBlogs