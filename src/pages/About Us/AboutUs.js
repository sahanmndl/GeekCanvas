import React from "react";
import "./styles.css";
import TagsFilter from "../../components/TagsFilter/TagsFilter";
import Footer from "../../components/Footer/Footer";
import {Box, Typography} from "@mui/material";
import {Helmet} from "react-helmet";

const AboutUs = () => {
    return (
        <>
            <div className={"db-main-bg"} style={{minHeight: '100vh'}}>
                <TagsFilter/>
                <Helmet>
                    <meta charSet="utf-8"/>
                    <title>{"About Us"}</title>
                    <meta
                        name="description"
                        content={"GeekCanvas about us"}
                    />
                </Helmet>
                <Box style={{
                    display: 'flex',
                    flexDirection: 'column',
                    paddingTop: '4%',
                    paddingBottom: '4%',
                    paddingLeft: '8.5%',
                    paddingRight: '8.5%',
                    minHeight: '100vh'
                }}>
                    <Typography
                        sx={{color: 'white', fontWeight: '700', marginBottom: '40px'}}
                        gutterBottom
                        variant="h4"
                        component="div"
                    >
                        About Us
                    </Typography>
                    <Typography
                        sx={{color: 'white', fontSize: 18}}
                        gutterBottom
                        variant="body1"
                        component="div"
                    >
                        Welcome to GeekCanvas, your ultimate destination for exploring the ever-evolving world of
                        technology. Here we delve deep into the realms of Artificial Intelligence (AI), Machine
                        Learning (ML), Data Structures and Algorithms (DSA), Mobile App Development, Web
                        Development and Competitive Coding. Our goal is to provide you with valuable knowledge, practical tips, and real-world
                        examples to help you stay ahead in this fast-paced technological landscape.
                    </Typography>
                </Box>
            </div>
            <Footer/>
        </>
    )
}

export default AboutUs