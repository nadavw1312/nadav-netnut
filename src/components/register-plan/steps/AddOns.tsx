'use client';
import { Box, Typography, Card, CardContent, CardActionArea, Checkbox, FormControlLabel, useTheme } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { RegisterPlanFormData, AddOn } from '../types';
import { BillingCycle } from '@constants/enums';
import { getPriceLabel } from '../priceUtils';
import { availableAddOns } from 'mocks';

const AddOns = () => {
  const theme = useTheme();
  const { watch, setValue } = useFormContext<RegisterPlanFormData>();
  
  const selectedAddOns = watch('addOns');
  const billingCycle = watch('billingCycle');

  const isAddOnSelected = (addOn: AddOn): boolean => {
    return selectedAddOns?.some(selected => selected.name === addOn.name);
  };

  const handleAddOnToggle = (addOn: AddOn) => {
    const isSelected = isAddOnSelected(addOn);
    const newAddOns = isSelected
      ? selectedAddOns.filter(item => item.name !== addOn.name)
      : [...(selectedAddOns || []), addOn];

    setValue('addOns', newAddOns, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
  };

  const getAddOnPrice = (addOn: AddOn): string => {
    return billingCycle === BillingCycle.MONTHLY
      ? getPriceLabel(addOn.pricePerMonth)
      : getPriceLabel(addOn.pricePerYear, false);
  };

  const renderAddOnDescription = (addOn: AddOn) => (
    <Box>
      <Typography variant="body1" fontWeight="bold">
        {addOn.name}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {addOn.description}
      </Typography>
    </Box>
  );

  const renderAddOnPrice = (addOn: AddOn) => (
    <Typography color="primary">
      {getAddOnPrice(addOn)}
    </Typography>
  );

  const renderAddOnContent = (addOn: AddOn) => (
    <CardContent sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <FormControlLabel
        control={
          <Checkbox
            checked={isAddOnSelected(addOn)}
            onChange={() => handleAddOnToggle(addOn)}
          />
        }
        label={renderAddOnDescription(addOn)}
      />
      {renderAddOnPrice(addOn)}
    </CardContent>
  );

  const renderAddOnCard = (addOn: AddOn) => {
    const isSelected = isAddOnSelected(addOn);
    
    return (
      <Card
        key={addOn.name}
        sx={{
          mb: 2,
          bgcolor: isSelected ? theme.palette.background.default : theme.palette.background.paper,
          border: isSelected
            ? `2px solid ${theme.palette.primary.main}`
            : `1px solid ${theme.palette.text.secondary}`,
          boxShadow: isSelected ? `0 0 10px ${theme.palette.primary.light}` : 'none',
          cursor: 'pointer',
        }}
      >
        <CardActionArea onClick={() => handleAddOnToggle(addOn)}>
          {renderAddOnContent(addOn)}
        </CardActionArea>
      </Card>
    );
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Pick Add-ons
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Add-ons help enhance your gaming experience.
      </Typography>

      <Box mt={2}>
        {availableAddOns.map(renderAddOnCard)}
      </Box>
    </Box>
  );
};

export default AddOns;
