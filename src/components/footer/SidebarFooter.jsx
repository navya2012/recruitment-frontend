import { Box, Typography } from '@mui/material'
import React from 'react'

const SidebarFooter = () => {
  return (
    <>
     <Box component="footer" sx={{ height:'20vH',display:'flex', alignItems:'center', justifyContent:'center' }}>
      <Typography variant='body2' sx={{fontSize:'17px'}}>
      © 2023 Careerpedia by ib-themes. All Right Reserved.
      </Typography>
     </Box>
    </>
  )
}

export default SidebarFooter