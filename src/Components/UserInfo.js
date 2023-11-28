import React from 'react'
import { Avatar, Box,Typography } from '@mui/material'
import { AccountCircleOutlined as AccountIcon } from '@mui/icons-material';
import { useAuth } from '../services/AuthContext';


const UserInfo = () => {

    const { signOut, user } = useAuth();

    return (
        <>
            <Box sx={{ display: 'flex', alignItems:'center', justifyContent:'center' }}>
                {user?.photoURL ? (
                    <Avatar alt="Travis Howard" src={user.photoURL} sx={{ marginRight: '5px' }} />
                ) : (
                    <AccountIcon sx={{ marginRight: '5px' }} />
                )}
                <Typography variant="body1">{user?.displayName || "userName"}</Typography>
            </Box>
        </>
    )
}

export default UserInfo
