'use client';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Switch,
  useTheme,
  Grid2
} from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { Plan } from '../types';
import { BillingCycle } from '@constants/enums';
import Image from 'next/image';
import { getPriceLabel } from '../priceUtils';
import { plans } from 'mocks';

const SelectPlan = () => {
  const { setValue, watch } = useFormContext();
  const selectedPlan = watch('plan');
  const billingCycle = watch('billingCycle');
  const theme = useTheme();

  const handlePlanSelect = (plan: Plan) => {
    setValue('plan', plan, {
      shouldValidate: true
    });
  };

  const getCardStyles = (isSelected: boolean) => ({
    bgcolor: isSelected
      ? theme.palette.background.default
      : theme.palette.background.paper,
    border: isSelected
      ? `2px solid ${theme.palette.primary.main}`
      : `1px solid ${theme.palette.text.secondary}`,
    boxShadow: isSelected
      ? `0 0 10px ${theme.palette.primary.light}`
      : 'none',
  });

  const renderPlanDetails = (plan: Plan) => (
    <Box display="flex" flexDirection="column" alignItems={{ xs: "flex-start", sm: "center" }}>
      <Typography variant="h6" fontWeight="bold" mt={1}>
        {plan.name}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {billingCycle === BillingCycle.MONTHLY
          ? getPriceLabel(plan.pricePerMonth)
          : getPriceLabel(plan.pricePerYear, false)}
      </Typography>
    </Box>
  );

  const renderPlanCard = (plan: Plan) => {
    const isSelected = selectedPlan?.name === plan.name;
    
    return (
      <Grid2 key={plan.name} size={{ xs: 12, sm: 4 }}>
        <Card
          variant={isSelected ? 'outlined' : 'elevation'}
          sx={getCardStyles(isSelected)}
        >
          <CardActionArea onClick={() => handlePlanSelect(plan)}>
            <CardContent sx={{
              textAlign: 'center',
              display: { xs: "flex" },
              flexDirection: { xs: "row", sm: "column" },
              alignItems: { xs: "center" },
              gap: { xs: 2, sm: 0 }
            }}>
              <Image
                src={plan.icon}
                alt={`${plan.name} icon`}
                width={40}
                height={40}
              />
              {renderPlanDetails(plan)}
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid2>
    );
  };

  const renderBillingToggle = () => (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      mt={2} 
      bgcolor={theme.palette.background.default}
      padding={1}
      borderRadius={1}
    >
      <Typography
        variant="body1"
        color={billingCycle === BillingCycle.MONTHLY ? 'text.primary' : 'text.secondary'}
        mr={1}
      >
        Monthly
      </Typography>

      <Switch
        checked={billingCycle === BillingCycle.YEARLY}
        onChange={(_, checked) => 
          setValue('billingCycle', checked ? BillingCycle.YEARLY : BillingCycle.MONTHLY, {
            shouldValidate: true
          })
        }
        color="primary"
      />

      <Typography
        variant="body1"
        color={billingCycle === BillingCycle.YEARLY ? 'text.primary' : 'text.secondary'}
        ml={1}
      >
        Yearly
      </Typography>
    </Box>
  );

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Select Your Plan
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        You have the option of monthly or yearly billing.
      </Typography>

      <Grid2 container spacing={2} mt={1}>
        {plans.map(renderPlanCard)}
      </Grid2>

      {renderBillingToggle()}
    </Box>
  );
};

export default SelectPlan;
