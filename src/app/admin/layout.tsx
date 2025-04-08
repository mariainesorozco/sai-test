// app/admin/layout.tsx
"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import MainLayout from '@/components/admin/MainLayout';
import { stripBasePath } from '@/utils/route-utils';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [activeModule, setActiveModule] = useState('inicio');
  
  // Detectar el módulo activo basado en la ruta
  useEffect(() => {
    const cleanPathname = stripBasePath(pathname);

    if (cleanPathname === '/admin') {
      setActiveModule('inicio');
    } else if (cleanPathname.startsWith('/admin/nomina')) {
      setActiveModule('nomina');
    } else if (cleanPathname.startsWith('/admin/impuestos')) {
      setActiveModule('impuestos');
    } else if (cleanPathname.startsWith('/admin/egresos')) {
      setActiveModule('egresos');
    } else if (cleanPathname.startsWith('/admin/catalogos')) {
      setActiveModule('catalogos');
    } else if (cleanPathname.startsWith('/admin/expediente-digital')) {
      setActiveModule('expediente');
    }
  }, [pathname]);

  return (
    <MainLayout
      activeModule={activeModule}
      setActiveModule={setActiveModule}
      renderContent={() => children}
    />
  );
}