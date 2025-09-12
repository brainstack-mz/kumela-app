// src/lib/users.js
export const USERS = [
  { numero: "841234567", password: "123456", role: "Administrador" },
  { numero: "821112223", password: "1234", role: "Comprador" },
  { numero: "861998877", password: "funcionario123", role: "Cliente" },
  { numero: "851112233", password: "transportador123", role: "Transportador" }, 
];

export const loginUser = (numero: string, password: string) => {
  const user = USERS.find(
    (u) => u.numero === numero && u.password === password
  );
  return user || null;
};