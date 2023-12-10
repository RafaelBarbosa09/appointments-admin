import { render, screen } from "@testing-library/react";
import NewAppointmentPage from ".";

describe('NewAppointmentPage', () => {
    it('should render correctly', () => {
        render(<NewAppointmentPage />);
        expect(screen.getByText('Novo agendamento')).toBeInTheDocument();
    });
});