import {Container, Menu} from "semantic-ui-react";
import {NavLink} from "react-router-dom";

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
    return (
        <Menu.Item as={NavLink} to={path} replace>
            {children}
        </Menu.Item>
    );
}