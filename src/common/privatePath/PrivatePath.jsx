import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivatePath = ({ children }) => {
  const loginData = useSelector(state => state.authReducer.userData);

  // Redirect to login page if no user is logged in
  if (!loginData.email) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivatePath;
