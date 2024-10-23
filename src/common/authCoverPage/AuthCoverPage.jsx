import React from 'react'
import { Box } from '@mui/material';

const AuthCoverPage = () => {
  return (
    <>
       <Box
      display="flex"
      justifyContent="center"
      alignItems="start"
      height="100%"
    >
      <img
        src={require("../../Assets/signup.png")} 
        alt="cover"
        style={{ maxWidth: '100%', maxHeight: '100%', width:'500px' }}
      />
    </Box>
    </>
  )
}

export default AuthCoverPage