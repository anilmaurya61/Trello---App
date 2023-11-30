import React, { useState } from 'react';
import { Button, TextField, Box, Card, CardContent, Typography, IconButton } from '@mui/material';
import { AddOutlined as AddIcon, Close as CloseIcon } from '@mui/icons-material';


const AddTodoList = ({ setListTitle, setShowCard}) => {

  const handleListTitleChange = (e) => {
    setListTitle(e.target.value);
  };

  const handleAddList = () =>{
    setShowCard(true);
  }

  return (
    <Box width='300px'>
        <Box sx={{ backgroundColor: 'white', borderRadius: '10px', padding: '16px', display:'flex', width:'70%' }}>
          <TextField onChange={ handleListTitleChange } label="Todo List title" variant="outlined" sx={{ marginBottom: '10px', width: '100%' }} />
          <Button onClick={handleAddList} variant="contained" sx={{ margin: '10px', width: '75%' }}>
            Add Todo List
          </Button>
        </Box>
    </Box>
  );
};

export default AddTodoList;