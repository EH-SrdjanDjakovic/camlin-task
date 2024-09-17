export const formatDate = (timestamp: string): string => {
  const dateObj = new Date(timestamp);
  const formattedDate = dateObj.toISOString().split("T")[0];
  return formattedDate;
};

export const formatVoltageValue = (voltage: string): string => {
  return voltage.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
