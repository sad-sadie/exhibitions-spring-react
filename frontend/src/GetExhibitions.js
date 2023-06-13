import React, {useEffect, useMemo, useState} from 'react';
import './GetExhibitions.css';
import Navbar from "./NavBar";
import {Link, useNavigate} from "react-router-dom";
import {Button} from "reactstrap";



export default function GetExhibitions () {

    const navigate = useNavigate();

    const searchParams = new URLSearchParams(window.location.search);

    const sortType = searchParams.get('sortType');
    const [exhibitions, setExhibitions] = useState([]);

    useEffect(() => {
        fetch(`getExhibitions?sortType=${sortType}`)
            .then(res => res.json().then(data =>  setExhibitions(data)))

    }, []);


    const getHalls = (exhibition) => {
        return exhibition.hallsNames.map(hallName => ' ' + hallName )
    }

    const handleCancellation = (id) => {
        fetch('/getExhibitions/' + id, {
            method: 'DELETE'
        });

        navigate("/home")
    }


    const exhibitionTable = useMemo(() => {
        if(!exhibitions) {
            return null
        }
        return exhibitions.map(exhibition => {
            return <tr key={exhibition.id}>
                    <td><b>{exhibition.theme}</b>
                        <br/>
                            {exhibition.description}
                            <br/>
                                <br/><b>Time: From </b>
                                    {new Intl.DateTimeFormat('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: '2-digit'
                                    }).format(new Date(exhibition.startDate))}
                                    <b> to </b>
                                    {new Intl.DateTimeFormat('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: '2-digit'
                                    }).format(new Date(exhibition.endDate))}
                                    <br/>
                                        <b>Halls:</b>
                                    {getHalls(exhibition)}
                                        <br/><b>Price:</b> {exhibition.price} UAH
                                        <br/><br/>

                                            You have already bought {/*{alreadyBought}*/}  tickets at this exhibition

                                          {/*  <form th:action="@{/getExhibitions}" th:method="GET">
                                                <input type="hidden" name="exhibitionId"  th:value="${exhibition.id}">
                                                    <button type="submit" th:text="#{buy-ticket}">Buy ticket</button>
                                            </form>*/}

                                            <Button onClick={() => handleCancellation(exhibition.id)}>Cancel exhibition</Button>

                                            {/*<div sec:authorize="hasAuthority('ADMIN')">
                                                <form th:action="@{/getExhibitions}" method="GET">
                                                    <input type="hidden" name="canceledExhibitionId"  th:value="${exhibition.id}">
                                                        <button type="submit" th:text="#{cancel-exhibition}">Cancel exhibition</button>
                                                </form>
                                            </div>*/}
                    </td>
                </tr>

        })
    }, [exhibitions])


    return (
        <div>
            <Navbar/>
            <div className="exhibitions_container">

                <table align="center" className="exhibitions" cellSpacing="9">
                    <tbody>
                    {exhibitionTable}
                    </tbody>
                </table>

            </div>
        </div>

    );
}

