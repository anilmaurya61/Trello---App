import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

function ImageItem({ item, onClick }) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div>
      <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>{!isLoaded && <CircularProgress />}</div>
      <img 
        src={item}
        alt={item}
        onClick={() => onClick(item)}
        onLoad={handleImageLoad}
        style={{ display: isLoaded ? 'block' : 'none', height:'auto', width:'100%' }}
      />
    </div>
  );
}

export default ImageItem;
