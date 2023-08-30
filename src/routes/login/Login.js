import { TextField } from '@mui/material'
import React, { useState , useEffect } from 'react'
import "../login/login.css"

import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Box from '@mui/material/Box';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';




const Login = ({api}) => {
   

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [msg, setMsg] = useState('')
    const navigate = useNavigate();

    async function login() {

        const user = {
            email,
            password,
        }


        try {
            if (JSON.parse(localStorage.getItem('user'))) {
                return navigate('/')
            }

            await axios.post(`${api}/user/login`, user)
                .then(res => {
                    localStorage.setItem('user', JSON.stringify(res.data.userdata));
                    toast.success(res.data.message)
                    console.log(res)
                    navigate('/')
                })
                .catch(error => {
                    setMsg(error.response.data.message)
                    alert(error.response.data.message)
                })


        } catch (error) {
            console.log(error)
        }


    }

    // aviod user entering into login page after login
    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate('/');
            toast.warning('Please Logout for returing Login page')
        }
    }, [])




    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };



    return (
        <div className='login-page col-12'>

            <div className='login-form form col-md-6' >

                <h1 className='login-title'>LOGIN</h1>


                <Box sx={{ '& > :not(style)': { m: 1 } }}>
                    <TextField
                        id="input-with-icon-textfield"
                        label="EMAIL"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailIcon />
                                </InputAdornment>
                            ),
                        }}
                        variant="standard" fullWidth
                        value={email} onChange={(e) => setEmail(e.target.value)}
                    />   <br />


                    <FormControl sx={{ m: 1 }} variant="standard" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} >
                        <InputLabel htmlFor="standard-adornment-password" >Password</InputLabel>
                        <Input

                            id="standard-adornment-password"
                            type={showPassword ? 'text' : 'password'}

                            startAdornment={
                                <InputAdornment position="start">
                                    <VpnKeyIcon />
                                </InputAdornment>
                            }

                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                </Box>

                <div className='forgot-password-link'>
                    <a className='forgot-password' href='/forgot_password'> Forgot Password?  </a> <br />

                    <a className='no-account' href='/sign-up'> Don't have an account? click here </a>

                </div>

                <button className='btn btn-primary mb-3 mt-3' onClick={login} >LOGIN</button>

            </div>

        </div>
    )
}

export default Login