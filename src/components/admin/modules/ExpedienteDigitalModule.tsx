"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
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
  Users,
  User,
  Briefcase
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
    <div className="grid gap-6">
      {/* Encabezado y estadísticas */}
      <div className="flex flex-col md:flex-row justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Expediente Digital</h2>
          <p className="text-muted-foreground">
            Gestión de expedientes digitales de empleados de la institución
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button size="sm">
            <UserPlus className="h-4 w-4 mr-2" />
            Nuevo Expediente
          </Button>
        </div>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Empleados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEmpleados}</div>
            <p className="text-xs text-muted-foreground">
              {stats.expedientesCompletos} con expediente completo
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Docentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.docentes}</div>
            <p className="text-xs text-muted-foreground">
              {((stats.docentes / stats.totalEmpleados) * 100).toFixed(1)}% del total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Administrativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.administrativos}</div>
            <p className="text-xs text-muted-foreground">
              {((stats.administrativos / stats.totalEmpleados) * 100).toFixed(1)}% del total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Directivos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.directivos}</div>
            <p className="text-xs text-muted-foreground">
              {((stats.directivos / stats.totalEmpleados) * 100).toFixed(1)}% del total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Búsqueda y filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Búsqueda de Expedientes</CardTitle>
          <CardDescription>
            Busque por nombre, puesto o adscripción
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-[1fr_auto]">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar empleado..." 
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  <span>{selectedFilter === 'todos' ? 'Todos' : 
                         selectedFilter === 'docentes' ? 'Docentes' :
                         selectedFilter === 'administrativos' ? 'Administrativos' :
                         selectedFilter === 'directivos' ? 'Directivos' : 
                         'Expediente incompleto'}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
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
          
          {/* Tabla de empleados */}
          {filteredEmpleados.length > 0 ? (
            <div className="mt-6 overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Nombre</TableHead>
                    <TableHead className="hidden md:table-cell">Puesto</TableHead>
                    <TableHead className="hidden md:table-cell">Adscripción</TableHead>
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
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{empleado.nombre.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{empleado.nombre}</div>
                            <div className="md:hidden text-xs text-muted-foreground">{empleado.puesto}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{empleado.puesto}</TableCell>
                      <TableCell className="hidden md:table-cell">{empleado.adscripcion}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline">{empleado.tipo}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress 
                            value={empleado.expedienteCompleto} 
                            max={100} 
                            className="h-2 flex-1"
                          />
                          <span className="text-xs font-medium">
                            {empleado.expedienteCompleto}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          onClick={() => handleNavigateToExpediente(empleado.id)}
                        >
                          <span className="sr-only">Ver expediente</span>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <FileText className="h-12 w-12 text-muted-foreground opacity-20 mb-4" />
              <h3 className="text-lg font-medium">No se encontraron resultados</h3>
              <p className="text-sm text-muted-foreground text-center mt-2">
                No se encontraron expedientes que coincidan con tu búsqueda. 
                Intenta con otros términos o elimina los filtros.
              </p>
              {searchQuery && (
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setSearchQuery('')}
                >
                  Limpiar búsqueda
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Expedientes recientes o destacados */}
      <Card>
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
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{empleado.nombre.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{empleado.nombre}</CardTitle>
                      <CardDescription className="text-xs">{empleado.puesto}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="px-4 py-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">Adscripción:</span>
                    <span className="text-xs font-medium">{empleado.adscripcion}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">Tipo:</span>
                    <Badge variant="outline" className="text-xs">{empleado.tipo}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Completado:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium">{empleado.expedienteCompleto}%</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Progress 
                      value={empleado.expedienteCompleto} 
                      max={100} 
                      className="h-1"
                    />
                  </div>
                </CardContent>
                <Separator />
                <CardFooter className="p-3 justify-end">
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
      
      {/* Sección de expedientes pendientes por completar */}
      <Card>
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
                        className="h-2 flex-1"
                      />
                      <span className="text-sm font-medium">{empleado.expedienteCompleto}%</span>
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
          <Button variant="outline" size="sm">
            Ver todos los expedientes incompletos
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ExpedienteDigitalModule;