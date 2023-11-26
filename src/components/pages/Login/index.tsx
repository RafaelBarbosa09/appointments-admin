import { Box, Button, Container, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { Paper } from "./styles";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { login } from "../../../services/authentication";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthProvider";
import { getLoggedUser } from "../../../services/users";

export const Login = () => {
    const navigate = useNavigate();
    // const {  } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState({} as any);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = await login({ login: username, password });

        if (!data || !data.token) {
            return;
        }

        const { token } = data;

        localStorage.setItem('token', token);

        await handleGetLoggedUser(token, username);

        navigate('/');
    };

    const handleGetLoggedUser = async (token: string, username: string) => {
        await getLoggedUser(token, username).then((response) => {
            setUser(response);
            localStorage.setItem('loggedUser', JSON.stringify(response));
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <Container maxWidth="sm">
                <Paper>
                    <Typography
                        variant="h4"
                        align="center"
                        sx={{ marginBottom: '1.5rem' }}
                    >
                        Login
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container direction="column" spacing={2}>
                            <Grid item>
                                <TextField
                                    id="username"
                                    label="Usuário"
                                    variant="outlined"
                                    fullWidth
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="password"
                                    label="Senha"
                                    variant="outlined"
                                    fullWidth
                                    type={showPassword ? 'text' : 'password'}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                            </Grid>
                            <Grid item>
                                <Button type="submit" variant="contained" fullWidth>
                                    Entrar
                                </Button>
                            </Grid>
                            <Grid item sx={{ textAlign: 'center' }}>
                                <Button sx={{ textTransform: 'none' }}>
                                    <Typography fontSize={12}>
                                        <Link to="/signup">
                                            Não tem uma conta? Cadastre-se!
                                        </Link>
                                    </Typography>
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </Box>
    );
}