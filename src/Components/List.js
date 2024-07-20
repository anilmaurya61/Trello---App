import React, { useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import AddList from './AddList';
import { useParams } from 'react-router-dom';
import { createLists } from '../services/firestoreService';


const List = ({ fetchLists }) => {
  const [showCard, setShowCard] = useState(false);
  const [listTitle, setListTitle] = useState('');
  const [isLoading, setLoading] = useState(false);
  const { boardId } = useParams();

  const handleCreateLists = async () => {
    setLoading(true);
    await createLists({ 'boardId': boardId, 'listTitle': listTitle })
    await fetchLists({ 'boardId': boardId });
    setLoading(false)
    setShowCard(false)
    setListTitle('');
  };
  return (
    <>
      <Box sx={{ minWidth: '300px' }}>
        {!showCard ?
          <AddList isLoading={isLoading} handleCreateLists={handleCreateLists} setListTitle={setListTitle} setShowCard={setShowCard} />
          :
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <AddList isLoading={isLoading} handleCreateLists={handleCreateLists} setListTitle={setListTitle} setShowCard={setShowCard} />
          </Box>
        }
      </Box>
    </>
  );
};

export default List;
