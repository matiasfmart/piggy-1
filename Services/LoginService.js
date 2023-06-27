//const baseURL = "http://localhost:8080"
const baseURL = "https://50f3-186-139-158-165.sa.ngrok.io";


const login = async (email, password) => {
  try {
    const response = await fetch(`${baseURL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorResponse = await response.json();
      throw new Error(errorResponse.error);
    }
  } catch (error) {
    throw new Error("Error en el inicio de sesión: " + error.message);
  }
};
  
  export default {
    login,
  };