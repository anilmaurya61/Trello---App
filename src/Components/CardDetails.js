import React, { useEffect, useState } from 'react'
import { Box, Button, IconButton, TextField, Typography } from '@mui/material'
import { Cancel as CancelIcon } from '@mui/icons-material';
import Todos from './CardDetails/Todos'
import { addComments, getComments } from '../services/firestoreService';

const CardDetails = ({ cardDetailsData, setCardDetailsState }) => {

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    }
    const handleComment = async () => {
        setComments([comment, ...comments]);
        await addComments({
            'boardId': cardDetailsData.boardId,
            'listId': cardDetailsData.listData.id,
            'cardId': cardDetailsData.cardId,
            'comment': comment
        })
    }
    useEffect(() => {
        const fetchComments = async ({ boardId, listId, cardId }) => {
            try {
                const comments = await getComments({ boardId, listId, cardId });
                let revComment = comments.reverse();
                setComments(revComment);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };
        fetchComments({
            boardId: cardDetailsData.boardId,
            listId: cardDetailsData.listData.id,
            cardId: cardDetailsData.cardId,
        });
    }, [cardDetailsData]);

    return (
        <>
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    minHeight: '100%',
                    backdropFilter: 'blur(0.7px)',
                    zIndex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        minHeight: '70%',
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
                    <Todos cardInfo={cardDetailsData} />
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
                    <Box sx={{ width: '70%', margin: '3rem 15%', display: 'table' }}>
                        <Typography>Comments</Typography>
                        {comments.length > 0 ? comments.map((comment, index) => (
                            <Typography
                                key={index}
                                sx={{
                                    display: 'table-row',
                                    backgroundColor: '#f5f5f5',
                                    padding: '2rem',
                                    marginBottom: '1rem',
                                    borderRadius: '8px',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                {comment}
                            </Typography>
                        ))
                            :
                            <Typography sx={{ marginLeft: '0.5rem', color: 'grey' }}>No Comments Yet</Typography>
                        }
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default CardDetails
