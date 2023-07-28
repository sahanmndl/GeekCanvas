import React, {useState} from "react";
import {Alert, Box, Button, Snackbar, TextField} from "@mui/material";
import axios from "axios";
import {BASE_API_URL} from "../../utils/Constants";

const Newsletter = () => {

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
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Box sx={{display: 'flex'}}>
                    <TextField
                        style={{width: '250px', backgroundColor: 'whitesmoke'}}
                        label="Sign up for our Newsletter!"
                        variant="outlined"
                        size="small"
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value)
                        }}
                        InputProps={{
                            placeholder: 'Enter email',
                            inputProps: {
                                style: {
                                    color: 'black',
                                },
                            },
                        }}
                    />
                    <Button
                        style={{marginLeft: '4px', width: '80px'}}
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
                </Box>
            </Box>
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
        </>
    )
}

export default Newsletter