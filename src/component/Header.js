import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            c: localStorage.getItem("token")
        }
    }
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Container>
                    {
                        this.state.c ?
                            <Nav className="ml-auto">
                                <Link to="/" className="btn btn-primary" >Тест</Link>
                                <Button className="btn btn-primary mx-2" onClick={() => { localStorage.removeItem("token"); window.location.assign("http://localhost:3000/auth") }}>Выход</Button>
                            </Nav>
                            :
                            <Nav className="ml-auto">
                                <Link to="/auth" className="btn btn-primary" >Регистрация</Link>
                                <Link to="/signup" className="btn btn-primary mx-2" >Авторизация</Link>
                            </Nav>
                    }
                </Container>
            </Navbar>
        )
    }
}
