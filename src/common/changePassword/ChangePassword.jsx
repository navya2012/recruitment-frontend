import React, { useReducer, useRef, useState } from 'react';
import { Box, Button, TextField, Typography, InputAdornment, IconButton } from '@mui/material';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../../api\'s/authApi\'s';
import { useDispatch } from 'react-redux';
import LoadingSpinner from '../spinner/LoadingSpinner';

const ChangePassword = () => {
    const passwordReducer = (state, action) => {
        switch (action.type) {
            case 'TOGGLE_PASSWORD':
                return { ...state, showPassword: !state.showPassword };
            case 'SET_FIELD':
                return { ...state, [action.field]: action.payload };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(passwordReducer, { oldPassword: '', newPassword: '', showPassword: false });
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const reduxDispatch = useDispatch();

    const oldPasswordRef = useRef(null);
    const newPasswordRef = useRef(null);

    const handleClickShowPassword = () => {
        dispatch({ type: 'TOGGLE_PASSWORD' });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChange = () => {
        dispatch({ type: 'SET_FIELD', field: 'oldPassword', payload: oldPasswordRef.current.value });
        dispatch({ type: 'SET_FIELD', field: 'newPassword', payload: newPasswordRef.current.value });
    };

    const handleClearField = (field) => {
        dispatch({ type: 'SET_FIELD', field, payload: '' });
        if (field === 'oldPassword') {
            oldPasswordRef.current.value = '';
        } else if (field === 'newPassword') {
            newPasswordRef.current.value = '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const oldPassword = oldPasswordRef.current.value;
            const newPassword = newPasswordRef.current.value;
            const response = await reduxDispatch(changePassword(oldPassword, newPassword, navigate));
            if (response.success) {
                dispatch({ type: 'SET_FIELD', field: 'oldPassword', payload: '' });
                dispatch({ type: 'SET_FIELD', field: 'newPassword', payload: '' });
            }
        } catch (error) {
            throw new Error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', minHeight: '50vh' }}>
            <Typography variant="h4" sx={{ paddingBottom: '20px' }}>
                Change Password
            </Typography>

            {loading ? (
                <LoadingSpinner />
            ) : (
                <Box component='form' onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        label="Old Password"
                        name="oldPassword"
                        type={state.showPassword ? "text" : "password"}
                        inputRef={oldPasswordRef}
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton
                                        aria-label="toggle old password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {state.showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                    </IconButton>
                                    <IconButton onClick={() => handleClearField('oldPassword')}>
                                        <ClearIcon sx={{ color: 'black' }} />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />

                    <TextField
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        label="New Password"
                        name="newPassword"
                        type={state.showPassword ? "text" : "password"}
                        inputRef={newPasswordRef}
                        onChange={handleChange}
                        sx={{ mb: 4 }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton
                                        aria-label="toggle new password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {state.showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                    </IconButton>
                                    <IconButton onClick={() => handleClearField('newPassword')}>
                                        <ClearIcon sx={{ color: 'black' }} />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            width: '50%',
                            display: 'block',
                            margin: '0 auto',
                            textAlign: 'center'
                        }}>
                        Reset Password
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default ChangePassword;
