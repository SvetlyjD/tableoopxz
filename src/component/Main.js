import React from "react";
import { Container, Button } from "react-bootstrap";
import TableTest from "../pages/TableTest";

export class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 1,
            req: null,
            div: null,
            token: localStorage.getItem("token")
        }
    }

    startTestHandler() {
        let data = {
            type_hard: this.state.value + "",
            type: 1
        }
        const head = new Headers();
        head.append('Content-Type', 'application/json;charset=utf-8');
        head.append("authorization", "Bearer " + this.state.token);
        // console.log(c)
        try {
            fetch("https://internsapi.public.osora.ru/api/game/play", {
                method: "POST",
                headers: head,
                body: JSON.stringify(data)
            }).then(res => res.json())
                .then(result => {
                    this.setState({ req: result });
                    console.log(result);
                    this.setState({ div: result.status }
                    )
                }
                )
        }
        catch (error) {
            console.log(error)
        }
    }


    render() {
        return (
            <>
                <Container>
                    <div style={{ marginTop: 20 }}>Выберите уровень сложности</div>
                    <select name="" id="" className="d-flex" onChange={(e) => this.setState({ value: e.target.value })} >
                        <option value="1">Easy/Легко</option>
                        <option value="2">Hard/Тяжело</option>
                    </select>
                    <Button className="mt-2" style={{ width: 120, marginLeft: 150 }} onClick={() => this.startTestHandler()}>Start</Button>
                    <Button className="mt-2 mx-2" onClick={() => window.location.reload()}>Go Back</Button>
                </Container >
                {this.state.div ? <TableTest value={this.state.value} req={this.state.req} time={this.state.req.data.time}></TableTest> : <></>}
            </>
        )
    }
}