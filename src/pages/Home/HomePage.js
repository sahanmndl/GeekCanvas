import React from "react";
import TagsFilter from "../../components/TagsFilter/TagsFilter";
import AllPosts from "../../components/AllPosts/AllPosts";
import Footer from "../../components/Footer/Footer";
import "./styles.css";
import {Box, Grid, Typography} from "@mui/material";
import Colors from "../../utils/Colors";
import AllTimeTrendingBlogs from "../../components/TrendingBlogs/AllTime/AllTimeTrendingBlogs";
import DailyTrendingBlogs from "../../components/TrendingBlogs/Daily/DailyTrendingBlogs";

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
                <Grid
                    container
                    spacing={2.4}
                    sx={{paddingLeft: '8.5%', paddingRight: '8.5%', paddingTop: '3%'}}
                >
                    <Grid item xs={12} md={9}>
                        <DailyTrendingBlogs/>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <AllTimeTrendingBlogs/>
                    </Grid>
                </Grid>
                <AllPosts/>
            </div>
            <Footer/>
        </>
    )
}

export default HomePage