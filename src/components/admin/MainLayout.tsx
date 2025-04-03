"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose
} from '@/components/ui/sheet';
import { 
  Users, 
  FileText, 
  DollarSign, 
  BookOpen, 
  Menu,
  Search,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

// Importar componentes de módulos
import NominaModule from './modules/NominaModule';
import ImpuestosModule from './modules/ImpuestosModule';
import EgresosModule from './modules/EgresosModule';
import CatalogosModule from './modules/CatalogosModule';

const basePath = process.env.NODE_ENV === 'production' ? '/sai-test' : '';
// Componente principal
const MainLayout = () => {
  const [activeModule, setActiveModule] = useState('nomina');
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showSearchDialog, setShowSearchDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  
  // Detectar si estamos en un dispositivo móvil
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

  // Datos de ejemplo para la búsqueda
  const empleadosRecientes = [
    { id: 1, nombre: 'Juan Pérez', puesto: 'Profesor de Tiempo Completo', adscripcion: 'Unidad Académica de Economía', estatus: 'Activo' },
    { id: 2, nombre: 'María López', puesto: 'Administrativo', adscripcion: 'Recursos Humanos', estatus: 'Activo' },
    { id: 3, nombre: 'Carlos Rodríguez', puesto: 'Profesor de Asignatura', adscripcion: 'Unidad Académica de Derecho', estatus: 'Licencia' },
    { id: 4, nombre: 'Ana González', puesto: 'Directivo', adscripcion: 'Rectoría', estatus: 'Activo' },
  ];

  // Módulos del sistema
  const modules = [
    {
      id: 'nomina',
      name: 'Nómina y Recursos Humanos',
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
  ];

  // Función para buscar empleados
  const handleSearch = (query:any) => {
    setSearchQuery(query);
    if (query.length > 2) {
      // Aquí iría la lógica real para buscar en la base de datos
      const results = empleadosRecientes.filter(emp => 
        emp.nombre.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleModuleChange = (moduleId:any) => {
    setActiveModule(moduleId);
    setIsOpen(false); // Cierra el menú móvil al seleccionar una opción
  };

  // Renderiza el contenido según el módulo activo
  const renderModuleContent = () => {
    const activeModuleObj = modules.find(m => m.id === activeModule);
    
    switch (activeModule) {
      case 'nomina':
        return <NominaModule />;
      case 'impuestos':
        return <ImpuestosModule />;
      case 'egresos':
        return <EgresosModule />;
      case 'catalogos':
        return <CatalogosModule />;
      default:
        return (
          <div className="flex items-center justify-center h-[80vh]">
            <div className="text-center">
              <h2 className="text-2xl font-bold">{activeModuleObj?.name || 'Módulo'}</h2>
              <p className="text-muted-foreground">Seleccione una opción del menú para comenzar</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar para escritorio */}
      <aside className="hidden md:flex w-64 flex-col border-r bg-muted/40">
        <div className="flex h-14 items-center border-b px-4">
          <h2 className="text-lg font-semibold">SAI UAN</h2>
        </div>
        <div className="flex-1 overflow-auto">
          <nav className="grid gap-1 px-2 py-3">
            {modules.map((module) => (
              <SidebarItem
                key={module.id}
                icon={module.icon}
                label={module.name}
                active={activeModule === module.id}
                onClick={() => handleModuleChange(module.id)}
              />
            ))}
          </nav>
          
          <div className="px-3 py-2">
            <h3 className="mb-2 px-4 text-xs font-medium text-muted-foreground">ACCESO RÁPIDO</h3>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-left font-normal mb-1"
              onClick={() => setShowSearchDialog(true)}
            >
              <div className="flex items-center gap-3">
                <Search className="h-4 w-4" />
                <span>Buscar expediente</span>
              </div>
            </Button>
          </div>
        </div>
        <div className="mt-auto p-4 border-t">
          <div className="grid gap-1">
            <Button variant="ghost" size="sm" className="justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Configuración
            </Button>
            <Button variant="ghost" size="sm" className="justify-start">
              <HelpCircle className="mr-2 h-4 w-4" />
              Ayuda
            </Button>
            <Button variant="ghost" size="sm" className="justify-start">
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar sesión
            </Button>
          </div>
        </div>
        <div className="p-4 border-t flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/api/placeholder/32/32" alt="Avatar" />
            <AvatarFallback>UA</AvatarFallback>
          </Avatar>
          <div className="grid gap-0.5 text-xs">
            <div className="font-medium">Usuario Admin</div>
            <div className="text-muted-foreground">admin@uan.edu.mx</div>
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
                  <h2 className="text-lg font-semibold">SAI UAN</h2>
                </div>
                <nav className="grid gap-1 p-2">
                  {modules.map((module) => (
                    <SheetClose key={module.id} asChild>
                      <Button 
                        variant={activeModule === module.id ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => handleModuleChange(module.id)}
                      >
                        <module.icon className="mr-2 h-4 w-4" />
                        {module.name}
                      </Button>
                    </SheetClose>
                  ))}
                </nav>
                
                <div className="px-2 py-4">
                  <Separator className="mb-4" />
                  <Button 
                    variant="outline" 
                    className="w-full mb-2 justify-start"
                    onClick={() => {
                      setShowSearchDialog(true);
                      setIsOpen(false);
                    }}
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Buscar expediente
                  </Button>
                </div>
                
                <div className="mt-auto p-4 border-t">
                  <div className="grid gap-1">
                    <Button variant="ghost" size="sm" className="justify-start">
                      <Settings className="mr-2 h-4 w-4" />
                      Configuración
                    </Button>
                    <Button variant="ghost" size="sm" className="justify-start">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      Ayuda
                    </Button>
                    <Button variant="ghost" size="sm" className="justify-start">
                      <LogOut className="mr-2 h-4 w-4" />
                      Cerrar sesión
                    </Button>
                  </div>
                </div>
                <div className="p-4 border-t flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/api/placeholder/32/32" alt="Avatar" />
                    <AvatarFallback>UA</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-0.5 text-xs">
                    <div className="font-medium">Usuario Admin</div>
                    <div className="text-muted-foreground">admin@uan.edu.mx</div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          <div className="flex-1 flex items-center">
            <h1 className="text-lg font-semibold ml-2 md:ml-0">
              {modules.find(m => m.id === activeModule)?.name || 'Dashboard'}
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="hidden md:flex" 
              onClick={() => setShowSearchDialog(true)}
            >
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Avatar className="md:hidden h-8 w-8">
              <AvatarImage src="/api/placeholder/32/32" alt="Avatar" />
              <AvatarFallback>UA</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 md:p-6">
          {renderModuleContent()}
        </main>
      </div>
      
      {/* Diálogo de búsqueda de empleados */}
      <Dialog open={showSearchDialog} onOpenChange={setShowSearchDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Buscar trabajador/docente</DialogTitle>
            <DialogDescription>
              Ingrese el nombre o número de empleado para buscar su expediente.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 mb-2">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Nombre, RFC o número de empleado"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="flex-1"
              />
              <Button size="sm" variant="secondary">
                <Search className="h-4 w-4 mr-2" />
                Buscar
              </Button>
            </div>
          </div>
          
          {searchResults.length > 0 && (
            <div className="max-h-[200px] overflow-auto">
              {searchResults.map((result) => (
                <div 
                  key={result.id} 
                  className="flex items-center justify-between p-2 hover:bg-muted rounded-md cursor-pointer"
                  onClick={() => {
                    setShowSearchDialog(false);
                    // Aquí iría la lógica para abrir el expediente
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{result.nombre.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{result.nombre}</p>
                      <p className="text-xs text-muted-foreground">{result.puesto}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
            </div>
          )}
          
          {searchQuery.length > 2 && searchResults.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-2">
              No se encontraron resultados
            </p>
          )}
          
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowSearchDialog(false)}>
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
      className={`flex items-center gap-3 rounded-md px-4 py-2 text-sm transition-colors ${
        active 
          ? 'bg-primary text-primary-foreground' 
          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
      }`}
      onClick={onClick}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );
};

export default MainLayout;