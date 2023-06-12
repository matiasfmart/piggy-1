// HomeView.js
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

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  metaAhorro: {
    fontWeight: "bold",
    fontSize: 40,
    color: "green",
  },
  bigText: {
    fontWeight: "bold",
    fontSize: 40,
  },
  medText: {
    fontWeight: "bold",
    fontSize: 25,
  },
  pendingDays: {
    fontWeight: "bold",
    fontSize: 25,
    marginHorizontal: 15,
    color: "gray",
  },
  column: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingBottom: 0,
  },
  subColumn: {
    alignItems: "center",
    marginBottom: 5,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  smallTitle: {
    fontWeight: "bold",
    marginTop: 20,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  daysContainer: {
    alignItems: "center",
    marginTop: 20,
  },
});
