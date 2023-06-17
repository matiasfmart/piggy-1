const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:8080/login", {
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
      console.error("Error en el inicio de sesión:", error);
      throw new Error("Error en el inicio de sesión: " + error.message);
    }
  };
  
  export default {
    login,
  };