import React from 'react'
import { Box, Grid, Paper } from '@mui/material'
import Header from '../../../components/header/Header'

const EmployerDashboard = () => {
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ width: '100%' }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Header/>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  )
}

export default EmployerDashboard