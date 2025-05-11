import React from 'react'
import { Container, Form, Button } from 'react-bootstrap'

function Register() {






    return (

        <Container>

            <Form>

                <Form.Group>
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="name" name="name" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Cognome</Form.Label>
                    <Form.Control type="lastname" name="lastname" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Data di Nascita</Form.Label>
                    <Form.Control type="birthdate" name="birthdate" />
                </Form.Group>



                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" />
                </Form.Group>

                <Form.Group>
                    <Button variant="primary">Registrati</Button>
                </Form.Group>

            </Form>





        </Container>



    )
}

export default Register
