"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Users, 
  FileText, 
  DollarSign, 
  BookOpen, 
  BarChart,
  Calendar,
  CheckCircle, 
  AlertCircle, 
  Clock,
  Plus,
  ChevronRight,
  User
} from 'lucide-react';
import Link from 'next/link';

const DashboardModule = () => {
  // Datos simulados para estadísticas
  const estadisticas = {
    totalTrabajadores: 4287,
    nuevosUltimoMes: 12,
    nominaQuincenal: 8437521.43,
    impuestosPendientes: 1458275.34,
    egresosMensuales: 12854632.75,
    vencimientoProximo: '15/04/2025'
  };

  // Expedientes recientes
  const expedientesRecientes = [
    { id: 1, nombre: 'Juan Pérez', puesto: 'Profesor de Tiempo Completo', adscripcion: 'Unidad Académica de Economía', estatus: 'Activo' },
    { id: 2, nombre: 'María López', puesto: 'Administrativo', adscripcion: 'Recursos Humanos', estatus: 'Activo' },
    { id: 3, nombre: 'Carlos Rodríguez', puesto: 'Profesor de Asignatura', adscripcion: 'Unidad Académica de Derecho', estatus: 'Licencia' },
  ];

  // Tareas recientes
  const tareasRecientes = [
    { id: 1, titulo: 'Actualización de adscripciones', fecha: '10/04/2025', estado: 'Pendiente' },
    { id: 2, titulo: 'Nómina quincenal', fecha: '15/04/2025', estado: 'En proceso' },
    { id: 3, titulo: 'Declaración impuestos mensuales', fecha: '20/04/2025', estado: 'Pendiente' },
    { id: 4, titulo: 'Cierre contable trimestral', fecha: '05/04/2025', estado: 'Completado' },
  ];

  // Formato de moneda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2
    }).format(value);
  };

  return (
    <div className="grid gap-6">
      {/* Tarjetas de bienvenida y estadísticas principales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="md:col-span-2 lg:col-span-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <CardHeader className="pb-2">
            <CardTitle>Bienvenido al Sistema de Administración Institucional</CardTitle>
            <CardDescription>
              Panel de administración integrado para la Universidad Autónoma de Nayarit
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="text-sm">
              Fecha actual: {new Date().toLocaleDateString('es-MX', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button size="sm" className="gap-1">
                <User className="h-4 w-4" />
                Nuevo empleado
              </Button>
              <Button size="sm" variant="outline" className="gap-1">
                <Calendar className="h-4 w-4" />
                Calendario de nómina
              </Button>
              <Button size="sm" variant="secondary" className="gap-1">
                <FileText className="h-4 w-4" />
                Reportes
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Personal</CardTitle>
            <CardDescription>Plantilla total</CardDescription>
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
            <CardTitle className="text-sm font-medium">Próxima nómina</CardTitle>
            <CardDescription>Importe proyectado</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(estadisticas.nominaQuincenal)}</div>
            <p className="text-xs text-muted-foreground">
              Vence: {estadisticas.vencimientoProximo}
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Módulos principales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden">
          <CardHeader className="pb-0">
            <CardTitle className="z-10 relative">Nómina y RRHH</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="absolute top-2 right-4 rounded-full p-2 bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Gestión de personal, expedientes y nómina
            </p>
            <div className="text-xl font-semibold text-primary">
              {formatCurrency(estadisticas.nominaQuincenal)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Próxima nómina
            </p>
          </CardContent>
          <CardFooter className="text-right">
            <Link href="#">
              <Button variant="ghost" size="sm" className="gap-1">
                Ver módulo
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card className="relative overflow-hidden">
          <CardHeader className="pb-0">
            <CardTitle className="z-10 relative">Impuestos</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="absolute top-2 right-4 rounded-full p-2 bg-secondary/10">
              <FileText className="h-5 w-5 text-secondary" />
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Gestión de impuestos y obligaciones fiscales
            </p>
            <div className="text-xl font-semibold text-secondary">
              {formatCurrency(estadisticas.impuestosPendientes)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Impuestos por pagar
            </p>
          </CardContent>
          <CardFooter className="text-right">
            <Link href="#">
              <Button variant="ghost" size="sm" className="gap-1">
                Ver módulo
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card className="relative overflow-hidden">
          <CardHeader className="pb-0">
            <CardTitle className="z-10 relative">Egresos</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="absolute top-2 right-4 rounded-full p-2 bg-blue-500/10">
              <DollarSign className="h-5 w-5 text-blue-500" />
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Control de pagos y egresos institucionales
            </p>
            <div className="text-xl font-semibold text-blue-500">
              {formatCurrency(estadisticas.egresosMensuales)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Egresos mensuales
            </p>
          </CardContent>
          <CardFooter className="text-right">
            <Link href="#">
              <Button variant="ghost" size="sm" className="gap-1">
                Ver módulo
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card className="relative overflow-hidden">
          <CardHeader className="pb-0">
            <CardTitle className="z-10 relative">Catálogos</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="absolute top-2 right-4 rounded-full p-2 bg-green-500/10">
              <BookOpen className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Administración de catálogos del sistema
            </p>
            <div className="flex items-center mt-4 gap-2">
              <Badge variant="outline">Puestos</Badge>
              <Badge variant="outline">Adscripciones</Badge>
              <Badge variant="outline">+8</Badge>
            </div>
          </CardContent>
          <CardFooter className="text-right">
            <Link href="#">
              <Button variant="ghost" size="sm" className="gap-1">
                Ver módulo
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
      
      {/* Gráfica resumen y tareas pendientes */}
      <div className="grid gap-6 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Actividad Reciente</CardTitle>
                <CardDescription>Empleados consultados recientemente</CardDescription>
              </div>
              <Button variant="outline" size="sm">Ver todo</Button>
            </div>
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
                      <Button variant="ghost" size="sm">Ver expediente</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* Tareas recientes */}
        <Card className="md:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Tareas Pendientes</CardTitle>
                <CardDescription>Actividades próximas</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Nueva
              </Button>
            </div>
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
          <CardFooter>
            <Button variant="outline" size="sm" className="ml-auto">
              Ver todas
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Resumen de actividad */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Empleados por tipo</CardTitle>
          </CardHeader>
          <CardContent className="py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Docentes</p>
                  <p className="text-sm text-muted-foreground">54.7%</p>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-full bg-primary rounded-full" style={{ width: '54.7%' }} />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Administrativos</p>
                  <p className="text-sm text-muted-foreground">44.1%</p>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '44.1%' }} />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Directivos</p>
                  <p className="text-sm text-muted-foreground">1.2%</p>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '1.2%' }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Distribución por Adscripción</CardTitle>
          </CardHeader>
          <CardContent className="py-4">
            <div className="flex items-center justify-center h-[160px]">
              <div className="text-center text-muted-foreground text-sm">
                <BarChart className="mx-auto h-8 w-8 opacity-50 mb-2" />
                <p>Aquí se mostraría la gráfica</p>
                <p>de distribución por adscripción</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Acceso Rápido</CardTitle>
          </CardHeader>
          <CardContent className="py-4">
            <div className="grid grid-cols-2 gap-3">
              <Button className="h-auto py-4 flex flex-col">
                <Users className="h-5 w-5 mb-2" />
                <span className="text-xs">Nuevo empleado</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col">
                <FileText className="h-5 w-5 mb-2" />
                <span className="text-xs">Generar reportes</span>
              </Button>
              <Button variant="secondary" className="h-auto py-4 flex flex-col">
                <Calendar className="h-5 w-5 mb-2" />
                <span className="text-xs">Calendario</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col">
                <BarChart className="h-5 w-5 mb-2" />
                <span className="text-xs">Estadísticas</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardModule;