import React from "react";
import {Box, Card, CardContent, CardMedia, Typography} from "@mui/material";
import Tags from "../Tags/Tags";
import {formatDate} from "../../utils/HelperFunctions";
import "./styles.css";
import Colors from "../../utils/Colors";

const BlogCard = ({item, borderRadius}) => {

    const {_id, title, metaDesc, pic, author, tags, createdAt} = item

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
            onClick={() => window.open(`/blog/open-blog?id=${_id}`, '_blank')}
        >
            <CardMedia
                sx={{height: '150px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px'}}
                image={pic}
                title="image"
            />
            <CardContent>
                <Typography
                    sx={{
                        color: 'white',
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
                    color='#BDBDBD'
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