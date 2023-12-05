export const setTitle = (pathname: string) => {
    switch (pathname) {
        case '/':
            return 'Home';
        case '/appointments':
            return 'Agendamentos';
        case '/appointments/new':
            return 'Agendamentos';
        case '/availability/new':
            return 'Disponibilidade';
        case '/profile/admin':
            return 'Perfil';
        case '/profile/user':
            return 'Perfil';
        case '/availability':
            return 'Disponibilidade';
        default:
            return '';
    }
}