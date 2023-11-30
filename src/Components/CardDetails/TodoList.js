import React, { useState } from 'react';
import { Box } from '@mui/material';
import Todos from './Todos';


const TodoList = () => {
  const [showCard, setShowCard] = useState(false);
  const [listTitle, setListTitle] = useState('');


  return (
    <Box sx={{ minWidth: '300px' }}>
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Todos listTitle={listTitle} />
      </Box>
    </Box>
  );
};

export default TodoList;
