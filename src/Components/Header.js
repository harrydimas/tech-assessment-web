import { Container, Nav } from "react-bootstrap";

function Header() {
    return (
        <Nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <Container fluid>
                <a className="navbar-brand" href="/">Tech Assessment</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" href="/member">Member</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/transaction">Transaction</a>
                        </li>
                    </ul>
                </div>
            </Container>
        </Nav>
    )
}

export default Header;