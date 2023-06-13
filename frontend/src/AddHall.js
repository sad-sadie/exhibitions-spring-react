import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button, Form, FormGroup, Input, Label} from 'reactstrap';
import './AddHall.css';
import Navbar from "./NavBar";
import {useCookies} from "react-cookie";


const AddHall = () => {


    const initialFormState = {
        name: '',
        description: ''
    };
    const [hall, setHall] = useState(initialFormState);
    const navigate = useNavigate();
    const [cookies] = useCookies(['XSRF-TOKEN']);

    const handleChange = (event) => {
        const { name, value } = event.target

        setHall({ ...hall, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        await fetch(`/addHall`, {
            method: 'POST',
            headers: {
                'X-XSRF-TOKEN': cookies['XSRF-TOKEN'],
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(hall),
            credentials: 'include'
        });
        navigate('/home');
    }


    return (
        <div>
            <Navbar/>

            <h1>Add hall</h1>
            <hr/>
            <Form onSubmit={handleSubmit}>
                <div className="add_hall_container">
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" value={hall.name || ''}
                               onChange={handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input type="text" name="description" id="description" value={hall.description || ''}
                               onChange={handleChange}/>
                    </FormGroup>
                <FormGroup>
                    <Button type="submit">Save</Button>
                </FormGroup>
                </div>
            </Form>

        </div>
        );
}

export default AddHall;
