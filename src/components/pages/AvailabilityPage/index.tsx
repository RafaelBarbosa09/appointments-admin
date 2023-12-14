import { Alert, Container, FormHelperText, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { Card } from "./styles";
import { CalendarIcon } from "@mui/x-date-pickers";
import { useState } from "react";
import { formatDateForDatabase, formatDateInput } from "../../../utils/format/date";
import { searchAvailabilityByDateAndProfessionalId } from "../../../services/availability";
import TimeSlots from "../../TimeSlots";
import { TimeSlotDTO } from "../../../utils/types/timeSlot";
import { Link } from "react-router-dom";

interface Availability {
    id: number;
    date: string;
    timeSlots: TimeSlotDTO[];
}

const AvailabilityPage = () => {
    const [date, setDate] = useState('');
    const [availability, setAvailability] = useState({} as Availability);
    const [notFound, setNotFound] = useState(false);
    const [validationErrors, setValidationErrors] = useState({
        date: false,
    });

    const validateForm = () => {
        const errors: any = {};
        let isValid = true;

        if (!date || date === '') {
            errors.date = true;
            isValid = false;
        }

        setValidationErrors(errors);
        return isValid;
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = formatDateInput(event.target.value);
        setDate(value);
    };

    const handleSearchAvailability: React.KeyboardEventHandler<HTMLDivElement> = async (event) => {
        if (event.key !== 'Enter') return;

        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');

        const { professional } = loggedUser;

        const formattedDate = formatDateForDatabase(date);
        const response = await searchAvailabilityByDateAndProfessionalId(formattedDate, professional.id);
        if (!response) {
            setNotFound(true);
            setAvailability({} as Availability);
            return;
        }

        setAvailability(response);
        setNotFound(false);
    };

    return (
        <>
            {notFound && (
                <Alert
                    severity="warning"
                    variant="filled"
                    onClose={() => setNotFound(false)}
                    sx={{ margin: '-2rem 1rem 1rem 1rem', top: '4rem' }}>
                    Nenhuma disponibilidade encontrada para a data informada.
                </Alert>
            )}

            <Container>
                <Card sx={{ maxWidth: '600px', margin: '0 auto' }}>
                    <Typography variant="h6">Buscar disponibilidade</Typography>
                    <Grid container spacing={2} sx={{ marginTop: '.2rem' }}>
                        <Grid item xs={12}>
                            <TextField
                                sx={{ width: '100%' }}
                                label="Informe a Data"
                                value={date}
                                onChange={event => handleDateChange(event)}
                                onKeyDown={handleSearchAvailability}
                                error={validationErrors.date}
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
                            {validationErrors.date && (
                                <FormHelperText style={{ color: 'red', fontWeight: 400 }}>campo obrigatório</FormHelperText>
                            )}
                        </Grid>
                    </Grid>
                    <TimeSlots timeSlots={availability?.timeSlots} />
                </Card>
                <Typography variant="body1" align="center" sx={{ marginTop: '1rem' }}>
                    Ainda não tem agenda para alguma data? Crie uma{' '}
                    <Link to="/availability/new" style={{ textDecoration: 'underline' }}>
                        clicando aqui
                    </Link>
                    !
                </Typography>
            </Container>
        </>
    );
};

export default AvailabilityPage;