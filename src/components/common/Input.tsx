import { TextField, TextFieldProps } from '@mui/material';
import { forwardRef } from 'react';

type AppInputProps = TextFieldProps;

export const AppInput = forwardRef<HTMLInputElement, AppInputProps>(
  ({ label, error, helperText, ...props }, ref) => (
    <TextField
      fullWidth
      variant="outlined"
      label={label}
      error={Boolean(error)}
      inputRef={ref}
      helperText={helperText}
      {...props}
      sx={{
        mt: 2,
      }}
      slotProps={{
        formHelperText: {
          sx: {
            position: 'absolute',
            top: -22,
            right: 0,
            left: 'auto',
            textAlign: 'right',
            fontWeight: 'bold'
          },
        },
      }}
    />
  )
);

AppInput.displayName = 'AppInput';
