import React from "react";
import TagsFilter from "../../components/TagsFilter/TagsFilter";
import AllPosts from "../../components/AllPosts/AllPosts";
import Footer from "../../components/Footer/Footer";
import "./styles.css";
import {Box, Grid, Typography} from "@mui/material";
import Colors from "../../utils/Colors";
import AllTimeTrendingBlogs from "../../components/TrendingBlogs/AllTime/AllTimeTrendingBlogs";
import DailyTrendingBlogs from "../../components/TrendingBlogs/Daily/DailyTrendingBlogs";
import SearchBar from "../../components/Search/SearchBar";

const HomePage = () => {
    return (
        <>
            <div style={{minHeight: '100vh', backgroundColor: 'white'}}>
                <TagsFilter/>
                <Box style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    marginTop: '30px'
                }}>
                    <h1 style={{fontSize: '48px', fontWeight: '700', color: 'black'}}>
                        GeekCanvas
                    </h1>
                </Box>
                <SearchBar/>
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