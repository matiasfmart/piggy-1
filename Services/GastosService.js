const baseURL = "http://localhost:8080"
// const baseURL = "https://8f17-186-139-158-165.sa.ngrok.io";

const gastosService = {
  async getGastos(userAuth) {
    try {
      const response = await fetch(`${baseURL}/gastos/usuario/${userAuth}`);
      return await response.json();
      
    } catch (error) {
      console.error("Error al obtener los gstos:", error);
      throw new Error("Error al obtener los gastos: " + error.message);
    }
  },
  
  async addNewGasto(data) {

    try {
      const response = await fetch(`${baseURL}/gastos/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error("Error al crear el gasto:", error);
      throw new Error("Error al crear el gasto: " + error.message);
    }
  },

  async deleteGasto(idGasto) {
    try {
      const response = await fetch(`${baseURL}/gastos/${idGasto}`, {
        method: 'DELETE',
      });
      return await response.json();
    } catch (error) {
      console.error("Error al eliminar el gasto:", error);
      throw new Error("Error al eliminar el gasto: " + error.message);
    }
  },

  async updateGasto(id, data) {
    try {
      const response = await fetch(`${baseURL}/gastos/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error("Error al eliminar el plan de ahorro:", error);
      throw new Error("Error al eliminar el plan de ahorro: " + error.message);
    }
  },
};

export default gastosService;