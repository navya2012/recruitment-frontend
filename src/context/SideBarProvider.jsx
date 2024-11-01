
import React, { createContext, useContext } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

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
          menuItem: 'Application Outcomes',
          path: '/employer-dashboard/review-job-applications',
          icon: <AssignmentTurnedInIcon />
        }
      ];

      const candidateMenuList = [
        { menuItem: 'Dashboard', path: '/candidate-dashboard/home', icon: <HomeIcon /> },
        { menuItem: 'Applied Jobs', path: '/candidate-dashboard/applied-jobs-list', icon: <AssignmentIcon /> }
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