import React from 'react'
import { useAuth } from '../services/AuthContext'

const Home = () => {
    const { SignOut} = useAuth();
  return (
    <>
      <h1>Home Page</h1>
      <button onClick={SignOut}>SignOut</button>
    </>
  )
}

export default Home
