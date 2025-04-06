// app/admin/layout.tsx
"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import MainLayout from '@/components/admin/MainLayout';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [activeModule, setActiveModule] = useState('inicio');
  
  // Detectar el módulo activo basado en la ruta
  useEffect(() => {
    if (pathname === '/admin') {
      setActiveModule('inicio');
    } else if (pathname.startsWith('/admin/nomina')) {
      setActiveModule('nomina');
    } else if (pathname.startsWith('/admin/impuestos')) {
      setActiveModule('impuestos');
    } else if (pathname.startsWith('/admin/egresos')) {
      setActiveModule('egresos');
    } else if (pathname.startsWith('/admin/catalogos')) {
      setActiveModule('catalogos');
    } else if (pathname.startsWith('/admin/expediente-digital')) {
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