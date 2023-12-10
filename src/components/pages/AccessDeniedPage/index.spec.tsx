import { render, screen } from "@testing-library/react";
import AccessDeniedPage from ".";

// mock do react-router-dom
jest.mock('react-router-dom', () => {
    return {
        useNavigate: () => jest.fn(),
    };
});

//mock Link
jest.mock('react-router-dom', () => {
    return {
        Link: () => {
            return <div>Link</div>;
        },
    };
});

describe('AccessDeniedPage', () => {
    it('should render correctly', () => {
        render(<AccessDeniedPage />);
        expect(screen.getByText('Ops! Você não tem permissão para acessar esta página.')).toBeInTheDocument();
    });
});