import React from "react";
import { Alert, Button, Col, Container, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap";
import Header from "../Components/Header";

const baseUrl = "http://localhost:8080";

class AddTransaction extends React.Component {

    constructor(props) {
        super(props);
        const trxDateString = new Date().toISOString().split("T")[0];
        this.state = {
            allMembers: [],
            trxDate: trxDateString,
            memberId: 0,
            amount: 0.0,
            trxType: "C",
            description: "",
            error: false,
            errorMessage: ""
        };
    }

    async fetchMember() {
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

    async addTransaction() {

        let error = false;
        let errorMessage = false;
        if(this.state.memberId === 0){
            error = true;
            errorMessage = "Please select member"
        } else if(this.state.amount <= 0){
            error = true;
            errorMessage = "Amount must be more than 0"
        }

        if(!error){
            const data = {
                "memberId": this.state.memberId,
                "amount": this.state.amount,
                "trxType": this.state.trxType,
                "trxDate": this.state.trxDate,
                "description": this.state.description
            }
            const result = await fetch(`${baseUrl}/api/trx/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if(result.ok){
                this.props.history.push('/transaction')
            } else {
                this.setState({ error: true, errorMessage: "Invalid input" })
            }
        } else {
            this.setState({ error: error, errorMessage: errorMessage })
        }
    }

    trxDateChange(e) {
        const date = e.target.value
        this.setState({ trxDate: date });
    }

    memberIdChange(e) {
        const value = e.target.value
        this.setState({ memberId: parseInt(value) })
    }

    amountChange(e) {
        let value = parseFloat(e.target.value)
        if(Number.isNaN(value)) value = 0.0
        this.setState({ amount: parseFloat(value) })
    }

    trxTypeChange(e) {
        const value = e.target.value
        this.setState({ trxType: value })
    }

    descriptionChange(e) {
        const value = e.target.value
        this.setState({ description: value })
    }

    componentDidMount() {
        this.fetchMember()
    }

    populateRowsWithMemberData = () => {
        const members = this.state.allMembers.map(m => {
            return <option key={m.id} value={m.id}>{m.fullName}</option>
        });

        return members;
    }

    render() {
        return (
            <div>
                <Header />
                <Container>
                    {this.state.error && <Alert variant="danger">
                        {this.state.errorMessage}
                    </Alert>}
                    <Row>
                        <Col >
                            <FormGroup>
                                <FormLabel>Member</FormLabel>
                                <select className="form-control" value={this.state.memberId} onChange={v => this.memberIdChange(v)}>
                                    <option value="0">Please select</option>
                                    {this.populateRowsWithMemberData()}
                                </select>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <FormLabel>Date From</FormLabel>
                                <FormControl type="date" value={this.state.trxDate} onChange={v => this.trxDateChange(v)} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            <FormGroup>
                                <FormLabel>Type</FormLabel>
                                <select className="form-control" value={this.state.trxType} onChange={v => this.trxTypeChange(v)}>
                                    <option value="C">Credit</option>
                                    <option value="D">Debit</option>
                                </select>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <FormLabel>Amount</FormLabel>
                                <FormControl type="number" value={this.state.amount} onChange={v => this.amountChange(v)} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <FormLabel>Description</FormLabel>
                                <FormControl type="textarea" value={this.state.description} onChange={v => this.descriptionChange(v)} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <Button type="button" id="search" className="btn btn-success" onClick={this.addTransaction.bind(this)}>Save</Button>
                            &nbsp;&nbsp;&nbsp;
                            <a href="/transaction" id="cancel" className="btn btn-success">Cancel</a>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default AddTransaction;