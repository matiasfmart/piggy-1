import React, { useState } from 'react';
import { View } from 'react-native';
import GastosList from '../Components/Gasto/GastoList';
import CustomPicker from '../Components/Picker/CustomPicker';
import GastoForm from '../Components/Gasto/GastoForm';
import all from 'all';

const GastoView = () => {
  const [gastos, setGastos] = useState([
    {
      nombre: 'Gasto 1',
      prioridad: 'alta',
      costo: 10.99
    },
    {
      nombre: 'Gasto 2',
      prioridad: 'media',
      costo: 20.99
    },
    {
      nombre: 'Gasto 3',
      prioridad: 'baja',
      costo: 30.99
    }
  ]);

  const opciones = [
    { label: 'Mostrar todos', value: "Mostrar todos" },
    { label: 'Prioridad alta', value: 'alta' },
    { label: 'Prioridad media', value: 'media' },
    { label: 'Prioridad baja', value: 'baja' },
  ];

  const [filtroPrioridad, setFiltroPrioridad] = useState(null);

  const handlePickerChange = (itemValue) => {
    setFiltroPrioridad(itemValue);
  };

  const handleAgregarGasto = (nuevoGasto) => {
    setGastos([...gastos, nuevoGasto]);
  };

  return (
    <View>
      <CustomPicker
        selectedValue={filtroPrioridad}
        onValueChange={handlePickerChange}
        options={opciones}
      />
      <GastoForm onAgregarGasto={handleAgregarGasto} />
      <GastosList gastos={gastos} selectedPriority={filtroPrioridad} />
    </View>
  );
};

export default GastoView;