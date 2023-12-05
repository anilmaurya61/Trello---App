import React, { useState } from 'react';
import { TextField, Box, ImageListItem, ImageList, Button, Stack } from '@mui/material';
import { AddCircleOutline as AddCircleOutlineIcon, Cancel as CancelIcon, Save as SendIcon } from '@mui/icons-material';
import { createBoard } from '../services/firestoreService';
import MyApp from '../services/title';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import LoadingButton from '@mui/lab/LoadingButton';
import ImageItem from './ImageItem';

const CreateBoardPopup = ({ closeCreateBoardPopup, imageData, userId }) => {
  const [selectedImage, setSelectedImage] = useState("https://firebasestorage.googleapis.com/v0/b/trello-app-13979.appspot.com/o/Images%2Fimage1.jpg?alt=media&token=57faea79-579b-45a0-bced-eaaac4dd9548")
  const [boardName, setBoardName] = useState("");
  const [loading, setLoading] = useState(false);
  const [textError, setTextError] = useState('');
  const navigate = useNavigate();

  const handleCreateBoard = async () => {
    try {
      if (boardName.length > 0) {
        setLoading(true);

        const id = await createBoard(boardData);

        navigate(`${encodeURIComponent(boardName)}/${id}`);
      }
      else {
        setTextError('Board name cannot be empty');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error creating board 🤯');
    }
  };

  const handleBoardNameChange = (event) => {
    setTextError('')
    setBoardName(event.target.value);
  };

  let boardData = {
    'boardName': boardName,
    'backgroundImage': selectedImage,
    'userId': userId,
    'createdAt': new Date(),
  }

  return (
    <>
      <MyApp dynamicTitle='Create Board' />
      <ToastContainer />
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          backdropFilter: 'blur(0.7px)',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            background: 'white',
            position: 'absolute',
            padding: '30px',
            top: '15%',
            boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.3)',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            alignItems: 'center',
            zIndex:2
          }}
        >
          <TextField error={textError !== ''} helperText={textError !== '' ? 'Board name cannot be empty' : ''}
            id="outlined-error" value={boardName} onChange={handleBoardNameChange} label="Enter Board  Name here ..." variant="outlined" sx={{ width: '28rem', margin:'20px 30px' }} />
          <span style={{ margin: '10px', color: 'grey' }}>Select Board Background</span>
          <Box>
            <ImageList sx={{ width: 450, marginTop: '10px' }} cols={4} rowHeight={100} rows={2}>
              {imageData.map((item, index) => (
                <ImageListItem key={index} >
                  <ImageItem
                    key={index}
                    item={item}
                    onClick={setSelectedImage}
                    isSelected={selectedImage === item}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
          <Stack direction="row" spacing={2} sx={{ margin: '20px' }}>
            <LoadingButton
              onClick={handleCreateBoard}
              startIcon={<AddCircleOutlineIcon />}
              loading={loading}
              loadingPosition="start"
              variant="contained"
              color="success"
            >
              <span>Create</span>
            </LoadingButton>
            <Button variant="outlined" color="error" endIcon={<CancelIcon />} onClick={closeCreateBoardPopup}>
              Cancel
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default CreateBoardPopup;
