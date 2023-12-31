import { Alert, Button, Container, FormHelperText, Grid, TextField, Typography } from "@mui/material";
import { Card } from "./styles";
import { useEffect, useState } from "react";
import { createProfessional, getProfessionalByUserId } from "../../../services/professionals";
import { getLoggedUser } from "../../../services/users";

const AdminProfilePage = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [phone, setPhone] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');
    const [validationErrors, setValidationErrors] = useState({
        firstname: false,
        lastname: false,
        phone: false,
        cnpj: false,
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('loggedUser') || '{}');
        const fetchData = async () => {
            const professional = await getProfessionalByUserId(Number(user.id));
            if (professional) {
                setFirstname(professional.firstName);
                setLastname(professional.lastName);
                setPhone(professional.phone);
                setCnpj(professional.cnpj);
            }
        }
        fetchData();
    }, []);

    const validateForm = () => {
        const errors: any = {};
        let isValid = true;

        if (!firstname || firstname === '') {
            errors.firstname = true;
            isValid = false;
        }

        if (!lastname || lastname === '') {
            errors.lastname = true;
            isValid = false;
        }

        if (!cnpj || cnpj === '') {
            errors.cnpj = true;
            isValid = false;
        }

        if (!phone || phone === '') {
            errors.phone = true;
            isValid = false;
        }

        setValidationErrors(errors);
        return isValid;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const user = JSON.parse(localStorage.getItem('loggedUser') || '{}');

        const response = await createProfessional({
            firstName: firstname,
            lastName: lastname,
            phone,
            cnpj,
        }, user.id);

        if (response) {
            setMessage('Perfil atualizado com sucesso!');
            setError(false);
            setSuccess(true);

            const token = localStorage.getItem('token') || '';
            const loggedUser = await getLoggedUser(token, user.username);

            localStorage.removeItem('loggedUser');
            localStorage.setItem('loggedUser', JSON.stringify(loggedUser));

        } else {
            setMessage('Erro ao atualizar perfil!');
            setSuccess(false);
            setError(true);
        }
    }

    return (
        <>
            {success && (
                <Alert
                    severity="success"
                    variant="filled"
                    onClose={() => setSuccess(false)}
                    sx={{ margin: '-2rem 1rem 1rem 1rem', top: '4rem' }}>
                    {message}
                </Alert>
            )}

            {error && (
                <Alert
                    severity="error"
                    variant="filled"
                    onClose={() => setError(false)}
                    sx={{ margin: '-2rem 1rem 1rem 1rem', top: '4rem' }}>
                    {message}
                </Alert>
            )}
            <Container sx={{ marginTop: '-1rem' }}>
                <Card sx={{ maxWidth: '800px', margin: '0 auto' }}>
                    <Typography variant="h6">Editar Perfil</Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2} sx={{ marginTop: '.2rem' }}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="name"
                                    label="Nome"
                                    variant="outlined"
                                    fullWidth
                                    value={firstname}
                                    onChange={(event) => setFirstname(event.target.value)}
                                    error={validationErrors.firstname}
                                />
                                {validationErrors.firstname && (
                                    <FormHelperText style={{ color: 'red', fontWeight: 400 }}>campo obrigatório</FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="lastname"
                                    label="Sobrenome"
                                    variant="outlined"
                                    fullWidth
                                    value={lastname}
                                    onChange={(event) => setLastname(event.target.value)}
                                    error={validationErrors.lastname}
                                />
                                {validationErrors.lastname && (
                                    <FormHelperText style={{ color: 'red', fontWeight: 400 }}>campo obrigatório</FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="phone"
                                    label="Telefone"
                                    variant="outlined"
                                    fullWidth
                                    value={phone}
                                    onChange={(event) => setPhone(event.target.value)}
                                    error={validationErrors.phone}
                                />
                                {validationErrors.phone && (
                                    <FormHelperText style={{ color: 'red', fontWeight: 400 }}>campo obrigatório</FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="cnpj"
                                    label="CNPJ"
                                    variant="outlined"
                                    fullWidth
                                    value={cnpj}
                                    onChange={(event) => setCnpj(event.target.value)}
                                    error={validationErrors.cnpj}
                                />
                                {validationErrors.cnpj && (
                                    <FormHelperText style={{ color: 'red', fontWeight: 400 }}>campo obrigatório</FormHelperText>
                                )}
                            </Grid>
                        </Grid>
                        <Button
                            sx={{ marginTop: '1rem' }}
                            variant="contained"
                            type="submit"
                            color="primary"
                            size="small"
                        >
                            Salvar
                        </Button>
                    </form>
                </Card>
            </Container>
        </>
    );
};

export default AdminProfilePage;