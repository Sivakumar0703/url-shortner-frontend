import React, { useEffect, useState } from 'react'
import Layout from '../../component/layout/Layout'
import "../dashboard/dashboard.css"
import axios from 'axios'
import dayjs from 'dayjs'
import LineChart from '../../component/chart/LineChart'

const Dashboard = ({api}) => {

  const [urlList, setUrlList] = useState('')
  const date = new Date().toISOString()

  useEffect(() => {
    axios.get(api)
      .then(res => setUrlList(res.data.url))
      .catch(error => console.log(error))

  }, [])



  function thisDay(data) {
    const today = dayjs(date).format("YYYY-MM-DD")

    if (data.createdAt === today) {
      return data
    }

  }

  function thisMonth(data) {
    const check = dayjs(data).format("YYYY-MM-DD").split('-')
    const today = dayjs(data).format("YYYY-MM-DD").split('-')

    if ((check[1] === today[1]) && (check[0] === today[0])) {
      return data
    }
  }


  return (
    <Layout>
      <div className="dashboard-texts">
        <h3 style={{textAlign:"center"}}><u>Why URLs Become Long, Winded, and Chaotic</u></h3>
        <p>When you create a website, you tend to start with something simple, say company.com. 
          At the start, you may add some basic pages to it, like About Us, Products & Services, 
          and a Contact Page. These pages can have easy to read and remember URLs, 
          like company.com/about-us or company.com/services.</p>

          <p>
          However, you will eventually want to add more tools and content. 
          For example, you might want to add a tracking algorithm to your site, 
          which detects where your visitors come from. 
          Or you might want to add a sign-up sheet that's only active for a time.
          </p> <br/>

          <p>
          This can turn a simple company.com/about-us URL into a monstrosity like 
          company.com/about-us/ref=goog.le?pd_rd_i-sdvcsdcs23xcas&th3.When users see links like these, 
          they might balk at clicking on them because of all the extraneous characters attached at the end.
          </p>
      </div>
      <div className='linechart'>
        <LineChart api={api} />
      </div>

      <div className="dashboard-texts">
        <h3>ADVANTAGE OF SHORT URL</h3>
        
          <ul>
            <li>Easy to share</li>
            <li>Easy to find number of clicks</li>
            <li>Easy to keep in mind</li>
            <li>Clean and neat appearance</li>
          </ul>
       
      </div>

      <div className='dashboard'>

        <div className='per-day-count col-md-5 col-11'>
          <p className='dashboard-text'> TOTAL NUMBER OF URL GENERATED ON THIS DAY </p>
          <p className='today-count'> {urlList && urlList.filter(thisDay).length} </p>
        </div>

        <div className='monthly-count col-md-5 col-11'>
          <p className='dashboard-text' > TOTAL NUMBER OF URL GENERATED THIS MONTH </p>
          <p className='this-month-count'>  {urlList && urlList.filter(thisMonth).length} </p>
        </div>
      </div>

    </Layout>
  )
}

export default Dashboard