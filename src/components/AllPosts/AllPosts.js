import React, {useEffect, useState} from "react";
import axios from "axios";
import {BASE_API_URL} from "../../utils/Constants";
import {Box, createTheme, LinearProgress, Link, Typography} from "@mui/material";
import BlogCard from "../BlogCard/BlogCard";
import {useNavigate} from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import "./styles.css";
import Colors from "../../utils/Colors";

const AllPosts = () => {

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

    const navigate = useNavigate()
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
        return <LinearProgress style={{margin: '8%'}}/>
    }

    const sortedBlogs = data.sort((a, b) => b.createdAt.localeCompare(a.createdAt))

    return (
        <div style={{paddingBottom: '3%', paddingTop: '4%', minHeight: '100vh'}}>
            {sortedBlogs.length > 0 ? (
                <>
                    <Box
                        style={{display: 'flex', flexWrap: 'wrap', marginBottom: '30px', justifyContent: 'center'}}
                        gap={1.2}
                    >
                        {sortedBlogs.slice(0, cardsPerRow * 3).map((item, index) => (
                            <Box
                                key={index}
                                width={`calc(100% / ${cardsPerRow + 1})`}
                                maxWidth={`calc(100% / ${cardsPerRow + 1})`}
                                flexShrink={0}
                                maxHeight={'480px'}
                            >
                                <BlogCard item={item} borderRadius={'10px'}/>
                            </Box>
                        ))}
                    </Box>
                    {sortedBlogs.length > cardsPerRow * 3 && (
                        <Box
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Link
                                component="button"
                                variant="body1"
                                color={Colors.YELLOW}
                                sx={{fontWeight: '700', fontSize: 13}}
                                underline="none"
                                onClick={() => navigate("/blogs/allBlogs")}
                            >
                                VIEW ALL BLOGS
                            </Link>
                        </Box>
                    )}
                </>
            ) : (
                <div style={{padding: '4%', alignItems: 'center', justifyContent: 'center'}}>
                    <Typography sx={{color: Colors.YELLOW}} variant="subtitle1">No blogs found.</Typography>
                </div>
            )}
        </div>
    )
}

export default AllPosts