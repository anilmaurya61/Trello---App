import React from 'react'
import { Box, Skeleton } from '@mui/material';

const BoardsSkeleton = () => {
    return (
        <>
            <Box sx={{ width: '50%', height: '20rem', marginBottom: '10px' }}>
                <Skeleton width="100%" height="6rem" />
                <Skeleton width="100%" height="6rem" animation="wave" />
                <Skeleton width="100%" height="6rem" animation={false} />
            </Box>
        </>
    )
}

export { BoardsSkeleton }
