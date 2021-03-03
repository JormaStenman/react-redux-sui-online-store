import {Container, Menu} from "semantic-ui-react";
import {useHistory, useLocation} from "react-router-dom";

export default function Navbar() {
    return (
        <Container>
            <Menu stackable>
                <NavbarItem path='/main'>Main</NavbarItem>
                <NavbarItem path='/products'>Products</NavbarItem>
            </Menu>
        </Container>
    );
}

function NavbarItem({path, children}) {
    const history = useHistory();
    const location = useLocation();

    return (
        <Menu.Item
            active={location.pathname === path}
            onClick={() => history.replace(path)}
        >
            {children}
        </Menu.Item>
    );
}