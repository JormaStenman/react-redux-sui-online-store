import {Container, Menu} from "semantic-ui-react";
import {Link, useLocation} from "react-router-dom";

export default function Navbar() {
    const location = useLocation();

    return (
        <Container>
            <Menu>
                <Menu.Item active={location.pathname === '/main'}>
                    <Link to='/main'>Main</Link>
                </Menu.Item>
                <Menu.Item active={location.pathname === '/products'}>
                    <Link to='/products'>Products</Link>
                </Menu.Item>
            </Menu>
        </Container>
    );
}