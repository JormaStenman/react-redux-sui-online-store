import React from 'react';
import WrappedApp from "../WrappedApp";
import {render, screen} from '@testing-library/react';
import {expect, test} from '@jest/globals'

test('Main page renders by default.', () => {
    render(<WrappedApp/>);
    // screen.debug();
    expect(screen.getByText('Demo Online Store')).toBeInTheDocument();
});