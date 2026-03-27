import App from "../App.tsx";
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
});