"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';
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
  Search,
  ChevronRight
} from 'lucide-react';

// Importar submódulos
import ExpedienteDigitalModule from './ExpedienteDigitalModule';

const NominaModule = () => {
  const router = useRouter();
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Nómina y Recursos Humanos</h1>
          <p className="text-sm text-muted-foreground">Panel de control de personal, expedientes y nómina</p>
        </div>
      </div>
      <div className="overflow-auto -mx-2 px-2 no-scrollbar">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-2 sm:mb-3 md:mb-4 w-auto">
            <TabsTrigger value="general" className="text-xs sm:text-sm md:text-base">Panel</TabsTrigger>
            <TabsTrigger value="expediente" className="text-xs sm:text-sm md:text-base">Expediente</TabsTrigger>
            <TabsTrigger value="nomina" className="text-xs sm:text-sm md:text-base">Nómina</TabsTrigger>
            <TabsTrigger value="informes" className="text-xs sm:text-sm md:text-base">Informes</TabsTrigger>
          </TabsList>
          
          {/* Panel General */}
          <TabsContent value="general" className="space-y-2 sm:space-y-4 md:space-y-6">
            {/* Tarjetas de estadísticas */}
            <div className="grid gap-2 sm:gap-3 md:gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-4">
              <Card className="p-2 sm:p-3 md:p-4 md:py-6">
                <div className="flex flex-col">
                  <div className="text-xs sm:text-sm md:text-base font-medium text-foreground">Total</div>
                  <div className="text-xs sm:text-sm md:text-base text-muted-foreground">Plantilla</div>
                  <div className="text-lg sm:text-xl md:text-2xl font-bold mt-1 sm:mt-2">{estadisticas.totalTrabajadores.toLocaleString()}</div>
                  <div className="text-[9px] sm:text-xs md:text-sm text-muted-foreground">
                    +{estadisticas.nuevosUltimoMes} en el último mes
                  </div>
                </div>
              </Card>
              <Card className="p-2 sm:p-3 md:p-4 md:py-6">
                <div className="flex flex-col">
                  <div className="text-xs sm:text-sm md:text-base font-medium text-foreground">Docentes</div>
                  <div className="text-xs sm:text-sm md:text-base text-muted-foreground">Personal</div>
                  <div className="text-lg sm:text-xl md:text-2xl font-bold mt-1 sm:mt-2">{estadisticas.docentes.toLocaleString()}</div>
                  <div className="text-[9px] sm:text-xs md:text-sm text-muted-foreground">
                    {estadisticas.porcentajeDocentes}% del total
                  </div>
                </div>
              </Card>
              <Card className="p-2 sm:p-3 md:p-4 md:py-6">
                <div className="flex flex-col">
                  <div className="text-xs sm:text-sm md:text-base font-medium text-foreground">Administrativos</div>
                  <div className="text-xs sm:text-sm md:text-base text-muted-foreground">Personal</div>
                  <div className="text-lg sm:text-xl md:text-2xl font-bold mt-1 sm:mt-2">{estadisticas.administrativos.toLocaleString()}</div>
                  <div className="text-[9px] sm:text-xs md:text-sm text-muted-foreground">
                    {estadisticas.porcentajeAdministrativos}% del total
                  </div>
                </div>
              </Card>
              <Card className="p-2 sm:p-3 md:p-4 md:py-6">
                <div className="flex flex-col">
                  <div className="text-xs sm:text-sm md:text-base font-medium text-foreground">Directivos</div>
                  <div className="text-xs sm:text-sm md:text-base text-muted-foreground">Personal</div>
                  <div className="text-lg sm:text-xl md:text-2xl font-bold mt-1 sm:mt-2">{estadisticas.directivos}</div>
                  <div className="text-[9px] sm:text-xs md:text-sm text-muted-foreground">
                    {estadisticas.porcentajeDirectivos}% del total
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Expedientes recientes */}
            <Card>
              <CardHeader className="p-3 sm:p-4 md:p-6 pb-0 sm:pb-2 md:pb-3">
                <CardTitle className="text-sm sm:text-base md:text-lg">Expedientes recientes</CardTitle>
                <CardDescription className="text-[10px] sm:text-xs md:text-sm">Últimas consultas</CardDescription>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 md:p-6 pt-2 sm:pt-3 md:pt-4">
                <div className="space-y-2 sm:space-y-3 md:space-y-4">
                  {expedientesRecientes.slice(0, 2).map((empleado) => (
                    <div 
                      key={empleado.id} 
                      className="border rounded-md p-2 sm:p-3 md:p-4 flex items-center justify-between cursor-pointer hover:bg-muted/30 transition-colors"
                      onClick={() => handleNavigateToExpediente(empleado.id)}
                    >
                      <div className="flex items-center gap-2 sm:gap-3">
                        <Avatar className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10">
                          <AvatarFallback className="text-[10px] sm:text-xs md:text-sm">{empleado.nombre.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-xs sm:text-sm md:text-base font-medium">{empleado.nombre}</div>
                          <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground truncate max-w-[120px] sm:max-w-[200px] md:max-w-none">
                            {empleado.puesto}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Badge 
                          variant={empleado.estatus === 'Activo' ? 'default' : 'secondary'} 
                          className="mr-1 sm:mr-2 text-[9px] sm:text-xs md:text-sm px-1 sm:px-2 py-0 h-4 sm:h-5 md:h-6"
                        >
                          {empleado.estatus}
                        </Badge>
                        <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-muted-foreground" />
                      </div>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-2 sm:mt-3 md:mt-4 text-[10px] sm:text-xs md:text-sm h-7 sm:h-8 md:h-9"
                  onClick={() => setActiveTab("expediente")}
                >
                  Ver todos
                </Button>
              </CardContent>
            </Card>
            
            {/* Expedientes por completar */}
            <Card>
              <CardHeader className="p-3 sm:p-4 md:p-6 pb-0 sm:pb-2 md:pb-3">
                <CardTitle className="text-sm sm:text-base md:text-lg">Expedientes por completar</CardTitle>
                <CardDescription className="text-[10px] sm:text-xs md:text-sm">Datos pendientes</CardDescription>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 md:p-6 pt-2 sm:pt-3 md:pt-4">
                <div className="space-y-2 sm:space-y-3 md:space-y-4">
                  {expedientesPendientes.slice(0, 2).map((empleado) => (
                    <div key={empleado.id} className="border rounded-md p-2 sm:p-3 md:p-4">
                      <div className="flex items-center justify-between mb-1 sm:mb-2">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <Avatar className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10">
                            <AvatarFallback className="text-[9px] sm:text-xs md:text-sm">{empleado.nombre.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="text-xs sm:text-sm md:text-base font-medium truncate max-w-[120px] sm:max-w-[200px] md:max-w-none">
                            {empleado.nombre}
                          </div>
                        </div>
                        <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">
                          {empleado.porcentaje}%
                        </div>
                      </div>
                      <div className="w-full h-1.5 sm:h-2 md:h-3 bg-muted rounded-full overflow-hidden mb-1 sm:mb-2">
                        <div 
                          className="h-full bg-primary" 
                          style={{ width: `${empleado.porcentaje}%` }}
                        ></div>
                      </div>
                      <div className="flex flex-wrap gap-1 sm:gap-2 mt-1 sm:mt-2">
                        {empleado.faltantes.slice(0, 1).map((faltante, idx) => (
                          <Badge key={idx} variant="outline" className="text-[8px] sm:text-xs md:text-sm px-1 sm:px-2 py-0 h-4 sm:h-5 md:h-6">
                            {faltante.length > 12 ? faltante.substring(0, 12) + '...' : faltante}
                          </Badge>
                        ))}
                        {empleado.faltantes.length > 1 && (
                          <Badge variant="outline" className="text-[8px] sm:text-xs md:text-sm px-1 sm:px-2 py-0 h-4 sm:h-5 md:h-6">
                            +{empleado.faltantes.length - 1}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-2 sm:mt-3 md:mt-4 text-[10px] sm:text-xs md:text-sm h-7 sm:h-8 md:h-9"
                  onClick={() => setActiveTab("expediente")}
                >
                  Ver todos
                </Button>
              </CardContent>
            </Card>
            
            {/* Grid de acceso rápido */}
            <div className="grid gap-2 sm:gap-3 md:gap-4 grid-cols-2 sm:grid-cols-4">
              <Card className="p-2 sm:p-3 md:p-4">
                <Button 
                  variant="ghost" 
                  className="h-auto w-full py-2 sm:py-3 md:py-4 flex flex-col items-center justify-center" 
                  onClick={() => setActiveTab("expediente")}
                >
                  <FileText className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 mb-1 sm:mb-2" />
                  <span className="text-[10px] sm:text-xs md:text-sm">Expedientes</span>
                </Button>
              </Card>
              <Card className="p-2 sm:p-3 md:p-4">
                <Button 
                  variant="ghost" 
                  className="h-auto w-full py-2 sm:py-3 md:py-4 flex flex-col items-center justify-center" 
                  asChild
                >
                  <a href="/admin/nomina/nuevo-empleado">
                    <UserPlus className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 mb-1 sm:mb-2" />
                    <span className="text-[10px] sm:text-xs md:text-sm">Nuevo empleado</span>
                  </a>
                </Button>
              </Card>
              <Card className="p-2 sm:p-3 md:p-4">
                <Button 
                  variant="ghost" 
                  className="h-auto w-full py-2 sm:py-3 md:py-4 flex flex-col items-center justify-center"
                >
                  <Calendar className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 mb-1 sm:mb-2" />
                  <span className="text-[10px] sm:text-xs md:text-sm">Calendario</span>
                </Button>
              </Card>
              <Card className="p-2 sm:p-3 md:p-4">
                <Button 
                  variant="ghost" 
                  className="h-auto w-full py-2 sm:py-3 md:py-4 flex flex-col items-center justify-center"
                >
                  <BarChart className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 mb-1 sm:mb-2" />
                  <span className="text-[10px] sm:text-xs md:text-sm">Estadísticas</span>
                </Button>
              </Card>
            </div>
          
            {/* Tareas recientes */}
            <Card>
              <CardHeader className="p-3 sm:p-4 md:p-6 pb-0 sm:pb-2 md:pb-3">
                <CardTitle className="text-sm sm:text-base md:text-lg">Tareas recientes</CardTitle>
                <CardDescription className="text-[10px] sm:text-xs md:text-sm">Actividades en curso</CardDescription>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 md:p-6 pt-2 sm:pt-3 md:pt-4">
                <div className="space-y-2 sm:space-y-3 md:space-y-4">
                  {tareasRecientes.slice(0, 3).map((tarea) => (
                    <div key={tarea.id} className="border rounded-md p-2 sm:p-3 md:p-4">
                      <div className="flex items-start gap-2 sm:gap-3">
                        {tarea.estado === 'Completado' ? (
                          <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-green-600 mt-0.5 shrink-0" />
                        ) : tarea.estado === 'En proceso' ? (
                          <Clock className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-amber-500 mt-0.5 shrink-0" />
                        ) : (
                          <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-gray-400 mt-0.5 shrink-0" />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-xs sm:text-sm md:text-base font-medium">{tarea.titulo}</p>
                            <Badge variant={
                              tarea.estado === 'Completado' ? 'default' : 
                              tarea.estado === 'En proceso' ? 'secondary' : 'outline'
                            } className="text-[8px] sm:text-xs md:text-sm px-1 sm:px-2 py-0 h-4 sm:h-5 md:h-6 ml-1 sm:ml-2">
                              {tarea.estado}
                            </Badge>
                          </div>
                          <p className="text-[9px] sm:text-xs md:text-sm text-muted-foreground">Fecha: {tarea.fecha}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-2 sm:mt-3 md:mt-4 text-[10px] sm:text-xs md:text-sm h-7 sm:h-8 md:h-9"
                >
                  Ver todas
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Expediente Digital */}
          <TabsContent value="expediente">
            <ExpedienteDigitalModule />
          </TabsContent>
          
          {/* Nómina */}
          <TabsContent value="nomina">
            <div className="space-y-2 sm:space-y-4 md:space-y-6">
              <Card>
                <CardHeader className="p-3 sm:p-4 md:p-6">
                  <CardTitle className="text-base sm:text-lg md:text-xl">Gestión de Nómina</CardTitle>
                  <CardDescription className="text-xs sm:text-sm md:text-base">
                    Administración de la nómina institucional
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center p-3 sm:p-6 md:p-8">
                  <Briefcase className="size-10 sm:size-12 md:size-16 mx-auto mb-2 sm:mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-sm sm:text-base md:text-lg font-medium">Módulo en desarrollo</h3>
                  <p className="text-xs sm:text-sm md:text-base text-muted-foreground mt-1 sm:mt-2 max-w-[250px] sm:max-w-[400px] md:max-w-[500px] mx-auto">
                    El módulo de gestión de nómina está actualmente en desarrollo. 
                    Pronto podrá acceder a todas las funcionalidades.
                  </p>
                </CardContent>
                <CardFooter className="justify-center gap-2 sm:gap-3 md:gap-4 flex-wrap p-3 sm:p-4 md:p-6">
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm md:text-base h-8 sm:h-9 md:h-10">
                    <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 mr-1.5 sm:mr-2" />
                    Calendario
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm md:text-base h-8 sm:h-9 md:h-10">
                    <ListFilter className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 mr-1.5 sm:mr-2" />
                    Configuración
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          {/* Informes */}
          <TabsContent value="informes">
            <div className="space-y-2 sm:space-y-4 md:space-y-6">
              <Card>
                <CardHeader className="p-3 sm:p-4 md:p-6">
                  <CardTitle className="text-base sm:text-lg md:text-xl">Informes y Reportes</CardTitle>
                  <CardDescription className="text-xs sm:text-sm md:text-base">
                    Generación de informes y reportes
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 md:p-6">
                  <div className="grid gap-2 sm:gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    <Card className="p-2 sm:p-3 md:p-4">
                      <CardTitle className="text-xs sm:text-sm md:text-base">Plantilla de Personal</CardTitle>
                      <CardDescription className="text-[9px] sm:text-xs md:text-sm my-1 sm:my-2">
                        Informe completo de la plantilla de personal incluyendo categorías.
                      </CardDescription>
                      <Button variant="ghost" size="sm" className="w-full text-[10px] sm:text-xs md:text-sm h-6 sm:h-8 md:h-9 mt-1 sm:mt-2">
                        <FileText className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 mr-1 sm:mr-2" />
                        Generar
                      </Button>
                    </Card>
                    
                    <Card className="p-2 sm:p-3 md:p-4">
                      <CardTitle className="text-xs sm:text-sm md:text-base">Informe de Nómina</CardTitle>
                      <CardDescription className="text-[9px] sm:text-xs md:text-sm my-1 sm:my-2">
                        Informe detallado de la nómina con desglose por tipo de empleado.
                      </CardDescription>
                      <Button variant="ghost" size="sm" className="w-full text-[10px] sm:text-xs md:text-sm h-6 sm:h-8 md:h-9 mt-1 sm:mt-2">
                        <FileText className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 mr-1 sm:mr-2" />
                        Generar
                      </Button>
                    </Card>
                    
                    <Card className="p-2 sm:p-3 md:p-4">
                      <CardTitle className="text-xs sm:text-sm md:text-base">Análisis de Expedientes</CardTitle>
                      <CardDescription className="text-[9px] sm:text-xs md:text-sm my-1 sm:my-2">
                        Informe de estado de los expedientes digitales.
                      </CardDescription>
                      <Button variant="ghost" size="sm" className="w-full text-[10px] sm:text-xs md:text-sm h-6 sm:h-8 md:h-9 mt-1 sm:mt-2">
                        <FileText className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 mr-1 sm:mr-2" />
                        Generar
                      </Button>
                    </Card>
                  </div>
                </CardContent>
                <CardFooter className="border-t justify-end p-3 sm:p-4 md:p-6">
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm md:text-base h-7 sm:h-8 md:h-9">
                    <Search className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 mr-1.5 sm:mr-2" />
                    Ver todos
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default NominaModule;