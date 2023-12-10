import { render, screen } from "@testing-library/react";
import AppointmentsPage from ".";

jest.mock('../../../contexts/AuthProvider', () => {
    return {
        useAuth: () => {
            return {
                loggedUser: {
                    role: 'USER',
                    customer: {
                        id: 1,
                        name: 'John Doe',
                    },
                },
            };
        }
    };
});


describe('Appointments Page', () => {
    it('should render correctly', () => {
        render(<AppointmentsPage />);
        expect(screen.getByText('Novo agendamento')).toBeInTheDocument();
    });
});