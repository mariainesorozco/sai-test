"use client";

import React, { useState } from 'react';
import MainLayout from '@/components/admin/MainLayout';
import ExpedienteDigitalModule from '@/components/admin/modules/ExpedienteDigitalModule';

// Esta página se cargará en la ruta "/admin/nomina/expediente-digital"
export default function ExpedienteDigitalPage() {
  const [activeModule, setActiveModule] = useState('expediente');

  // Función para manejar el cambio de módulo
  const handleModuleChange = (moduleId: string) => {
    setActiveModule(moduleId);
  };

  // Renderizar el contenido del módulo de expediente digital
  const renderContent = () => {
    return <ExpedienteDigitalModule />;
  };

  return (
    <MainLayout
      activeModule={activeModule}
      setActiveModule={handleModuleChange}
      renderContent={renderContent}
    />
  );
}