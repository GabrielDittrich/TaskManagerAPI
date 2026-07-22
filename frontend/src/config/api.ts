const API_URL = process.env.REACT_APP_API_URL;

if (!API_URL) {
  throw new Error(
    "A variável REACT_APP_API_URL não foi configurada no arquivo .env.",
  );
}

export default API_URL;
