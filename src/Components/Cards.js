import React, { useEffect, useState } from "react";
import { Button, TextField, Box, Typography, IconButton} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import {

    AddOutlined as AddIcon,
    Close as CloseIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    ArrowLeft as ArrowLeftIcon,
    ArrowRight as ArrowRightIcon,
    ArrowDropUp as ArrowDropUpIcon,
    ArrowDropDown as ArrowDropDownIcon,

} from '@mui/icons-material';
import CardDetails from "./CardDetails";
import {

    createCard,
    deleteList,
    deleteCard,
    editCardTitle,
    shiftRightList,
    shiftLeftList,
    shiftCardUp,
    shiftCardDown,
    cardRightShift,
    cardLeftShift,

} from '../services/firestoreService'
import { useParams } from "react-router-dom";


export default function Cards({fetchLists, position, length, listData, setboardDetails }) {

    const [addaCard, setAddaCard] = useState(true);
    const [cards, setCards] = useState([]);
    const [cardTitle, setCardTitle] = useState('');
    const [cardDetailsState, setCardDetailsState] = useState(false);
    const [cardDetailsData, setCardDetailsData] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const { boardId } = useParams();
    const [editedCardTitle, setEditedCard] = useState('');
    const [cardId, setCardId] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setCards(listData?.Cards)
    }, [listData])

    const handleCardLeft = async (cardId) => {
        await cardLeftShift({ 'boardId': boardId, 'listId': listData.id, 'cardId': cardId })
        await fetchLists({'boardId': boardId});
    }

    const handleCardRight = async (cardId) => {
        await cardRightShift({ 'boardId': boardId, 'listId': listData.id, 'cardId': cardId })
        await fetchLists({'boardId': boardId});
    }
    const handleArrowLeft = async () => {
        await shiftLeftList({ 'boardId': boardId, 'listId': listData.id });
        await fetchLists({'boardId': boardId});
    }
    const handleArrowRight = async () => {
        await shiftRightList({ 'boardId': boardId, 'listId': listData.id })
        await fetchLists({'boardId': boardId});
    }

    const handleCardUp = async (cardId) => {
        await shiftCardUp({ 'boardId': boardId, 'listId': listData.id, 'cardId': cardId })
        await fetchLists({'boardId': boardId});
    }
    const handleCardDown = async (cardId) => {
        await shiftCardDown({ 'boardId': boardId, 'listId': listData.id, 'cardId': cardId })
        await fetchLists({'boardId': boardId});
    }
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
        setCardDetailsData({ boardId, cardTitle, cardId, 'listId': listData.id, listData, setboardDetails })
        setCardDetailsState(!cardDetailsState)
    }

    const handleAddCard = async () => {
        if (cardTitle !== '') {
            setLoading(true)
            await createCard({ 'cardTitle': cardTitle, 'boardId': boardId, 'listId': listData.id });
            await fetchLists({'boardId':boardId})
            setLoading(false);
            setCardTitle('');
        }
    }

    const handleListDelete = async () => {
        await deleteList({ 'boardId': boardId, 'listId': listData.id })
        await fetchLists({'boardId': boardId});    }
    const handleCardDelete = async (id) => {
        await deleteCard({ 'boardId': boardId, 'listId': listData.id, 'cardId': id })
        await fetchLists({'boardId': boardId});
    };

    return (
        <>
            <Box sx={{ width: '300px', backgroundColor: '#ebecf0', borderRadius: '10px', padding: '16px', transition: 'transform 0.3s ease-in-out', }}>
                <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <Box>
                        {position > 0 ? <IconButton >
                            <ArrowLeftIcon onClick={handleArrowLeft} />
                        </IconButton>
                            :
                            <IconButton disabled={true} >
                                <ArrowLeftIcon onClick={handleArrowLeft} />
                            </IconButton>
                        }

                        {position != length ?
                            <IconButton>
                                <ArrowRightIcon onClick={handleArrowRight} />
                            </IconButton>
                            :
                            <IconButton disabled={true}>
                                <ArrowRightIcon onClick={handleArrowRight} />
                            </IconButton>
                        }
                    </Box>
                    <IconButton aria-label="delete" onClick={() => handleListDelete(listData.id)}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h6">{listData.listTitle}</Typography>

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
                                width: '260px',
                                backgroundColor: 'white',
                                minHeight: '20px',
                                borderRadius: '10px',
                                padding: '10px',
                                margin: '8px',
                                boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.3)',
                            }}
                        >
                            <Typography onClick={() => handleCardDetailsState({ 'cardTitle': card.cardTitle, 'cardId': card.cardId })} variant="h6"sx={{ cursor: 'pointer', marginBottom:'10px' }}>{card.cardTitle}</Typography>
                            <Box>
                                <IconButton aria-label="edit" onClick={() => handleEditCard({ 'cardId': card.cardId, 'cardTitle': card.cardTitle })}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton aria-label="delete" onClick={() => handleCardDelete(card.cardId)}>
                                    <DeleteIcon />
                                </IconButton>
                                {index > 0 ?
                                    <IconButton>
                                        <ArrowDropUpIcon onClick={() => handleCardUp(card.cardId)} />
                                    </IconButton>
                                    :
                                    <IconButton disabled={true}>
                                        <ArrowDropUpIcon />
                                    </IconButton>}
                                {index != cards.length - 1 ?
                                    <IconButton>
                                        <ArrowDropDownIcon onClick={() => handleCardDown(card.cardId)} />
                                    </IconButton>
                                    :
                                    <IconButton disabled={true}>
                                        <ArrowDropDownIcon />
                                    </IconButton>}
                                {position > 0 ? <IconButton onClick={() => handleCardLeft(card.cardId)}>
                                    <ArrowLeftIcon />
                                </IconButton>
                                    :
                                    <IconButton disabled={true}>
                                        <ArrowLeftIcon />
                                    </IconButton>}
                                {position != length ?
                                    <IconButton onClick={() => handleCardRight(card.cardId)}>
                                        <ArrowRightIcon />
                                    </IconButton>
                                    :
                                    <IconButton disabled={true}>
                                        <ArrowRightIcon />
                                    </IconButton>
                                }
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
                        <LoadingButton loading = {loading} onClick={handleAddCard} variant="outlined" sx={{ margin: '10px', width: '65%' }}>
                            Add Card
                        </LoadingButton>
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