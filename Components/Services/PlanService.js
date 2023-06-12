// planService.js
const planService = {
    async getPlan() {
      const response = await fetch('http://localhost:8080/plan/usuario/1');
      return await response.json();
    },
    async createPlan(planData) {
      const response = await fetch('http://localhost:8080/plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(planData),
      });
      return await response.json();
    }
  };
  
  export default planService;
  