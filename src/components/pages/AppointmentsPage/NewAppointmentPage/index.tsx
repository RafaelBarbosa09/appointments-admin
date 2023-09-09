import { useEffect, useState } from "react";
import { Button, Container, FormHelperText, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import HeaderMenu from "../../../shared/HeaderMenu";
import DateTimePicker from "../../../shared/DateTimePicker";
import { Professional } from "../../../../utils/types/Professional";
import { Work } from "../../../../utils/types/Work";
import { getAllWorks } from "../../../../services/works";
import { getAllProfessionals } from "../../../../services/professionals";
import { Card } from "./styles";
import { createAppointment } from "../../../../services/appointments";

const NewAppointmentPage = () => {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [selectedProfessional, setSelectedProfessional] = useState<number | null>(null);
  const [works, setWorks] = useState<Work[]>([]);
  const [selectedWork, setSelectedWork] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

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

    if (!selectedDate) {
      errors.date = true;
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleDateChange = (newDate: Date | null) => {
    setSelectedDate(newDate);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    await createAppointment({
      appointmentDateTime: selectedDate!,
      professional: {
        id: selectedProfessional!,
      },
      work: {
        id: selectedWork!,
      },
    });
    console.log(selectedProfessional);
    console.log(selectedWork);
    console.log(selectedDate);
  };

  useEffect(() => {
    const fetchAppointmentsData = async () => {
      const appointments = await getAllProfessionals();
      if (appointments) {
        setProfessionals(appointments);
      }
    };

    const fetchWorksData = async () => {
      const works = await getAllWorks();
      if (works) {
        setWorks(works);
      }
    };

    fetchAppointmentsData();
    fetchWorksData();
  }, []);

  return (
    <>
      <HeaderMenu title="Agendamentos" />
      <Container>
        <Card sx={{ maxWidth: '800px', margin: '0 auto' }}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h6">Novo agendamento</Typography>
            <Grid container spacing={2} sx={{ marginTop: '.2rem' }}>
              <Grid item xs={12} md={6}>
                <InputLabel id="professional-label">Selecione um profissional</InputLabel>
                <Select
                  style={{ width: '100%' }}
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
                  style={{ width: '100%' }}
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
            <DateTimePicker
              label='Selecione um horário'
              selectedDate={selectedDate}
              handleDateChange={handleDateChange}
              error={validationErrors.date}
            />
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

export default NewAppointmentPage;