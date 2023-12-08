import { Alert, Button, Container, Grid, TextField, Typography } from "@mui/material";
import { Card } from "./styles";
import { useEffect, useState } from "react";
import { createCustomer, getCustomersByUserId } from "../../../services/customers";
import { getLoggedUser } from "../../../services/users";

const UserProfilePage = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [phone, setPhone] = useState('');
    const [cpf, setCpf] = useState('');
    const [rg, setRg] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('loggedUser') || '{}');
        const fetchData = async () => {
            const customer = await getCustomersByUserId(Number(user.id));
            if (customer) {
                setFirstname(customer.firstName);
                setLastname(customer.lastName);
                setPhone(customer.phone);
                setCpf(customer.cpf);
                setRg(customer.rg);
                setBirthDate(customer.birthdate);
                setStreet(customer.address?.street);
                setNumber(customer.address?.number);
                setNeighborhood(customer.address?.neighborhood);
                setCity(customer.address?.city);
                setState(customer.address?.state);
                setZipCode(customer.address?.zipCode);
            }
        }
        fetchData();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const user = JSON.parse(localStorage.getItem('loggedUser') || '{}');

        const response = await createCustomer({
            firstName: firstname,
            lastName: lastname,
            phone,
            cpf,
            rg,
            birthdate: birthDate,
            address: {
                street,
                number,
                neighborhood,
                city,
                state,
                zipCode,
            }
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
            <Container sx={{ height: '100vh' }}>
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
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="lastname"
                                    label="Sobrenome"
                                    variant="outlined"
                                    fullWidth
                                    value={lastname}
                                    onChange={(event) => setLastname(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="phone"
                                    label="Telefone"
                                    variant="outlined"
                                    fullWidth
                                    value={phone}
                                    onChange={(event) => setPhone(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="cpf"
                                    label="CPF"
                                    variant="outlined"
                                    fullWidth
                                    value={cpf}
                                    onChange={(event) => setCpf(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="rg"
                                    label="RG"
                                    variant="outlined"
                                    fullWidth
                                    value={rg}
                                    onChange={(event) => setRg(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="birthDate"
                                    label="Data de nascimento"
                                    variant="outlined"
                                    fullWidth
                                    value={birthDate}
                                    onChange={(event) => setBirthDate(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    id="street"
                                    label="Rua"
                                    variant="outlined"
                                    fullWidth
                                    value={street}
                                    onChange={(event) => setStreet(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    id="number"
                                    label="Número"
                                    variant="outlined"
                                    fullWidth
                                    value={number}
                                    onChange={(event) => setNumber(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    id="neighborhood"
                                    label="Bairro"
                                    variant="outlined"
                                    fullWidth
                                    value={neighborhood}
                                    onChange={(event) => setNeighborhood(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    id="zipCode"
                                    label="CEP"
                                    variant="outlined"
                                    fullWidth
                                    value={zipCode}
                                    onChange={(event) => setZipCode(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="city"
                                    label="Cidade"
                                    variant="outlined"
                                    fullWidth
                                    value={city}
                                    onChange={(event) => setCity(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="state"
                                    label="Estado"
                                    variant="outlined"
                                    fullWidth
                                    value={state}
                                    onChange={(event) => setState(event.target.value)}
                                />
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

export default UserProfilePage;