import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import Home from "./Home";
import PlanDeAhorro from "./PlanDeAhorro";
import planService from "../../Services/PlanService.js";
import AuthContext from "../../Globals/authContext";

export default function HomeView() {
  const navigation = useNavigation();
  const route = useRoute();
  const { userAuth } = useContext(AuthContext);
  const [tienePlan, setTienePlan] = useState(false);
  const [planData, setPlanData] = useState(null);

  const fetchPlan = async () => {
    const data = await planService.getPlan(userAuth);
    if (data.length > 0) {
      setPlanData(data[0]);
      setTienePlan(true);
    }
  };

  useEffect(() => {
    if (route.params?.planDeleted) {
      navigation.setParams({ planDeleted: false });
      setTienePlan(false);
    }
  }, [route.params?.planDeleted]);

  useEffect(() => {
    fetchPlan();
  }, [userAuth]);

  useEffect(() => {
    if (route.params?.planCreated) {
      fetchPlan();
      navigation.setParams({ planCreated: false });
    }
  }, [route.params?.planCreated]);

  if (!tienePlan) {
    return <Home />;
  } else {
    return <PlanDeAhorro planData={planData} />;
  }
}