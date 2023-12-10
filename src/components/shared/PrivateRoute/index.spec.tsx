import { render, screen } from "@testing-library/react";
import PrivateRoute from ".";
import ROLE from "../../../utils/types/Role";
import NewAppointmentPage from "../../pages/AppointmentsPage/NewAppointmentPage";

jest.mock('react-router-dom', () => {
    return {
        useNavigate: () => jest.fn(),
    };
});

jest.mock('../../../contexts/AuthProvider', () => {
    return {
        useAuth: () => {
            return {
                loggedUser: {
                    id: 1,
                    role: ROLE.ADMIN,
                    roles: [ROLE.ADMIN, ROLE.USER]
                },
            };
        }
    };
});

jest.mock('../../pages/AccessDeniedPage', () => {
    return () => {
        return <div>AccessDeniedPage</div>;
    };
});

describe('PrivateRoute', () => {
    it('should be able to show AccessDeniedPage', () => {
        render(<PrivateRoute roles={[ROLE.USER]} component={NewAppointmentPage} />);
        expect(screen.getByText('AccessDeniedPage')).toBeInTheDocument();
    });
});