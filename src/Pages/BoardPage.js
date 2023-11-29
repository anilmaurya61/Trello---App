import React, { useEffect, useState } from 'react';
import { styled, useTheme, Button } from '@mui/material';
import { useParams, useNavigate, Link } from 'react-router-dom';
import MyApp from '../services/title';
import Lists from '../Components/List';
import UserInfo from '../Components/UserInfo';
import { ToastContainer, toast } from 'react-toastify';
import { getImagesFromStorage } from '../services/firebaseStorage'
import { getBoards, deleteBoard } from '../services/firestoreService'
import { useAuth } from '../services/AuthContext';



import {
    Box,
    Drawer,
    CssBaseline,
    AppBar as MuiAppBar,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListItem
} from '@mui/material';
import {
    Menu as MenuIcon,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
    Delete as DeleteIcon,
} from '@mui/icons-material';



const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
    const theme = useTheme();
    const { boardName, boardId } = useParams();
    const [open, setOpen] = useState(false);
    const [boards, setBoards] = useState([]);
    const [imageData, setImageData] = useState([]);
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const [listsCount, setListsCount] = useState(1);

    const handleListClick = () => {
        setListsCount(prevCount => prevCount + 1);
    };
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    // const handleListItemClick = ( boardName, id ) => {
    //     navigate.replace(`${encodeURIComponent(boardName)}/${id}`, { replace: true });
    // };

    useEffect(() => {
        const fetchData = async (userId) => {
            try {
                const boards = await getBoards(userId);
                setBoards(boards);
                const images = await getImagesFromStorage();
                setImageData(images);
            }
            catch (err) {
                toast.error("Error loading data. Please try again.");
            }
        };
        console.log(user)
        if (user) {
            fetchData(user?.uid);
        }

    }, [user]);

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
            <MyApp dynamicTitle={boardName} />
            <ToastContainer />
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" open={open} >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, ...(open && { display: 'none' }) }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            {boardName}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <DrawerHeader>
                        <UserInfo />
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <Box sx={{ width: '239px', height: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Link to='/home' sx={{ width: '170px', margin: '1rem 0', textDecoration: 'none' }}>
                            <Button variant="contained" size="medium">
                                Home
                            </Button>
                        </Link>
                    </Box>

                    <Divider />
                    <List sx={{ height: '78vh' }}>
                        <ListItem>Your boards</ListItem>
                        {boards.map((board) => (
                            <ListItem key={board.id} disablePadding >
                                <ListItemButton sx={{ display: 'flex' }}>
                                    <Link to={`${encodeURIComponent(board.boardName)}/${board.id}`} action="REPLACE" style={{ textDecoration: 'none' }}>
                                        <ListItemIcon>
                                            <img
                                                src={board.backgroundImage}
                                                alt="selected image"
                                                style={{ height: '20px', margin: '0.5rem' }}
                                            />
                                        </ListItemIcon>
                                        <span style={{ color: 'black' }}>{board.boardName.length > 5 ? `${board.boardName.slice(0, 5)}...` : board.boardName}</span>
                                    </Link>
                                </ListItemButton>
                                <IconButton onClick={() => handleDeleteBoard(board.id)} aria-label="delete" size="small" sx={{ margin: '0.5rem' }}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>
                        ))}

                    </List>
                    <Divider />
                    <Box sx={{ width: '150px', margin: '1rem auto 0rem auto' }}>
                        <Link to='/'><Button onClick={signOut} variant="outlined" size="medium">
                            Logout
                        </Button>
                        </Link>
                    </Box>

                </Drawer>
                <Main open={open} sx={{
                    backgroundImage: `url('https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    minHeight: '100vh',
                    width: '100%',
                    height: '100%',
                }}>
                    <DrawerHeader />
                    <Box sx={{ display: 'flex', gap: '1rem' }}>
                        {[...Array(listsCount)].map((_, index) => (
                            <Lists key={index} onClick={handleListClick} />
                        ))}
                    </Box>
                </Main>
            </Box>
        </>
    );
}