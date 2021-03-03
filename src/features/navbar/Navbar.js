import {Container, Menu} from "semantic-ui-react";
import {Link, useLocation} from "react-router-dom";
import {useEffect} from "react";

// eslint-disable-next-line
export default () => {
    const location = useLocation();

    useEffect(() => {
        console.log('Navbar: location=', location);
    });
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