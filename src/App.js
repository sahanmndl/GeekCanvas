import HomePage from "./pages/Home/HomePage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import BlogPage from "./pages/Blog/BlogPage";
import TaggedBlogsPage from "./pages/TaggedBlogs/TaggedBlogsPage";
import AllBlogsPage from "./pages/AllBlogs/AllBlogsPage";
import AboutUs from "./pages/About Us/AboutUs";
import Authors from "./pages/Authors/Authors";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/blog/:id" element={<BlogPage/>}/>
                <Route path="/blogs/tagged/:tag" element={<TaggedBlogsPage/>}/>
                <Route path="/blogs/allBlogs/" element={<AllBlogsPage/>}/>
                <Route path="/blogs/authors/" element={<Authors/>}/>
                <Route path="/blogs/about-us/" element={<AboutUs/>}/>
            </Routes>
        </Router>
    );
}

export default App;
