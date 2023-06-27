import React, { useState } from 'react';
import { View } from 'react-native';
import GastosList from './GastoList';
import GastoForm from './GastoForm';

const GastosView = () => {
  const [reloadGastos, setReloadGastos] = useState(false);

  const handleGastoCreado = () => {
    setReloadGastos(!reloadGastos);
  };

  return (
    <View style={{ flex: 1 }}>
      <GastosList reloadGastos={reloadGastos} />
      <GastoForm onGastoCreado={handleGastoCreado} />
    </View>
  );
};

export default GastosView;