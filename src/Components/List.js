import React, { useState } from 'react';
import { Box } from '@mui/material';
import Cards2 from './Cards2';
import AddList from './AddList';
import { useParams } from 'react-router-dom';
import { createLists } from '../services/firestoreService';


const List = () => {
  const [showCard, setShowCard] = useState(false);
  const [listTitle, setListTitle] = useState('');
  const { boardId } = useParams();

  const handleCreateLists = async () => {
    await createLists({ 'boardId': boardId, 'listTitle': listTitle })
  };
  return (
    <>
      <Box sx={{ minWidth: '300px' }}>
        {!showCard ?
          <AddList handleCreateLists={handleCreateLists} setListTitle={setListTitle} setShowCard={setShowCard} />
          :
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Cards2 listData={{'listTitle':listTitle}} />
          </Box>
        }
      </Box>
    </>
  );
};

export default List;
