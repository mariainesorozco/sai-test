"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Users, 
  FileText, 
  CreditCard, 
  Heart, 
  LifeBuoy, 
  ChevronDown 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Importa los componentes de contenido
import DatosPersonalesContent from './DatosPersonalesContent';
import DatosLaboralesContent from './DatosLaboralesContent';
import DatosFiscalesContent from './DatosFiscalesContent';
import FormacionAcademicaContent from './FormacionAcademicaContent';
import DatosFamiliaresContent from './DatosFamiliaresContent';
import SeguridadSocialContent from './SeguridadSocialContent';
import PrestacionesSocialesContent from './PrestacionesSocialesContent';
import CreditosPensionesContent from './CreditosPensionesContent';

const ExpedienteDigitalDashboard = () => {
  const [activeTab, setActiveTab] = useState('datos-personales');

  // Función para renderizar el contenido según la pestaña activa
  const renderContent = () => {
    switch (activeTab) {
      case 'datos-personales':
        return <DatosPersonalesContent />;
      case 'datos-laborales':
        return <DatosLaboralesContent />;
      case 'datos-fiscales':
        return <DatosFiscalesContent />;
      case 'formacion-academica':
        return <FormacionAcademicaContent />;
      case 'datos-familiares':
        return <DatosFamiliaresContent />;
      case 'seguridad-social':
        return <SeguridadSocialContent />;
      case 'prestaciones-sociales':
        return <PrestacionesSocialesContent />;
      case 'creditos-pensiones':
        return <CreditosPensionesContent />;
      default:
        return <div className="p-4">Seleccione una sección</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r bg-muted/40">
        <div className="flex h-14 items-center border-b px-4">
          <h2 className="text-lg font-semibold">Expediente Digital</h2>
        </div>
        <nav className="flex-1 overflow-auto py-2">
          <div className="px-3 py-2">
            <h3 className="mb-2 text-xs font-medium text-muted-foreground">INFORMACIÓN</h3>
            <SidebarItem
              icon={User}
              label="Datos Personales"
              active={activeTab === 'datos-personales'}
              onClick={() => setActiveTab('datos-personales')}
            />
            <SidebarItem
              icon={Briefcase}
              label="Datos Laborales"
              active={activeTab === 'datos-laborales'}
              onClick={() => setActiveTab('datos-laborales')}
            />
            <SidebarItem
              icon={FileText}
              label="Datos Fiscales"
              active={activeTab === 'datos-fiscales'}
              onClick={() => setActiveTab('datos-fiscales')}
            />
            <SidebarItem
              icon={GraduationCap}
              label="Formación Académica"
              active={activeTab === 'formacion-academica'}
              onClick={() => setActiveTab('formacion-academica')}
            />
            <SidebarItem
              icon={Users}
              label="Datos Familiares"
              active={activeTab === 'datos-familiares'}
              onClick={() => setActiveTab('datos-familiares')}
            />
            <SidebarItem
              icon={LifeBuoy}
              label="Seguridad Social"
              active={activeTab === 'seguridad-social'}
              onClick={() => setActiveTab('seguridad-social')}
            />
            <SidebarItem
              icon={Heart}
              label="Prestaciones Sociales"
              active={activeTab === 'prestaciones-sociales'}
              onClick={() => setActiveTab('prestaciones-sociales')}
            />
            <SidebarItem
              icon={CreditCard}
              label="Créditos y Pensiones"
              active={activeTab === 'creditos-pensiones'}
              onClick={() => setActiveTab('creditos-pensiones')}
            />
          </div>
        </nav>
        <div className="mt-auto p-4 border-t">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/api/placeholder/32/32" alt="Avatar" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
            <div className="grid gap-0.5 text-xs">
              <div className="font-medium">Usuario Admin</div>
              <div className="text-muted-foreground">admin@uan.edu.mx</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Contenido principal */}
      <div className="flex flex-col flex-1">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
          <Button variant="outline" size="sm" className="md:hidden">
            <ChevronDown className="h-4 w-4" />
            <span className="sr-only">Menú</span>
          </Button>
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/api/placeholder/32/32" alt="Foto empleado" />
              <AvatarFallback>EE</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">Expediente Trabajador</h3>
              <div className="text-xs text-muted-foreground">Universidad Autónoma de Nayarit</div>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Badge variant="outline" className="text-xs">Administrativo</Badge>
            <Badge variant="outline" className="text-xs">Activo</Badge>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 sm:p-6">
          {/* Aquí renderizamos el contenido de la sección activa */}
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

// Componente para los elementos del sidebar
const SidebarItem = ({ 
  icon: Icon, 
  label, 
  active, 
  onClick 
}: { 
  icon: React.ElementType; 
  label: string; 
  active: boolean; 
  onClick: () => void;
}) => {
  return (
    <button
      className={`w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
        active 
          ? 'bg-accent text-accent-foreground' 
          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
      }`}
      onClick={onClick}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );
};

export default ExpedienteDigitalDashboard;