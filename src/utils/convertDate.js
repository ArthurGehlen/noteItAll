export const convert_date = (date) => {
  const new_date = new Date(date);

  // usei o padStart só pra garantir que vai ser 2 digitos
  // ex: dia 5, sem o padStart iria retornar 5/12
  const day = String(new_date.getDate()).padStart(2, "0");
  const month = String(new_date.getMonth() + 1).padStart(2, "0");
  const year = new_date.getFullYear();

  const hours = String(new_date.getHours()).padStart(2, "0");
  const minutes = String(new_date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} às ${hours}:${minutes}`;
};
