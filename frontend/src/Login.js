import React, {useEffect, useMemo, useState} from 'react';
import './GetStats.css';
import {Link, useNavigate} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import { useCookies } from 'react-cookie';
import Navbar from "./NavBar";


export default function Login () {
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
/*
        await fetch(`/registration`, {
            method: 'POST',
            headers: {
                'X-XSRF-TOKEN': cookies['XSRF-TOKEN'],
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
            credentials: 'include'
        });*/
        navigate('/home');
    }

    return (
        <div>
            <Navbar/>
            <h1>Please log in</h1>
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
                        <Button type="submit">Log in</Button>
                    </FormGroup>
                </div>
            </Form>

        </div>

    );
}

