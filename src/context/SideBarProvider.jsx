
import React, { createContext, useContext } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LockIcon from '@mui/icons-material/Lock';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const SideBarContext = createContext();

export const useSideBarContextData = () => useContext(SideBarContext);

export const SideBarProvider = ({ children }) => {
    const employerMenuList = [
        {
          menuItem: 'Dashboard',
          path: '/employer-dashboard/home',
          icon: <HomeIcon />
        },
        {
          menuItem: 'Post A New Job',
          path: '/employer-dashboard/add-new-jobs',
          icon: <PostAddIcon />
        },
        {
          menuItem: 'Manage Jobs',
          path: '/employer-dashboard/manage-jobs',
          icon: <ManageSearchIcon />
        },
        {
          menuItem: 'All Applications',
          path: '/employer-dashboard/applied-job-posts',
          icon: <AssignmentIcon />
        },
        {
          menuItem: 'View Profile',
          path: '/employer-dashboard/employer-profile-details',
          icon: <AccountCircleIcon />
        },
        {
          menuItem: 'Change Password',
          path: '/employer-dashboard/change-password',
          icon: <LockIcon />
        },
        {
          menuItem: 'Logout',
          path: '/login',
          icon: <ExitToAppIcon />
        }
      ];

      const candidateMenuList = [
        { menuItem: 'Dashboard', path: '/candidate-dashboard/home', icon: <HomeIcon /> },
        { menuItem: 'My Profile', path: '/candidate-dashboard/employee-profile-details', icon: <AccountCircleIcon /> },
        { menuItem: 'Applied Jobs', path: '/candidate-dashboard/applied-jobs-list', icon: <AssignmentIcon /> },
        { menuItem: 'Change Password', path: '/candidate-dashboard/change-password', icon: <LockIcon /> },
        { menuItem: 'Logout', path: '/login', icon: <ExitToAppIcon /> },
      ];
  return (
    <>
      <SideBarContext.Provider value={{ employerMenuList, candidateMenuList}}>
        {children}
      </SideBarContext.Provider>
    </>
  )
}

export default SideBarProvider