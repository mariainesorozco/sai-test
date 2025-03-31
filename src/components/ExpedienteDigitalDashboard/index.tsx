"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose
} from '@/components/ui/sheet';
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
  Menu,
  ChevronLeft
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

// Importa los componentes de contenido
import DatosPersonalesContent from './DatosPersonalesContent';
import DatosLaboralesContent from './DatosLaboralesContent';
import DatosFiscalesContent from './DatosFiscalesContent';
import FormacionAcademicaContent from './FormacionAcademicaContent';
import DatosFamiliaresContent from './DatosFamiliaresContent';
import SeguridadSocialContent from './SeguridadSocialContent';
import PrestacionesSocialesContent from './PrestacionesSocialesContent';
import CreditosPensionesContent from './CreditosPensionesContent';

// Definición de tipos para las secciones
type SectionType = {
  id: string;
  label: string;
  icon: React.ElementType;
  component: React.ReactNode;
};

const ExpedienteDigitalDashboard = () => {
  const [activeTab, setActiveTab] = useState('datos-personales');
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Detectar si el usuario está en un dispositivo móvil
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Verificar al cargar y cuando cambia el tamaño de la ventana
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  // Definir todas las secciones disponibles
  const sections: SectionType[] = [
    {
      id: 'datos-personales',
      label: 'Datos Personales',
      icon: User,
      component: <DatosPersonalesContent />
    },
    {
      id: 'datos-laborales',
      label: 'Datos Laborales',
      icon: Briefcase,
      component: <DatosLaboralesContent />
    },
    {
      id: 'datos-fiscales',
      label: 'Datos Fiscales',
      icon: FileText,
      component: <DatosFiscalesContent />
    },
    {
      id: 'formacion-academica',
      label: 'Formación Académica',
      icon: GraduationCap,
      component: <FormacionAcademicaContent />
    },
    {
      id: 'datos-familiares',
      label: 'Datos Familiares',
      icon: Users,
      component: <DatosFamiliaresContent />
    },
    {
      id: 'seguridad-social',
      label: 'Seguridad Social',
      icon: LifeBuoy,
      component: <SeguridadSocialContent />
    },
    {
      id: 'prestaciones-sociales',
      label: 'Prestaciones Sociales',
      icon: Heart,
      component: <PrestacionesSocialesContent />
    },
    {
      id: 'creditos-pensiones',
      label: 'Créditos y Pensiones',
      icon: CreditCard,
      component: <CreditosPensionesContent />
    }
  ];

  // Encontrar la sección activa
  const activeSection = sections.find(section => section.id === activeTab) || sections[0];

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsOpen(false); // Cierra el menú móvil al seleccionar una opción
  };

  // Función para navegar a la sección anterior (solo en móvil)
  const handlePrevSection = () => {
    const currentIndex = sections.findIndex(section => section.id === activeTab);
    if (currentIndex > 0) {
      setActiveTab(sections[currentIndex - 1].id);
    }
  };

  // Función para navegar a la sección siguiente (solo en móvil)
  const handleNextSection = () => {
    const currentIndex = sections.findIndex(section => section.id === activeTab);
    if (currentIndex < sections.length - 1) {
      setActiveTab(sections[currentIndex + 1].id);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar para escritorio */}
      <aside className="hidden md:flex w-64 flex-col border-r bg-muted/40">
        <div className="flex h-14 items-center border-b px-4">
          <h2 className="text-lg font-semibold">Expediente Digital</h2>
        </div>
        <nav className="flex-1 overflow-auto py-2">
          <div className="px-3 py-2">
            <h3 className="mb-2 text-xs font-medium text-muted-foreground">INFORMACIÓN</h3>
            {sections.map(section => (
              <SidebarItem
                key={section.id}
                icon={section.icon}
                label={section.label}
                active={activeTab === section.id}
                onClick={() => handleTabChange(section.id)}
              />
            ))}
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
          {/* Menú móvil con Sheet */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[85vw] max-w-[300px] p-0">
                <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
                <div className="flex h-14 items-center border-b px-4">
                  <h2 className="text-lg font-semibold">Expediente Digital</h2>
                </div>
                <nav className="flex-1 overflow-auto py-2">
                  <div className="px-3 py-2">
                    <h3 className="mb-2 text-xs font-medium text-muted-foreground">INFORMACIÓN</h3>
                    {sections.map(section => (
                      <SheetClose key={section.id} asChild>
                        <SidebarItem
                          icon={section.icon}
                          label={section.label}
                          active={activeTab === section.id}
                          onClick={() => handleTabChange(section.id)}
                        />
                      </SheetClose>
                    ))}
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
              </SheetContent>
            </Sheet>
          </div>
          
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/api/placeholder/32/32" alt="Foto empleado" />
              <AvatarFallback>ET</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-sm md:text-base">Expediente Trabajador</h3>
              <div className="text-xs text-muted-foreground">Universidad Autónoma de Nayarit</div>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Badge variant="outline" className="text-xs">Administrativo</Badge>
            <Badge variant="outline" className="text-xs hidden sm:inline-flex">Activo</Badge>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-2 sm:p-4 md:p-6">
          {/* Header para la sección actual en móvil */}
          <div className="md:hidden mb-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight">
                {activeSection.label}
              </h2>
            </div>
            
            {/* Navegación entre secciones para móvil */}
            <div className="flex items-center justify-between mt-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handlePrevSection}
                disabled={sections.findIndex(s => s.id === activeTab) === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Anterior
              </Button>
              
              <div className="text-sm text-muted-foreground">
                {sections.findIndex(s => s.id === activeTab) + 1} / {sections.length}
              </div>
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleNextSection}
                disabled={sections.findIndex(s => s.id === activeTab) === sections.length - 1}
              >
                Siguiente
                <ChevronLeft className="h-4 w-4 ml-1 rotate-180" />
              </Button>
            </div>
            
            <Separator className="my-2" />
          </div>
          
          {/* Contenido de la sección activa */}
          {activeSection.component}
          
          {/* Navegación entre páginas para móvil (floating - barra de iconos) */}
          {isMobile && (
            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-background border rounded-lg shadow-lg p-1.5 flex items-center space-x-1 z-10 overflow-x-auto max-w-[92vw]">
              {sections.map((section) => {
                const SectionIcon = section.icon;
                return (
                  <Button
                    key={section.id}
                    variant={activeTab === section.id ? "default" : "ghost"}
                    size="sm"
                    className={`min-w-9 h-9 p-0 rounded-md relative ${activeTab === section.id ? 'bg-primary' : ''}`}
                    onClick={() => handleTabChange(section.id)}
                    title={section.label}
                  >
                    <SectionIcon className={`h-4 w-4 ${activeTab === section.id ? 'text-primary-foreground' : ''}`} />
                    {activeTab === section.id && (
                      <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-primary-foreground" />
                    )}
                  </Button>
                );
              })}
            </div>
          )}
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