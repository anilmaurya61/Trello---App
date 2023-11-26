import React from 'react';
import Button from '@mui/material/Button';
import TrelloIcon from '../assets/trello-logo.svg'
import GoogleIcon from '../assets/google-icon.png'
import Profile from '../assets/profile.png'
import '../styles/SignIn.css'
import { useAuth } from '../services/AuthContext';

const SignIn = () => {
 
  const {signIn} = useAuth();

  return (
    <>
      <section className="sign-in-section">
        <div className="sign-in-container">
          <div className="sign-in-box">
            <img src={Profile} alt="profile-icon" />
            <h1>WELCOME</h1>
            <img src={TrelloIcon} alt="TrelloIcon" />
            <p>Log in to continue</p>
            <Button className='sign-in-btn' variant="outlined" onClick={signIn}>
              <img src={GoogleIcon} alt="Icon" /><span>Google</span>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignIn;
