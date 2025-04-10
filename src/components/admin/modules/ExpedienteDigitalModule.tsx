"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  FileText, 
  Search, 
  UserPlus, 
  Filter, 
  Download, 
  ChevronRight,
  X
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ExpedienteDigitalModule = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('todos');
  const [filtersExpanded, setFiltersExpanded] = useState(false);

  // Datos de ejemplo para empleados
  const empleados = [
    { 
      id: 1, 
      nombre: 'Juan Pérez', 
      puesto: 'Profesor de Tiempo Completo', 
      adscripcion: 'Unidad Académica de Economía', 
      tipo: 'Docente',
      estatus: 'Activo',
      expedienteCompleto: 95
    },
    { 
      id: 2, 
      nombre: 'María López', 
      puesto: 'Administrativo', 
      adscripcion: 'Recursos Humanos', 
      tipo: 'Administrativo',
      estatus: 'Activo',
      expedienteCompleto: 80
    },
    { 
      id: 3, 
      nombre: 'Carlos Rodríguez', 
      puesto: 'Profesor de Asignatura', 
      adscripcion: 'Unidad Académica de Derecho', 
      tipo: 'Docente',
      estatus: 'Licencia',
      expedienteCompleto: 60
    },
    { 
      id: 4, 
      nombre: 'Ana González', 
      puesto: 'Directora', 
      adscripcion: 'Rectoría', 
      tipo: 'Directivo',
      estatus: 'Activo',
      expedienteCompleto: 100
    },
    { 
      id: 5, 
      nombre: 'Roberto Sánchez', 
      puesto: 'Técnico Administrativo', 
      adscripcion: 'Servicios Escolares', 
      tipo: 'Administrativo',
      estatus: 'Activo',
      expedienteCompleto: 75
    },
  ];

  // Filtrar empleados según búsqueda y filtro seleccionado
  const filteredEmpleados = empleados.filter(emp => {
    const matchesSearch = emp.nombre.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         emp.puesto.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         emp.adscripcion.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'todos' || 
                         (selectedFilter === 'docentes' && emp.tipo === 'Docente') ||
                         (selectedFilter === 'administrativos' && emp.tipo === 'Administrativo') ||
                         (selectedFilter === 'directivos' && emp.tipo === 'Directivo') ||
                         (selectedFilter === 'expediente-incompleto' && emp.expedienteCompleto < 100);
    
    return matchesSearch && matchesFilter;
  });

  // Estadísticas rápidas
  const stats = {
    totalEmpleados: empleados.length,
    docentes: empleados.filter(e => e.tipo === 'Docente').length,
    administrativos: empleados.filter(e => e.tipo === 'Administrativo').length,
    directivos: empleados.filter(e => e.tipo === 'Directivo').length,
    expedientesCompletos: empleados.filter(e => e.expedienteCompleto === 100).length
  };

  // Función para navegar al expediente del empleado seleccionado
  const handleNavigateToExpediente = (empleadoId: number) => {
    if (empleadoId === 1) {
      // Navegar al expediente de Juan Pérez
      router.push('/admin/nomina/expediente-digital/juan-perez');
    } else {
      // Para otros empleados, mostrar un mensaje o redirigir a una página genérica
      alert("Expediente no disponible. Solo el expediente de Juan Pérez está implementado.");
    }
  };

  return (
    <div className="grid gap-2 sm:gap-4 md:gap-6 mx-0 px-0 max-w-full">
      {/* Encabezado y estadísticas */}
      <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4 md:gap-6 sm:items-center">
        <div>
          <h2 className="text-lg sm:text-xl md:text-xl font-bold">Expediente Digital</h2>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
            Gestión de expedientes digitales de empleados
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs sm:text-sm md:text-base h-8 sm:h-9 md:h-10 px-2 sm:px-3 md:px-4"
          >
            <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 mr-1 sm:mr-2" />
            <span>Exportar</span>
          </Button>
          <Button 
            size="sm" 
            className="text-xs sm:text-sm md:text-base h-8 sm:h-9 md:h-10 px-2 sm:px-3 md:px-4"
          >
            <UserPlus className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 mr-1 sm:mr-2" />
            <span className="hidden xs:inline">Nuevo</span>
            <span className="hidden sm:inline"> Expediente</span>
          </Button>
        </div>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
        <Card className="p-2 sm:p-3 md:p-4">
          <div className="flex flex-col">
            <div className="text-xs sm:text-sm md:text-base font-medium">Total</div>
            <div className="text-base sm:text-xl md:text-2xl font-bold mt-1">{stats.totalEmpleados}</div>
            <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">
              <span className="hidden sm:inline">Incluye </span>{stats.expedientesCompletos} expedientes completos
            </div>
          </div>
        </Card>
        
        <Card className="p-2 sm:p-3 md:p-4">
          <div className="flex flex-col">
            <div className="text-xs sm:text-sm md:text-base font-medium">Docentes</div>
            <div className="text-base sm:text-xl md:text-2xl font-bold mt-1">{stats.docentes}</div>
            <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">
              {((stats.docentes / stats.totalEmpleados) * 100).toFixed(1)}% del total
            </div>
          </div>
        </Card>

        <Card className="p-2 sm:p-3 md:p-4">
          <div className="flex flex-col">
            <div className="text-xs sm:text-sm md:text-base font-medium">Administrativos</div>
            <div className="text-base sm:text-xl md:text-2xl font-bold mt-1">{stats.administrativos}</div>
            <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">
              {((stats.administrativos / stats.totalEmpleados) * 100).toFixed(1)}% del total
            </div>
          </div>
        </Card>

        <Card className="p-2 sm:p-3 md:p-4">
          <div className="flex flex-col">
            <div className="text-xs sm:text-sm md:text-base font-medium">Directivos</div>
            <div className="text-base sm:text-xl md:text-2xl font-bold mt-1">{stats.directivos}</div>
            <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">
              {((stats.directivos / stats.totalEmpleados) * 100).toFixed(1)}% del total
            </div>
          </div>
        </Card>
      </div>

      {/* Búsqueda y filtros */}
      <Card className="overflow-visible">
        <CardHeader className="p-3 sm:p-4 md:p-6 pb-0 sm:pb-2 md:pb-3">
          <CardTitle className="text-sm sm:text-base md:text-lg">Búsqueda de Expedientes</CardTitle>
          <CardDescription className="text-[10px] sm:text-xs md:text-sm">
            Busque por nombre, puesto o adscripción
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 md:p-6">
          {/* Búsqueda para móvil y escritorio */}
          <div className="md:grid md:grid-cols-[1fr_auto] md:gap-4">
            <div className="relative">
              <Search className="absolute left-2 sm:left-3 top-2 sm:top-2.5 h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar empleado..." 
                className="pl-7 sm:pl-10 h-7 sm:h-9 md:h-10 text-xs sm:text-sm md:text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Filtro móvil */}
            <div className="mt-2 md:mt-0 md:hidden">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full text-xs h-7 sm:h-8 flex items-center justify-between"
                onClick={() => setFiltersExpanded(!filtersExpanded)}
              >
                <div className="flex items-center">
                  <Filter className="h-3.5 w-3.5 mr-1.5" />
                  <span className="truncate">
                    {selectedFilter === 'todos' ? 'Todos' : 
                     selectedFilter === 'docentes' ? 'Docentes' :
                     selectedFilter === 'administrativos' ? 'Administrativos' :
                     selectedFilter === 'directivos' ? 'Directivos' : 
                     'Expediente incompleto'}
                  </span>
                </div>
                {selectedFilter !== 'todos' && (
                  <Button 
                    variant="ghost"
                    size="sm"
                    className="h-5 w-5 p-0 ml-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFilter('todos');
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </Button>
              
              {filtersExpanded && (
                <div className="mt-2 bg-card border rounded-md p-1.5 grid grid-cols-2 gap-1.5">
                  <Button 
                    variant={selectedFilter === 'docentes' ? "default" : "outline"} 
                    size="sm" 
                    className="text-[10px] h-7"
                    onClick={() => {
                      setSelectedFilter('docentes');
                      setFiltersExpanded(false);
                    }}
                  >
                    Docentes
                  </Button>
                  <Button 
                    variant={selectedFilter === 'administrativos' ? "default" : "outline"} 
                    size="sm" 
                    className="text-[10px] h-7"
                    onClick={() => {
                      setSelectedFilter('administrativos');
                      setFiltersExpanded(false);
                    }}
                  >
                    Administrativos
                  </Button>
                  <Button 
                    variant={selectedFilter === 'directivos' ? "default" : "outline"} 
                    size="sm" 
                    className="text-[10px] h-7"
                    onClick={() => {
                      setSelectedFilter('directivos');
                      setFiltersExpanded(false);
                    }}
                  >
                    Directivos
                  </Button>
                  <Button 
                    variant={selectedFilter === 'expediente-incompleto' ? "default" : "outline"} 
                    size="sm" 
                    className="text-[10px] h-7"
                    onClick={() => {
                      setSelectedFilter('expediente-incompleto');
                      setFiltersExpanded(false);
                    }}
                  >
                    Incompletos
                  </Button>
                </div>
              )}
            </div>
            
            {/* Filtro desktop */}
            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center w-auto md:w-[200px] justify-between">
                    <div className="flex items-center">
                      <Filter className="h-4 w-4 mr-2" />
                      <span>{selectedFilter === 'todos' ? 'Todos los empleados' : 
                             selectedFilter === 'docentes' ? 'Docentes' :
                             selectedFilter === 'administrativos' ? 'Administrativos' :
                             selectedFilter === 'directivos' ? 'Directivos' : 
                             'Expediente incompleto'}</span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuItem onClick={() => setSelectedFilter('todos')}>
                    Todos los empleados
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedFilter('docentes')}>
                    Docentes
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedFilter('administrativos')}>
                    Administrativos
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedFilter('directivos')}>
                    Directivos
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedFilter('expediente-incompleto')}>
                    Expediente incompleto
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {/* Móvil: Lista de resultados */}
          {filteredEmpleados.length > 0 ? (
            <div className="mt-3 md:hidden">
              <div className="text-[10px] sm:text-xs text-muted-foreground mb-2">
                <span>{filteredEmpleados.length} resultados encontrados</span>
              </div>
              
              <div className="space-y-2">
                {filteredEmpleados.map((empleado) => (
                  <div 
                    key={empleado.id} 
                    className="border rounded-md p-2 sm:p-3 flex items-center justify-between cursor-pointer hover:bg-muted/30 transition-colors"
                    onClick={() => handleNavigateToExpediente(empleado.id)}
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                        <AvatarFallback className="text-[10px] sm:text-xs">{empleado.nombre.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-xs sm:text-sm font-medium">{empleado.nombre}</div>
                        <div className="text-[10px] sm:text-xs text-muted-foreground">
                          {empleado.puesto.length > 20 
                            ? empleado.puesto.substring(0, 20) + '...' 
                            : empleado.puesto}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <Badge variant="outline" className="text-[9px] sm:text-xs h-4 sm:h-5 px-1 sm:px-2 mb-1">
                        {empleado.tipo}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] sm:text-xs">{empleado.expedienteCompleto}%</span>
                        <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : searchQuery || selectedFilter !== 'todos' ? (
            <div className="flex flex-col items-center justify-center py-4 sm:py-6">
              <FileText className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground opacity-20 mb-2" />
              <h3 className="text-sm sm:text-base font-medium">No se encontraron resultados</h3>
              <p className="text-xs sm:text-sm text-muted-foreground text-center mt-1">
                Intenta con otros términos o filtros
              </p>
              <div className="flex gap-2 mt-3">
                {searchQuery && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs sm:text-sm h-7 sm:h-8"
                    onClick={() => setSearchQuery('')}
                  >
                    Limpiar búsqueda
                  </Button>
                )}
                {selectedFilter !== 'todos' && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs sm:text-sm h-7 sm:h-8"
                    onClick={() => setSelectedFilter('todos')}
                  >
                    Limpiar filtros
                  </Button>
                )}
              </div>
            </div>
          ) : null}
          
          {/* Tabla de empleados para escritorio */}
          {filteredEmpleados.length > 0 ? (
            <div className="mt-6 overflow-auto hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Nombre</TableHead>
                    <TableHead>Puesto</TableHead>
                    <TableHead className="hidden lg:table-cell">Adscripción</TableHead>
                    <TableHead className="text-center">Tipo</TableHead>
                    <TableHead className="text-center">Completado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmpleados.map((empleado) => (
                    <TableRow key={empleado.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8 md:h-10 md:w-10">
                            <AvatarFallback>{empleado.nombre.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{empleado.nombre}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{empleado.puesto}</TableCell>
                      <TableCell className="hidden lg:table-cell">{empleado.adscripcion}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline">{empleado.tipo}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress 
                            value={empleado.expedienteCompleto} 
                            max={100} 
                            className="h-2 md:h-3 flex-1"
                          />
                          <span className="text-xs md:text-sm font-medium">
                            {empleado.expedienteCompleto}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 md:h-9 md:w-9 p-0"
                          onClick={() => handleNavigateToExpediente(empleado.id)}
                        >
                          <span className="sr-only">Ver expediente</span>
                          <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="hidden md:flex flex-col items-center justify-center py-12 px-4">
              <FileText className="h-12 w-12 text-muted-foreground opacity-20 mb-4" />
              <h3 className="text-lg font-medium">No se encontraron resultados</h3>
              <p className="text-sm text-muted-foreground text-center mt-2">
                No se encontraron expedientes que coincidan con tu búsqueda. 
                Intenta con otros términos o elimina los filtros.
              </p>
              <div className="flex gap-3 mt-4">
                {searchQuery && (
                  <Button 
                    variant="outline" 
                    onClick={() => setSearchQuery('')}
                  >
                    Limpiar búsqueda
                  </Button>
                )}
                {selectedFilter !== 'todos' && (
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedFilter('todos')}
                  >
                    Limpiar filtros
                  </Button>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Expedientes recientes o destacados - versión móvil */}
      <Card className="md:hidden">
        <CardHeader className="p-3 sm:p-4 pb-0 sm:pb-1">
          <CardTitle className="text-sm sm:text-base">Expedientes recientes</CardTitle>
          <CardDescription className="text-[10px] sm:text-xs">
            Últimos expedientes consultados
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 overflow-auto">
          <div className="space-y-2 sm:space-y-3">
            {empleados.slice(0, 2).map((empleado) => (
              <div 
                key={empleado.id} 
                className="border rounded-md p-2 sm:p-3 flex items-center justify-between cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => handleNavigateToExpediente(empleado.id)}
              >
                <div className="flex items-center gap-2">
                  <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                    <AvatarFallback className="text-[10px] sm:text-xs">{empleado.nombre.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-xs sm:text-sm font-medium">{empleado.nombre}</div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground">{empleado.tipo}</div>
                  </div>
                </div>
                <Badge className={`text-[9px] sm:text-xs h-4 sm:h-5 px-1 sm:px-2 ${empleado.estatus === 'Activo' ? 'bg-green-500' : 'bg-amber-500'}`}>
                  {empleado.estatus}
                </Badge>
              </div>
            ))}
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mt-2 sm:mt-3 text-[10px] sm:text-xs h-7 sm:h-8"
          >
            Ver todos
          </Button>
        </CardContent>
      </Card>

      {/* Expedientes recientes o destacados para escritorio */}
      <Card className="hidden md:block">
        <CardHeader>
          <CardTitle>Expedientes recientes</CardTitle>
          <CardDescription>Últimos expedientes consultados o modificados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {empleados.slice(0, 3).map((empleado) => (
              <Card key={empleado.id} className="overflow-hidden">
                <CardHeader className="p-4 pb-2 bg-muted/20">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 md:h-12 md:w-12">
                      <AvatarFallback>{empleado.nombre.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base md:text-lg">{empleado.nombre}</CardTitle>
                      <CardDescription className="text-xs md:text-sm">{empleado.puesto}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="px-4 py-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs md:text-sm text-muted-foreground">Adscripción:</span>
                    <span className="text-xs md:text-sm font-medium">{empleado.adscripcion}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs md:text-sm text-muted-foreground">Tipo:</span>
                    <Badge variant="outline" className="text-xs md:text-sm">{empleado.tipo}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs md:text-sm text-muted-foreground">Completado:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs md:text-sm font-medium">{empleado.expedienteCompleto}%</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Progress 
                      value={empleado.expedienteCompleto} 
                      max={100} 
                      className="h-1 md:h-2"
                    />
                  </div>
                </CardContent>
                <Separator />
                <CardFooter className="p-3 md:p-4 justify-end">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleNavigateToExpediente(empleado.id)}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Ver expediente
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Sección de expedientes pendientes por completar - Versión móvil */}
      <Card className="md:hidden">
        <CardHeader className="p-3 sm:p-4 pb-0 sm:pb-1">
          <CardTitle className="text-sm sm:text-base">Pendientes por completar</CardTitle>
          <CardDescription className="text-[10px] sm:text-xs">
            Expedientes con información pendiente
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 pt-2">
          <div className="space-y-2 sm:space-y-3">
            {empleados
              .filter(emp => emp.expedienteCompleto < 100)
              .slice(0, 2)
              .map((empleado) => (
                <div 
                  key={empleado.id} 
                  className="border rounded-md p-2 sm:p-3 cursor-pointer hover:bg-muted/30 transition-colors"
                  onClick={() => handleNavigateToExpediente(empleado.id)}
                >
                  <div className="flex items-center justify-between mb-1 sm:mb-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6 sm:h-7 sm:w-7">
                        <AvatarFallback className="text-[9px] sm:text-xs">{empleado.nombre.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="text-xs sm:text-sm font-medium">{empleado.nombre}</div>
                    </div>
                    <Badge className="text-[9px] sm:text-xs h-4 sm:h-5 px-1 sm:px-2">{empleado.expedienteCompleto}%</Badge>
                  </div>
                  <div className="w-full mt-1 mb-1 sm:mt-2 sm:mb-2">
                    <Progress 
                      value={empleado.expedienteCompleto} 
                      max={100} 
                      className="h-1.5 sm:h-2"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-1">
                      {empleado.expedienteCompleto < 70 && (
                        <Badge variant="outline" className="text-[8px] sm:text-[10px] h-4 sm:h-5 px-1 bg-red-50">Datos</Badge>
                      )}
                      {empleado.expedienteCompleto < 85 && (
                        <Badge variant="outline" className="text-[8px] sm:text-[10px] h-4 sm:h-5 px-1 bg-amber-50">Formación</Badge>
                      )}
                    </div>
                    <span className="text-[10px] sm:text-xs text-muted-foreground">Toca para completar</span>
                  </div>
                </div>
              ))}
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mt-2 sm:mt-3 text-[10px] sm:text-xs h-7 sm:h-8"
          >
            Ver todos los pendientes
          </Button>
        </CardContent>
      </Card>
      
      {/* Sección de expedientes pendientes por completar - Versión escritorio */}
      <Card className="hidden md:block">
        <CardHeader>
          <CardTitle>Expedientes por completar</CardTitle>
          <CardDescription>
            Expedientes que requieren información adicional
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {empleados
              .filter(emp => emp.expedienteCompleto < 100)
              .slice(0, 4)
              .map((empleado) => (
                <div key={empleado.id} className="flex items-start space-x-4">
                  <Avatar className="mt-1">
                    <AvatarFallback>{empleado.nombre.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{empleado.nombre}</p>
                        <p className="text-sm text-muted-foreground">{empleado.puesto}</p>
                      </div>
                      <Badge variant="outline">{empleado.tipo}</Badge>
                    </div>
                    <div className="w-full mt-2 flex items-center gap-2">
                      <Progress 
                        value={empleado.expedienteCompleto} 
                        max={100} 
                        className="h-2 md:h-3 flex-1"
                      />
                      <span className="text-sm md:text-base font-medium">{empleado.expedienteCompleto}%</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex flex-wrap gap-1">
                        {empleado.expedienteCompleto < 70 && (
                          <Badge variant="outline" className="text-xs bg-red-50">Datos personales</Badge>
                        )}
                        {empleado.expedienteCompleto < 85 && (
                          <Badge variant="outline" className="text-xs bg-amber-50">Formación académica</Badge>
                        )}
                        {empleado.expedienteCompleto < 95 && (
                          <Badge variant="outline" className="text-xs bg-blue-50">Datos familiares</Badge>
                        )}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-8 md:h-9"
                        onClick={() => handleNavigateToExpediente(empleado.id)}
                      >
                        Completar
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end border-t pt-4">
          <Button variant="outline" size="sm" className="h-9">
            Ver todos los expedientes incompletos
          </Button>
        </CardFooter>
      </Card>
      
      {/* Fab Button para dispositivos móviles */}
      <div className="fixed bottom-4 right-4 z-10 md:hidden">
        <Button className="h-10 w-10 sm:h-12 sm:w-12 rounded-full shadow-lg" onClick={() => router.push('/admin/nomina/nuevo-empleado')}>
          <UserPlus className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </div>
    </div>
  );
};

export default ExpedienteDigitalModule;