import React, { useEffect, useState } from 'react';
import './AddExhibitions.css';
import {Link, useNavigate} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import { useCookies } from 'react-cookie';
import Navbar from "./NavBar";
import Select from 'react-select'
import data from "bootstrap/js/src/dom/data";


export default function AddExhibition()  {


    const initialFormState = {
        id: 0,
        theme: '',
        description: '',
        startDate: '',
        endDate: '',
        price: '',
        halls: '',
        users: null
    };

    useEffect(() => {
        fetch("/getAllHalls")
            .then(res => res.json().then(data => setHalls(data)))
    }, []);

    const [halls, setHalls] = useState([])
    const [exhibition, setExhibition] = useState(initialFormState);
    const navigate = useNavigate();
    const [cookies] = useCookies(['XSRF-TOKEN']);

    const handleChange = (event) => {
        if(!event?.length) {
            setExhibition({ ...exhibition, [event.target.name]: event.target.value })
            return;
        }
        setExhibition({...exhibition, halls: event.map(el => el.value)})
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        await fetch("/addExhibition", {
            method: 'POST',
            headers: {
                'X-XSRF-TOKEN': cookies['XSRF-TOKEN'],
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(exhibition),
            credentials: 'include'
        });
        console.log(exhibition);
        navigate('/home');
    }


    const hallList = halls?.map(hall => ({
        label: hall.name,
        value: hall
    }));


    return (

        <div>

            <Navbar/>

            <h1>Add exhibition</h1>
            <hr/>
            <Form onSubmit={handleSubmit}>
                <div className="add_exhibition_container">
                    <FormGroup>
                        <Label for="theme">Theme</Label>
                        <Input type="text" name="theme" id="theme" value={exhibition.theme || ''}
                               onChange={handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input type="text" name="description" id="description" value={exhibition.description || ''}
                               onChange={handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="startDate">Start date</Label>
                        <Input type="date" name="startDate" id="startDate" value={exhibition.startDate || ''}
                               onChange={handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="endDate">Start date</Label>
                        <Input type="date" name="endDate" id="endDate" value={exhibition.endDate || ''}
                               onChange={handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="price">Price</Label>
                        <Input type="decimal" name="price" id="price" value={exhibition.price || ''}
                               onChange={handleChange}/>
                    </FormGroup>
                    <label htmlFor="selector">Add halls</label>
                    <Select options={hallList} id="selector" name="halls" onChange={handleChange} isMulti/>
                    <FormGroup>
                        <Button type="submit">Add exhibition</Button>
                    </FormGroup>
                </div>
            </Form>

        </div>

    );
}
