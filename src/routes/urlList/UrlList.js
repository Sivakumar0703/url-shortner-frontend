import React, { useEffect, useState } from 'react'
import Layout from '../../component/layout/Layout'
import Table from 'react-bootstrap/Table';
import axios from 'axios';

const UrlList = ({api}) => {

    const [urlList, setUrlList] = useState('')

    useEffect(() => {
        axios.get(api)
            .then(res => setUrlList(res.data.url))
            .catch(error => console.log(error))

    }, [])


    return (
        <Layout>
            {urlList ? (
                <Table striped responsive className='mb-3 mt-5 '>
                    <thead>
                        <tr>
                            <th>SI.NO</th>
                            <th>ORIGINAL URL</th>
                            <th>SHORT URL</th>
                            <th>CLICKS</th>
                        </tr>
                    </thead>
                    <tbody>{urlList && urlList.map((item, index) => {
                        return (
                            <tr key={item._id}>
                                <td> {index + 1}</td>
                                <td>{item.fullUrl}</td>
                                <td>{`${api}/${item.shortUrl}`}</td>
                                <td>{item.count}</td>
                            </tr>
                        )
                    })}


                    </tbody>
                </Table>) : <h3 style={{display:"flex" , justifyContent:"center" , alignItems:"center"}}>Loading...</h3>}
        </Layout>
    )
}

export default UrlList