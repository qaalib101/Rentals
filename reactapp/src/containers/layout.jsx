import { Routes, Route, Outlet, Link, useNavigate} from "react-router-dom";
import { Navbar, Nav, Container, Content, FlexboxGrid, Header, Button} from 'rsuite';

export function Layout() {
    const navigate = useNavigate();
    return (
        <div>
            {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}

            <Container>
                <Header>
                    <Navbar>
                        <Navbar.Brand>Rentals</Navbar.Brand>
                        <Nav>
                            <Nav.Item><Link to="/">Home</Link></Nav.Item>
                            <Nav.Item><Link to="/rentals">Rentals</Link></Nav.Item>
                            <Nav.Item><Link to="/rentals/add">Add a Rental</Link></Nav.Item>
                            <Nav.Item><Link to="/renters">Renters</Link></Nav.Item>
                            <Nav.Item><Link to="/renters/add">Add a Renter</Link></Nav.Item>
                        </Nav>
                    </Navbar>
                </Header>
                <Content>
                    <FlexboxGrid justify="center">
                        <FlexboxGrid.Item colspan={22}>
                            <Outlet />
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </Content>
            </Container>
        </div>
    );
}