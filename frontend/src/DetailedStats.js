import React, {useEffect, useMemo, useState} from 'react';
import './DetailedStats.css';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import { useCookies } from 'react-cookie';
import Navbar from "./NavBar";
import { useParams } from 'react-router-dom';


export default function DetailedStats () {
    const [stats, setStats] = useState([]);
    const {theme} = useParams()

    useEffect(() => {
        fetch(`/getStats/${theme}`)
            .then(res => res.json().then(data => setStats(data)))
    }, []);


    const statsTable = useMemo(() => {
        if(!stats) {
            return null
        }
        return stats?.map(stats => {
            return <tr key={stats.username}>
                <td> {stats.username}</td>
                <td> {stats.numberOfTickets}</td>
            </tr>
        })
    }, [stats])


    return (
        <div>
           <Navbar/>
            <h1> Detailed statistics for {theme}</h1>
            <hr/>

                <table className="detailed-statistic">
                    <tbody>
                        <tr>
                            <th>Username</th>
                            <th>Number of tickets bought</th>
                        </tr>
                        {statsTable}
                    </tbody>
                </table>
        </div>

    );
}

