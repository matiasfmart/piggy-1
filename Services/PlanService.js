//const baseURL = "http://localhost:8080"
const baseURL = "https://50f3-186-139-158-165.sa.ngrok.io";

const planService = {
  async getPlan(userAuth) {
    try {
      const response = await fetch(`${baseURL}/plan/user/${userAuth}`);
      return await response.json();
      
    } catch (error) {
      console.error("Error al obtener el plan:", error);
      throw new Error("Error al obtener el plan: " + error.message);
    }
  },
  
  async createPlan(data) {
    try {
      const response = await fetch(`${baseURL}/plan/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error("Error al crear el plan:", error);
      throw new Error("Error al crear el plan: " + error.message);
    }
  },
  async deleteByUserId(userAuth) {
    try {
      const response = await fetch(`${baseURL}/plan/user/${userAuth}`, {
        method: 'DELETE',
      });
      return await response.json();
    } catch (error) {
      console.error("Error al eliminar el plan de ahorro:", error);
      throw new Error("Error al eliminar el plan de ahorro: " + error.message);
    }
  },
};

export default planService;