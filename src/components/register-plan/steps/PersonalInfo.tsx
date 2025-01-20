'use client';
import { Box, Typography } from '@mui/material';
import { AppInput } from '@components/common/Input';
import { Controller, useFormContext } from 'react-hook-form';
import { RegisterPlanFormData } from '../types';

const PersonalInfo = () => {
  const { control } = useFormContext<RegisterPlanFormData>();

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Personal info
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Please provide your name, email address, and phone number.
      </Typography>

      <Box mb={2}>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <AppInput
              {...field}
              label="Name"
              placeholder="e.g. Nadav Bourla"
              error={Boolean(error)}
              helperText={error?.message}
            />
          )}
        />
      </Box>

      <Box mb={2}>
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <AppInput
              {...field}
              label="Email Address"
              placeholder="e.g. nadavw1999@gmail.com"
              error={Boolean(error)}
              helperText={error?.message}
            />
          )}
        />
      </Box>

      <Box mb={2}>
        <Controller
          name="phone"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <AppInput
              {...field}
              label="Phone Number"
              placeholder="e.g. 0544598264"
              error={Boolean(error)}
              helperText={error?.message}
            />
          )}
        />
      </Box>
    </Box>
  );
};

export default PersonalInfo;
