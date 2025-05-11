import React from 'react'
import { Container, Button, Form } from 'react-bootstrap'


function Login() {




    return (


        <Container>

            <Form>
                <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email"/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password"/>
                </Form.Group>

                <Form.Group>
                    <Button variant="primary">Login</Button>
                </Form.Group>
            </Form>

        </Container>









    )
}

export default Login
