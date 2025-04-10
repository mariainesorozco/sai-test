"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  FileText, 
  DollarSign, 
  BookOpen, 
  User,
  Home,
  Settings,
  HelpCircle,
  LogOut,
  ChevronsLeft,
  ChevronRight,
  PanelRight,
  Search,
  Calculator,
  Menu,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeModule: string;
  onModuleChange: (moduleId: string) => void;
}

const CollapsibleSidebar: React.FC<SidebarProps> = ({ activeModule, onModuleChange }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Detectar si estamos en un dispositivo móvil
  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Si es móvil, siempre mantener expandido el menú
      if (mobile) {
        setCollapsed(false);
      }
    };
    
    // Verificar al cargar y cuando cambia el tamaño de la ventana
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  // Módulos del sistema
  const modules = [
    {
      id: 'inicio',
      name: 'Inicio',
      icon: Home,
      description: 'Panel de control y resumen',
    },
    {
      id: 'nomina',
      name: 'Nómina y RH',
      icon: Users,
      description: 'Gestión de personal, expedientes y nómina',
    },
    {
      id: 'impuestos',
      name: 'Impuestos',
      icon: FileText,
      description: 'Gestión de impuestos y obligaciones fiscales',
    },
    {
      id: 'egresos',
      name: 'Egresos',
      icon: DollarSign,
      description: 'Control de pagos y egresos institucionales',
    },
    {
      id: 'contabilidad',
      name: 'Contabilidad',
      icon: Calculator,
      description: 'Gestión contable y financiera',
    },
    {
      id: 'catalogos',
      name: 'Catálogos',
      icon: BookOpen,
      description: 'Administración de catálogos del sistema',
    },
    {
      id: 'expediente',
      name: 'Expediente',
      icon: User,
      description: 'Gestión de expedientes digitales',
    }
  ];
  
  // Accesos rápidos
  const quickAccess = [
    { id: 'search-expediente', name: 'Buscar', icon: Search },
    { id: 'settings', name: 'Configuración', icon: Settings },
    { id: 'help', name: 'Ayuda', icon: HelpCircle },
  ];

  // Función para manejar el clic en un módulo
  const handleModuleClick = (moduleId: string) => {
    onModuleChange(moduleId);
  };

  // Función para alternar el estado de colapso
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <aside 
      className={cn(
        "border-r bg-background h-full min-h-screen flex flex-col transition-all duration-300 relative shadow-sm z-10",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header del sidebar */}
      <div className="flex h-14 min-h-[56px] items-center border-b px-4 shadow-sm bg-background/95 backdrop-blur-sm">
        {!collapsed ? (
          <div className="flex-1 flex items-center">
            <h2 className="text-lg font-semibold tracking-tight text-primary">SAi UAN</h2>
          </div>
        ) : (
          <div className="flex-1 flex justify-center">
            <span className="text-lg font-bold text-primary">SAi</span>
          </div>
        )}
        
        {/* Botón para colapsar/expandir (solo en desktop) */}
        {!isMobile && (
          <Button 
            variant="outline" 
            size="sm" 
            className={cn(
              "h-8 w-8 p-0 rounded-md hover:bg-primary/10 transition-colors",
              collapsed 
                ? "absolute -right-4 top-3 bg-white border-primary/20 shadow-md z-20" 
                : ""
            )}
            onClick={toggleCollapsed}
            title={collapsed ? 'Expandir menú' : 'Colapsar menú'}
          >
            {collapsed ? (
              <Menu className="h-4 w-4 text-primary" />
            ) : (
              <ChevronsLeft className="h-4 w-4 text-primary" />
            )}
            <span className="sr-only">{collapsed ? 'Expandir' : 'Colapsar'}</span>
          </Button>
        )}
      </div>
      
      {/* Navegación principal con scroll */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div 
          className={cn(
            "flex-1 overflow-y-auto scrollbar-thin py-3", 
            collapsed ? "px-2" : "px-3"
          )}
        >
          {!collapsed && (
            <div className="mb-3 px-3">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Módulos</h3>
            </div>
          )}
          
          <nav className="space-y-1">
            {modules.map((module) => {
              const isActive = activeModule === module.id;
              
              return (
                <button
                  key={module.id}
                  className={cn(
                    "flex items-center w-full rounded-md text-sm transition-colors text-left",
                    collapsed ? "justify-center px-2 py-2" : "px-3 py-2",
                    isActive 
                      ? "bg-primary/10 text-primary font-medium shadow-sm" 
                      : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                  )}
                  onClick={() => handleModuleClick(module.id)}
                  title={collapsed ? module.name : undefined}
                >
                  <module.icon className={cn(
                    "flex-shrink-0",
                    collapsed ? "h-5 w-5" : "h-4 w-4 mr-3", 
                    isActive ? "text-primary" : "text-muted-foreground"
                  )} />
                  
                  {!collapsed && (
                    <span className="truncate flex-1">{module.name}</span>
                  )}
                </button>
              );
            })}
          </nav>
          
          {/* Separador antes de los accesos rápidos */}
          {!collapsed && (
            <div className="h-px w-full bg-border/60 my-4 mx-auto max-w-[90%] opacity-60" />
          )}
          
          {/* Acceso rápido */}
          {!collapsed && (
            <div className="px-3 py-1">
              <h3 className="mb-2 px-1 text-xs font-medium text-muted-foreground">Acceso Rápido</h3>
              <nav className="space-y-1">
                {quickAccess.map((item) => (
                  <Button 
                    key={item.id}
                    variant="ghost" 
                    className="w-full justify-start py-2 px-3 text-left font-normal text-muted-foreground hover:text-foreground h-auto"
                  >
                    <item.icon className="h-4 w-4 mr-3" />
                    <span className="truncate flex-1">{item.name}</span>
                  </Button>
                ))}
              </nav>
            </div>
          )}
          
          {/* Acceso rápido en modo colapsado */}
          {collapsed && (
            <div className="mt-4 border-t pt-4 border-b pb-4">
              <nav className="flex flex-col gap-3 items-center">
                {quickAccess.map((item) => (
                  <button
                    key={item.id}
                    className="flex justify-center items-center rounded-full w-8 h-8 text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
                    title={item.name}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="sr-only">{item.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          )}
        </div>
      </div>
      
      {/* Información de usuario */}
      <div className={cn(
        "border-t p-3 bg-background/95 backdrop-blur-sm",
        collapsed ? "" : ""
      )}>
        <div className={cn(
          "flex rounded-md p-2 transition-colors",
          collapsed ? "justify-center" : "gap-3 hover:bg-muted/80 items-center"
        )}>
          <Avatar className="h-8 w-8 flex-shrink-0 border-2 border-background">
            <AvatarImage src="/api/placeholder/32/32" alt="Avatar" />
            <AvatarFallback className="bg-primary/10 text-primary">UA</AvatarFallback>
          </Avatar>
          
          {!collapsed && (
            <>
              <div className="grid gap-0.5 text-xs overflow-hidden flex-1">
                <div className="font-medium truncate">Usuario Admin</div>
                <div className="text-muted-foreground truncate">admin@uan.edu.mx</div>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 w-7 p-0 rounded-full hover:bg-muted shrink-0"
                title="Cerrar sesión"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="sr-only">Cerrar sesión</span>
              </Button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}

export default CollapsibleSidebar;