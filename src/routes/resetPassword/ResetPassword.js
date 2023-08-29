import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axios from "axios";
import "../resetPassword/resetPassword.css"
import { useNavigate, useParams } from 'react-router-dom';
import LockResetIcon from '@mui/icons-material/LockReset';

const ResetPassword = ({api}) => {

    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const navigate = useNavigate();
    const params = useParams();
    const verification = params.verification;
    const token = params.token;


    function reset() {
        console.log(verification, token)
        if (password !== cpassword) {
            return toast.error("Confirm Password doesn't Match")
        }
        axios.patch(`${api}/user/reset_password/${verification}/${token}`, { password })
            .then(res => {
                toast.success(res.data?.message)
                setPassword('')
                setCpassword('')
            })
            .catch(err => toast.error(err.response?.data?.message))
    }

    useEffect(() => {
        axios.post(`${api}/user/verify_code`, { verificationCode: verification })
            .then(res => toast.success(res.data.message))
            .catch(err => {
                toast.error(err.response.data.message)
                navigate('*')
            })

    }, [])

    return (
        <div className='reset-container'>
            <div className='reset-form col-11 col-md-6'>
                <div className="title">
                    <p>RESET PASSWORD</p>
                </div>
                <div className='reset-password-form'>

                    <label className="input-text">ENTER NEW PASSWORD</label>
                    <div>
                        <input placeholder='Enter New Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <br />
                    <label className="input-text">CONFIRM PASSWORD</label>
                    <div>
                        <input placeholder='Confirm Password' type='password' value={cpassword} onChange={(e) => setCpassword(e.target.value)} />
                    </div>
                    <br />

                    <div className='m-3 reset-button d-flex' style={{ justifyContent: "center" }}>
                        <button className='btn btn-warning' onClick={reset}>RESET <span> <LockResetIcon /></span></button>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default ResetPassword