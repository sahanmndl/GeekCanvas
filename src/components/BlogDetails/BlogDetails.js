import React from "react";
import {Box, Typography} from "@mui/material";
import {formatDate} from "../../utils/HelperFunctions";
import Tags from "../Tags/Tags";

const BlogDetails = ({blog}) => {

    const date = formatDate(blog.createdAt)

    return (
        <Box style={{display: 'flex', flexDirection: 'column', paddingBottom: '10px'}}>
            <Typography
                gutterBottom
                variant="h3"
                component="div"
                sx={{fontWeight: '700', color: 'black'}}
            >
                {blog.title}
            </Typography>
            <Typography
                gutterBottom
                variant="body2"
                color="text.secondary"
                component="div"
                sx={{marginTop: '4px', color: 'black'}}
            >
                {date}
            </Typography>
            <Typography
                gutterBottom
                variant="body2"
                color="text.secondary"
                component="div"
                sx={{marginTop: '4px', color: 'grey'}}
            >
                Reading Time: {blog.readMinutes} mins read
            </Typography>
            <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '8px', marginTop: '10px'}}>
                {blog.tags.map((tag, index) => (
                    <Tags title={tag}/>
                ))}
            </Box>
            <img
                src={blog.pic}
                alt="Blog Picture"
                loading={"lazy"}
                style={{width: '100%', height: '100%', objectFit: 'cover', marginTop: '20px', borderRadius: 8}}
            />
            <Typography
                gutterBottom
                color="text.primary"
                sx={{marginTop: '20px', width: '85%', fontSize: '17.5px', color: 'black'}}
            >
                <span dangerouslySetInnerHTML={{__html: blog.content}}/>
            </Typography>
            <Typography
                gutterBottom
                color="text.primary"
                sx={{marginTop: '10px', color: 'grey'}}
            >
                Blog written by
            </Typography>
            <Box style={{display: 'flex', alignItems: 'center'}}>
                <img
                    src={blog.authorPic}
                    alt="Author Picture"
                    style={{width: '45px', height: '45px', objectFit: 'contain', borderRadius: 100}}
                />
                <Typography
                    gutterBottom
                    color="text.secondary"
                    component="div"
                    sx={{marginLeft: '10px', color: 'black'}}
                >
                    {blog.author}
                </Typography>
            </Box>
        </Box>
    )
}

export default BlogDetails