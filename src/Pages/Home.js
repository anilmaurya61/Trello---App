import React from 'react';
import { useAuth } from '../services/AuthContext';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MyApp from '../services/title';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import TrelloIcon from '../assets/trello-logo.svg';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { signOut, user } = useAuth();
    const navigate = useNavigate()
    console.log(user);

    return (
        <>
            <MyApp dynamicTitle='Home' />
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <img sx={{ height: '40px', marginRight: '10px' }} src={TrelloIcon} alt="TrelloIcon" />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {user?.photoURL ? (
                                <img
                                    src={user.photoURL}
                                    alt="userProfile"
                                    sx={{ width: '50px', height: '50px', borderRadius: '50%' }}
                                />
                            ) : (
                                <AccountCircleOutlinedIcon sx={{ marginRight: '5px' }} />
                            )}                            <Typography variant="body1">{user?.displayName || "userName"}</Typography>
                            <Button color="inherit" onClick={()=>{signOut().then(()=>navigate('/')) }} sx={{ marginLeft: '10px' }}>LOGOUT</Button>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography sx={{ fontSize: '2rem', fontWeight: '900', margin: '1rem 5rem' }}>Your Boards</Typography>
                <Box
                    sx={{
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        padding: '10px',
                        marginBottom: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '50%',
                        marginX: '5rem'
                    }}
                >
                    <Typography sx={{ flexGrow: 1 }}>Board Name</Typography>
                    <Button sx={{ marginRight: '10px' }}>Edit</Button>
                    <Button>Delete</Button>
                </Box>
                <Box
                    sx={{
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        padding: '10px',
                        marginBottom: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '50%',
                        marginX: '5rem'
                    }}
                >
                    <Typography sx={{ flexGrow: 1 }}>Board Name</Typography>
                    <Button sx={{ marginRight: '10px' }}>Edit</Button>
                    <Button>Delete</Button>
                </Box>
                <Box
                    sx={{
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        padding: '10px',
                        marginBottom: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '50%',
                        marginX: '5rem'
                    }}
                >
                    <Typography sx={{ flexGrow: 1 }}>Board Name</Typography>
                    <Button sx={{ marginRight: '10px' }}>Edit</Button>
                    <Button>Delete</Button>
                </Box>
                <Button variant="outlined" size="large">
                    Create New Board
                </Button>
            </Box>
        </>
    );
};

export default Home;
