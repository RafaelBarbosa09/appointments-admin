import { useEffect, useState } from "react";
import { Alert, Button, Container, FormHelperText, Grid, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { Professional } from "../../../../utils/types/Professional";
import { Work } from "../../../../utils/types/Work";
import { getAllWorks } from "../../../../services/works";
import { getAllProfessionals } from "../../../../services/professionals";
import { Card } from "./styles";
import { createAppointment } from "../../../../services/appointments";
import { useAuth } from "../../../../contexts/AuthProvider";
import { formatDateForDatabase, formatDateInput } from "../../../../utils/format/date";
import { searchAvailabilityByDateAndProfessionalId } from "../../../../services/availability";
import { Availability } from "../../../../utils/types/Availability";
import { CalendarIcon } from "@mui/x-date-pickers";
import TimeSlots from "../../../TimeSlots";
import { TimeSlotDTO } from "../../../../utils/types/timeSlot";

const NewAppointmentPage = () => {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [selectedProfessional, setSelectedProfessional] = useState<number | null>(null);
  const [works, setWorks] = useState<Work[]>([]);
  const [selectedWork, setSelectedWork] = useState<number | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const { loggedUser } = useAuth();

  const [date, setDate] = useState('');
  const [availability, setAvailability] = useState({} as Availability);
  const [notFound, setNotFound] = useState(false);
  const [timeSlot, setTimeSlot] = useState({} as TimeSlotDTO);

  const [validationErrors, setValidationErrors] = useState({
    professional: false,
    work: false,
    date: false,
  });

  const validateForm = () => {
    const errors: any = {};
    let isValid = true;

    if (!selectedProfessional) {
      errors.professional = true;
      isValid = false;
    }

    if (!selectedWork) {
      errors.work = true;
      isValid = false;
    }

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!timeSlot || !timeSlot.startTime) {
      setSuccess(false);
      setMessage('Selecione um horário!');
      setError(true);
      return;
    }

    const selectedDateTime = convertStringToDateTime(date, timeSlot.startTime);
    console.log(selectedDateTime);

    const appointmentCreated = await createAppointment({
      appointmentDateTime: selectedDateTime,
      professional: {
        id: selectedProfessional!,
      },
      work: {
        id: selectedWork!,
      },
      customer: {
        id: loggedUser.customer?.id,
      }
    });

    if (!appointmentCreated) {
      setSuccess(false);
      setMessage('Erro ao realizar agendamento!');
      setError(true);
      return;
    }

    setSelectedProfessional(null);
    setSelectedWork(null);
    setDate('');
    setTimeSlot({} as TimeSlotDTO);
    setSuccess(true);
  };

  const handleSearchAvailability: React.KeyboardEventHandler<HTMLDivElement> = async (event) => {
    if (event.key !== 'Enter') return;

    event.preventDefault();

    const formattedDate = formatDateForDatabase(date);

    if (!selectedProfessional) {
      setValidationErrors({ ...validationErrors, professional: true });
      return;
    }

    await searchAvailabilityByDateAndProfessionalId(formattedDate, selectedProfessional).then((response) => {
      if (!response) {
        setNotFound(true);
        setAvailability({} as Availability);
        return;
      }

      setAvailability(response);
      setNotFound(false);
    });
  };

  const convertStringToDateTime = (date: string, time: string) => {
    const [day, month, year] = date.split('/').map(Number);
    const [hour, minute] = time.split(':').map(Number);

    const selectedDateTime = new Date(year, month - 1, day, hour, minute);

    return selectedDateTime;
  };


  useEffect(() => {
    const fetchProfessionalsData = async () => {
      const professionals = await getAllProfessionals();
      if (professionals) {
        setProfessionals(professionals);
      }
    };

    const fetchWorksData = async () => {
      const works = await getAllWorks();
      if (works) {
        setWorks(works);
      }
    };

    fetchProfessionalsData();
    fetchWorksData();
  }, []);

  return (
    <>
      {success && (
        <Alert
          onClose={() => setSuccess(false)}
          sx={{ margin: '-2rem 1rem 1rem 1rem', top: '4rem' }}
          variant="filled"
          severity="success">
          Agendamento realizado com sucesso!
        </Alert>
      )}
      {
        error && (
          <Alert
            onClose={() => setError(false)}
            sx={{ margin: '-2rem 1rem 1rem 1rem', top: '4rem' }}
            variant="filled"
            severity="error">
            {message}
          </Alert>
        )
      }
      <Container sx={{ height: '100vh' }}>
        <Card sx={{ maxWidth: '800px', margin: '0 auto' }}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h6">Novo agendamento</Typography>
            <Grid container spacing={2} sx={{ marginTop: '.2rem', marginBottom: '.5rem' }}>
              <Grid item xs={12} md={6}>
                <InputLabel id="professional-label">Selecione um profissional</InputLabel>
                <Select
                  style={{ width: '100%', marginTop: '8px' }}
                  labelId="professional-label"
                  id="professional-select"
                  value={selectedProfessional ? selectedProfessional.toString() : ''}
                  onChange={(event: SelectChangeEvent) => setSelectedProfessional(Number(event.target.value))}
                  error={validationErrors.professional}
                >
                  {professionals.map((professional) => (
                    <MenuItem key={professional.id} value={professional.id}>
                      {professional.firstName} {professional.lastName}
                    </MenuItem>
                  ))}
                </Select>
                {validationErrors.professional && (
                  <FormHelperText style={{ color: 'red', fontWeight: 400 }}>campo obrigatório</FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel id="work-label">Selecione o tipo de serviço</InputLabel>
                <Select
                  style={{ width: '100%', marginTop: '8px' }}
                  labelId="work-label"
                  id="work-select"
                  value={selectedWork ? selectedWork.toString() : ''}
                  onChange={(event: SelectChangeEvent) => setSelectedWork(Number(event.target.value))}
                  error={validationErrors.work}
                >
                  {works.map((work) => (
                    <MenuItem key={work.id} value={work.id}>
                      {work.name}
                    </MenuItem>
                  ))}
                </Select>
                {validationErrors.work && (
                  <FormHelperText style={{ color: 'red', fontWeight: 400 }}>campo obrigatório</FormHelperText>
                )}
              </Grid>
            </Grid>
            <InputLabel id="work-label">Informe a data</InputLabel>
            <TextField
              sx={{ width: '100%', marginTop: '8px' }}
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
            <TimeSlots timeSlots={availability?.timeSlots} setTimeSlot={setTimeSlot} />
            <Button
              sx={{ marginTop: '1rem', height: '3rem', width: '100%' }}
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

export default NewAppointmentPage;