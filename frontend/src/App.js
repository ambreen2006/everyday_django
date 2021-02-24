import axios from 'axios';
import React, { useState } from 'react';
import {
    Container, Navbar, Button, Row, Col, Form
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, Route, Switch, Redirect } from 'react-router-dom';

import './App.css';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';

function App() {

    const [isLoggedIn, setLoggedIn] = useState(() => {
        return window.localStorage.getItem('everydayapps.auth') !== null;
    });

    const logIn = async (username, password) => {
        const url = 'http://localhost:5000/users/login/';
        try {
            const response = await axios.post(url, {username, password});
            console.log('Response from server: ', response);
            window.localStorage.setItem(
                'everydayapps.auth', JSON.stringify(response.data)
            );
            setLoggedIn(true);
            return { response, isError: false };
        } catch(error) {
            console.log("In the catch");
            console.error(error);
            return { response: error, isError: true };
        }
    };

    const logOut = () => {
        window.localStorage.removeItem('everydayapps.auth');
        setLoggedIn(false);
    };

    return (
        <div>
            <Navbar bg='light' expand='lg' variant='light'>
                <LinkContainer to='/'>
                    <Navbar.Brand className='logo'>EveryDay Apps</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle/>
                <Navbar.Collapse>
                    {
                        isLoggedIn &&
                        <Form inline className='ml-auto'>
                            <Button type='button' onClick={() => logOut()}>Logout</Button>
                        </Form>
                    }
                </Navbar.Collapse>
            </Navbar>

            <Container className='pt-3'>
                <Switch>
                    <Route exact path='/' render= { () => (
                        <div className='middle-center'>
                            <h1 className="landing logo">EveryDay Apps </h1>
                            <br/>
                            {
                                !isLoggedIn &&
                                <Link
                                    id='signUp'
                                    className='btn btn-primary'
                                    to='/sign-up'
                                >Sign Up</Link>
                            }
                            {
                                !isLoggedIn &&
                                <Link
                                id='logIn'
                                className='btn btn-primary'
                                to="/log-in"
                                >Login</Link>

                            }
                        </div>
                    )} />

                    <Route path='/sign-up' component={SignUp}/>
                    <Route path='/log-in' render={() => (
                        isLoggedIn ? (<Redirect to='/' />) : (
                            <LogIn logIn={logIn} />
                        )
                    )} />
                </Switch>
            </Container>

        </div>
    );
}

export default App;