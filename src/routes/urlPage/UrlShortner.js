import React, { useState } from 'react'
import Layout from '../../component/layout/Layout'
import "../urlPage/urlShortner.css"
import axios from 'axios';
import { toast } from 'react-toastify';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'


const UrlShortner = ({api}) => {

  const [fullUrl, setFullUrl] = useState('');
  const [url, setUrl] = useState('');
  const { width, height } = useWindowSize()
  const [pops, setPops] = useState(false)

  const user = JSON.parse(localStorage.getItem("user"))?.status;



  function getUrl() {

    if (!user) {
      return (
        alert("PLEASE LOGIN TO USE OUR SERVICE"),
        setFullUrl('')
      )
    }



    if (fullUrl === '') {
      return toast.warning("Please don't submit empty field")
    }
    axios.post(`${api}/short-url`, { fullUrl })
      .then(res => {
        toast.success(res.data.message)
        setUrl(res.data.link)
        setPops(true)
        setFullUrl('')
        confetti()

      })
      .catch(error => console.log(error, "error"))
  }

  function confetti() {
    setTimeout(() => {
      setPops(false)
    }, "5000")
  }


  return (
    <Layout>
      <div className='url-page'>

        {
          pops && <Confetti
            width={width}
            height={height}
            numberOfPieces={500}
          />
        }

        <div className='col-md-8 col-11'>
          <input type='text' placeholder='Paste the URL' className='url-input' value={fullUrl} onChange={(e) => setFullUrl(e.target.value)} />
        </div> <br /> <br />
        <div>
          <button className='btn btn-primary' onClick={getUrl}>Shrink</button>
        </div> <br />

        <div className='display-short-url col-md-8 col-11'>
          <span>Get Your Link </span> <p className='short-url'>{url}</p>
        </div>
      </div>


    </Layout>
  )
}

export default UrlShortner