import React from "react";
import { Card, Container, Form, Nav, Row, Button } from "react-bootstrap";

export class SignUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mail: null,
            password: null
        }
    }

    registrationChange() {
        let data = {
            email: this.state.mail,
            password: this.state.password
        }
        // console.log(data);
        try {
            fetch("https://internsapi.public.osora.ru/api/auth/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then((result) => {
                    if (result.status == false) {
                        if (result.errors.email) { alert(result.errors.email) }
                    }
                    if (result.status == false) {
                        if (result.errors.password) { alert(result.errors.password) }
                    }
                    if (result.status == false) {
                        if (result.status_code == 500) { alert("Пользователя с таким именем не существует") }
                    }
                    else {
                        localStorage.setItem("token", result.data.access_token);
                        window.location.assign("http://localhost:3000/");
                    }
                }
                )
        }
        catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <Container className="d-flex justify-content-center align-items-center"
                style={{ height: window.innerHeight - 54 }}>
                <Card style={{ width: 600 }} className="p-5">
                    <h2 className="m-auto">Authorization</h2>
                    <Form className="d-flex flex-column">
                        <Form.Control className="mt-2" placeholder="Mail"
                            value={this.state.mail || ""}
                            onChange={e => this.setState({ mail: e.target.value })}
                        />
                        <Form.Control className="mt-2" placeholder="Password" type="password"
                            value={this.state.password || ""}
                            onChange={e => this.setState({ password: e.target.value })}
                        />
                        <Row className="d-flex"> <div>Перейти на страницу регистрации  <Nav.Link href={"/auth"} className="d-flex">Зарегистрироваться</Nav.Link></div>
                            <Button className="mt-3 align-self-end"
                                variant={"outline-success"} onClick={() => this.registrationChange()}
                            > Войти</Button>
                        </Row>
                    </Form>
                </Card>
            </Container >
        )
    }
}