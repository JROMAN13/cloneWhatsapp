const URL_BASE = "http://localhost:3000/";

const endpoints = {
  transactions: `${URL_BASE}usuarios`,
  transaction: (id) => `${URL_BASE}usuarios/${id}`,
};

export default endpoints;
