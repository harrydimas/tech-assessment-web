import React from "react";
import { Col, Container, Row, Table, Button, FormGroup, FormLabel, FormControl } from "react-bootstrap";
import Header from "../Components/Header";

class Transaction extends React.Component {

    constructor(props) {
        super(props);
        const startDateString = new Date().toISOString().split("T")[0];
        const endDateString = new Date().toISOString().split("T")[0];
        this.state = {
            transactions: [],
            startDate: startDateString,
            endDate: endDateString,
            searchBy: 0,
            allMembers: [],
            memberId: 0
        };
    }

    async fetchData() {
        const baseUrl = "http://localhost:8080";
        let fullUrl = `${baseUrl}/api/trx/get-by-date?startDate=${this.state.startDate}&endDate=${this.state.endDate}`
        if(this.state.searchBy===1)
            fullUrl = `${baseUrl}/api/trx/get-by-member?memberId=${this.state.memberId}`
        const result = await fetch(fullUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        const response = await result.json()
        this.setState({ transactions: response })
    }

    async fetchMember() {
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

    startDateChange(e) {
        const date = e.target.value
        this.setState({ startDate: date });
    }

    endDateChange(e) {
        const date = e.target.value
        this.setState({ endDate: date })
    }

    searchByChange(e) {
        const value = e.target.value
        this.setState({ searchBy: parseInt(value) })
    }

    memberIdChange(e) {
        const value = e.target.value
        this.setState({ memberId: parseInt(value) })
    }

    componentDidMount() {
        this.fetchData()
        this.fetchMember()
    }

    populateRowsWithData = () => {
        const trans = this.state.transactions.map(trx => {
            return <tr key={trx.id}>
                <td>{trx.id}</td>
                <td>{trx.memberId.fullName}</td>
                <td>{trx.amount}</td>
                <td>{trx.trxType}</td>
                <td>{trx.trxDate.replace('T', ' ')}</td>
                <td>{trx.description}</td>
            </tr>
        });

        return trans;
    }

    populateRowsWithMemberData = () => {
        const members = this.state.allMembers.map(m => {
            return <option key={m.id} value={m.id}>{m.fullName}</option>
        });

        return members;
    }

    render() {
        const dateDisplay = this.state.searchBy === 0;
        const memberDisplay = this.state.searchBy === 1;
        return (
            <div>
                <Header />
                <Container>
                    <Row>
                        <Col>
                            <FormGroup>
                                <FormLabel>Search By</FormLabel>
                                <select className="form-control" value={this.state.searchBy} onChange={v => this.searchByChange(v)}>
                                    <option value="0">Date</option>
                                    <option value="1">Member</option>
                                </select>
                            </FormGroup>
                        </Col>
                    </Row>
                    {dateDisplay && <Row>
                        <Col>
                            <FormGroup>
                                <FormLabel>Date From</FormLabel>
                                <FormControl type="date" value={this.state.startDate} onChange={v => this.startDateChange(v)} />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <FormLabel>Date To</FormLabel>
                                <FormControl type="date" value={this.state.endDate} onChange={v => this.endDateChange(v)} />
                            </FormGroup>
                        </Col>
                    </Row>}
                    {memberDisplay && <Row>
                        <Col>
                            <FormGroup>
                                <FormLabel>Member</FormLabel>
                                <select className="form-control" value={this.state.memberId} onChange={v => this.memberIdChange(v)}>
                                    <option value="0">Please select</option>
                                    {this.populateRowsWithMemberData()}
                                </select>
                            </FormGroup>
                        </Col>
                    </Row>}
                    <br />
                    <Row>
                        <Col>
                            <Button type="button" id="search" className="btn btn-success" onClick={this.fetchData.bind(this)}>Search</Button>
                            &nbsp;&nbsp;&nbsp;
                            <a href="/transaction/add" id="add" className="btn btn-success">Add Transaction</a>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Full Name</th>
                                    <th>Amount</th>
                                    <th>Type</th>
                                    <th>Date</th>
                                    <th>Description</th>
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

export default Transaction;