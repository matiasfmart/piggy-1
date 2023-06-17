const signIn = async (email, password) => {
    try {
      const response = await fetch("http://localhost:8080/users", {
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
      console.error("Error en el la creación del nuevo usuario", error);
      throw new Error("Error en el la creación del nuevo usuario" + error.message);
    }
  };
  
  export default {
    signIn,
  };