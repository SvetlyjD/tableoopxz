import React from "react";
import { Card, Container, Form, Row, Button, Nav } from "react-bootstrap";

export class Auth extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            login: null,
            mail: null,
            password: "",
            password2: "",
            level: 0,
            arr: []
        }
    }

    arrValue() {
        console.log(this.state.level);
        for (let i = 0; i < this.state.level; i++) {
            this.state.arr.push(1);
            console.log(this.state.arr);
        }
    }

    registrationChange() {
        let data = {
            email: this.state.mail,
            name: this.state.login,
            password: this.state.password,
            password_confirmation: this.state.password2
        }
        console.log(data);

        fetch('https://internsapi.public.osora.ru/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(result => {
                console.log(result); if (result.status == true) { alert("Вы были успешно зарегистрированы, перейдите на страницу авторизации") }
                if (result.status == false) {
                    if (result.errors.email) { alert(result.errors.email) }
                }
                if (result.status == false) {
                    if (result.errors.name) { alert(result.errors.name) }
                }
            })
            .catch((e) => alert(e.message))


    }


    render() {

        return (
            <Container className="d-flex justify-content-center align-items-center"
                style={{ height: window.innerHeight - 54 }}>
                <Card style={{ width: 600 }} className="p-5">
                    <h2 className="m-auto">Registration</h2>
                    <Form className="d-flex flex-column">
                        <Form.Control className="mt-2" placeholder="login"
                            value={this.state.login || ""}
                            onChange={e => this.setState({ login: e.target.value })}
                        />
                        <Form.Control className="mt-2" placeholder="mail"
                            value={this.state.mail || ""}
                            onChange={e => this.setState({ mail: e.target.value })}
                        />
                        <Form.Control className="mt-2" placeholder="password"
                            value={this.state.password || ""}
                            onChange={e => { this.setState({ password: e.target.value, level: parseInt(this.state.password.length / 3) < 3 ? parseInt(this.state.password.length / 3) : 3 }) }}
                        />
                        <div className="">

                        </div>
                        <Form.Control className="mt-2" placeholder="confirm password"
                            value={this.state.password2 || ""}
                            onChange={e => this.setState({ password2: e.target.value })}
                        />
                        <Row> <div>Есть аккаунт? <Nav.Link href={"/signup"} className="d-flex">Авторизоваться</Nav.Link> </div>
                            <Button className="mt-3 align-self-end"
                                onClick={() => this.registrationChange()}> Зарегистрироваться</Button>
                        </Row>
                    </Form>
                </Card>
            </Container>
        )

    }
}