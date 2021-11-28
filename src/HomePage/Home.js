import Header from "../Components/Header";
import { Card, Container, Row } from "react-bootstrap";

function Home() {
    return (
        <div>
            <Header />
            <Container>
                <Row>
                    <Card>
                        <div className="card-body">
                        Welcome to application.
                        </div>
                    </Card>
                </Row>
            </Container>
        </div>
    )
}

export default Home;