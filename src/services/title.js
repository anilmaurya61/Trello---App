import React, { useEffect } from 'react';

const MyApp = ({ dynamicTitle = "App" }) => {
  useEffect(() => {
    document.title = `Trello - ${dynamicTitle}`;
  }, [dynamicTitle]);

};

export default MyApp;
