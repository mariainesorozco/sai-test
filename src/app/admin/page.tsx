// app/admin/page.tsx
"use client";

import DashboardPage from '@/components/admin/DashboardPage';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();

  const handleModuleSelect = (moduleId: string) => {
    // Navegación basada en el módulo seleccionado
    switch (moduleId) {
      case 'inicio':
        router.push('/admin');
        break;
      case 'nomina':
        router.push('/admin/nomina');
        break;
      case 'impuestos':
        router.push('/admin/impuestos');
        break;
      case 'egresos':
        router.push('/admin/egresos');
        break;
      case 'contabilidad':
        router.push('/admin/contabilidad');
        break;
      case 'catalogos':
        router.push('/admin/catalogos');
        break;
      case 'expediente':
        router.push('/admin/nomina/expediente-digital');
        break;
      default:
        router.push('/admin');
    }
  };

  return <DashboardPage onModuleSelect={handleModuleSelect} />;
}