import { render, screen } from "@testing-library/react";
import { AppointmentStatus } from "../../../utils/types/AppointmentStatus";
import { Tag } from ".";

const status: AppointmentStatus = {
    id: 1,
    name: 'Pendente',
};

describe('Tag', () => {
    it('should render correctly', () => {
        render(<Tag status={status} />);
        expect(screen.getByText('Pendente')).toBeInTheDocument();
    });
});