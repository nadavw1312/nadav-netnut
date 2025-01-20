import { Box, Typography, Stack, useTheme } from '@mui/material';
import { Step, STEP_TITLES } from '../formConfig';

type StepIndicatorProps = {
  currentStep: Step;
};

export const StepIndicator = ({ currentStep }: StepIndicatorProps) => {
  const theme = useTheme();
  const steps = Object.keys(STEP_TITLES).map(Number);

  const StepCircle = ({ step }: { step: Step }) => (
    <Box
      sx={{
        width: 30,
        height: 30,
        borderRadius: '50%',
        border: '2px solid white',
        backgroundColor: currentStep === step ? theme.palette.background.paper : 'default',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mr: { sm: 2 },
        padding: 1,
      }}
    >
      <Typography
        variant="body2"
        fontWeight="bold"
        color={currentStep === step ? theme.palette.primary.main : theme.palette.background.paper}
      >
        {step}
      </Typography>
    </Box>
  );

  const StepLabel = ({ step }: { step: Step }) => (
    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
      <Typography variant="body2" fontSize={10} color={theme.palette.text.secondary}>
        {`STEP ${step}`}
      </Typography>
      <Typography variant="body1" fontSize={14} fontWeight="bold" color={theme.palette.background.paper}>
        {STEP_TITLES[step]}
      </Typography>
    </Box>
  );

  return (
    <Stack
      spacing={4}
      justifyContent={{ xs: 'center' }}
      alignItems={{ xs: 'center', sm: 'flex-start' }}
      direction={{ xs: 'row', sm: 'column' }}
    >
      {steps.map((step: Step) => (
        <Box
          key={step}
          display="flex"
          alignItems="center"
          sx={{
            color: currentStep === step ? theme.palette.background.paper : theme.palette.text.secondary,
          }}
        >
          <StepCircle step={step} />
          <StepLabel step={step} />
        </Box>
      ))}
    </Stack>
  );
};
