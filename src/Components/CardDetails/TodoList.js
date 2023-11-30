import React, { useState } from 'react';
import { Box } from '@mui/material';
import Cards from '../Cards';
import AddTodoList from './AddTodoList';


const TodoList = () => {
  const [showCard, setShowCard] = useState(false);
  const [listTitle, setListTitle] = useState('');


  return (
    <Box sx={{minWidth:'300px'}}>
      {!showCard ?
        <AddTodoList setListTitle={setListTitle} setShowCard={setShowCard} />
        :
        <Box sx={{display:'flex', gap:'1rem'}}>
          <Cards listTitle={listTitle} />
        </Box>
      }
    </Box>
  );
};

export default TodoList;
