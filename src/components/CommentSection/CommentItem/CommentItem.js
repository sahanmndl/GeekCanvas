import React from "react";
import {Typography} from "@mui/material";

const CommentItem = ({name, comment}) => {

    return (
        <div style={{display: 'flex', flexDirection: 'column', padding: '10px'}}>
            <Typography
                gutterBottom
                variant="body2"
                component="div"
                sx={{color: 'grey'}}
            >
                @{name}
            </Typography>
            <Typography
                gutterBottom
                variant="subtitle"
                component="div"
                sx={{color: 'whitesmoke'}}
            >
                {comment}
            </Typography>
        </div>
    )
}

export default CommentItem