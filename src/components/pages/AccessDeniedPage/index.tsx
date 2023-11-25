import { Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { AccessDeniedPageContainer } from "./styles";

const AccessDeniedPage = () => {
    return (
        <Container>
            <AccessDeniedPageContainer>
                <Typography variant="h4" align="center" justifyContent={'center'}>
                    Ops! Você não tem permissão para acessar esta página.
                </Typography>
                <Typography variant="body1" align="center">
                    Em caso de dúvidas, entre em contato com o administrador.
                </Typography>
                <Button variant="contained" color="primary">
                    <Link to="/">
                        Voltar para a página inicial
                    </Link>
                </Button>
            </AccessDeniedPageContainer>
        </Container>
    );
};

export default AccessDeniedPage;