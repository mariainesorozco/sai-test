// src/app/admin/page.tsx
"use client";

import { useState } from 'react';
import MainLayout from '@/components/admin/MainLayout';
import DashboardPage from '@/components/admin/DashboardPage';
import NominaModule from '@/components/admin/modules/NominaModule';
import ImpuestosModule from '@/components/admin/modules/ImpuestosModule';
import EgresosModule from '@/components/admin/modules/EgresosModule';
import CatalogosModule from '@/components/admin/modules/CatalogosModule';
import ExpedienteDigitalModule from '@/components/admin/modules/ExpedienteDigitalModule';

export default function AdminPage() {
  const [activeModule, setActiveModule] = useState('inicio');

  // Renderizar el contenido según el módulo activo
  const renderModuleContent = () => {
    switch (activeModule) {
      case 'inicio':
        return <DashboardPage onModuleSelect={setActiveModule} />;
      case 'nomina':
        return <NominaModule />;
      case 'impuestos':
        return <ImpuestosModule />;
      case 'egresos':
        return <EgresosModule />;
      case 'catalogos':
        return <CatalogosModule />;
      case 'expediente':
        return <ExpedienteDigitalModule />;
      default:
        return <DashboardPage onModuleSelect={setActiveModule} />;
    }
  };

  return (
    <MainLayout
      activeModule={activeModule}
      setActiveModule={setActiveModule}
      renderContent={renderModuleContent}
    />
  );
}