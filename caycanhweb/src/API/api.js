export const getInventory = () => {
  return fetch("http://localhost:5000/api/v1/plant").then((res) => res.json());
};
export const getOrderPage = () => {
  return fetch("http://localhost:5000/api/v1/order").then((res) => res.json());
};
export const getCustomers = () => {
  return fetch("https://dummyjson.com/users").then((res) => res.json());
};
