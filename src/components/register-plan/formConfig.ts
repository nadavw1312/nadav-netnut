import * as yup from 'yup';
import { BillingCycle } from '@constants/enums';
import { RegisterPlanFormData, AddOn, Plan } from './types';
import { VALIDATION_MESSAGES } from '@constants/constants';

export enum Step {
  PERSONAL_INFO = 1,
  SELECT_PLAN,
  ADD_ONS,
  SUMMARY,
}

export const STEP_TITLES = {
  [Step.PERSONAL_INFO]: "YOUR INFO",
  [Step.SELECT_PLAN]: "SELECT PLAN",
  [Step.ADD_ONS]: "ADD-ONS",
  [Step.SUMMARY]: "SUMMARY",
} as const;

export const FIELDS_TO_VALIDATE = {
  [Step.PERSONAL_INFO]: ['name', 'email', 'phone'],
  [Step.SELECT_PLAN]: ['plan', 'billingCycle'],
  [Step.ADD_ONS]: ['addOns'],
  [Step.SUMMARY]: [],
} as const; 

export const defaultFormData: RegisterPlanFormData = {
  name: '',
  email: '',
  phone: '',
  plan: null,
  billingCycle: BillingCycle.MONTHLY,
  addOns: [] as AddOn[],
};

export const formSchema: yup.ObjectSchema<RegisterPlanFormData> = yup.object({
  name: yup.string().required(VALIDATION_MESSAGES.REQUIRED),
  email: yup
    .string()
    .email(VALIDATION_MESSAGES.INVALID_EMAIL)
    .required(VALIDATION_MESSAGES.REQUIRED),
  phone: yup
    .string()
    .matches(/^\d+$/, VALIDATION_MESSAGES.INVALID_PHONE)
    .required(VALIDATION_MESSAGES.REQUIRED),
  plan: yup.object({
    name: yup.string().required(VALIDATION_MESSAGES.REQUIRED),
    pricePerMonth: yup.number().required(VALIDATION_MESSAGES.REQUIRED),
    pricePerYear: yup.number().required(VALIDATION_MESSAGES.REQUIRED),
    icon: yup.string().required(VALIDATION_MESSAGES.REQUIRED)
  }).required(VALIDATION_MESSAGES.PLAN_REQUIRED) as yup.Schema<Plan>,
  billingCycle: yup
    .mixed<BillingCycle>()
    .oneOf(Object.values(BillingCycle))
    .required(VALIDATION_MESSAGES.REQUIRED),
  addOns: yup.array()
    .of(yup.object({
      name: yup.string().required(VALIDATION_MESSAGES.REQUIRED),
      description: yup.string().required(VALIDATION_MESSAGES.REQUIRED),
      pricePerMonth: yup.number().required(VALIDATION_MESSAGES.REQUIRED),
      pricePerYear: yup.number().required(VALIDATION_MESSAGES.REQUIRED)
    }) as yup.Schema<AddOn>)
    .min(1, VALIDATION_MESSAGES.ADDON_REQUIRED)
    .required(VALIDATION_MESSAGES.REQUIRED)
});