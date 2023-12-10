import { render, screen } from '@testing-library/react';
import AdminProfilePage from ".";

describe('AdminProfilePage', () => {
    it('should render correctly', () => {
        render(<AdminProfilePage />);

        const editText = screen.getByText('Editar Perfil');
        expect(editText).toBeInTheDocument();
    });
});