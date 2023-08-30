import React, { useEffect, useState } from 'react'
import Layout from '../../component/layout/Layout'
import "../dashboard/dashboard.css"
import axios from 'axios'
import dayjs from 'dayjs'
import LineChart from '../../component/chart/LineChart'

const Dashboard = ({ api }) => {

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
      {
        urlList ? (
          <>
        <div className='linechart'>
          <p>Number of URL generated per month is displayed as a graph here.</p>
        <LineChart api={api} />
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
      </>
        ) : (
          <h3 className='dashboard-loading'>loading...</h3>
        )
      }

    </Layout>
  )
}

export default Dashboard