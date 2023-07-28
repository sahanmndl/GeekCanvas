import React from "react";
import TagsFilter from "../../components/TagsFilter/TagsFilter";
import AllPosts from "../../components/AllPosts/AllPosts";
import Footer from "../../components/Footer/Footer";
import "./styles.css";
import {Box, Typography} from "@mui/material";
import Colors from "../../utils/Colors";

const HomePage = () => {
    return (
        <>
            <div className={"db-main-bg"} style={{minHeight: '100vh'}}>
                <TagsFilter/>
                <Box style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    marginTop: '30px'
                }}>
                    <h1 style={{fontSize: '48px', fontWeight: '700', color: 'white'}}>
                        GeekCanvas
                    </h1>
                    <Typography
                        sx={{color: Colors.GREY}}
                        gutterBottom
                        variant="subtitle"
                        component="div"
                    >
                        Exploring the Cutting Edge: Your Gateway to AI, ML, Programming and Development Insights.
                    </Typography>
                </Box>
                <AllPosts/>
            </div>
            <Footer/>
        </>
    )
}

export default HomePage