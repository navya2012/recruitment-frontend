import axios from 'axios'
import { toast } from 'react-toastify'
import {  loginSuccess, logout, setAddProfileImage, setAllUsersImages, setLoading } from '../redux/slices/authSlice'
import '../CSSModules/formStyles/formPageStyles.css'

const BASE_URL = "https://recruitment-backend-production.up.railway.app/api/auth"

//sign up
export const signUp = (formData, navigate) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await axios.post(`${BASE_URL}/signup`, formData)
        if (response && response.data.token &&  response.status === 200) {
            const { token,signUpDetails } = response.data; 
            localStorage.setItem(`signUpToken`, token);
            localStorage.setItem('SignUpDetails', JSON.stringify(signUpDetails)); 
            toast.success(response.data.message, {
                position: "top-center",
                autoClose: 3000 ,
                className: 'custom-toast'
            });
            navigate('/verify-otp')
            return  { 
                success: true, 
                data: response.data 
            };
        }
    }
    catch (error) {
        let errorMessages = [];
        if (error.response && error.response.data && error.response.data.error) {
            if (Array.isArray(error.response.data.error)) {
                errorMessages = error.response.data.error.map(err => err.msg);
            } else if (typeof error.response.data.error === 'string') {
                errorMessages = [error.response.data.error];
            } else {
                errorMessages = ['An unknown error occurred'];
            }
        } 
        else {
            errorMessages = ['A network error occurred. Please try again later.'];
        }
        errorMessages && errorMessages.forEach(message => {
            toast.error(message, {
                position: "top-center",
                autoClose: 5000,
                className: 'custom-toast'
            });
        });
        return { 
            success: false, 
            errors: errorMessages 
        };
    }
    finally {
        dispatch(setLoading(false)); 
      }
}

//profile pic upload
export const imageUploads = (formData) => async (dispatch) => {
    dispatch(setLoading(true))
    try{
        const token = localStorage.getItem('loginToken');
        const response = await axios.post(`${BASE_URL}/profile-pic-upload`,formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                  },
            }
        )
        if (response && response.data &&  response.status === 200) {
            dispatch(setAddProfileImage(response.data.profileImageRecord))
            toast.success(response.data.message, {
                position: "top-center",
                autoClose: 3000 ,
                 className: 'custom-toast'});
            return  { 
                success: true, 
                data: response.data 
            };
        }
    }
    catch(error){ 
        let errorMessages = [];
        if (error.response && error.response.data && error.response.data.error) {
            if (Array.isArray(error.response.data.error)) {
                errorMessages = error.response.data.error.map(err => err.msg);
            } else if (typeof error.response.data.error === 'string') {
                errorMessages = [error.response.data.error];
            } else {
                errorMessages = ['An unknown error occurred'];
            }
        } else {
            // Handle cases where error.response is undefined
            errorMessages = ['A network error occurred. Please try again later.'];
        }
        toast.error(errorMessages.join(', '), {
            position: "top-center",
            autoClose: 3000,
             className: 'custom-toast'
          });
          return { 
            success: false, 
            errors: errorMessages 
        };
    }
    finally {
        dispatch(setLoading(false)); 
      }
}

//profile pic upload
export const getUserImages = () => async (dispatch) => {
    dispatch(setLoading(true))
    try{
        const response = await axios.get(`${BASE_URL}/users-profile-images`)
        if (response && response.data && response.status === 200) {
            dispatch(setAllUsersImages(response.data))
            return  { 
                success: true, 
                data: response.data 
            };
        }
    }
    catch(error){ 
        let errorMessages = [];
        if (error.response && error.response.data && error.response.data.error) {
            if (Array.isArray(error.response.data.error)) {
                errorMessages = error.response.data.error.map(err => err.msg);
            } else if (typeof error.response.data.error === 'string') {
                errorMessages = [error.response.data.error];
            } else {
                errorMessages = ['An unknown error occurred'];
            }
        } else {
            // Handle cases where error.response is undefined
            errorMessages = ['A network error occurred. Please try again later.'];
        }
        toast.error(errorMessages.join(', '), {
            position: "top-center",
            autoClose: 3000,
             className: 'custom-toast'
          });
          return { 
            success: false, 
            errors: errorMessages 
        };
    }
    finally {
        dispatch(setLoading(false)); 
      }
}

//verify otp
export const verifyOtp =  async ( otp, navigate) => {
    try{
        const signUpToken = localStorage.getItem('signUpToken');
        const passwordToken = localStorage.getItem('passwordToken');

        const token = signUpToken ? signUpToken : passwordToken;

        const response = await axios.post(`${BASE_URL}/verify-otp`, 
            {
                "otp" : otp
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                  },
            }
        )
        if (response &&  response.status === 200) {
            toast.success(response.data.message, {
                position: "top-center",
                autoClose: 3000 ,
                 className: 'custom-toast'
            });
              if (signUpToken) {
                localStorage.removeItem('signUpToken')
                navigate('/login');
            } else if (passwordToken) {
                navigate('/update-password'); 
            }
            return  { 
                success: true, 
                data: response.data 
            };
        }
    }
    catch (error) {
        const errors = error.response.data.error 
        toast.error(errors, {
            position: "top-center",
            autoClose: 3000,
             className: 'custom-toast'
          });
          return { 
            success: false, 
            errors: errors 
        };
    }
}

//resend otp
export const resendOtp =  async() => {
    try{
        const signUpToken = localStorage.getItem('signUpToken');
        const passwordToken = localStorage.getItem('passwordToken');

        const token = signUpToken ? signUpToken : passwordToken;

        const response = await axios.post(`${BASE_URL}/resend-otp`,{ },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                  },
            }
        )
        if (response &&  response.status === 200) {
            toast.success(response.data.message, {
                position: "top-center",
                autoClose: 3000 ,
                 className: 'custom-toast'
            });
            return  { 
                success: true, 
                data: response.data 
            };
        }
    }
    catch(error){
        const errors = error.response.data.error 
        toast.error(errors, {
            position: "top-center",
            autoClose: 3000,
             className: 'custom-toast'
          });
          return { 
            success: false, 
            errors: errors 
        };
    }
}

//login
export const login =  ( formData, navigate) => async (dispatch) => {
    dispatch(setLoading(true))
    try{
        const response = await axios.post(`${BASE_URL}/login`, formData)
        if (response &&  response.status === 200) {
            const { token, loginDetails } = response.data;
            const { _id, role, email } = loginDetails;
            const userDetails = { _id, role, email }

            localStorage.setItem('loginToken', token);
            localStorage.setItem('userDetails', JSON.stringify(userDetails));
            
            dispatch(loginSuccess({loginDetails}));
            navigate('/home-page')

            // if (loginDetails.role === 'employee') {
            //     navigate('/employee/dashboard');
            //     localStorage.setItem('employeeId', JSON.stringify(loginDetails._id));
            // } else if (loginDetails.role === 'employer') {
            //     navigate('/employer/dashboard');
            //     localStorage.setItem('employerId', JSON.stringify(loginDetails._id));
            // }
            toast.success(response.data.message, {
                position: "top-center",
                autoClose: 3000 ,
                 className: 'custom-toast'
            });
            return  { 
                success: true, 
                data: response.data 
            };
        }
    }
    catch (error) {
        let errorMessages = [];
        if (error.response && error.response.data && error.response.data.error) {
            if (Array.isArray(error.response.data.error)) {
                errorMessages = error.response.data.error.map(err => err.msg);
            } else if (typeof error.response.data.error === 'string') {
                errorMessages = [error.response.data.error];
            } else {
                errorMessages = ['An unknown error occurred'];
            }
        } else {
            errorMessages = ['A network error occurred. Please try again later.'];
        }
        errorMessages.forEach(message => {
            toast.error(message, {
                position: "top-center",
                autoClose: 5000,
                className: 'custom-toast'
            });
        });
        return { 
            success: false, 
            errors: errorMessages 
        };
    }
    finally {
        dispatch(setLoading(false)); 
      }
    
}

//forgot password
export const forgotPassword =  async( email, navigate) => {
    try{
        const response = await axios.post(`${BASE_URL}/forgot-password`,
            {
                "email":email
            }
        )
        if (response &&  response.status === 200) {
            const { token } = response.data
            localStorage.setItem('passwordToken', token)
            toast.success(response.data.message, {
                position: "top-center",
                autoClose: 3000 ,
                 className: 'custom-toast'
            });
             navigate('/verify-otp')
            return  { 
                success: true, 
                data: response.data 
            };
        }
    }
    catch(error){
        const errors = error.response.data.error 
        toast.error(errors, {
            position: "top-center",
            autoClose: 3000,
             className: 'custom-toast'
          });
          return { 
            success: false, 
            errors: errors 
        };
    }
}

//update password
export const updatePassword =async  ( newPassword, navigate)  => {
    try{
        const token = localStorage.getItem('passwordToken');
        const response = await axios.post(`${BASE_URL}/update-password`,
            {
                "newPassword":newPassword
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                  },
            }
        )
        if (response &&  response.status === 200) {
            toast.success(response.data.message, {
                position: "top-center",
                autoClose: 3000 ,
                 className: 'custom-toast'
            });
            navigate('/login')
            return  { 
                success: true, 
                data: response.data 
            };
        }
    }
    catch(error){ 
        let errorMessages = [];
        if (error.response && error.response.data && error.response.data.error) {
            if (Array.isArray(error.response.data.error)) {
                errorMessages = error.response.data.error.map(err => err.msg);
            } else if (typeof error.response.data.error === 'string') {
                errorMessages = [error.response.data.error];
            } else {
                errorMessages = ['An unknown error occurred'];
            }
        } else {            
            errorMessages = ['A network error occurred. Please try again later.'];
        }
        toast.error(errorMessages.join(', '), {
            position: "top-center",
            autoClose: 3000,
             className: 'custom-toast'
          });
          return { 
            success: false, 
            errors: errorMessages 
        };
    }
}

//reset password
export const changePassword =  (oldPassword, newPassword, navigate) => async (dispatch)  => {
    dispatch(setLoading(true))
    try{
        const token = localStorage.getItem('loginToken');
        const response = await axios.post(`${BASE_URL}/change-password`,
            {
                "oldPassword":oldPassword,
                "newPassword":newPassword
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                  },
            }
        )
        if (response &&  response.status === 200) {
            toast.success(response.data.message, {
                position: "top-center",
                autoClose: 3000 ,
                 className: 'custom-toast'
            });
            dispatch(logout())
            navigate('/')
            return  { 
                success: true, 
                data: response.data 
            };
        }
    }
    catch(error){ 
        let errorMessages = [];
        if (error.response && error.response.data && error.response.data.error) {
            if (Array.isArray(error.response.data.error)) {
                errorMessages = error.response.data.error.map(err => err.msg);
            } else if (typeof error.response.data.error === 'string') {
                errorMessages = [error.response.data.error];
            } else {
                errorMessages = ['An unknown error occurred'];
            }
        } else {
            // Handle cases where error.response is undefined
            errorMessages = ['A network error occurred. Please try again later.'];
        }
        toast.error(errorMessages.join(', '), {
            position: "top-center",
            autoClose: 3000,
             className: 'custom-toast'
          });
          return { 
            success: false, 
            errors: errorMessages 
        };
    }
    finally {
        dispatch(setLoading(false)); 
      }
}