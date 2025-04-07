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
  const [showSearchDialog, setShowSearchDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const router = useRouter();
  
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

  // Módulos del sistema (para acceso en este componente)
  const modules = [
    { id: 'inicio', name: 'Inicio' },
    { id: 'nomina', name: 'Nómina y Recursos Humanos' },
    { id: 'impuestos', name: 'Impuestos' },
    { id: 'egresos', name: 'Egresos' },
    { id: 'catalogos', name: 'Catálogos' },
    { id: 'expediente', name: 'Expediente Digital' }
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
                <div className="flex h-14 items-center border-b px-4 flex-shrink-0">
                  <h2 className="text-lg font-semibold">SAI UAN</h2>
                </div>
                
                {/* Contenedor con scroll para opciones del menú */}
                <div className="flex-1 overflow-y-auto" style={{ minHeight: 0 }}>
                  <nav className="grid gap-1 p-2">
                    {modules.map((module) => (
                      <SheetClose key={module.id} asChild>
                        <Button 
                          variant={activeModule === module.id ? "default" : "ghost"}
                          className="w-full justify-start"
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
                  <div className="p-4 grid gap-1">
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
                  
                  <div className="p-4 border-t flex items-center gap-2">
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarImage src="/api/placeholder/32/32" alt="Avatar" />
                      <AvatarFallback>UA</AvatarFallback>
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
          <div className="flex-1 overflow-hidden flex items-center">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin" onClick={(e) => {
                    e.preventDefault();
                    handleModuleChange('inicio');
                  }}>
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
                      }}>
                        {modules.find(m => m.id === activeModule)?.name}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          
          {/* Acciones de usuario */}
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="hidden md:flex" 
              onClick={() => setShowSearchDialog(true)}
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Buscar</span>
            </Button>
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notificaciones</span>
            </Button>
            
            {/* Dashboard de aplicaciones */}
            <Button variant="outline" size="icon">
              <Grid className="h-4 w-4" />
              <span className="sr-only">Apps</span>
            </Button>
            
            {/* Avatar de usuario con menú */}
            <div className="relative">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/api/placeholder/32/32" alt="Avatar" />
                  <AvatarFallback>UA</AvatarFallback>
                </Avatar>
              </Button>
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-background border z-50">
                  <div className="p-2 border-b">
                    <div className="font-medium">Usuario Admin</div>
                    <div className="text-xs text-muted-foreground">admin@uan.edu.mx</div>
                  </div>
                  <div className="p-1">
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      <User className="mr-2 h-4 w-4" />
                      Mi perfil
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      <Settings className="mr-2 h-4 w-4" />
                      Configuración
                    </Button>
                    <Separator className="my-1" />
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      <LogOut className="mr-2 h-4 w-4" />
                      Cerrar sesión
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 md:p-6">
          {renderContent()}
        </main>
      </div>
      
      {/* Diálogo de búsqueda de empleados */}
      <Dialog open={showSearchDialog} onOpenChange={setShowSearchDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Buscar empleado</DialogTitle>
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
                    handleModuleChange('nomina');
                    window.location.href = '/admin/nomina/expediente-digital/juan-perez';
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
                  <div className="flex items-center">
                    <Badge variant={result.estatus === 'Activo' ? 'default' : 'secondary'} className="mr-2">
                      {result.estatus}
                    </Badge>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
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

export default MainLayout;