import { AddOn, Plan } from "@components/register-plan/types";

export const availableAddOns: AddOn[] = [
    {
        name: 'Online service',
        description: 'Access to multiplayer games',
        pricePerMonth: 1,
        pricePerYear: 12
    },
    {
        name: 'Larger storage',
        description: 'Extra 1TB of cloud save',
        pricePerMonth: 2,
        pricePerYear: 24
    },
    {
        name: 'Customizable Profile',
        description: 'Custom theme on your profile',
        pricePerMonth: 3,
        pricePerYear: 36
    },
  ];

  export const plans: Plan[] = [
    {
      name: 'Arcade',
      pricePerMonth: 9,
      pricePerYear: 90,
      icon: "/icons/icon-arcade.svg",
    },
    {
      name: 'Advanced',
      pricePerMonth: 12,
      pricePerYear: 120,
      icon: "/icons/icon-advanced.svg",
    },
    {
      name: 'Pro',
      pricePerMonth: 15,
      pricePerYear: 150,
      icon: "/icons/icon-pro.svg",
    },
  ];