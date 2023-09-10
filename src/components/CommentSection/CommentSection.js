import React, {useEffect, useState} from "react";
import axios from "axios";
import {BASE_API_URL} from "../../utils/Constants";
import CommentItem from "./CommentItem/CommentItem";
import {Button, LinearProgress, TextField} from "@mui/material";

const CommentSection = ({blogId}) => {

    const [newComment, setNewComment] = useState("")
    const [comments, setComments] = useState([])
    const [postLoading, setPostLoading] = useState(false)
    const [fetchLoading, setFetchLoading] = useState(false)

    const fetchComments = async () => {
        try {
            setFetchLoading(true)
            await axios.get(`${BASE_API_URL}/blogs/getBlogComments/${blogId}`)
                .then((response) => {
                    setComments(response.data.comments)
                })
                .catch((e) => console.error(e))
        } catch (e) {
            console.error(e)
        } finally {
            setFetchLoading(false)
        }
    }

    const addNewComment = async () => {
        try {
            setPostLoading(true)
            const requestBody = {
                blogId: blogId,
                comment: newComment.trim()
            }
            await axios.post(`${BASE_API_URL}/blogs/addBlogComment`, requestBody)
                .then((response) => {
                    setNewComment("")
                    fetchComments()
                })
                .catch((e) => console.error(e))
        } catch (e) {
            console.error(e)
        } finally {
            setPostLoading(false)
        }
    }

    useEffect(() => {
        fetchComments()
    }, [])

    if (fetchLoading) {
        return <LinearProgress/>
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px', width: '100%'}}>
            {comments.map((comment) => (
                <CommentItem name={comment.name} comment={comment.comment}/>
            ))}
            <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
                <TextField
                    style={{width: '100%'}}
                    label="Comment..."
                    variant="outlined"
                    multiline={true}
                    maxRows={5}
                    minRows={5}
                    value={newComment}
                    onChange={(event) => {
                        setNewComment(event.target.value)
                    }}
                    InputProps={{
                        placeholder: 'Comment...',
                        inputProps: {
                            style: {
                                color: 'whitesmoke',
                            },
                        },
                    }}
                    InputLabelProps={{
                        style: {
                            color: 'whitesmoke'
                        },
                    }}
                />
                <div style={{display: 'flex', flexDirection: 'row-reverse', marginTop: '10px'}}>
                    <Button
                        style={{width: '140px', height: '40px'}}
                        variant="contained"
                        color="primary"
                        size="small"
                        disabled={newComment.trim() === ""}
                        onClick={() => addNewComment()}
                    >
                        <span style={{color: newComment.trim() === "" ? 'slategray' : 'white'}}>
                            {postLoading ? "..." : "Add Comment"}
                        </span>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CommentSection