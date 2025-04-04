"use client";

import React, { useState, useEffect } from 'react';
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
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  const [isMobile, setIsMobile] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Detectar si estamos en un dispositivo móvil y controlar botón de scroll
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    
    // Verificar al cargar y cuando cambia el tamaño de la ventana
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
      window.removeEventListener('scroll', handleScroll);
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

  // Función para desplazarse al inicio
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Contenido principal */}
      <div className="flex flex-col flex-1">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/api/placeholder/32/32" alt="Foto empleado" />
              <AvatarFallback>ET</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-sm md:text-base">Expediente Trabajador</h3>
              <div className="text-xs text-muted-foreground">
                <span className="hidden md:inline">Universidad Autónoma de Nayarit</span>
                <span className="md:hidden">UAN</span>
              </div>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Badge variant="outline" className="text-xs">Administrativo</Badge>
            <Badge variant="outline" className="text-xs">Activo</Badge>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 md:p-6">
          {/* Contenedor de pestañas para desktop */}
          <div className="hidden md:block mb-6">
            <Tabs value={activeTab} onValueChange={handleTabChange}>
              <TabsList className="grid grid-flow-col w-full justify-start overflow-x-auto mb-6">
                {sections.map((section) => (
                  <TabsTrigger key={section.id} value={section.id} className="flex items-center gap-2">
                    <section.icon className="h-4 w-4" />
                    <span>{section.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {sections.map((section) => (
                <TabsContent key={section.id} value={section.id}>
                  {section.component}
                </TabsContent>
              ))}
            </Tabs>
          </div>
          
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
            
            {/* Componente específico para móvil */}
            {activeSection.component}
          </div>

          {/* Espacio adicional para evitar que la barra flotante tape el contenido */}
          {isMobile && <div className="h-20 w-full mt-6"></div>}
          
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
          
          {/* Botón para volver al inicio */}
          {showScrollTop && (
            <Button
              className="fixed bottom-24 right-4 rounded-full shadow-lg z-10 w-10 h-10 p-0"
              size="sm"
              onClick={scrollToTop}
              title="Volver al inicio"
            >
              <ChevronLeft className="h-5 w-5 rotate-90" />
            </Button>
          )}
        </main>
      </div>
    </div>
  );
};

export default ExpedienteDigitalDashboard;