import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import Home from './Home.js'
import PlanDeAhorro from "./PlanDeAhorro.js";

export default function HomeView() {
  const [tienePlan, setTienePlan] = useState(true);

  if (!tienePlan) {
    return <Home/>;
  } else{
    return <PlanDeAhorro />;
  }
  
}
