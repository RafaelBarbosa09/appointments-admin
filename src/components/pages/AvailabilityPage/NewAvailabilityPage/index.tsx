import { Alert, Button, Container, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { Card } from "./styles";
import React, { useState } from "react";
import { CalendarIcon, TimeIcon } from "@mui/x-date-pickers";
import { formatTime } from "../../../../utils/format/time";
import { CreateAvailability } from "../../../../utils/types/Availability";
import { createAvailability } from "../../../../services/availability";
import { formatDateForDatabase, formatDateInput } from "../../../../utils/format/date";

const NewAvailabilityPage = () => {
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [date, setDate] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const handleStartTimeChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = formatTime(event.target.value);
        setStartTime(value);
    };

    const handleEndTimeChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = formatTime(event.target.value);
        setEndTime(value);
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = formatDateInput(event.target.value);
        setDate(value);
    };

    const handleCreateAvailability = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');

        const availability: CreateAvailability = {
            date: formatDateForDatabase(date),
            timeSlot: {
                startTime,
                endTime,
            },
            professionalId: loggedUser.professional?.id,
        };

        await createAvailability(availability).then(() => {
            setSuccess(true);
            setError(false);
            setStartTime('');
            setEndTime('');
            setDate('');
        }).catch((error) => {
            setError(true);
        });
    };

    return (
        <>
            {success && (
                <Alert
                    severity="success"
                    variant="filled"
                    onClose={() => setSuccess(false)}
                    sx={{ margin: '-2rem 1rem 1rem 1rem', top: '4rem' }}>
                    Disponibilidade criada com sucesso.
                </Alert>
            )}

            {error && (
                <Alert
                    severity="error"
                    variant="filled"
                    onClose={() => setError(false)}
                    sx={{ margin: '-2rem 1rem 1rem 1rem', top: '4rem' }}>
                    Erro ao criar horário. Tente novamente.
                </Alert>
            )}

            <Container>
                <Card sx={{ maxWidth: '800px', margin: '0 auto' }}>
                    <form onSubmit={handleCreateAvailability}>
                        <Typography variant="h6">Novo Horário</Typography>
                        <Grid container spacing={2} sx={{ marginTop: '.2rem' }}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    sx={{ width: '100%' }}
                                    label="Data"
                                    value={date}
                                    onChange={event => handleDateChange(event)}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <CalendarIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    inputProps={{
                                        maxLength: 10
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    sx={{ width: '100%' }}
                                    label="Início"
                                    value={startTime}
                                    onChange={event => handleStartTimeChange(event)}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <TimeIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    inputProps={{
                                        maxLength: 5,
                                        pattern: '^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$',
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    sx={{ width: '100%' }}
                                    label="Fim"
                                    value={endTime}
                                    onChange={event => handleEndTimeChange(event)}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <TimeIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    inputProps={{
                                        maxLength: 5,
                                        pattern: '^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$',
                                    }}
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

export default NewAvailabilityPage;