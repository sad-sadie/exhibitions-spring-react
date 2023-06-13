import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button, Form, FormGroup, Input, Label} from 'reactstrap';
import './Registration.css';
import Navbar from "./NavBar";
import {useCookies} from "react-cookie";


const Registration = () => {


    const initialFormState = {
        username: '',
        password: ''
    };

    const [user, setUser] = useState(initialFormState);
    const navigate = useNavigate();
    const [cookies] = useCookies(['XSRF-TOKEN']);

    const handleChange = (event) => {
        const { name, value } = event.target

        setUser({ ...user, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        await fetch(`/registration`, {
            method: 'POST',
            headers: {
                'X-XSRF-TOKEN': cookies['XSRF-TOKEN'],
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
            credentials: 'include'
        });
        navigate('/home');
    }


    return (
        <div>
            <Navbar/>

            <h1>Registration</h1>
            <hr/>
            <Form onSubmit={handleSubmit}>
                <div className="registration_container">
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input type="text" name="username" id="username" value={user.username || ''}
                               onChange={handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="text" name="password" id="password" value={user.password || ''}
                               onChange={handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Button type="submit">Register</Button>
                    </FormGroup>
                </div>
            </Form>

        </div>
    );
}

export default Registration;
