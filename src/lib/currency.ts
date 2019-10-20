export default function currency(value: number) {
  if (value === 0) return "";
  const val = (value / 1).toFixed(2).replace(" ", ",");
  return `${val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} грн.`;
}
