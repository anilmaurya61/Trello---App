import React, { useState } from 'react';
import { Box } from '@mui/material';
import AddList from './AddList';
import { useParams } from 'react-router-dom';
import { createLists } from '../services/firestoreService';


const List = ({ setboardDetails }) => {
  const [showCard, setShowCard] = useState(false);
  const [listTitle, setListTitle] = useState('');
  const { boardId } = useParams();

  const handleCreateLists = async () => {
    await createLists({ 'boardId': boardId, 'listTitle': listTitle })
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
            <AddList handleCreateLists={handleCreateLists} setListTitle={setListTitle} setShowCard={setShowCard} />
          </Box>
        }
      </Box>
    </>
  );
};

export default List;
