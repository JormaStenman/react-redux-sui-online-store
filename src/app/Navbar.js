import {Container, Icon, Label, Menu} from "semantic-ui-react";
import {Link, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectNumberOfItemsInCart} from "../features/cart/cartSlice";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const numItems = useSelector(state => selectNumberOfItemsInCart(state));
    return (
        <Container>
            <Menu stackable borderless>
                <NavbarItem path='/main'>Main</NavbarItem>
                <NavbarItem path='/products'>Products</NavbarItem>
                <Menu.Menu position='right'>
                    <NavbarItem path='/orders'>
                        My Orders
                    </NavbarItem>
                    <NavbarItem path='/cart'>
                        <Icon name='shopping cart'/>Shopping cart
                        {numItems ? <Label circular>{numItems}</Label> : null}
                    </NavbarItem>
                </Menu.Menu>
            </Menu>
        </Container>
    );
}

function NavbarItem({path, children}) {
    const location = useLocation();
    return (
        <Menu.Item active={location.pathname === path} as={Link} to={path} replace>
            {children}
        </Menu.Item>
    );
}