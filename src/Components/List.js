import React, { useState } from 'react';
import { Box } from '@mui/material';
import Cards from './Cards';
import AddList from './AddList';
import { useParams } from 'react-router-dom';
import { createLists } from '../services/firestoreService';


const List = ({onClick}) => {
  const [showCard, setShowCard] = useState(false);
  const [listTitle, setListTitle] = useState('');
  const { boardName, boardId } = useParams();
  const handleCreateLists = async () => {
    await createLists({boardId, listTitle})
    console.log({ boardId, listTitle});
  };
  return (
    <Box sx={{minWidth:'300px'}}>
      {!showCard ?
        <AddList onClick={onClick} handleCreateLists = {handleCreateLists} setListTitle={setListTitle} setShowCard={setShowCard} />
        :
        <Box sx={{display:'flex', gap:'1rem'}}>
          <Cards listTitle={listTitle} />
        </Box>
      }
    </Box>
  );
};

export default List;
