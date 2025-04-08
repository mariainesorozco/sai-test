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
  ChevronRight,
  ArrowLeft,
  Download,
  Calendar
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';

// Importar componentes modificados para Juan Pérez
import DatosPersonalesJuanPerez from './DatosPersonalesJuanPerez';
import DatosLaboralesJuanPerez from './DatosLaboralesJuanPerez';
import DatosFiscalesJuanPerez from './DatosFiscalesJuanPerez';
import FormacionAcademicaJuanPerez from './FormacionAcademicaJuanPerez';
import DatosFamiliaresJuanPerez from './DatosFamiliaresJuanPerez';
import SeguridadSocialJuanPerez from './SeguridadSocialJuanPerez';
import PrestacionesSocialesJuanPerez from './PrestacionesSocialesJuanPerez';
import CreditosPensionesJuanPerez from './CreditosPensionesJuanPerez';
import CargaHorariaJuanPerez from './CargaHorariaJuanPerez';

// Definición de tipos para las secciones
type SectionType = {
  id: string;
  label: string;
  icon: React.ElementType;
  component: React.ReactNode;
};

const ExpedienteJuanPerez = () => {
  const router = useRouter();
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

  // Definir todas las secciones disponibles con los componentes específicos de Juan Pérez
  const sections: SectionType[] = [
    {
      id: 'datos-personales',
      label: 'Datos Personales',
      icon: User,
      component: <DatosPersonalesJuanPerez />
    },
    {
      id: 'datos-laborales',
      label: 'Datos Laborales',
      icon: Briefcase,
      component: <DatosLaboralesJuanPerez />
    },
    {
      id: 'carga-horaria',
      label: 'Carga Horaria',
      icon: Calendar,
      component: <CargaHorariaJuanPerez />
    },
    {
      id: 'datos-fiscales',
      label: 'Datos Fiscales',
      icon: FileText,
      component: <DatosFiscalesJuanPerez />
    },
    {
      id: 'formacion-academica',
      label: 'Formación Académica',
      icon: GraduationCap,
      component: <FormacionAcademicaJuanPerez />
    },
    {
      id: 'datos-familiares',
      label: 'Datos Familiares',
      icon: Users,
      component: <DatosFamiliaresJuanPerez />
    },
    {
      id: 'seguridad-social',
      label: 'Seguridad Social',
      icon: LifeBuoy,
      component: <SeguridadSocialJuanPerez />
    },
    {
      id: 'prestaciones-sociales',
      label: 'Prestaciones Sociales',
      icon: Heart,
      component: <PrestacionesSocialesJuanPerez />
    },
    {
      id: 'creditos-pensiones',
      label: 'Créditos y Pensiones',
      icon: CreditCard,
      component: <CreditosPensionesJuanPerez />
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

  // Función para volver a la lista de expedientes
  const handleBack = () => {
    router.push('/admin/nomina/expediente-digital');
  };

  return (
    <div className="grid gap-6">
      {/* Header y navegación */}
      <div className="flex flex-col gap-4">
        {/* Cabecera adaptada para móvil y desktop */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleBack}
              className="mr-1 p-2 md:p-3 h-9"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only md:not-sr-only md:ml-1">Volver</span>
            </Button>
            <h2 className="text-lg md:text-2xl font-bold tracking-tight">Expediente</h2>
          </div>
          <div className="flex gap-1 md:gap-2">
            <Button variant="outline" size="sm" className="px-2 md:px-3 h-9">
              <Download className="h-4 w-4 md:mr-2" />
              <span className="sr-only md:not-sr-only">Exportar</span>
            </Button>
            <Button size="sm" className="px-2 md:px-3 h-9">
              <span>Editar</span>
            </Button>
          </div>
        </div>

        {/* Información del empleado */}
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <Avatar className="h-14 w-14 md:h-16 md:w-16">
                <AvatarImage src="/api/placeholder/64/64" alt="Foto de Juan Pérez" />
                <AvatarFallback>JP</AvatarFallback>
              </Avatar>
              
              <div className="space-y-1 flex-1">
                <h3 className="text-lg md:text-xl font-semibold">Juan Pérez García</h3>
                <div className="flex flex-col md:flex-row md:items-center gap-0 md:gap-4">
                  <p className="text-sm text-muted-foreground">Profesor de Tiempo Completo</p>
                  <p className="text-sm text-muted-foreground hidden md:block">•</p>
                  <p className="text-sm text-muted-foreground">Unidad Académica de Economía</p>
                </div>
                <div className="flex flex-wrap gap-1 md:gap-2 mt-1 md:mt-2">
                  <Badge variant="outline" className="text-xs md:text-sm">Docente</Badge>
                  <Badge variant="outline" className="bg-green-50 text-xs md:text-sm">Activo</Badge>
                  <Badge variant="outline" className="bg-blue-50 text-xs md:text-sm">Base</Badge>
                </div>
              </div>
              
              <div className="mt-2 md:mt-0 flex flex-col items-center gap-0 md:gap-1 md:border-l md:pl-4">
                <div className="text-xs md:text-sm text-muted-foreground">Completado</div>
                <div className="text-lg md:text-xl font-bold">95%</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contenedor de pestañas para desktop */}
      <div className="hidden md:block">
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="w-full flex flex-wrap mb-4 h-auto p-1 overflow-x-auto">
            {sections.map((section) => (
              <TabsTrigger key={section.id} value={section.id} className="flex items-center gap-2 py-2">
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
      
      {/* Navegación y contenido para móvil */}
      <div className="md:hidden">
        {/* Navegación compacta para móvil con indicadores */}
        <div className="flex items-center justify-between mb-3">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handlePrevSection}
            disabled={sections.findIndex(s => s.id === activeTab) === 0}
            className="h-8 px-2"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span className="text-sm">Anterior</span>
          </Button>
          
          <span className="text-xs text-muted-foreground px-2 py-1 bg-muted/40 rounded-full">
            {sections.findIndex(s => s.id === activeTab) + 1} / {sections.length}
          </span>
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleNextSection}
            disabled={sections.findIndex(s => s.id === activeTab) === sections.length - 1}
            className="h-8 px-2"
          >
            <span className="text-sm">Siguiente</span>
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        
        <Separator className="mb-4" />
        
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
                className={`min-w-8 h-8 p-0 rounded-md relative ${activeTab === section.id ? 'bg-primary' : ''}`}
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
    </div>
  );
};

export default ExpedienteJuanPerez;