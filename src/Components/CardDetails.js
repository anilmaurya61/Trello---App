import React from 'react'
import { Box, IconButton, TextField } from '@mui/material'
import { Cancel as CancelIcon } from '@mui/icons-material';
import TodoList from './CardDetails/TodoList'

const CardDetails = ({cardDetailsData, setCardDetailsState}) => {
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
                    <h1 style={{margin:'1rem'}}>{cardDetailsData.cardTitle}</h1>
                    <TodoList/>
                    <TextField
                        id="outlined-basic"
                        label="Write a Comment ..."
                        variant="outlined"
                        sx={{ width: '70%', marginLeft: '5rem' }}
                    />
                </Box>
            </Box>
        </>
    )
}

export default CardDetails
