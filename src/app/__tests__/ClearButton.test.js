import {render, screen, waitFor, waitForElementToBeRemoved} from "@testing-library/react";
import WrappedApp from "../../WrappedApp";
import userEvent from "@testing-library/user-event";
import React from "react";
import {expect, test} from '@jest/globals'

test('Clear button status depends on local storage.', async () => {
    render(<WrappedApp/>);
    let clearButton = screen.getByRole('button', {name: 'Clear local storage area'});
    expect(clearButton).toBeDisabled();
    const linkToProducts = screen.getByRole('link', {name: 'Products'});
    const linkToMain = screen.getByRole('link', {name: 'Main'});
    expect(linkToProducts).toBeInTheDocument();
    userEvent.click(linkToProducts);
    await waitForElementToBeRemoved(() => screen.queryByText('Loading products...'), {timeout: 3000});
    userEvent.click(linkToMain);
    clearButton = await screen.findByRole('button');
    expect(clearButton).toBeEnabled();
    userEvent.hover(clearButton);
    expect(await screen.findByText(/Click to remove .* data from the local storage area/)).toBeInTheDocument();
    userEvent.click(clearButton);
    await waitFor(() => {
        expect(clearButton).toBeDisabled();
    });
});