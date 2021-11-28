import React from "react";
import { Container, Row, Table } from "react-bootstrap";
import Header from "../Components/Header";

class Member extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            allMembers: [],
        };
    }

    async fetchData() {
        const baseUrl = "http://localhost:8080";
        const result = await fetch(`${baseUrl}/api/member/get-all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        const response = await result.json()
        this.setState({ allMembers: response })
    }

    componentDidMount() {
        this.fetchData()
    }

    populateRowsWithData = () => {
        const members = this.state.allMembers.map(m => {
            return <tr key={m.id}>
                    <td>{m.id}</td>
                    <td>{m.fullName}</td>
                    <td>{m.birthDate}</td>
                    <td>{m.address}</td>
                </tr>
        });

        return members;
    }
    
    render() {
        return (
            <div>
                <Header />
                <Container>
                    <Row>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Full Name</th>
                                    <th>Birth Date</th>
                                    <th>Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.populateRowsWithData()}
                            </tbody>
                        </Table>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Member;