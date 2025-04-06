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
  ChevronsRight,
  Search
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useRouter } from 'next/navigation';

interface SidebarProps {
  activeModule: string;
  onModuleChange: (moduleId: string) => void;
}

const CollapsibleSidebar: React.FC<SidebarProps> = ({ activeModule, onModuleChange }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  
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
      name: 'Nómina y RRHH',
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
      id: 'catalogos',
      name: 'Catálogos',
      icon: BookOpen,
      description: 'Administración de catálogos del sistema',
    },
    {
      id: 'expediente',
      name: 'Expediente Digital',
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
    
    // Si el módulo es Expediente Digital, navegar a la página correspondiente
    if (moduleId === 'expediente') {
      onModuleChange(moduleId);
    }
  };

  return (
    <aside 
      className={cn(
        "border-r bg-muted/40 h-full min-h-screen flex flex-col transition-all duration-300 relative",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header del sidebar */}
      <div className="flex h-14 min-h-[56px] items-center border-b px-4 justify-between">
        {!collapsed && <h2 className="text-lg font-semibold">SAI UAN</h2>}
        {collapsed && <div className="mx-auto font-bold">SAI</div>}
        
        {/* Botón para colapsar/expandir (solo en desktop) */}
        {!isMobile && (
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn(
              "h-8 w-8 p-0",
              collapsed ? "-mr-9 absolute right-0 bg-background border rounded-full shadow-sm" : ""
            )}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
            <span className="sr-only">{collapsed ? 'Expandir' : 'Colapsar'}</span>
          </Button>
        )}
      </div>
      
      {/* Navegación principal con scroll */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div 
          className={cn(
            "flex-1 overflow-y-auto", 
            isMobile ? "pb-4" : ""
          )}
        >
          <div className={cn("py-3", collapsed ? "px-2" : "px-3")}>
            {!collapsed && <h3 className="mb-2 px-4 text-xs font-medium text-muted-foreground">MÓDULOS</h3>}
            <TooltipProvider>
              <ul className="space-y-1">
                {modules.map((module) => {
                  const isActive = activeModule === module.id;
                  
                  return (
                    <li key={module.id}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            className={cn(
                              "flex items-center gap-3 w-full rounded-md px-3 py-2 text-sm transition-colors",
                              isActive 
                                ? "bg-primary text-primary-foreground" 
                                : "text-muted-foreground hover:bg-muted hover:text-foreground",
                              collapsed ? "justify-center" : ""
                            )}
                            onClick={() => handleModuleClick(module.id)}
                          >
                            <module.icon className="h-4 w-4 flex-shrink-0" />
                            {!collapsed && <span className="truncate">{module.name}</span>}
                          </button>
                        </TooltipTrigger>
                        {collapsed && (
                          <TooltipContent side="right">
                            {module.name}
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </li>
                  );
                })}
              </ul>
            </TooltipProvider>
          </div>
          
          {/* Acceso rápido */}
          {!collapsed && (
            <div className="px-3 py-2">
              <h3 className="mb-2 px-4 text-xs font-medium text-muted-foreground">ACCESO RÁPIDO</h3>
              <ul className="space-y-1">
                {quickAccess.map((item) => (
                  <li key={item.id}>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-left font-normal"
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{item.name}</span>
                      </div>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Acceso rápido en modo colapsado */}
          {collapsed && (
            <div className="px-2 py-2">
              <TooltipProvider>
                <ul className="space-y-1">
                  {quickAccess.map((item) => (
                    <li key={item.id}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="w-full h-9 p-0 flex justify-center"
                          >
                            <item.icon className="h-4 w-4" />
                            <span className="sr-only">{item.name}</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          {item.name}
                        </TooltipContent>
                      </Tooltip>
                    </li>
                  ))}
                </ul>
              </TooltipProvider>
            </div>
          )}
        </div>
      </div>
      
      {/* Información de usuario */}
      <div className={cn(
        "border-t p-4 flex items-center",
        collapsed ? "justify-center" : "gap-2"
      )}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarImage src="/api/placeholder/32/32" alt="Avatar" />
                <AvatarFallback>UA</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right">
                <div>
                  <div className="font-medium">Usuario Admin</div>
                  <div className="text-xs text-muted-foreground">admin@uan.edu.mx</div>
                </div>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
        
        {!collapsed && (
          <div className="grid gap-0.5 text-xs overflow-hidden">
            <div className="font-medium truncate">Usuario Admin</div>
            <div className="text-muted-foreground truncate">admin@uan.edu.mx</div>
          </div>
        )}
        
        {!collapsed && (
          <Button variant="ghost" size="sm" className="ml-auto h-8 w-8 p-0 flex-shrink-0">
            <LogOut className="h-4 w-4" />
            <span className="sr-only">Cerrar sesión</span>
          </Button>
        )}
      </div>
    </aside>
  );
}

export default CollapsibleSidebar;