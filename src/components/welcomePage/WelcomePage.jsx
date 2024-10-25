import React, { useState } from 'react';
import { Box, Button, Typography, Container, RadioGroup, FormControlLabel, Radio, Grid } from '@mui/material';
import { styled } from '@mui/system';
import AuthCoverPage from '../../common/authCoverPage/AuthCoverPage';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../CSSModules/formStyles/formPageStyles.css'


// Styled components
const WelcomeContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  margin: "0 1rem",
  maxHeight:'auto',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

const RightSideForm = styled(Box)(({ theme }) => ({
   width: '57%',
  margin: '2rem',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    margin: '0',
    borderRadius: '0',
  },
}));

const StyledButton = styled(Button)(({ theme, disabled }) => ({
  cursor: disabled ? 'not-allowed' : 'pointer',
  '&:disabled': {
    background: '#E7E8EA',
    color: '#fff',
    fontSize: '20px',
  },
}));

const WelcomePage = () => {
  const [customer, setCustomer] = useState('');

  const navigate = useNavigate()

  const handleRadioChange = (event) => {
    setCustomer(event.target.value);
  };

  const handleNext = () => {
    if (customer !== '') {
      customer === 'Employer' ? navigate('/new-employer/signup') : navigate('/new-candidate/signup')
    } else {
      toast.error('Please select any from Employee or Employer', {
        position: "top-center",
        autoClose: 3000,
        className: 'custom-toast'
      });
    }
  };

  return (
    <Grid container height="auto" sx={{paddingBottom:'50px'}}>
      <Grid item xs={12} sm={6}>
        <AuthCoverPage />
      </Grid>
      <Grid item xs={12} sm={6} display="flex" alignItems="start" justifyContent="center">
        <Container maxWidth="xl">
          <WelcomeContainer>
            <RightSideForm>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Typography variant="h5" sx={{fontSize:'25px'}}>
                  Sign Up as a  . . .
                </Typography>
                <RadioGroup
                  aria-label="customer-type"
                  value={customer}
                  onChange={handleRadioChange}
                  sx={{ mt: 3, width: '100%' }}
                >
                  <FormControlLabel value="Employee" control={<Radio />} label="Employee" />
                  <FormControlLabel value="Employer" control={<Radio />} label="Employer" />
                </RadioGroup>
                <StyledButton
                  onClick={handleNext}
                  disabled={customer === ''}
                  variant="contained"
                  size="large"
                >
                  Confirm
                </StyledButton>

                <Box className='link-text-style' sx={{paddingTop:'10px'}}>Already have an account?
                <Link to='/login' className='link-style'>Login</Link>
              </Box>
              </Box>
             
            </RightSideForm>
          </WelcomeContainer>
          <Outlet/>
        </Container>
      </Grid>
    </Grid>
  );
}

export default WelcomePage;
