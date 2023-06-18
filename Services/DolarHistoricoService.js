const baseURL = "https://api.bluelytics.com.ar/v2";

const fetchDolarHistoricoData = async () => {
    try {
      const response = await fetch(`${baseURL}/evolution.json`);
      const json = await response.json();
      return json;
    } catch (error) {
      console.error("Error obteniendo la información del dolar histórico", error);
    }
  };
  
  export default fetchDolarHistoricoData;
  