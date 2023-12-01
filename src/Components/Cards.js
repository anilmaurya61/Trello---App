import React, { useState } from "react";
import { Button, TextField, Box, Typography, IconButton } from '@mui/material';
import { AddOutlined as AddIcon, Close as CloseIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import CardDetails from "./CardDetails";
import { createCard, deleteList, deleteCard, editCardTitle } from '../services/firestoreService'
import { useParams } from "react-router-dom";


export default function Cards({ listData }) {

    const [addaCard, setAddaCard] = useState(true);
    const [cards, setCards] = useState(listData?.Cards || []);
    const [cardTitle, setCardTitle] = useState('');
    const [cardDetailsState, setCardDetailsState] = useState(false);
    const [cardDetailsData, setCardDetailsData] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const { boardId } = useParams();
    const [editedCardTitle, setEditedCard] = useState('');
    const [cardId, setCardId] = useState('');

    const handleCardEditTitleChange = (event) => {
        setEditedCard(event.target.value)
    }

    const handleEditCard = ({ cardId, cardTitle }) => {
        setEditedCard(cardTitle)
        setCardId(cardId);
        setIsEdit(!isEdit)
    }
    const handleSaveCardEdit = async () => {
        setIsEdit(!isEdit)
        const updatedCards = cards.map((card) => {
            if (card.cardId === cardId) {
                return {
                    ...card,
                    cardTitle: editedCardTitle,
                };
            }
            return card;
        });

        setCards(updatedCards);

        await editCardTitle({ 'editedCardTitle': editedCardTitle, 'cardId': cardId, 'boardId': boardId, 'listId': listData.id });
        setCardId('');
        setEditedCard('');
    }

    const handleCardTitleChange = (event) => {
        setCardTitle(event.target.value);
    }
    const handleAddaCard = () => {
        setAddaCard(!addaCard)
    }

    const handleCardDetailsState = ({ cardTitle, cardId }) => {
        setCardDetailsData({ boardId, cardTitle, cardId,'listId': listData.id, listData })
        setCardDetailsState(!cardDetailsState)
    }

    const handleAddCard = async () => {
        if (cardTitle !== '') {
            const updatedCards = [...cards];
            updatedCards.push({ 'cardTitle': cardTitle });
            setCards(updatedCards);
            setCardTitle('');
            await createCard({ 'cardTitle': cardTitle, 'boardId': boardId, 'listId': listData.id });
        }
    }

    const handleListDelete = async () => {
        await deleteList({ 'boardId': boardId, 'listId': listData.id })
    }
    const handleCardDelete = async (id) => {
        let cardsData = cards.filter(c => c.cardId == id);
        setCards(cardsData)
        await deleteCard({ 'boardId': boardId, 'listId': listData.id, 'cardId': id })
    };

    return (
        <>
            <Box sx={{ width: '300px', backgroundColor: '#ebecf0', borderRadius: '10px', padding: '16px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h6">{listData.listTitle}</Typography>
                    <IconButton aria-label="delete" onClick={() => handleListDelete(listData.id)}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                {isEdit && <Box sx={{
                    padding: '10px',
                    margin: '10px'
                }}>
                    <TextField
                        id="outlined-basic"
                        label="Enter Card Name to Update ..."
                        variant="outlined"
                        style={{ marginBottom: '10px' }}
                        value={editedCardTitle}
                        onChange={handleCardEditTitleChange}
                    />
                    <Button
                        variant="contained"
                        onClick={handleSaveCardEdit}
                        style={{ backgroundColor: '#4CAF50', color: 'white' }}
                    >
                        Save
                    </Button>
                </Box>}

                {cards && cards.map((card, index) => {
                    return (
                        <Box key={index}
                            sx={{
                                width: '250px',
                                backgroundColor: 'white',
                                minHeight: '20px',
                                borderRadius: '10px',
                                padding: '10px',
                                margin: '10px',
                                boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography onClick={() => handleCardDetailsState({ 'cardTitle': card.cardTitle, 'cardId': card.cardId })} variant="h6">{card.cardTitle}</Typography>
                            <Box>
                                <IconButton aria-label="edit" onClick={() => handleEditCard({ 'cardId': card.cardId, 'cardTitle': card.cardTitle })}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton aria-label="delete" onClick={() => handleCardDelete(card.cardId)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    )
                })
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
            {cardDetailsState && <CardDetails setCardDetailsState={handleCardDetailsState} cardDetailsData={cardDetailsData} />}
        </>
    );
}