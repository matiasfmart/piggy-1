
import React, { useState, useEffect } from "react";
import Home from "./Home.js";
import PlanDeAhorro from "./PlanDeAhorro.js";
import planService from "../Services/PlanService.js";

export default function HomeView() {
  const [tienePlan, setTienePlan] = useState(false);
  const [planData, setPlanData] = useState(null);
  

  useEffect(() => {
    const fetchPlan = async () => {
      const data = await planService.getPlan();
      if (data.length > 0) {
        setPlanData(data[0]);
        setTienePlan(true);
      }
    };

    fetchPlan();
  }, []);

  if (!tienePlan) {
    return <Home />;
  } else {
    return <PlanDeAhorro planData={planData} />;
  }
}
