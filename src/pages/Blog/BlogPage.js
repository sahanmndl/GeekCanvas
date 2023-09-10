import React, {useEffect, useState} from "react";
import TagsFilter from "../../components/TagsFilter/TagsFilter";
import {useLocation} from "react-router-dom";
import axios from "axios";
import {BASE_API_URL} from "../../utils/Constants";
import BlogDetails from "../../components/BlogDetails/BlogDetails";
import {Grid} from "@mui/material";
import RightBarBlogs from "../../components/RightBarBlogs/RightBarBlogs";
import Footer from "../../components/Footer/Footer";
import BottomBarBlogs from "../../components/BottomBarBlogs/BottomBarBlogs";
import "./styles.css";
import {Helmet} from "react-helmet";
import CommentSection from "../../components/CommentSection/CommentSection";

const BlogPage = () => {

    const location = useLocation()
    const [blog, setBlog] = useState(null)

    const getBlog = async () => {
        try {
            const searchParams = new URLSearchParams(location.search);
            const id = searchParams.get('id')
            await axios.get(`${BASE_API_URL}/blogs/getBlog/${id}`)
                .then((response) => setBlog(response.data.blog))
                .catch((e) => console.error(e))
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getBlog()
    }, []);

    return (
        <>
            <div className={"db-main-bg"} style={{minHeight: '100vh'}}>
                <TagsFilter/>
                {blog === null ? (
                    <h3>Loading...</h3>
                ) : (
                    <>
                        <Helmet>
                            <meta charSet="utf-8"/>
                            <title>{blog.metaTitle}</title>
                            <meta
                                name="description"
                                content={blog.metaDesc}
                            />
                        </Helmet>
                        <Grid container spacing={2}
                              sx={{
                                  marginTop: '20px',
                                  paddingLeft: '8.5%',
                                  paddingRight: '8.5%',
                                  marginBottom: '20px',
                                  minHeight: '100vh'
                              }}>
                            <Grid item xs={12} md={9}>
                                <BlogDetails blog={blog}/>
                            </Grid>
                            <Grid item xs={12} md={3} sx={{marginTop: '20px'}}>
                                <RightBarBlogs/>
                            </Grid>
                            <CommentSection blogId={blog._id} />
                        </Grid>
                        <BottomBarBlogs/>
                    </>
                )}
            </div>
            <Footer/>
        </>
    )
}

export default BlogPage