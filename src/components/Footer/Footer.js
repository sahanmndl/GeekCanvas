import React, {useState} from "react";
import {Alert, Box, Button, Grid, IconButton, Link, Snackbar, TextField, Typography} from "@mui/material";
import axios from "axios";
import {BASE_API_URL} from "../../utils/Constants";
import {Instagram, LinkedIn} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import logo from "../../assets/logo.png";

const Footer = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = React.useState(false)
    const [error, setError] = useState(false)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    const subscribeToNewsletter = async () => {
        try {
            setLoading(true)
            const requestBody = {
                email: email.trim()
            }
            await axios.post(`${BASE_API_URL}/editorials/addEditorialSubscriber`, requestBody)
                .then((response) => {
                    setOpen(true)
                    setEmail("")
                })
                .catch((e) => setError(true))
        } catch (e) {
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Grid container spacing={0} style={{backgroundColor: "#1E1E1E", paddingTop: '4%', paddingBottom: '4%'}}>
            <Grid item xs={3}
                  sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingLeft: '4%'
                  }}>
                <img
                    style={{
                        height: '70px',
                        width: '70px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        display: 'flex'
                    }}
                    loading={"lazy"}
                    src={logo}
                    alt={"Logo"}
                />
                <Typography
                    style={{marginLeft: '10px', fontWeight: '700', fontSize: 22, color: 'white'}}
                    variant="subtitle1"
                >
                    GeekCanvas
                </Typography>
            </Grid>
            <Grid item xs={3}
                  sx={{display: 'flex', flexDirection: 'column', paddingLeft: '8%'}}>
                <Typography
                    style={{marginBottom: 10, fontWeight: '700', fontSize: 18, color: 'white'}}
                    variant="subtitle1"
                >
                    Useful Links
                </Typography>
                <Link
                    component="button"
                    variant="body1"
                    color={'white'}
                    sx={{fontSize: 16, textAlign: 'start'}}
                    underline="none"
                    onClick={(e) => {
                        e.preventDefault();
                        window.location.href = "/";
                    }}
                >
                    Home
                </Link>
                <Link
                    component="button"
                    variant="body1"
                    color={'white'}
                    sx={{fontSize: 16, marginTop: '8px', textAlign: 'start'}}
                    underline="none"
                    onClick={() => navigate("/blogs/authors")}
                >
                    Authors
                </Link>
                <Link
                    component="button"
                    variant="body1"
                    color={'white'}
                    sx={{fontSize: 16, marginTop: '8px', textAlign: 'start'}}
                    underline="none"
                    onClick={() => navigate("/blogs/about-us")}
                >
                    About Us
                </Link>
            </Grid>
            <Grid item xs={3}
                  sx={{display: 'flex', flexDirection: 'column', paddingLeft: '40px'}}>
                <Typography
                    style={{marginBottom: 10, fontWeight: '700', fontSize: 18, color: 'white', paddingLeft: '10px'}}
                    variant="subtitle1"
                >
                    Follow Us
                </Typography>
                <Link
                    component="button"
                    variant="body1"
                    color={'white'}
                    underline="none"
                    onClick={() => window.open("https://www.linkedin.com/in/sahan-mondal/", "_blank")}
                >
                    <Box style={{display: 'flex', alignItems: 'center'}}>
                        <IconButton sx={{color: 'white'}}>
                            <LinkedIn fontSize={"medium"}/>
                        </IconButton>
                        <Typography
                            variant="body1"
                            color="white"
                            sx={{fontSize: 16}}
                        >
                            LinkedIn
                        </Typography>
                    </Box>
                </Link>
                <Link
                    component="button"
                    variant="body1"
                    color={'white'}
                    underline="none"
                    onClick={() => window.open("https://www.instagram.com/sahanmndl/", "_blank")}
                >
                    <Box style={{display: 'flex', alignItems: 'center'}}>
                        <IconButton sx={{color: 'white'}}>
                            <Instagram fontSize={"medium"}/>
                        </IconButton>
                        <Typography
                            variant="body1"
                            color="white"
                            sx={{fontSize: 16}}
                        >
                            Instagram
                        </Typography>
                    </Box>
                </Link>
            </Grid>
            <Grid item xs={3}
                  sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      paddingRight: '7%'
                  }}>
                <Typography
                    style={{marginBottom: 10, fontWeight: '700', fontSize: 18, color: 'white'}}
                    variant="subtitle1"
                >
                    Sign up for our Newsletter!
                </Typography>
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <TextField
                        style={{width: '100%', backgroundColor: 'whitesmoke'}}
                        label="Email"
                        variant="outlined"
                        size="small"
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value)
                        }}
                    />
                    <Button
                        style={{marginLeft: '4px', width: '100px', height: '100%'}}
                        variant="contained"
                        color="primary"
                        size="small"
                        disabled={email.trim() === ""}
                        onClick={() => subscribeToNewsletter()}
                    >
                        <span style={{color: email.trim() === "" ? 'slategray' : 'white'}}>
                            {loading ? "..." : "Sign Up"}
                        </span>
                    </Button>
                    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                        {!error ? (
                            <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
                                Thank you for subscribing!
                            </Alert>
                        ) : (
                            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                                Cannot process your request
                            </Alert>
                        )}
                    </Snackbar>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Footer