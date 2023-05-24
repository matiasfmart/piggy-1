import React, { useState } from 'react';
import GastosList from '../Components/Gasto/GastoList';
import CustomPicker from '../Components/Picker/CustomPicker';

const GastoView = () => {
  const gastos = [
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
    },
    {
      nombre: 'Gasto 4',
      prioridad: 'alta',
      costo: 10.99
    },
    {
      nombre: 'Gasto 5',
      prioridad: 'media',
      costo: 20.99
    },
    {
      nombre: 'Gasto 6',
      prioridad: 'baja',
      costo: 30.99
    }
  ];

  const opciones = [
    { label: 'Mostrar todos', value: null },
    { label: 'Prioridad alta', value: 'alta' },
    { label: 'Prioridad media', value: 'media' },
    { label: 'Prioridad baja', value: 'baja' },
  ];

  const [filtroPrioridad, setFiltroPrioridad] = useState(null);

  const handlePickerChange = (itemValue) => {
    setFiltroPrioridad(itemValue);
  };

  return (
    <>
      <CustomPicker
        selectedValue={filtroPrioridad}
        onValueChange={handlePickerChange}
        options={opciones}
      />
      <GastosList gastos={gastos} selectedPriority={filtroPrioridad} />
    </>
  );
};

export default GastoView;