import { LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormHelperText, InputLabel } from '@mui/material';

interface DateTimePickerProps {
  label?: string;
  selectedDate: Date | null;
  handleDateChange: (newDate: Date | null) => void;
  error?: boolean;
}

const DateTimePicker = ({ label, selectedDate, handleDateChange, error }: DateTimePickerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          'MobileDateTimePicker'
        ]}
      >
        <DemoItem>
          <InputLabel>{label}</InputLabel>
          <MobileDateTimePicker
            value={selectedDate}
            onChange={handleDateChange}
            sx={{ marginTop: '0' }}
          />
          {error && (
            <FormHelperText style={{ color: 'red', fontWeight: 400 }}>campo obrigatório</FormHelperText>
          )}
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default DateTimePicker;