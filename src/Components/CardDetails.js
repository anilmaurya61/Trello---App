import React, { useState } from 'react'
import { Box, Button, IconButton, TextField, Typography } from '@mui/material'
import { Cancel as CancelIcon } from '@mui/icons-material';
import TodoList from './CardDetails/TodoList'

const CardDetails = ({ cardDetailsData, setCardDetailsState }) => {

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    }
    const handleComment = () =>{
        console.log(comment)
        setComments([...comments, comment]); 
    }
    
    return (
        <>
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backdropFilter: 'blur(0.7px)',
                    zIndex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        height: '70%',
                        width: '60%',
                        background: '#ebecf0',
                        position: 'absolute',
                        top: '15%',
                        boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.3)',
                        borderRadius: '10px',
                    }}
                >
                    <IconButton onClick={setCardDetailsState} aria-label="cancel" size="large" sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}>
                        <CancelIcon />
                    </IconButton>
                    <h1 style={{ margin: '1rem 15%' }}>{cardDetailsData.cardTitle}</h1>
                    <TodoList />
                    <Box sx={{ width: '70%', margin: '3rem 15%' }}>
                        <TextField
                            id="outlined-basic"
                            label="Write a Comment ..."
                            variant="outlined"
                            sx={{ width: '100%', margin: '0.5rem 0' }}
                            value={comment}
                            onChange={handleCommentChange}
                        />
                        <Button variant='contained' onClick={handleComment}>Save</Button>
                    </Box>
                    <Box sx={{ width: '70%', margin: '3rem 15%' }}>
                        {comments.map((comment,index)=>(
                            <Typography key={index}>{comment}</Typography>
                        ))}
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default CardDetails
