import './App.css';
import theme from './context/theme';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthProvider from './context/AuthProvider';
import ForgotPassword from './common/forgotPassword/ForgotPassword';
import OTPVerification from './common/verifyOtp/OTPVerification';
import LoginPage from './common/login/LoginPage';
import EmployerSignUpPage from './pages/employer/signup/EmployerSignupPage';
import EmployeeSignUpPage from './pages/employee/signup/EmployeeSignUpPage';
import WelcomePage from './components/welcomePage/WelcomePage';
import PrivatePath from './common/privatePath/PrivatePath';
import ExperienceProvider from './context/ExperienceProvider';
import JobAppliedApplications from './pages/employer/dashboard/jobPosts/JobAppliedApplications';
import UpdatePassword from './common/updatePassword/UpdatePassword';
import Home from './pages/homePage/Home';
import JobsPage from './pages/findJobs/JobsPage';
import MainLayout from './components/layout/MainLayout';
import EmployerDashboard from './pages/employer/dashboard/homePage/EmployerDashboard';
import AddJobPosts from './pages/employer/dashboard/jobPosts/AddJobPosts';
import EditJobPosts from './pages/employer/dashboard/jobPosts/EditJobPosts';
import EmployerProfile from './pages/employer/dashboard/profile/EmployerProfile';
import EditEmployerProfile from './pages/employer/dashboard/profile/EditEmployerProfile';
import SideBarProvider from './context/SideBarProvider';
import EmployerSidebarLayout from './components/layout/EmployerSideBarLayout';
import CandidatesSidebarLayout from './components/layout/CandidatesSideBarLayout';
import EmployeeDashboard from './pages/employee/dashboard/homePage/EmployeeDashboard';
import ChangePassword from './common/changePassword/ChangePassword';
import EmployeeProfile from './pages/employee/dashboard/profile/profileDetails/EmployeeProfile';
import EditEmployeeProfile from './pages/employee/dashboard/profile/profileDetails/EditEmployeeProfile';
import AddWorkingExperience from './pages/employee/dashboard/profile/workingExperience/AddWorkingExperience';
import EditWorkingExperience from './pages/employee/dashboard/profile/workingExperience/EditWorkingExperience';
import JobPostsList from './pages/employer/dashboard/jobPosts/JobPostsList';
import AppliedJobs from './pages/employee/dashboard/jobPosts/AppliedJobs';






function App() {
  return (
    <>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <SideBarProvider>
            <ExperienceProvider>
              <BrowserRouter>
                <Routes>
                  <Route element={<MainLayout />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/register' element={<WelcomePage />} />
                    <Route path='/employer/signup' element={<EmployerSignUpPage />} />
                    <Route path='/employee/signup' element={<EmployeeSignUpPage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/forgot-password' element={<ForgotPassword />} />
                    <Route path='/update-password' element={<UpdatePassword />} />
                    <Route path='/verify-otp' element={<OTPVerification />} />
                    <Route path='/home-page'element={<PrivatePath><Home /></PrivatePath>} />
                    <Route path='/find-jobs' element={<PrivatePath><JobsPage /></PrivatePath>} />
                  </Route>

                  <Route element={<EmployerSidebarLayout />}>
                    <Route path='/employer-dashboard'>
                      <Route path='home' element={<PrivatePath><EmployerDashboard /></PrivatePath>} />
                      <Route path='change-password' element={<PrivatePath><ChangePassword /></PrivatePath>} />
                      <Route path='applied-job-posts' element={<PrivatePath><JobAppliedApplications /></PrivatePath>} />
                      <Route path='add-new-jobs' element={<PrivatePath><AddJobPosts /></PrivatePath>} />
                      <Route path='edit-jobs/:id' element={<PrivatePath><EditJobPosts /></PrivatePath>} />
                      <Route path='manage-jobs' element={<PrivatePath><JobPostsList /></PrivatePath>} />
                      <Route path='employer-profile-details' element={<PrivatePath><EmployerProfile /></PrivatePath>} />
                      <Route path='edit-employer-profile' element={<PrivatePath><EditEmployerProfile /></PrivatePath>} />
                    </Route>
                  </Route>

                  <Route element={<CandidatesSidebarLayout />}>
                    <Route path='/candidate-dashboard'>
                      <Route path='home' element={<PrivatePath><EmployeeDashboard /></PrivatePath>} />
                      <Route path='change-password' element={<PrivatePath><ChangePassword /></PrivatePath>} />
                      <Route path='applied-jobs-list' element={<PrivatePath><AppliedJobs /></PrivatePath>} />
                      <Route path='employee-profile-details' element={<PrivatePath><EmployeeProfile /></PrivatePath>} />
                      <Route path='edit-employee-profile' element={<PrivatePath><EditEmployeeProfile /></PrivatePath>} />
                      <Route path='add-working-experience' element={<PrivatePath><AddWorkingExperience /></PrivatePath>} />
                      <Route path='edit-working-experience' element={<PrivatePath><EditWorkingExperience /></PrivatePath>} />
                    </Route>
                  </Route>

                </Routes>
              </BrowserRouter>
            </ExperienceProvider>
          </SideBarProvider>
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}

export default App;
