import React, { useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import AddList from './AddList';
import { useParams } from 'react-router-dom';
import { createLists } from '../services/firestoreService';


const List = ({ setboardDetails }) => {
  const [showCard, setShowCard] = useState(false);
  const [listTitle, setListTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const { boardId } = useParams();


  const handleCreateLists = async () => {
    setLoading(true)
    await createLists({ 'boardId': boardId, 'listTitle': listTitle })
    setLoading(false)
    setListTitle('');
    setShowCard(false)
    setboardDetails();
  };
  return (
    <>
      <Box sx={{ minWidth: '300px' }}>
        {!showCard ?
           <AddList handleCreateLists={handleCreateLists} setListTitle={setListTitle} setShowCard={setShowCard} />
          :
          <Box sx={{ display: 'flex', gap: '1rem' }}>
           {!loading ? <AddList handleCreateLists={handleCreateLists} setListTitle={setListTitle} setShowCard={setShowCard} /> : <CircularProgress sx={{marginLeft:'30px'}}/>}
          </Box>
        }
      </Box>
    </>
  );
};

export default List;
