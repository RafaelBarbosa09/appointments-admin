import { render, screen } from '@testing-library/react';
import DashboardItem from '.';
import { Appointment } from '../../../../utils/types/Appointment';

jest.mock('../../../../services/appointments', () => ({
    updateAppointmentStatus: jest.fn(),
    getAppointmentsByCustomerId: jest.fn(),
    getAppointmentsByProfessionalId: jest.fn(),
}));

jest.mock('../../../../services/professionals', () => ({
    getAppointmentsByProfessionalId: jest.fn(),
}));

jest.mock('../../../../contexts/AuthProvider', () => ({
    useAuth: () => ({
        loggedUser: {
            customer: {
                id: 1,
            },
            professional: {
                id: 1,
            },
        },
    }),
}));

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(initial => [initial, jest.fn()]),
}));

const setAppointments = jest.fn();

const appointment: Appointment = {
    id: 1,
    appointmentDateTime: new Date('2021-09-10T09:00:00'),
    status: {
        id: 1,
        name: 'Pendente',
    },
    work: {
        id: 1,
        name: 'Fio a Fio',
        price: 30,
        estimatedTime: '1h 20min',
    },
    professional: {
        id: 1,
        firstName: 'João',
        lastName: 'Silva',
        phone: '123456789',
        cnpj: '123456789',
    },
    customer: {
        id: 1,
        firstName: 'João',
        lastName: 'Silva',
        phone: '123456789',
        cpf: '123456789',
        rg: '123456789',
        birthDate: new Date('2021-09-10T09:00:00'),
    },
};




describe('DashboardItem', () => {
    it('should render correctly', () => {
        render(<DashboardItem appointment={appointment} setAppointments={setAppointments} />);
        expect(screen.getByText('Fio a Fio')).toBeInTheDocument();
        expect(screen.getByText('sexta-feira, 10/09/2021 09:00')).toBeInTheDocument();
        expect(screen.getByText('Pendente')).toBeInTheDocument();
    });
});