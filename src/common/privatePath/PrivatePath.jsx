import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { checkTokenAndProceed } from '../../utils/accessToken';

const PrivatePath = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  
  const loginData = useSelector(state => state.authReducer.userData);


  const token = checkTokenAndProceed(dispatch,navigate);

  // Redirect to login page if no user is logged in or token is invalid
  if (!loginData || !loginData.email || !token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivatePath;
