import React, {useEffect, useMemo, useState} from 'react';
import './GetHalls.css';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import { useCookies } from 'react-cookie';
import Navbar from "./NavBar";


export default function GetHalls () {
    const [halls, setHalls] = useState([]);

    useEffect(() => {
        fetch("/getHalls")
            .then(res => res.json().then(data => setHalls(data)))
    }, []);


   const hallList = useMemo(() => {
       if(!halls) {
           return null
       }
       return halls.map(hall => {
           return <tr key={hall.id}>
                   <td>
                       <b>{hall.name}</b>
                       <br/>
                       <b>{hall.description}</b>
                       <br/>
                   </td>
               </tr>
           })
   }, [halls])


    return (
        <div>
            <Navbar/>
            <div className="exhibitions_container">

                <table align="center" className="exhibitions" cellSpacing="9">
                    <tbody>
                     {hallList}
                    </tbody>
                </table>
               {/* <div th:if="${pageNumbers != null}" className="pagination">
                    <div className="pagination-inner">
                        <th:block th:each="pageNumber : ${pageNumbers}">
                            <a th:href="@{/getHalls(pageNum=${pageNumber})}"
                               th:text="${pageNumber}"
                               th:class="${pageNumber == currentPage} ? active">
                                Page's number
                            </a>
                        </th:block>
                    </div>
                </div>*/}

            </div>
        </div>

    );
}

