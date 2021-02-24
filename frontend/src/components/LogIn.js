import React, { useState } from 'react';
import { Formik } from 'formik';
import {
    Breadcrumb, Card, Col, Row, Form, Button, Alert
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

function LogIn ({logIn}) {

    // const [isSubmitted, setSubmitted] = useState(false);
    const onSubmit = async (values, actions) => {
        try {
            const {response, isError } = await logIn(
                values.username,
                values.password
            );
            if (isError) {
                const data = response.response.data;
                console.log('isError', data);
                actions.setFieldError('__all__', data['detail'])
            }
        } catch(error) {
            console.error(error);
        }
    };

    return (
        <Row>
            <Col lg={12}>
                <Breadcrumb>
                    <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Login</Breadcrumb.Item>
                </Breadcrumb>
                <Card>
                    <Card.Header>Login</Card.Header>
                    <Card.Body>
                        <Formik
                            initialValues={{
                                username: '',
                                password: ''
                            }}
                            onSubmit={onSubmit}
                            >
                            {({
                                errors,
                                handleChange,
                                handleSubmit,
                                isSubmitting,
                                values
                            }) => (
                            <>
                            {
                                '__all__' in errors &&
                                <Alert variant='danger'>
                                { errors['__all__'] }
                                </Alert>
                            }
                            <Form noValidate onSubmit={handleSubmit}>
                                <Form.Group controlId='username'>
                                    <Form.Label>Username:</Form.Label>
                                    <Form.Control
                                        name="username"
                                        onChange={handleChange}
                                        value={values.username}
                                    />
                                </Form.Group>
                                <Form.Group controlId='password'>
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control
                                        name="password"
                                        type="password"
                                        onChange={handleChange}
                                        value={values.password}
                                    />
                                </Form.Group>
                                <Button block type="submit" variant="primary">Login</Button>
                            </Form>
                            </>
                        )}
                        </Formik>
                    </Card.Body>
                    <p className='mt-3 text-center'>
                        Don't have an account? <Link to='/sign-up'>Sign Up!</Link>
                    </p>
                </Card>
            </Col>
        </Row>
    );
}

export default LogIn;