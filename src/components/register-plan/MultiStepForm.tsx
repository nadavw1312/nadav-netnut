"use client";
import { Box, Button, useTheme } from "@mui/material";
import { ReactNode } from "react";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterPlanFormData } from "./types";
import { Step, defaultFormData, formSchema, FIELDS_TO_VALIDATE } from "./formConfig";
import { Sidebar } from "./Sidebar";
import PersonalInfo from "./steps/PersonalInfo";
import SelectPlan from "./steps/SelectPlan";
import AddOns from "./steps/AddOns";
import Summary from "./steps/Summary";
import ThankYou from "./steps/ThankYou";

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(Step.PERSONAL_INFO);

  const methods = useForm<RegisterPlanFormData>({
    resolver: yupResolver(formSchema),
    defaultValues: defaultFormData,
    mode: "onChange",
  });

  const { handleSubmit, trigger, formState  } = methods;
  const { errors } = formState;

  const onSubmit = (data: RegisterPlanFormData) => {
    console.log("Form submitted:", data);
    setCurrentStep((prev) => prev + 1);
  };

  const handleNext = async () => {
    const isStepValid = await trigger(FIELDS_TO_VALIDATE[currentStep]);

    if (isStepValid) {
      if (currentStep === Step.SUMMARY) {
        handleSubmit(onSubmit)();
      } else {
        setCurrentStep((prev) => prev + 1);
      }
    } else if (currentStep !== Step.PERSONAL_INFO) {
      const fieldErrors = FIELDS_TO_VALIDATE[currentStep]
      .map((field) => errors[field]?.message) 
      .filter(Boolean); 
      if (fieldErrors.length > 0) {
        alert(fieldErrors.join('\n')); 
      }
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const renderCurrentStep = () => {
    const props = { navigateToAddOnsStep: () => setCurrentStep(Step.ADD_ONS) };

    switch (currentStep) {
      case Step.PERSONAL_INFO:
        return <PersonalInfo />;
      case Step.SELECT_PLAN:
        return <SelectPlan />;
      case Step.ADD_ONS:
        return <AddOns />;
      case Step.SUMMARY:
        return <Summary {...props} />;
      default:
        return <ThankYou />;
    }
  };

  return (
    <FormProvider {...methods}>
      <FormLayout>
        <Sidebar currentStep={currentStep} />
        <FormContainer
          currentStep={currentStep}
          onNext={handleNext}
          onPrevious={handlePrevious}
        >
          {renderCurrentStep()}
        </FormContainer>
      </FormLayout>
    </FormProvider>
  );
};

interface FormLayoutProps {
  children: ReactNode;
}

const FormLayout = ({ children }: FormLayoutProps) => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: { xs: "100svh" },
        padding: { xs: 0, sm: 4 },
        flexGrow: 1,
        bgcolor: { xs: theme.palette.background.default, sm: theme.palette.background.paper },
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "70%" },
          maxWidth: "900px",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          boxShadow: 3,
          borderRadius: 2,
          overflow: "hidden",
          height: "100%",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

interface FormContentProps {
  children: ReactNode;
}

const FormContent = ({ children }: FormContentProps) => (
  <Box
    sx={{
      minHeight: { xs: "400px" },
      borderRadius: 5,
      padding: 2,
      bgcolor: "white",
      margin: { xs: "75px 10px 0px 10px", sm: 0 },
    }}
  >
    {children}
  </Box>
);

interface NavigationButtonsProps {
  currentStep: number;
  onNext: () => void;
  onPrevious: () => void;
}

const NavigationButtons = ({ currentStep, onNext, onPrevious }: NavigationButtonsProps) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 1,
      bgcolor: "white",
      width: "100%",
    }}
  >
    <Box flexGrow={1}>
      {currentStep > 1 && (
        <Button color="gray" onClick={onPrevious}>
          Go Back
        </Button>
      )}
    </Box>
    <Button variant="contained" onClick={onNext}>
      {currentStep === Step.SUMMARY ? "Confirm" : "Next Step"}
    </Button>
  </Box>
);

interface FormContainerProps {
  currentStep: number;
  onNext: () => void;
  onPrevious: () => void;
  children: ReactNode;
}

const FormContainer = ({ currentStep, onNext, onPrevious, children }: FormContainerProps) => (
  <Box
    sx={{
      width: "100%",
      display: "flex",
      position: "relative",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: { xs: 0, sm: 4 },
      flexGrow: 1,
    }}
  >
    <FormContent>{children}</FormContent>
    {currentStep <= Step.SUMMARY && (
      <NavigationButtons
        currentStep={currentStep}
        onNext={onNext}
        onPrevious={onPrevious}
      />
    )}
  </Box>
);

export default MultiStepForm;