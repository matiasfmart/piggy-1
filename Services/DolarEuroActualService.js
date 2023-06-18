const baseURL = "https://api.bluelytics.com.ar/v2";

const fetchDolarEuroData = async () => {
  try {
    const response = await fetch(`${baseURL}/latest`);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error obtaining current dollar/euro information", error);
    throw error;
  }
};

export default {
  fetchDolarEuroData,
};