'use client';
import { Box, Typography, Divider, useTheme } from '@mui/material';
import { RegisterPlanFormData, AddOn } from '../types'; 
import { BillingCycle } from '@constants/enums';
import { getPriceLabel } from '../priceUtils';
import { useFormContext } from 'react-hook-form';

type Step4Props = {
  navigateToAddOnsStep: () => void;
};

const Summary = ({ navigateToAddOnsStep }: Step4Props) => {
  const theme = useTheme();
  const { watch } = useFormContext<RegisterPlanFormData>();
  
  const plan = watch('plan');
  const addOns = watch('addOns');
  const billingCycle = watch('billingCycle');

  const renderPlanSection = () => {
    if (!plan) return null;
    
    const billingLabel = billingCycle === BillingCycle.MONTHLY ? BillingCycle.MONTHLY : BillingCycle.YEARLY;

    return (
      <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" mt={2} mb={2}>
        <Box display="flex" flexDirection="column">
          <Typography fontWeight="bold">
            {plan.name} ({billingLabel})
          </Typography>
          <Typography 
            onClick={navigateToAddOnsStep} 
            variant="body2" 
            sx={{ cursor: 'pointer' }} 
            color={theme.palette.primary.main}
          >
            Change
          </Typography>
        </Box>
        <Typography>
          {billingCycle === BillingCycle.MONTHLY 
            ? getPriceLabel(plan.pricePerMonth) 
            : getPriceLabel(plan.pricePerYear, false)}
        </Typography>
      </Box>
    );
  };

  const renderAddOnItem = (addOn: AddOn) => (
    <Box key={addOn.name} display="flex" justifyContent="space-between">
      <Typography variant="body2" color={theme.palette.text.secondary}>
        {addOn.name}
      </Typography>
      <Typography>
        {billingCycle === BillingCycle.MONTHLY 
          ? getPriceLabel(addOn.pricePerMonth) 
          : getPriceLabel(addOn.pricePerYear, false)}
      </Typography>
    </Box>
  );

  const renderAddOnsSection = () => (
    <Box mt={2} display="flex" flexDirection="column" gap={2}>
      {addOns && addOns.length > 0 
        ? addOns.map(renderAddOnItem)
        : <Typography>No add-ons selected.</Typography>
      }
    </Box>
  );

  const renderTotalSection = () => {
    const planPrice = plan 
      ? billingCycle === BillingCycle.MONTHLY 
        ? plan.pricePerMonth 
        : plan.pricePerYear 
      : 0;

    const addOnsPrice = billingCycle === BillingCycle.MONTHLY
      ? addOns.reduce((total, addon) => total + addon.pricePerMonth, 0)
      : addOns.reduce((total, addon) => total + addon.pricePerYear, 0);

    const totalCost = planPrice + addOnsPrice;
    const periodLabel = billingCycle === BillingCycle.MONTHLY ? "(per month)" : "(per year)";

    return (
      <Box mt={2} display="flex" justifyContent="space-between">
        <Typography variant="body2" color={theme.palette.text.secondary} padding={1}>
          {`Total ${periodLabel}`}
        </Typography>
        <Typography variant="h6" fontWeight="bold" color={theme.palette.primary.main}>
          {billingCycle === BillingCycle.MONTHLY 
            ? getPriceLabel(totalCost) 
            : getPriceLabel(totalCost, false)}
        </Typography>
      </Box>
    );
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Finishing up
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Double-check everything looks OK before confirming.
      </Typography>

      <Box bgcolor={theme.palette.background.default} padding={1}>
        {renderPlanSection()}
        <Divider />
        {renderAddOnsSection()}
      </Box>

      {renderTotalSection()}
    </Box>
  );
};

export default Summary;
