import React, {useEffect, useState} from "react";
import axios from "axios";
import {BASE_API_URL} from "../../utils/Constants";
import {Box, createTheme, LinearProgress} from "@mui/material";
import BlogCard from "../BlogCard/BlogCard";
import useMediaQuery from '@mui/material/useMediaQuery';

const BottomBarBlogs = () => {

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

    const shuffledData = data.sort(() => 0.5 - Math.random())

    return (
        <Box style={{
            display: 'flex',
            paddingTop: '4%',
            paddingBottom: '4%',
            paddingLeft: '8.5%',
            paddingRight: '8.5%',
            justifyContent: 'center'
        }} gap={1.2}>
            {shuffledData.slice(0, cardsPerRow).map((item, index) => (
                <Box key={index} width={`${100 / cardsPerRow}%`}>
                    <BlogCard item={item} borderRadius={'8px'}/>
                </Box>
            ))}
        </Box>
    )
}

export default BottomBarBlogs