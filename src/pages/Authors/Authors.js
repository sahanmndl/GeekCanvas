import React from "react";
import "./styles.css";
import TagsFilter from "../../components/TagsFilter/TagsFilter";
import Footer from "../../components/Footer/Footer";
import {AuthorsData} from "../../utils/AuthorsData";
import AuthorCard from "../../components/AuthorCard/AuthorCard";
import {Grid, Typography} from "@mui/material";
import {Helmet} from "react-helmet";

const Authors = () => {
    return (
        <>
            <div className={"db-main-bg"} style={{minHeight: '100vh'}}>
                <TagsFilter/>
                <Helmet>
                    <meta charSet="utf-8"/>
                    <title>{"Authors"}</title>
                    <meta
                        name="description"
                        content={"GeekCanvas Authors"}
                    />
                </Helmet>
                <Grid
                    sx={{flexGrow: 1, paddingTop: '4%', paddingBottom: '4%', paddingLeft: '8.5%', paddingRight: '8.5%'}}
                    container>
                    <Typography
                        sx={{color: 'white', fontWeight: '700', marginBottom: '40px'}}
                        gutterBottom
                        variant="h4"
                        component="div"
                    >
                        Authors
                    </Typography>
                    <Grid sx={{minHeight: '100vh'}} item xs={12}>
                        <Grid container spacing={4}>
                            {AuthorsData.map((item, index) => (
                                <Grid key={index} item>
                                    <AuthorCard item={item}/>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <Footer/>
        </>
    )
}

export default Authors