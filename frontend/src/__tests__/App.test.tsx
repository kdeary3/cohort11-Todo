import App from "../App.tsx";
import userEvent from "@testing-library/user-event"
import {render, screen} from "@testing-library/react";
import {expect} from "vitest";

describe('App.tsx', () => {
    it('should display heading', () => {
        // Arrange
        render(<App />)

        // Assert
        // testing-library.com/docs/queries/about#types-of-queries (getBy, queryBy, findBy)
        // testing-library.com/docs/queries/about
        expect(screen.getByRole('heading', {name: /started/i} )).toBeInTheDocument();
        screen.logTestingPlaygroundURL()
    });

    it('should increment counter', async () => {
        //Arrange
        render(<App />)

        // Assert
        const user = userEvent.setup()
        const button = screen.getByRole('button', {name: /count/i})
        expect(screen.getByRole('button',{name: /0/i})).toBeVisible()
        await user.click(button)
        expect(screen.getByRole('button',{name: /1/i})).toBeVisible()
    });


});