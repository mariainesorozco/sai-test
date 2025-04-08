// app/admin/page.tsx
"use client";

import DashboardPage from '@/components/admin/DashboardPage';
import { useRouter } from 'next/navigation';
import { routes } from './route-config';

export default function AdminPage() {
  const router = useRouter();

  const handleModuleSelect = (moduleId: string) => {
    // Navegación basada en el módulo seleccionado
    switch (moduleId) {
      case 'inicio':
        router.push(routes.inicio);
        break;
      case 'nomina':
        router.push(routes.nomina.root);
        break;
      case 'impuestos':
        router.push(routes.impuestos.root);
        break;
      case 'egresos':
        router.push(routes.egresos.root);
        break;
      case 'catalogos':
        router.push(routes.catalogos.root);
        break;
      case 'expediente':
        router.push(routes.expediente.root);
        break;
      default:
        router.push(routes.inicio);
    }
  };

  return <DashboardPage onModuleSelect={handleModuleSelect} />;
}