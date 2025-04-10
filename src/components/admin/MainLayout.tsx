"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { routes } from '@/app/admin/route-config';
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
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { 
  Menu,
  Search,
  Bell,
  LogOut,
  ChevronRight,
  User,
  Settings,
  HelpCircle,
  Grid,
  Home
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
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import CollapsibleSidebar from './CollapsibleSidebar';

// Interfaces
interface MainLayoutProps {
  activeModule: string;
  setActiveModule: (moduleId: string) => void;
  renderContent: () => React.ReactNode;
}

// Componente principal
const MainLayout: React.FC<MainLayoutProps> = ({ 
  activeModule, 
  setActiveModule, 
  renderContent 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);
  const [showSearchDialog, setShowSearchDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const router = useRouter();
  
  // Detectar si estamos en un dispositivo móvil
  useEffect(() => {
    const checkIsMobile = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsSmallMobile(width < 400); // Específicamente para pantallas muy pequeñas como iPhone SE
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

  // Módulos del sistema (para acceso en este componente)
  const modules = [
    { id: 'inicio', name: 'Inicio' },
    { id: 'nomina', name: 'Nómina y RH' },
    { id: 'impuestos', name: 'Impuestos' },
    { id: 'egresos', name: 'Egresos' },
    { id: 'contabilidad', name: 'Contabilidad' },
    { id: 'catalogos', name: 'Catálogos' },
    { id: 'expediente', name: 'Expediente' }
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

  // Función para cambiar de módulo
  const handleModuleChange = (moduleId: string) => {
    setActiveModule(moduleId);
    
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
    
    setIsOpen(false); // Cierra el menú móvil al seleccionar una opción
  };

  // Función para renderizar el módulo seleccionado en breadcrumbs
  const renderModuleText = (moduleId: string) => {
    const module = modules.find(m => m.id === moduleId);
    // Si es una pantalla muy pequeña, usamos nombres más cortos para algunos módulos
    if (isSmallMobile) {
      if (moduleId === 'nomina') return 'Nómina y RH';
      if (moduleId === 'expediente') return 'Expediente';
    }
    return module?.name || '';
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar para escritorio */}
      <div className="hidden md:block">
        <CollapsibleSidebar 
          activeModule={activeModule}
          onModuleChange={handleModuleChange}
        />
      </div>

      {/* Contenido principal */}
      <div className="flex flex-col flex-1">
        <header className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-2 sm:px-4 shadow-sm">
          {/* Menú móvil con Sheet */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="left" 
                className="w-[85vw] max-w-[300px] p-0"
                style={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  height: "100%",
                  maxHeight: "100dvh" 
                }}
              >
                <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
                <div className="flex h-14 items-center border-b px-4 flex-shrink-0 shadow-sm">
                  <h2 className="text-base font-semibold tracking-tight">SAi UAN</h2>
                </div>
                
                {/* Contenedor con scroll para opciones del menú */}
                <div className="flex-1 overflow-y-auto" style={{ minHeight: 0 }}>
                  <nav className="grid gap-1 p-2">
                    {modules.map((module) => (
                      <SheetClose key={module.id} asChild>
                        <Button 
                          variant={activeModule === module.id ? "secondary" : "ghost"}
                          className="w-full justify-start h-9 text-xs sm:text-sm"
                          onClick={() => handleModuleChange(module.id)}
                        >
                          {module.name}
                        </Button>
                      </SheetClose>
                    ))}
                  </nav>
                </div>
                
                {/* Footer con botones e información de usuario - siempre visible */}
                <div className="border-t flex-shrink-0">
                  <div className="p-2 grid gap-1">
                    <Button variant="ghost" size="sm" className="justify-start h-9 text-xs">
                      <Settings className="mr-2 h-4 w-4" />
                      Configuración
                    </Button>
                    <Button variant="ghost" size="sm" className="justify-start h-9 text-xs">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      Ayuda
                    </Button>
                    <Button variant="ghost" size="sm" className="justify-start h-9 text-xs">
                      <LogOut className="mr-2 h-4 w-4" />
                      Cerrar sesión
                    </Button>
                  </div>
                  
                  <div className="p-3 border-t flex items-center gap-2">
                    <Avatar className="h-8 w-8 flex-shrink-0 ring-2 ring-background">
                      <AvatarImage src="/api/placeholder/32/32" alt="Avatar" />
                      <AvatarFallback className="bg-primary/10 text-primary">UA</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-0.5 text-xs overflow-hidden">
                      <div className="font-medium truncate">Usuario Admin</div>
                      <div className="text-muted-foreground truncate">admin@uan.edu.mx</div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          {/* Breadcrumbs usando el componente de shadcn/ui */}
          <div className="flex-1 overflow-hidden flex items-center ml-1">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin" onClick={(e) => {
                    e.preventDefault();
                    handleModuleChange('inicio');
                  }} className="flex items-center">
                    <Home className="h-3.5 w-3.5" />
                  </BreadcrumbLink>
                </BreadcrumbItem>
                
                {activeModule !== 'inicio' && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#" onClick={(e) => {
                        e.preventDefault();
                        handleModuleChange(activeModule);
                      }} className="text-xs sm:text-sm text-muted-foreground hover:text-foreground truncate max-w-[120px]">
                        {renderModuleText(activeModule)}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          
          {/* Acciones de usuario */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* En móviles pequeños, ocultamos este botón */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden sm:flex rounded-full h-8 w-8" 
              onClick={() => setShowSearchDialog(true)}
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Buscar</span>
            </Button>
            
            {/* En móviles pequeños, mantenemos estos dos botones esenciales */}
            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-0.5 right-0.5 h-2 w-2 rounded-full bg-primary"></span>
              <span className="sr-only">Notificaciones</span>
            </Button>
            
            {/* Avatar de usuario con menú */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full h-8 w-8"
                >
                  <Avatar className="h-7 w-7 ring-2 ring-background">
                    <AvatarImage src="/api/placeholder/32/32" alt="Avatar" />
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">UA</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">Usuario Admin</p>
                    <p className="text-xs text-muted-foreground">admin@uan.edu.mx</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-xs" onClick={() => setShowSearchDialog(true)}>
                  <Search className="mr-2 h-4 w-4" />
                  <span>Buscar</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-xs">
                  <User className="mr-2 h-4 w-4" />
                  <span>Mi perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-xs">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configuración</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-xs">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-2 sm:p-4 md:p-6">
          {renderContent()}
        </main>
      </div>
      
      {/* Diálogo de búsqueda de empleados */}
      <Dialog open={showSearchDialog} onOpenChange={setShowSearchDialog}>
        <DialogContent className="sm:max-w-md max-w-[95vw] p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-base">Buscar empleado</DialogTitle>
            <DialogDescription className="text-xs">
              Ingrese el nombre o número de empleado
            </DialogDescription>
          </DialogHeader>
          <div className="mt-3 mb-2">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Nombre, RFC o número"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="flex-1 h-9 text-xs"
                autoFocus
              />
              <Button size="sm" variant="secondary" className="h-9 text-xs">
                <Search className="h-3.5 w-3.5 mr-1" />
                Buscar
              </Button>
            </div>
          </div>
          
          {searchResults.length > 0 && (
            <div className="max-h-[200px] overflow-auto rounded-md border">
              {searchResults.map((result) => (
                <div 
                  key={result.id} 
                  className="flex items-center justify-between p-2 hover:bg-muted cursor-pointer border-b last:border-b-0"
                  onClick={() => {
                    setShowSearchDialog(false);
                    handleModuleChange('nomina');
                    if (result.id === 1) {
                      router.push('/admin/nomina/expediente-digital/juan-perez');
                    } else {
                      alert('Expediente no disponible. Solo el expediente de Juan Pérez está implementado.');
                    }                  
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-primary/10 text-primary text-[10px]">{result.nombre.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-xs font-medium">{result.nombre}</p>
                      <p className="text-[10px] text-muted-foreground">{result.puesto}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Badge variant={result.estatus === 'Activo' ? 'default' : 'secondary'} className="mr-2 text-[10px] py-0 px-1.5 h-4">
                      {result.estatus}
                    </Badge>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {searchQuery.length > 2 && searchResults.length === 0 && (
            <div className="rounded-md border p-3 mt-2">
              <p className="text-xs text-muted-foreground text-center">
                No se encontraron resultados
              </p>
            </div>
          )}
          
          <DialogFooter className="mt-3">
            <Button variant="outline" size="sm" className="text-xs h-8" onClick={() => setShowSearchDialog(false)}>
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MainLayout;