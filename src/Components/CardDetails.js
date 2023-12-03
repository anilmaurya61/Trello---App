import React, { useEffect, useState } from 'react'
import { Box, Button, IconButton, TextField, Typography } from '@mui/material'
import { Cancel as CancelIcon } from '@mui/icons-material';
import Todos from './Todos'
import { addComments, getComments } from '../services/firestoreService';

const CardDetails = ({ cardDetailsData, setCardDetailsState }) => {

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [textError, setTextError] = useState('');

    const handleCommentChange = (event) => {
        setComment(event.target.value);
        setTextError('');
    }
    const handleComment = async () => {
        if (comment.trim() != '') {
            setComments([comment, ...comments]);
            await addComments({
                'boardId': cardDetailsData.boardId,
                'listId': cardDetailsData.listData.id,
                'cardId': cardDetailsData.cardId,
                'comment': comment
            })
            setComment('');
        }
        else {
            setTextError('Comment cannot be empty');
        }
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
                        minHeight: '85%',
                        width: '60%',
                        background: '#ebecf0',
                        position: 'absolute',
                        top: '10%',
                        boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.3)',
                        borderRadius: '10px',
                    }}
                >
                    <IconButton onClick={setCardDetailsState} aria-label="cancel" size="large" sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}>
                        <CancelIcon />
                    </IconButton>
                    <h1 style={{ margin: '1rem 15%' }}>{cardDetailsData.cardTitle}</h1>
                    <Todos cardInfo={cardDetailsData} />
                    <Box sx={{ width: '70%', margin: '0.5rem 15%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <TextField
                            error={textError !== ''} helperText={textError !== '' ? 'Comment cannot be empty' : ''}
                            id="outlined-error"
                            label="Write a Comment ..."
                            variant="outlined"
                            sx={{ width: '60%', margin: '0.5rem 0' }}
                            value={comment}
                            onChange={handleCommentChange}
                        />
                        <Button sx={{ width: '100px', height: '50px' }} variant='contained' onClick={handleComment}>Save</Button>
                    </Box>
                    <Box sx={{ width: '70%', margin: '0.5rem 15%', display: 'table' }}>
                        <Typography>Comments</Typography>
                        <Box sx={{ height: '10rem' }}>
                            <Box sx={{ overflowY: 'auto', height:'100%'}}>
                                {comments.length > 0 ? comments.map((comment, index) => (
                                    <Typography
                                        key={index}
                                        sx={{
                                            width: '500px',
                                            height:'35px',
                                            backgroundColor: '#f5f5f5',
                                            padding: '5px 10px',
                                            margin: '5px',
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
                </Box>
            </Box>
        </>
    )
}

export default CardDetails
