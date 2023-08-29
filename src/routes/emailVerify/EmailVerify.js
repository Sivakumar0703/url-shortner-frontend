import React , {useState , useEffect} from 'react'
import "../emailVerify/emailVerify.css"
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Errorpage from '../errorPage/ErrorPage'

const EmailVerify = ({api}) => {
    const [url , setUrl] = useState()
    const params = useParams()

    useEffect(()=>{
        const verifyEmailUrl = async() =>{
            try {
              console.log(params.id , params.token)
              // const url = `http://localhost:8000/user/${params.id}/verify/${params.token}`  
              const url = `${api}/user/${params.id}/verify/${params.token}`  
              const data = await axios.get(url);
              console.log(data)
              setUrl(true)
            } catch (error) {
                console.log(error)
                setUrl(false)
            }
        }

        verifyEmailUrl();

    },[params])



  return (
    <>
    
    { 
        url ?  (
          <div className='verify-email-container' >
            <img src={require("./tick.png")} alt="success" />
            <h1>EMAIL VERIFIED SUCCESSFULLY</h1>

          </div>
        ) : (
             <div className='error-page'>
                <Errorpage />
             </div>
        )
    }

    </>
  )
}

export default EmailVerify