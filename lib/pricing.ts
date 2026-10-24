export type PricingInput = {
  basePrice: number;
  startDate: string;
  endDate: string;
  driverFee?: number;
  additionalFee?: number;
};

export function calculateRentalDays(
  startDate: string,
  endDate: string
) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const difference =
    end.getTime() - start.getTime();

  const days =
    Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    ) || 1;

  return days;
}

export function calculatePrice({
  basePrice,
  startDate,
  endDate,
  driverFee = 0,
  additionalFee = 0,
}: PricingInput) {
  const days = calculateRentalDays(
    startDate,
    endDate
  );

  const rentalPrice = basePrice * days;

  const total =
    rentalPrice +
    driverFee +
    additionalFee;

  return {
    days,
    rentalPrice,
    driverFee,
    additionalFee,
    total,
  };
}