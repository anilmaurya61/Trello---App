import React, { useState } from 'react';
import { Button, TextField, Box, Card, CardContent, Typography, IconButton } from '@mui/material';
import { AddOutlined as AddIcon, Close as CloseIcon } from '@mui/icons-material';


const AddList = ({onClick, setListTitle, setShowCard}) => {
  const [showButton, setShowButton] = useState(true);

  const handleAddButton = () => {
    setShowButton(!showButton);
  };

  const handleListTitleChange = (e) => {
    setListTitle(e.target.value);
  };

  const handleAddList = () =>{
    setShowCard(true);
  }

  return (
    <Box width='300px'>
      {showButton &&  (
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            handleAddButton();
            onClick(); 
          }}        
          sx={{ width: '300px', justifyContent: 'flex-start', textAlign: 'left' }}
        >
          Add A List
        </Button>
      )}

      {!showButton && (
        <Box sx={{ backgroundColor: 'white', borderRadius: '10px', padding: '16px' }}>
          <TextField onChange={ handleListTitleChange } label="List title" variant="outlined" sx={{ marginBottom: '10px', width: '100%' }} />
          <Button onClick={handleAddList} variant="contained" sx={{ margin: '10px', width: '75%' }}>
            Add List
          </Button>
          <IconButton onClick={handleAddButton}>
            <CloseIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default AddList;