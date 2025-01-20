export const getPriceLabel = (price = 0, byMonth= true) => 
    byMonth ? `$${price}/mo` : `$${price}/ya`;
  