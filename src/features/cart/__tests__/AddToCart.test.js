import {render, screen, waitFor} from "@testing-library/react";
import WrappedApp from "../../../WrappedApp";
import React from "react";
import userEvent from "@testing-library/user-event";
import {expect, test} from '@jest/globals'

test('Product is added to cart, where its quantity can be changed', async () => {
    render(<WrappedApp/>);
    const linkToProducts = screen.getByRole('link', {name: 'Products'});
    userEvent.click(linkToProducts);
    const productLink = await screen.findByAltText('product-id-24806', {}, {timeout: 3000});
    expect(productLink).toBeInTheDocument();
    userEvent.click(productLink);
    const addButton = await screen.findByRole('button', {name: 'Add to cart'});
    expect(addButton).toBeInTheDocument();
    expect(screen.queryByTestId('cart-numitems')).not.toBeInTheDocument();
    userEvent.click(addButton);
    const cartLink = await screen.findByText('Shopping cart');
    expect(cartLink).not.toHaveClass('active')
    const numItems = await screen.findByTestId('cart-numitems');
    expect(numItems).toHaveTextContent('1');
    userEvent.click(cartLink);
    const amountInput = await screen.findByDisplayValue('1');
    const totalValue = await screen.findByText('Cart total:');
    expect(cartLink).toHaveClass('active');
    expect(amountInput).toBeInTheDocument();
    expect(totalValue).toBeInTheDocument();
    expect(totalValue).toHaveTextContent(/7,99.*€/);
    userEvent.type(amountInput, '{backspace}2');
    expect(totalValue).toHaveTextContent(/15,98.*€/);
    const removeButton = await screen.findByTitle('remove');
    userEvent.click(removeButton);
    await waitFor(() => expect(totalValue).toHaveTextContent(/0,00.*€/));
    expect(screen.queryByTestId('cart-numitems')).not.toBeInTheDocument();
});