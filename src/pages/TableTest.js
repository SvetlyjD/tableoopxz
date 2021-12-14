import React from "react";
import { Container, Button, Card, Table } from "react-bootstrap";

export default class TableTest extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            req: this.props.req,
            value: this.props.value,
            time: this.props.time,
            answer: null,
            inputValue: ""
        }
    }

    timerId = null;
    componentDidMount() {
        this.timerId = setInterval(() => {
            this.setState((prev) => ({ time: prev.time - 1 }));
        }, 1000);
    }


    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    clickButtonHandler(e) {
        if (e == -5) { clearInterval(this.timerId) }
        let resSecond = {
            answer: e,
            type_hard: this.state.value,
            type: 2
        }

        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"))
        fetch('https://internsapi.public.osora.ru/api/game/play', {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(resSecond)
        }).then(res => res.json())
            .then((result) => {
                this.setState({ req: result })
                this.setState({ time: result.data.time });
            })
            .catch((e) => alert(e.message));
    }

    clickButtonHandler1() {
        if (this.state.inputValue == "") { alert("Введите ответ"); return; }
        let resSecond = {
            type_hard: this.state.value,
            answer: this.state.inputValue,
            type: 2
        }
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        fetch("https://internsapi.public.osora.ru/api/game/play", {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(resSecond)
        })
            .then(res => res.json())
            .then(res => {
                this.setState({ req: res });
                this.setState({ time: res.data.time });
                this.setState({ inputValue: "" })
            })
            .catch((e) => alert(e.message));
    }

    render() {
        if (this.state.value == 1 && this.state.req.data.status != 1) {
            return (
                <>
                    < Container >
                        <Card style={{ width: 600 }} className="p-5 mt-5">
                            <div>Ball: {this.state.req.data.points} </div>
                            <div>{this.state.req.data.question} </div>
                            <div>{this.state.time < 1
                                ? <div>Time: 0</div>
                                : <div>Time: {this.state.time}</div>
                            }</div>
                            <div>{this.state.req.data.options.map((item, index) =>
                                <Button key={index} data-key={item} className="mx-2"
                                    onClick={(e) => { this.clickButtonHandler(e.target.dataset.key) }
                                    }>{item}</Button>)} </div>
                        </Card>
                    </Container>
                </>
            )
        }
        else if (this.state.value == 2 && this.state.req.data.status != 1) {
            return (
                <Container>
                    <Card style={{ width: 600 }} className="p-5 mt-5">
                        <div>Ball: {this.state.req.data.points} </div>
                        <div>{this.state.req.data.question} </div>
                        <div>{this.state.time < 1
                            ? <div>Time: 0</div>
                            : <div>Time: {this.state.time}</div>
                        }</div>
                        <input type="text" value={this.state.inputValue} onChange={(e) => this.setState({ inputValue: e.target.value })} />
                        <Button className="mt-2" onClick={(e) => this.clickButtonHandler1()}>Next</Button>
                    </Card>
                </Container>
            )
        }
        else if (this.state.req.data.status == 1) {
            return (
                <Container>
                    <Card style={{ width: 600 }} className="p-5 mt-5">
                        <div>Your Score: {this.state.req.data.points}</div>
                        <div>
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>Question</th>
                                        <th>Answer</th>
                                        <th>Current</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.req.data.questions.map((item, index) =>
                                        <tr key={index}>
                                            <td>{item.question}</td>
                                            <td>{item.answer}</td>
                                            <td>{item.current_answer}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </div>
                    </Card>
                </Container>
            )
        }
    }
}
