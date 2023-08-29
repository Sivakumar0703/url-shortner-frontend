import { TextField } from '@mui/material'
import React from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup'; 
import { useFormik } from 'formik';
import "../registerForm/register.css"




const registerSchemaValidation = yup.object({
  firstName: yup.string().min(3, 'name should have minimum 3 character').required("Enter Your First Name"),
  lastName: yup.string().min(3, 'name should have minimum 3 character').required("Enter Your Last Name"),
  email: yup.string().email().required("Enter Email"),
  password: yup.string().min(8, 'enter minimum 8 character').required('not valid'),
  confirmpassword: yup.string().min(8, 'enter minimum 8 character').oneOf([yup.ref('password')], "Password Not Matched").required('Enter Password to Confirm')

})


const Register = ({api}) => {

  const navigate = useNavigate();
  const url = api
  


  // formik function
  const { values, handleChange, handleSubmit, handleBlur, errors, touched } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmpassword: ""
    },

    validationSchema: registerSchemaValidation,
    onSubmit: (newuser) => signup(newuser)

  })



  async function signup(newuser) {

    const signUpDetail = {
        firstName: newuser.firstName,
        lastName: newuser.lastName ,
        email: newuser.email ,
        password: newuser.password
    }
  

      await axios.post(`${url}/user/sign-up`, signUpDetail)
      .then((res) => {
       
        toast.success(res.data?.message)
        values.firstName = ""
        values.lastName = ""
        values.email = ""
        values.password = ""
        values.confirmpassword = ""
        navigate('/login')
      })
      .catch((err) => toast.error(err.response?.data?.message))
  }


  return (

    <div className='row signup-registration d-flex justify-content-center align-items-center' style={{ flexDirection: 'column', height: '100vh' }}>

      <div className='form col-md-6 col-11' style={{ borderRadius: "5px", position: 'absolute' }} >

        <h1  className="form-heading" style={{ textAlign: "center" }}>REGISTER HERE</h1>

        <form onSubmit={handleSubmit}>

          <TextField  id="outlined-basic1" required label="FIRST NAME" onBlur={handleBlur} variant="outlined" fullWidth margin="normal" name="firstName" value={values.firstName} onChange={handleChange} autoComplete='off'/> <br />
          {touched.firstName && errors.firstName ? <p className="error-msg" >{errors.firstName}</p> : <p className="error-msg"></p>}

          <TextField id="outlined-basic1" required label="LAST NAME" onBlur={handleBlur} variant="outlined" fullWidth margin="normal" name="lastName" value={values.lastName} onChange={handleChange} /> <br />
          {touched.lastName && errors.lastName ? <p className="error-msg" >{errors.lastName}</p> : <p className="error-msg"></p>}

          <TextField id="outlined-basic2" required label="EMAIL" variant="outlined" onBlur={handleBlur} fullWidth margin="normal" name="email" value={values.email} onChange={handleChange} /> <br />
          {touched.email && errors.email ? <p className="error-msg" >{errors.email}</p> : <p className="error-msg"></p>}

          <TextField id="outlined-basic4" required label="PASSWORD" variant="outlined" onBlur={handleBlur} fullWidth margin="normal" name="password" value={values.password} onChange={handleChange} /> <br />
          {touched.password && errors.password ? <p className="error-msg" >{errors.password}</p> : <p className="error-msg"></p>}

          <TextField id="outlined-basic5" required label="CONFIRM PASSWORD" variant="outlined" onBlur={handleBlur} fullWidth margin="normal" name="confirmpassword" value={values.confirmpassword} onChange={handleChange} />
          {touched.confirmpassword && errors.confirmpassword ? <p className="error-msg" >{errors.confirmpassword}</p> : <p className="error-msg"></p>}

          <button className='btn btn-primary register-btn' type='submit' style={{ position: 'relative', left: '45%' }} onClick={() => console.log('clicked')} >REGISTER</button>

        </form>
      </div>
    </div>
  )
}

export default Register