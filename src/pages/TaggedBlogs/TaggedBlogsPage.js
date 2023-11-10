import React, {useEffect, useState} from "react";
import axios from "axios";
import {BASE_API_URL} from "../../utils/Constants";
import {Box, createTheme, LinearProgress, Typography} from "@mui/material";
import BlogCard from "../../components/BlogCard/BlogCard";
import TagsFilter from "../../components/TagsFilter/TagsFilter";
import {useParams} from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import useMediaQuery from "@mui/material/useMediaQuery";
import Colors from "../../utils/Colors";
import "./styles.css";
import {Helmet} from "react-helmet";

const TaggedBlogsPage = () => {

    const theme = createTheme({
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 900,
                lg: 1200,
                xl: 1920,
            },
        },
    });
    const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
    const isBigMobile = useMediaQuery(theme.breakpoints.only('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.only('md'));
    const isLaptop = useMediaQuery(theme.breakpoints.only('lg'));
    const isDesktop = useMediaQuery(theme.breakpoints.up('xl'));

    let cardsPerRow = 1;

    if (isMobile) {
        cardsPerRow = 2
    } else if (isBigMobile) {
        cardsPerRow = 3
    } else if (isTablet) {
        cardsPerRow = 3
    } else if (isLaptop) {
        cardsPerRow = 4
    } else if (isDesktop) {
        cardsPerRow = 5
    }

    const {tag} = useParams()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const getBlogs = async () => {
        setLoading(true)
        try {
            await axios.get(`${BASE_API_URL}/blogs/getBlogs`)
                .then((response) => setData(response.data.blogs))
                .catch((e) => console.error(e))
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getBlogs()
    }, [])

    if (loading) {
        return <LinearProgress/>;
    }

    const filteredBlogs = data.filter((blog) => blog.tags.includes(tag))

    return (
        <>
            <div style={{backgroundColor: 'white', display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
                <Helmet>
                    <meta charSet="utf-8"/>
                    <title>{tag}</title>
                    <meta name="description" content={`Blogs filtered by ${tag}`}/>
                </Helmet>
                <TagsFilter/>
                {filteredBlogs.length > 0 ? (
                    <Box
                        style={{
                            flex: 1,
                            display: 'flex',
                            flexWrap: 'wrap',
                            marginTop: '50px',
                            marginBottom: '50px',
                            justifyContent: 'center',
                            minHeight: '100vh'
                        }}
                        gap={1.2}
                    >
                        {filteredBlogs.map((item, index) => (
                            <Box
                                key={index}
                                width={`calc(100% / ${cardsPerRow + 1})`}
                                maxWidth={`calc(100% / ${cardsPerRow + 1})`}
                                maxHeight={'400px'}
                                flexShrink={0}
                            >
                                <BlogCard item={item} borderRadius={'8px'}/>
                            </Box>
                        ))}
                    </Box>
                ) : (
                    <div style={{padding: '4%', alignItems: 'center', justifyContent: 'center'}}>
                        <Typography sx={{color: Colors.YELLOW}} variant="subtitle1">No blogs found.</Typography>
                    </div>
                )}
            </div>
            <Footer/>
        </>
    )
}

export default TaggedBlogsPage