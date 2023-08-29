import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Line } from 'react-chartjs-2'
import "../chart/linechart.css"


import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,

    Filler

} from 'chart.js';



ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,

    Filler
)



const LineChart = ({api}) => {


    const [urls , setUrls] = useState([])
    const [monthlyCount , setMonthlyCount] = useState([])
    

    const url = api


    useEffect(() => {
        async function getData() {
            await axios.get(url).then(res => {
                setUrls(res.data.url)
                countMonth(res.data.url);

            })
        }
        getData()
    }, [])

    //calculating number of links generated per month
    const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];


    function countMonth(data) {

        for (let i = 0; i < 12; i++) {

            let count = 0;
            const length = data.length;

            for (let j = 0; j < length; j++) {
                if (data[j].createdAt?.split('-')[1] === months[i]) {
                    count++;
                }
            }
            setMonthlyCount((old) => [...old, count])
        }
        return 0;

    }


    // chart
    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
            label: 'Number of Url Generated',
            data: monthlyCount,
            pointBorderColor: 'red',
            backgroundColor: '#9BD0F5',
            borderColor: 'violet',
            fill: true,
            tension: 0.4
        }]
    }

    const options = {
        maintainAspectRatio:false,
        plugins: {
            legend: true,
        },
        colors: {
            enabled: true,
            forceOverride: true
        },
        scales: {
            y:{
                ticks:{
                    stepSize:1
                }
                
            }
        }
    }


    return (
        urls ? (
            <div className='line-chart'>

                <Line
                    data={data}
                    options={options}
                >

                </Line>

            </div>) : <h3>"Loading ..."</h3>
    )
}

export default LineChart