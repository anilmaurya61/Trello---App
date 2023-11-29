import React, { useState } from "react";
import { Button, TextField, Box, Typography, IconButton } from '@mui/material';
import { AddOutlined as AddIcon, Close as CloseIcon } from '@mui/icons-material';



export default function Todos({ listTitle }) {

    const [addaCard, setAddaCard] = useState(true);
    const [cards, setCards] = useState([]);
    const [cardTitle, setCardTitle] = useState('');
    const [cardDetailsState, setCardDetailsState] = useState(false);

    const handleCardTitleChange = (event) => {
        setCardTitle(event.target.value);
    }
    const handleAddaCard = () => {
        setAddaCard(!addaCard)
    }

    const handleAddCard = () => {
        if (cardTitle !== '') {
            const updatedCards = [...cards];
            updatedCards.push(cardTitle);
            setCards(updatedCards);
            setCardTitle('');
        }
    }


    return (
        <>
            <Box sx={{ width: '300px', backgroundColor: 'white', borderRadius: '10px', padding: '16px' }}>
                <Typography variant="h6">{listTitle}</Typography>
                {cards.length > 0 && cards.map((card, index) => (
                    <Box key={index} onClick={handleCardDetailsState}
                        sx={{
                            width: '250px',
                            backgroundColor: 'white',
                            borderRadius: '10px',
                            padding: '10px',
                            margin: '10px',
                            boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.3)',
                        }}
                    >
                        <Typography variant="h6">{card}</Typography>
                    </Box>
                ))
                }
                {addaCard ?
                    <Button onClick={handleAddaCard} variant="outlined" startIcon={<AddIcon />} sx={{ margin: '10px', width: '75%' }}>
                        Add a card
                    </Button>
                    : <Box sx={{
                        width: '250px',
                        backgroundColor: 'white',
                        borderRadius: '10px',
                        padding: '10px',
                        margin: '10px',
                        boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.3)',
                    }}>
                        <TextField value={cardTitle} onChange={handleCardTitleChange} label="Card title" variant="outlined" sx={{ marginBottom: '10px', width: '100%' }} />
                        <Button onClick={handleAddCard} variant="outlined" sx={{ margin: '10px', width: '65%' }}>
                            Add Card
                        </Button>
                        <IconButton onClick={handleAddaCard}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                }
            </Box>
        </>
    );
}