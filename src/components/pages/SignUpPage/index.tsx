import { Alert, Box, Button, Checkbox, Container, FormControlLabel, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { Paper } from "./styles";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { register } from "../../../services/authentication";
import { Link } from "react-router-dom";
import ROLE from "../../../utils/types/Role";

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [checked, setChecked] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleClickShowPasswordConfirm = () => setShowPasswordConfirm((show) => !show);

    const handleMouseDownPasswordConfirm = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    }

    const checkPasswordEquality = () => {
        return password === passwordConfirm;
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!checkPasswordEquality()) {
            setErrorMessage('As senhas não coincidem.');
            setError(true);
            return;
        }

        await register({ login: username, password, role: checked ? ROLE.ADMIN : ROLE.USER })
            .then(() => {
                setUsername('');
                setPassword('');
                setPasswordConfirm('');
                setChecked(false);
                setSuccess(true);
                setError(false);
                setErrorMessage('');
            }).catch((error) => {
                setSuccess(false);
                setError(true);
                setErrorMessage('Erro ao criar usuário.')
            });
    };

    return (
        <>

            {success && (
                <Alert
                    severity="success"
                    variant="filled"
                    onClose={() => setSuccess(false)}
                    sx={{ margin: '1rem', top: '4rem' }}>
                    Usuário criado com sucesso.
                </Alert>
            )}

            {error && (
                <Alert
                    severity="error"
                    variant="filled"
                    onClose={() => setError(false)}
                    sx={{ margin: '1rem', top: '4rem' }}>
                    {errorMessage}
                </Alert>
            )}

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
                            Signup
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
                                    <TextField
                                        id="password"
                                        label="Confirme sua senha"
                                        variant="outlined"
                                        fullWidth
                                        type={showPasswordConfirm ? 'text' : 'password'}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={handleClickShowPasswordConfirm}
                                                        onMouseDown={handleMouseDownPasswordConfirm}
                                                        edge="end"
                                                    >
                                                        {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        value={passwordConfirm}
                                        onChange={(event) => setPasswordConfirm(event.target.value)}
                                    />
                                </Grid>
                                <Grid item>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={checked}
                                                onChange={handleCheckboxChange}
                                                color="primary"
                                                inputProps={{ 'aria-label': 'admin checkbox' }}
                                            />
                                        }
                                        label="Profissional" />
                                </Grid>
                                <Grid item>
                                    <Button type="submit" variant="contained" fullWidth>
                                        Salvar
                                    </Button>
                                </Grid>
                                <Grid item sx={{ textAlign: 'center' }}>
                                    <Button sx={{ textTransform: 'none' }}>
                                        <Typography fontSize={12}>
                                            <Link to="/login">
                                                Já tem uma conta? Faça login!
                                            </Link>
                                        </Typography>
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Container>
            </Box>
        </>
    );
};

export default SignUpPage;