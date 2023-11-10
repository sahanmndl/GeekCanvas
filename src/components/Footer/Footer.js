import React, {useState} from "react";
import {Link, Typography} from "@mui/material";
import axios from "axios";
import {BASE_API_URL} from "../../utils/Constants";
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
        <div style={{
            backgroundColor: "#1E1E1E",
            paddingTop: '4%',
            paddingBottom: '4%',
            display: 'flex',
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div
                style={{
                    display: 'flex',
                    flex: 0.5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
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
            </div>
            <div style={{
                display: 'flex',
                flex: 0.5,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
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
                    onClick={() => window.open("https://geekcanvas-admin.vercel.app/", "_blank")}
                >
                    Contribute
                </Link>
            </div>
        </div>
    )
}

export default Footer