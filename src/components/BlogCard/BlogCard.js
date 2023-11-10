import React from "react";
import {Box, Card, CardContent, CardMedia, Typography} from "@mui/material";
import Tags from "../Tags/Tags";
import {formatDate} from "../../utils/HelperFunctions";
import "./styles.css";
import Colors from "../../utils/Colors";
import axios from "axios";
import {BASE_API_URL} from "../../utils/Constants";

const BlogCard = ({item, borderRadius}) => {

    const {_id, title, metaDesc, pic, author, tags, createdAt} = item

    const updateClickCount = async () => {
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

    return (
        <Card
            className={"glassmorph_style"}
            elevation={4}
            sx={{
                backgroundColor: 'transparent',
                width: '100%',
                height: '100%',
                cursor: 'pointer',
                transition: 'box-shadow 0.3s ease',
                '&:hover': {
                    boxShadow: '0 0 10px rgba(128, 128, 128, 0.8)',
                },
                borderRadius: borderRadius,
                borderWidth: 0
            }}
            onClick={() => {
                window.open(`/blog/open-blog?id=${_id}`, '_blank')
                updateClickCount()
            }}
        >
            <CardMedia
                sx={{height: '150px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px'}}
                image={pic}
                title="image"
            />
            <CardContent>
                <Typography
                    sx={{
                        color: 'black',
                        display: '-webkit-box',
                        overflow: 'hidden',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                    }}
                    gutterBottom
                    variant="h6"
                    component="div"
                >
                    {title}
                </Typography>
                <Typography
                    sx={{
                        display: '-webkit-box',
                        overflow: 'hidden',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                        marginTop: '8px'
                    }}
                    variant="body2"
                    color={Colors.DARK}
                >
                    {metaDesc}
                </Typography>
                <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '8px', marginTop: '14px'}}>
                    {tags.map((tag, index) => (
                        <Tags title={tag}/>
                    ))}
                </Box>
                <Typography
                    gutterBottom
                    color={Colors.GREY}
                    component="div"
                    sx={{marginTop: '20px', fontSize: '13px'}}
                >
                    {formatDate(createdAt)}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default BlogCard