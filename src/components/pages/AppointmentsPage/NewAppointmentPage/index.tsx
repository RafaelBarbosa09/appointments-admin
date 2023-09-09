import { Button, Container, FormHelperText, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import HeaderMenu from "../../../shared/HeaderMenu";
import { useEffect, useState } from "react";
import { Professional } from "../../../../utils/types/Professional";
import { getAllProfessionals } from "../../../../services/professionals";
import { Card } from "./styles";

const NewAppointmentPage = () => {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [selectedProfessional, setSelectedProfessional] = useState<number | null>(null);

  const [validationErrors, setValidationErrors] = useState({
    professional: false,
    work: false,
  });

  const validateForm = () => {
    const errors: any = {};
    let isValid = true;

    if (!selectedProfessional) {
      errors.professional = true;
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    console.log(selectedProfessional);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllProfessionals();
      if (response) {
        setProfessionals(response);
      }
    };

    fetchData();
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
                  style={{ width: '100%', height: '40px' }}
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
                <InputLabel id="professional-label">Selecione o tipo de serviço                                                                                                     </InputLabel>

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

export default NewAppointmentPage;