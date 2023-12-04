import React, { useState, useEffect } from 'react';
import { useAuth } from '../services/AuthContext';
import { AppBar, Box, Toolbar, Typography, Button, Avatar, IconButton } from '@mui/material';
import { AccountCircleOutlined as AccountCircleOutlinedIcon } from '@mui/icons-material';
import MyApp from '../services/title';
import TrelloIcon from '../assets/trello-icon.svg';
import { useNavigate, Link } from 'react-router-dom';
import CreateBoardPopup from '../Components/CreateBoardPopup';
import { getImagesFromStorage } from '../services/firebaseStorage'
import { getBoards, deleteBoard } from '../services/firestoreService'
import { Delete as DeleteIcon, ModeEdit as EditIcon } from '@mui/icons-material';
import { BoardsSkeleton } from '../Components/Skeleton';
import { ToastContainer, toast } from 'react-toastify';

const Home = () => {
    const { signOut, user } = useAuth();
    const [isCreateBoardPopupOpen, setIsCreateBoardPopupOpen] = useState(false);
    const [imageData, setImageData] = useState([]);
    const [boards, setBoards] = useState([]);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async (userId) => {
            try {
                setLoading(true)
                const boards = await getBoards(userId);
                setLoading(false);
                setBoards(boards);
                const images = await getImagesFromStorage();
                setImageData(images);
            }
            catch (err) {
                toast.error("Error loading data. Please try again.");
            }
        };
        if (user) {
            fetchData(user?.uid);
        }

    }, [user]);

    function handleCreateBoardPopup() {
        setIsCreateBoardPopupOpen(!isCreateBoardPopupOpen);
    }

    async function handleDeleteBoard(id) {
        try {
            const isDeleted = await deleteBoard(id);
            if (isDeleted) {
                setBoards((boards) => boards.filter(board => board.id !== id))
            }
        }
        catch (error) {
            toast.error("Error Deleting Board. Please try again.");
        }
    }

    return (
        <>
            <MyApp dynamicTitle='Home' />
            <ToastContainer />
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <img sx={{ height: '40px', marginRight: '10px' }} src={TrelloIcon} alt="TrelloIcon" />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {user?.photoURL ? (
                                <Avatar alt="Travis Howard" src={user.photoURL} sx={{ marginRight: '5px' }} />
                            ) : (
                                <AccountCircleOutlinedIcon sx={{ marginRight: '5px' }} />
                            )}
                            <Typography variant="body1">{user?.displayName || "userName"}</Typography>
                            <Button variant="outlined" color="inherit" onClick={() => { signOut().then(() => navigate('/')) }} sx={{ marginLeft: '10px' }}>LOGOUT</Button>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography sx={{ fontSize: '2rem', fontWeight: '900', margin: '1rem 5rem' }}>Your Boards</Typography>
                {boards.length == 0 ?
                     loading ? <BoardsSkeleton /> : <Typography variant="h6" sx={{margin:'20px', color:'grey'}}>You have not created a board</Typography>
                    : boards?.map((board) => (
                        <Box key={board.id}
                            sx={{
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                padding: '10px 20px',
                                marginBottom: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '50%',
                                marginX: '5rem'
                            }}
                        >
                            <Link to={`${encodeURIComponent(board.boardName)}/${board.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Typography width='350px'>{board.boardName}</Typography>
                            </Link>

                            <Box>
                                <Link to={`${encodeURIComponent(board.boardName)}/${board.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <IconButton sx={{ marginRight: '30px', color: 'grey' }}>
                                        <EditIcon />
                                    </IconButton>
                                </Link>
                                <IconButton aria-label="delete" >
                                    <DeleteIcon onClick={() => handleDeleteBoard(board.id)} />
                                </IconButton>
                            </Box>
                        </Box>

                    ))}
                <Button variant="outlined" size="large" onClick={handleCreateBoardPopup}> Create New Board </Button>
                {isCreateBoardPopupOpen && <CreateBoardPopup closeCreateBoardPopup={handleCreateBoardPopup} imageData={imageData} userId={user?.uid} />}
            </Box>
        </>
    );
};

export default Home;
