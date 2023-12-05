import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

function ImageItem({ item, onClick, isSelected}) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };
  return (
    <div style={{display:'flex',justifyContent:'center', alignItems:'center', height: '100px', width: '100px', border: isSelected ? '5px solid green' : 'none', borderRadius: '10px', overflow: 'hidden' }}>
      {!isLoaded && <CircularProgress />}
      <img
        src={item}
        alt={item}
        onClick={() => {
          onClick(item);
        }}
        onLoad={handleImageLoad}
        style={{ display: isLoaded ? 'block' : 'none', height: '100%', width: '100%' }}
      />
    </div>
  );
}

export default ImageItem;
