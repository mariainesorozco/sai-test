"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  FileText, 
  Calendar, 
  BarChart, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  Plus,
  UserPlus,
  Briefcase,
  ListFilter,
  Search
} from 'lucide-react';

// Importar submódulos
import ExpedienteDigitalModule from './ExpedienteDigitalModule';

const NominaModule = () => {
  const [activeTab, setActiveTab] = useState("general");

  // Datos simulados para estadísticas
  const estadisticas = {
    totalTrabajadores: 4287,
    nuevosUltimoMes: 12,
    docentes: 2346,
    porcentajeDocentes: 54.7,
    administrativos: 1892,
    porcentajeAdministrativos: 44.1,
    directivos: 49,
    porcentajeDirectivos: 1.2
  };

  // Expedientes recientes
  const expedientesRecientes = [
    { id: 1, nombre: 'Juan Pérez', puesto: 'Profesor de Tiempo Completo', adscripcion: 'Unidad Académica de Economía', estatus: 'Activo' },
    { id: 2, nombre: 'María López', puesto: 'Administrativo', adscripcion: 'Recursos Humanos', estatus: 'Activo' },
    { id: 3, nombre: 'Carlos Rodríguez', puesto: 'Profesor de Asignatura', adscripcion: 'Unidad Académica de Derecho', estatus: 'Licencia' },
    { id: 4, nombre: 'Ana González', puesto: 'Directivo', adscripcion: 'Rectoría', estatus: 'Activo' },
  ];

  // Expedientes por completar
  const expedientesPendientes = [
    { id: 1, nombre: 'Roberto Sánchez', faltantes: ['Datos fiscales', 'Formación académica'], porcentaje: 75 },
    { id: 2, nombre: 'Laura Torres', faltantes: ['Datos familiares'], porcentaje: 90 },
    { id: 3, nombre: 'Miguel Ángel Díaz', faltantes: ['Datos laborales', 'Seguridad social', 'Formación académica'], porcentaje: 60 },
    { id: 4, nombre: 'Patricia Vázquez', faltantes: ['Formación académica'], porcentaje: 85 },
  ];

  // Tareas recientes
  const tareasRecientes = [
    { id: 1, titulo: 'Actualización de adscripciones', fecha: '10/04/2025', estado: 'Pendiente' },
    { id: 2, titulo: 'Nómina quincenal', fecha: '15/04/2025', estado: 'En proceso' },
    { id: 3, titulo: 'Declaración impuestos mensuales', fecha: '20/04/2025', estado: 'Pendiente' },
    { id: 4, titulo: 'Cierre contable trimestral', fecha: '05/04/2025', estado: 'Completado' },
  ];

  return (
    <div className="grid gap-6">
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="general">Panel General</TabsTrigger>
          <TabsTrigger value="expediente">Expediente Digital</TabsTrigger>
          <TabsTrigger value="nomina">Nómina</TabsTrigger>
          <TabsTrigger value="informes">Informes</TabsTrigger>
        </TabsList>
        
        {/* Panel General */}
        <TabsContent value="general">
          {/* Tarjetas de estadísticas */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Trabajadores</CardTitle>
                <CardDescription>Plantilla total de la institución</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{estadisticas.totalTrabajadores.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  +{estadisticas.nuevosUltimoMes} en el último mes
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Docentes</CardTitle>
                <CardDescription>Personal académico</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{estadisticas.docentes.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  {estadisticas.porcentajeDocentes}% del total
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Administrativos</CardTitle>
                <CardDescription>Personal administrativo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{estadisticas.administrativos.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  {estadisticas.porcentajeAdministrativos}% del total
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Directivos</CardTitle>
                <CardDescription>Personal directivo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{estadisticas.directivos}</div>
                <p className="text-xs text-muted-foreground">
                  {estadisticas.porcentajeDirectivos}% del total
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Expedientes y estado de completitud */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mt-6">
            {/* Tabla de expedientes recientes */}
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Expedientes recientes</CardTitle>
                <CardDescription>Trabajadores consultados recientemente</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead className="hidden sm:table-cell">Puesto</TableHead>
                      <TableHead className="hidden md:table-cell">Adscripción</TableHead>
                      <TableHead>Estatus</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {expedientesRecientes.map((empleado) => (
                      <TableRow key={empleado.id}>
                        <TableCell className="font-medium">{empleado.nombre}</TableCell>
                        <TableCell className="hidden sm:table-cell">{empleado.puesto}</TableCell>
                        <TableCell className="hidden md:table-cell">{empleado.adscripcion}</TableCell>
                        <TableCell>
                          <Badge variant={empleado.estatus === 'Activo' ? 'default' : 'secondary'}>
                            {empleado.estatus}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" asChild>
                            <a href={`/admin/nomina/expediente-digital/${empleado.id}`}>Ver expediente</a>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="border-t px-6 py-3">
                <Button variant="outline" size="sm" className="ml-auto" onClick={() => setActiveTab("expediente")}>
                  Ver todos
                </Button>
              </CardFooter>
            </Card>
            
            {/* Expedientes por completar */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Expedientes por completar</CardTitle>
                <CardDescription>Empleados con datos pendientes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {expedientesPendientes.map((empleado) => (
                    <div key={empleado.id} className="flex items-start space-x-4">
                      <Avatar className="mt-1">
                        <AvatarFallback>{empleado.nombre.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm">{empleado.nombre}</p>
                          <p className="text-sm text-muted-foreground">{empleado.porcentaje}%</p>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: `${empleado.porcentaje}%` }}
                          ></div>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {empleado.faltantes.map((faltante, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {faltante}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-3">
                <Button variant="outline" size="sm" className="ml-auto" onClick={() => setActiveTab("expediente")}>
                  Ver todos
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Acceso rápido y tareas */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
            {/* Accesos rápidos */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Acceso rápido</CardTitle>
                <CardDescription>Funciones más utilizadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-auto py-4 flex flex-col" onClick={() => setActiveTab("expediente")}>
                    <FileText className="h-5 w-5 mb-2" />
                    <span className="text-xs">Expedientes</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex flex-col" asChild>
                    <a href="/admin/nomina/nuevo-empleado">
                      <UserPlus className="h-5 w-5 mb-2" />
                      <span className="text-xs">Nuevo empleado</span>
                    </a>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex flex-col">
                    <Calendar className="h-5 w-5 mb-2" />
                    <span className="text-xs">Calendario de nómina</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex flex-col">
                    <BarChart className="h-5 w-5 mb-2" />
                    <span className="text-xs">Estadísticas</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Tareas recientes */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Tareas recientes</CardTitle>
                <CardDescription>Actividades y procesos en curso</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tareasRecientes.map((tarea) => (
                    <div key={tarea.id} className="flex items-center justify-between border-b pb-3">
                      <div className="flex items-start space-x-3">
                        {tarea.estado === 'Completado' ? (
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        ) : tarea.estado === 'En proceso' ? (
                          <Clock className="h-5 w-5 text-amber-500 mt-0.5" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-gray-400 mt-0.5" />
                        )}
                        <div>
                          <p className="text-sm font-medium">{tarea.titulo}</p>
                          <p className="text-xs text-muted-foreground">Fecha límite: {tarea.fecha}</p>
                        </div>
                      </div>
                      <Badge variant={
                        tarea.estado === 'Completado' ? 'default' : 
                        tarea.estado === 'En proceso' ? 'secondary' : 'outline'
                      }>
                        {tarea.estado}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-3">
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Nueva tarea
                </Button>
                <Button variant="outline" size="sm" className="ml-auto">
                  Ver todas
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        {/* Expediente Digital */}
        <TabsContent value="expediente">
          <ExpedienteDigitalModule />
        </TabsContent>
        
        {/* Nómina */}
        <TabsContent value="nomina">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Nómina</CardTitle>
                <CardDescription>
                  Administración de la nómina institucional
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center py-8">
                <Briefcase className="size-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-medium">Módulo en desarrollo</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto mt-2">
                  El módulo de gestión de nómina está actualmente en desarrollo. 
                  Pronto podrá acceder a todas las funcionalidades de administración 
                  de la nómina institucional.
                </p>
              </CardContent>
              <CardFooter className="justify-center gap-2">
                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Calendario de nómina
                </Button>
                <Button variant="outline">
                  <ListFilter className="h-4 w-4 mr-2" />
                  Configuración de nómina
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        {/* Informes */}
        <TabsContent value="informes">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Informes y Reportes</CardTitle>
                <CardDescription>
                  Generación de informes y reportes de personal y nómina
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Plantilla de Personal</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      Informe completo de la plantilla de personal incluyendo todas las categorías 
                      y tipos de contratación.
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" size="sm" className="w-full">
                        <FileText className="h-4 w-4 mr-2" />
                        Generar reporte
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Informe de Nómina</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      Informe detallado de la nómina con desglose por tipo de empleado, percepciones 
                      y deducciones.
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" size="sm" className="w-full">
                        <FileText className="h-4 w-4 mr-2" />
                        Generar reporte
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Análisis de Expedientes</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      Informe de estado de los expedientes digitales, incluyendo completitud 
                      y documentos pendientes.
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" size="sm" className="w-full">
                        <FileText className="h-4 w-4 mr-2" />
                        Generar reporte
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </CardContent>
              <CardFooter className="border-t justify-end">
                <Button variant="outline" size="sm" className="mt-4">
                  <Search className="h-4 w-4 mr-2" />
                  Ver todos los reportes
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NominaModule;