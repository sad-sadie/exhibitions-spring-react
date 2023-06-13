import React, {useEffect, useMemo, useState} from 'react';
import './GetStats.css';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import { useCookies } from 'react-cookie';
import Navbar from "./NavBar";


export default function GetStats () {
    const [stats, setStats] = useState([]);

    useEffect(() => {
        fetch("/getStats")
            .then(res => res.json().then(data => setStats(data)))
    }, []);


    const statsTable = useMemo(() => {
        if(!stats) {
            return null
        }
        return stats.map(stats => {
            return <tr key={stats.id}>
                <td>{stats.theme}</td>
                <td>
                    From  {new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: '2-digit'
                }).format(new Date(stats.startDate))} To {new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: '2-digit'
                }).format(new Date(stats.endDate))}
                </td>
                <td>{stats.hallNames.join(", ")}</td>
                <td>{stats.price}</td>
                <td>{stats.count}</td>
                <td>
                    <Link
                        to={`/getStats/${stats.theme}`}
                        className="active"
                    >
                        Get detailed stats
                    </Link>
                </td>
            </tr>
        })
    }, [stats])


    return (
        <div>
            <Navbar/>
            <h1>Exhibitions' statistics</h1>
            <hr/>

                <table className="statistic">
                    <tbody>
                        <tr>
                            <th>Theme</th>
                            <th>Dates of work</th>
                            <th>Halls</th>
                            <th>Ticket's price</th>
                            <th>Number of tickets sold</th>
                        </tr>
                        {statsTable}
                    </tbody>
                </table>
        </div>

    );
}

