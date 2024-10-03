import './App.css';
import theme from './context/theme';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthProvider from './context/AuthProvider';
import ForgotPassword from './common/forgotPassword/ForgotPassword';
import ResetPassword from './common/resetPassword/ResetPassword';
import OTPVerification from './common/verifyOtp/OTPVerification';
import LoginPage from './common/login/LoginPage';
import EmployerSignUpPage from './pages/employer/signup/EmployerSignupPage';
import EmployeeSignUpPage from './pages/employee/signup/EmployeeSignUpPage';
import WelcomePage from './components/welcomePage/WelcomePage';
import EmployeeDashboard from './pages/employee/dashboard/EmployeeDashboard';
import PrivatePath from './common/privatePath/PrivatePath';
import ExperienceProvider from './context/ExperienceProvider';
import JobAppliedApplications from './pages/employer/dashboard/jobPosts/JobAppliedApplications';
import UpdatePassword from './common/updatePassword/UpdatePassword';
import EmployeeProfile from './pages/employee/profile/EmployeeProfile';
import Home from './pages/homePage/Home';
import JobsPage from './pages/findJobs/JobsPage';
import MainLayout from './components/layout/MainLayout';
import SidebarLayout from './components/layout/SideBarLayout';
import EmployerDashboard from './pages/employer/dashboard/EmployerDashboard';
import AddJobPosts from './pages/employer/dashboard/jobPosts/AddJobPosts';
import EditJobPosts from './pages/employer/dashboard/jobPosts/EditJobPosts';
import JobPosts from './pages/employer/dashboard/jobPosts/JobPosts';
import EmployerProfile from './pages/employer/dashboard/profile/EmployerProfile';




function App() {
  return (
    <>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <ExperienceProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<MainLayout />}>
                  <Route path='/' element={<WelcomePage />} />
                  <Route path='/employer/signup' element={<EmployerSignUpPage />} />
                  <Route path='/employee/signup' element={<EmployeeSignUpPage />} />
                  <Route path='/login' element={<LoginPage />} />
                  <Route path='/forgot-password' element={<ForgotPassword />} />
                  <Route path='/update-password' element={<UpdatePassword />} />
                  <Route path='/verify-otp' element={<OTPVerification />} />
                  <Route path='/home-page' element={<Home />} />
                  <Route path='/find-jobs' element={<PrivatePath><JobsPage /></PrivatePath>} />
                </Route>

                <Route element={<SidebarLayout />}>
                  <Route path='/employer-dashboard'> 
                  <Route path='home' element={<PrivatePath><EmployerDashboard /></PrivatePath>} />
                  <Route path='change-password' element={<PrivatePath><ResetPassword /></PrivatePath>} />
                  <Route path='applied-job-posts' element={<PrivatePath><JobAppliedApplications /></PrivatePath>} />
                  <Route path='add-new-jobs' element={<PrivatePath><AddJobPosts /></PrivatePath>} />
                  <Route path='edit-jobs' element={<PrivatePath><EditJobPosts /></PrivatePath>} />
                  <Route path='manage-jobs' element={<PrivatePath><JobPosts /></PrivatePath>} />
                  </Route>
                </Route>




                <Route path='/employee/dashboard' element={<PrivatePath><EmployeeDashboard /></PrivatePath>} />
                <Route path='/employee/profile' element={<PrivatePath><EmployeeProfile /></PrivatePath>} />
                <Route path='/employer/jobs' element={<PrivatePath><JobPosts /></PrivatePath>} />



              </Routes>
            </BrowserRouter>
          </ExperienceProvider>
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}

export default App;
