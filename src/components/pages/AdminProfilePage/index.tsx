import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { Card } from "./styles";
import { useState } from "react";

const AdminProfilePage = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [phone, setPhone] = useState('');
    const [cnpj, setCnpj] = useState('');

    return (
        <Container sx={{ marginTop: '-1rem' }}>
            <Card sx={{ maxWidth: '800px', margin: '0 auto' }}>
                <Typography variant="h6">Editar Perfil</Typography>

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
                            id="cnpj"
                            label="CNPJ"
                            variant="outlined"
                            fullWidth
                            value={cnpj}
                            onChange={(event) => setCnpj(event.target.value)}
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
            </Card>
        </Container>
    );
};

export default AdminProfilePage;