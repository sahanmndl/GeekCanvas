import React from "react";
import {Card, CardContent, CardMedia, Typography} from "@mui/material";

const AuthorCard = ({item}) => {

    const {name, image, designation} = item

    return (
        <Card
            className={"glassmorph_style"}
            elevation={4}
            sx={{
                backgroundColor: 'transparent',
                width: '200px',
                height: '100%',
                cursor: 'pointer',
                transition: 'box-shadow 0.3s ease',
                '&:hover': {
                    boxShadow: '0 0 10px rgba(128, 128, 128, 0.8)',
                },
                borderRadius: '8px',
                borderWidth: 0
            }}
        >
            <CardMedia
                sx={{height: '150px', borderTopLeftRadius: '4px', borderTopRightRadius: '4px'}}
                image={image}
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
                    {name}
                </Typography>
                <Typography
                    gutterBottom
                    variant="body2"
                    color="text.secondary"
                    component="div"
                    sx={{marginTop: '20px', color: 'whitesmoke'}}
                >
                    {designation}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default AuthorCard