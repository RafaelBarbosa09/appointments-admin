import { Button, Container, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import HeaderMenu from "../../shared/HeaderMenu";
import { Card } from "./styles";
import React, { useState } from "react";
import { CalendarIcon, TimeIcon } from "@mui/x-date-pickers";
import { formatTime } from "../../../utils/format/time";
import { createTimeSlot } from "../../../services/timeSlots";
import { CreateAvailability } from "../../../utils/types/Availability";
import { createAvailability } from "../../../services/availability";

const TimeSlotsPage = () => {
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        await createTimeSlot({ startTime, endTime }).then(() => {
            console.log('Horário criado com sucesso!');
        }).catch((error) => {
            console.log(error);
        });
    }

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

    const formatDateInput = (value: string) => {
        const cleanedValue = value.replace(/\D/g, ''); // Remove caracteres não numéricos
        let formattedValue = '';

        if (cleanedValue.length > 2) {
            formattedValue = `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(2, 4)}/${cleanedValue.slice(4, 8)}`;
        } else {
            formattedValue = cleanedValue;
        }

        return formattedValue;
    };

    const handleCreateAvailability = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const availability: CreateAvailability = {
            date: '2021-10-20',
            timeSlot: {
                startTime,
                endTime,
            }
        };

        await createAvailability(availability).then(() => {
            console.log('Horário criado com sucesso!');
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <>
            <HeaderMenu title="Horários" />
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

export default TimeSlotsPage;