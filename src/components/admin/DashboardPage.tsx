"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  FileText, 
  Calendar, 
  BarChart, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  DollarSign,
  Plus,
  Search,
  Briefcase,
  BookOpen,
  User,
  Shield,
  CreditCard,
  Clipboard
} from 'lucide-react';

// Componente para las tarjetas de módulos
interface ModuleCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  items: Array<{
    label: string;
    value: string | number;
    badge?: string;
    badgeVariant?: 'default' | 'outline' | 'secondary' | 'destructive';
  }>;
  onClick: () => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ title, description, icon: Icon, items, onClick }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-md">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
          </div>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{item.label}</span>
              <div className="flex items-center gap-2">
                {item.badge && (
                  <Badge variant={item.badgeVariant || 'default'} className="text-xs">
                    {item.badge}
                  </Badge>
                )}
                <span className="text-sm font-medium">{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <div className="border-t p-2 bg-muted/10">
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full"
          onClick={onClick}
        >
          Ir al módulo
        </Button>
      </div>
    </Card>
  );
};

// Componente principal del dashboard
interface DashboardProps {
  onModuleSelect: (moduleId: string) => void;
}

const DashboardPage: React.FC<DashboardProps> = ({ onModuleSelect }) => {
  // Datos de ejemplo para estadísticas
  const stats = {
    personal: {
      total: 4287,
      docentes: 2346,
      administrativos: 1892,
      directivos: 49,
      expedientesCompletos: 3850,
      porcentajeCompletitud: 89,
    },
    nomina: {
      montoQuincenal: '$24,333,332.67',
      quincenaActual: 'Abril 2025 - 1ra',
      fechaPago: '15/04/2025',
      proximoProceso: 'Cálculo',
    },
    impuestos: {
      isrRetenidoMes: '$1,458,275.34',
      proximaDeclaracion: 'ISR Mensual',
      fechaLimite: '17/04/2025',
      obligacionesPendientes: 2,
    },
    egresos: {
      egresosMes: '$12,854,632.75',
      pagosPendientes: 5,
      montoPendiente: '$3,125,487.23',
      proximoPago: '10/04/2025',
    },
  };

  // Lista de tareas pendientes
  const tareasPendientes = [
    { id: 1, modulo: 'Nómina', titulo: 'Cálculo de nómina quincenal', fecha: '10/04/2025', prioridad: 'Alta' },
    { id: 2, modulo: 'Impuestos', titulo: 'Declaración mensual ISR', fecha: '17/04/2025', prioridad: 'Alta' },
    { id: 3, modulo: 'Egresos', titulo: 'Pago a proveedores', fecha: '12/04/2025', prioridad: 'Media' },
    { id: 4, modulo: 'Personal', titulo: 'Revisión de expedientes incompletos', fecha: '20/04/2025', prioridad: 'Baja' },
  ];

  // Expedientes recientes
  const expedientesRecientes = [
    { id: 1, nombre: 'Juan Pérez', puesto: 'Profesor de Tiempo Completo', adscripcion: 'Unidad Académica de Economía', estatus: 'Activo', completitud: 85 },
    { id: 2, nombre: 'María López', puesto: 'Administrativo', adscripcion: 'Recursos Humanos', estatus: 'Activo', completitud: 60 },
    { id: 3, nombre: 'Carlos Rodríguez', puesto: 'Profesor de Asignatura', adscripcion: 'Unidad Académica de Derecho', estatus: 'Licencia', completitud: 75 },
    { id: 4, nombre: 'Ana González', puesto: 'Directivo', adscripcion: 'Rectoría', estatus: 'Activo', completitud: 100 },
  ];

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Resumen del sistema y acceso rápido</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="hidden md:flex">
            <Calendar className="h-4 w-4 mr-2" />
            Abril 2025
          </Button>
          <Button variant="outline" size="sm" className="hidden md:flex">
            <FileText className="h-4 w-4 mr-2" />
            Reportes
          </Button>
        </div>
      </div>

      {/* Tarjetas de resumen */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Personal</CardTitle>
            <CardDescription>Plantilla total</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.personal.total.toLocaleString()}</div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-muted-foreground">Completitud de expedientes</span>
              <span className="text-xs font-medium">{stats.personal.porcentajeCompletitud}%</span>
            </div>
            <Progress value={stats.personal.porcentajeCompletitud} className="h-1 mt-1" />
          </CardContent>
          <CardFooter className="pt-2 pb-4 px-6">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => onModuleSelect('expediente')}
            >
              <User className="h-4 w-4 mr-2" />
              Expedientes
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Nómina</CardTitle>
            <CardDescription>Próximo pago</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.nomina.montoQuincenal}</div>
            <div className="mt-2 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Quincena:</span>
                <span className="text-xs font-medium">{stats.nomina.quincenaActual}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Fecha de pago:</span>
                <span className="text-xs font-medium">{stats.nomina.fechaPago}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-2 pb-4 px-6">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => onModuleSelect('nomina')}
            >
              <Briefcase className="h-4 w-4 mr-2" />
              Procesar nómina
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Impuestos</CardTitle>
            <CardDescription>Obligaciones próximas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.impuestos.isrRetenidoMes}</div>
            <div className="mt-2 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Próxima declaración:</span>
                <Badge variant="outline" className="text-xs">{stats.impuestos.proximaDeclaracion}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Fecha límite:</span>
                <span className="text-xs font-medium">{stats.impuestos.fechaLimite}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-2 pb-4 px-6">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => onModuleSelect('impuestos')}
            >
              <Shield className="h-4 w-4 mr-2" />
              Ver obligaciones
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Egresos</CardTitle>
            <CardDescription>Pagos pendientes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.egresos.montoPendiente}</div>
            <div className="mt-2 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Pagos pendientes:</span>
                <Badge variant="secondary" className="text-xs">{stats.egresos.pagosPendientes}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Próximo pago:</span>
                <span className="text-xs font-medium">{stats.egresos.proximoPago}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-2 pb-4 px-6">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => onModuleSelect('egresos')}
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Gestionar pagos
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Contenido principal en Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Tareas pendientes */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Tareas pendientes</CardTitle>
              <Badge variant="secondary">{tareasPendientes.length}</Badge>
            </div>
            <CardDescription>Actividades que requieren atención</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="space-y-4">
              {tareasPendientes.map((tarea) => (
                <div key={tarea.id} className="flex items-center justify-between pb-2 border-b last:border-b-0 last:pb-0">
                  <div className="flex items-start gap-3">
                    <Badge variant={
                      tarea.prioridad === 'Alta' ? 'destructive' : 
                      tarea.prioridad === 'Media' ? 'secondary' : 'outline'
                    } className="mt-0.5">
                      {tarea.prioridad}
                    </Badge>
                    <div>
                      <p className="text-sm font-medium">{tarea.titulo}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-muted-foreground">{tarea.modulo}</p>
                        <span>•</span>
                        <p className="text-xs text-muted-foreground">Vence: {tarea.fecha}</p>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="pt-2">
            <Button variant="outline" size="sm" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Nueva tarea
            </Button>
          </CardFooter>
        </Card>

        {/* Expedientes recientes */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Expedientes recientes</CardTitle>
                <CardDescription>Empleados consultados recientemente</CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onModuleSelect('expediente')}
              >
                Ver todos
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead className="hidden md:table-cell">Puesto</TableHead>
                    <TableHead className="hidden lg:table-cell">Adscripción</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expedientesRecientes.map((empleado) => (
                    <TableRow key={empleado.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-7 w-7">
                            <AvatarFallback>{empleado.nombre.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium truncate max-w-[140px]">{empleado.nombre}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell truncate max-w-[140px]">{empleado.puesto}</TableCell>
                      <TableCell className="hidden lg:table-cell truncate max-w-[140px]">{empleado.adscripcion}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Badge variant={empleado.estatus === 'Activo' ? 'default' : 'secondary'} className="text-xs">
                            {empleado.estatus}
                          </Badge>
                          <div className="ml-2 flex items-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary mr-1"></div>
                            <span className="text-xs">{empleado.completitud}%</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {empleado.id === 1 ? (
                          <Button variant="ghost" size="sm" asChild>
                            <a href="/admin/nomina/expediente-digital/juan-perez">Ver expediente</a>
                          </Button>
                        ) : (
                          <Button variant="ghost" size="sm" onClick={() => alert('Expediente no disponible. Solo el expediente de Juan Pérez está implementado.')}>
                            Ver expediente
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Acceso rápido a los módulos */}
      <Card>
        <CardHeader>
          <CardTitle>Acceso rápido a los módulos</CardTitle>
          <CardDescription>Navegación directa a las secciones más utilizadas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-auto py-6 flex flex-col items-center"
              onClick={() => onModuleSelect('nomina')}
            >
              <Users className="h-8 w-8 mb-2" />
              <span>Nómina y RH</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto py-6 flex flex-col items-center"
              onClick={() => onModuleSelect('expediente')}
            >
              <User className="h-8 w-8 mb-2" />
              <span>Expedientes</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto py-6 flex flex-col items-center"
              onClick={() => onModuleSelect('impuestos')}
            >
              <FileText className="h-8 w-8 mb-2" />
              <span>Impuestos</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto py-6 flex flex-col items-center"
              onClick={() => onModuleSelect('egresos')}
            >
              <DollarSign className="h-8 w-8 mb-2" />
              <span>Egresos</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Resumen por módulos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ModuleCard 
          title="Personal"
          description="Distribución por tipo"
          icon={Users}
          items={[
            { label: "Docentes", value: stats.personal.docentes, badge: `${(stats.personal.docentes / stats.personal.total * 100).toFixed(1)}%` },
            { label: "Administrativos", value: stats.personal.administrativos, badge: `${(stats.personal.administrativos / stats.personal.total * 100).toFixed(1)}%` },
            { label: "Directivos", value: stats.personal.directivos, badge: `${(stats.personal.directivos / stats.personal.total * 100).toFixed(1)}%` },
            { label: "Expedientes completos", value: stats.personal.expedientesCompletos }
          ]}
          onClick={() => onModuleSelect('nomina')}
        />
        
        <ModuleCard 
          title="Nómina"
          description="Procesos activos"
          icon={Briefcase}
          items={[
            { label: "Quincena actual", value: stats.nomina.quincenaActual },
            { label: "Fecha de pago", value: stats.nomina.fechaPago, badge: "Próximo", badgeVariant: "secondary" },
            { label: "Monto", value: stats.nomina.montoQuincenal },
            { label: "Proceso pendiente", value: stats.nomina.proximoProceso }
          ]}
          onClick={() => onModuleSelect('nomina')}
        />
        
        <ModuleCard 
          title="Impuestos"
          description="Obligaciones fiscales"
          icon={Shield}
          items={[
            { label: "ISR retenido", value: stats.impuestos.isrRetenidoMes },
            { label: "Próxima declaración", value: stats.impuestos.proximaDeclaracion },
            { label: "Fecha límite", value: stats.impuestos.fechaLimite, badge: "Urgente", badgeVariant: "destructive" },
            { label: "Pendientes", value: stats.impuestos.obligacionesPendientes }
          ]}
          onClick={() => onModuleSelect('impuestos')}
        />
        
        <ModuleCard 
          title="Egresos"
          description="Pagos y control financiero"
          icon={CreditCard}
          items={[
            { label: "Egresos del mes", value: stats.egresos.egresosMes },
            { label: "Pagos pendientes", value: stats.egresos.pagosPendientes },
            { label: "Monto pendiente", value: stats.egresos.montoPendiente },
            { label: "Próximo pago", value: stats.egresos.proximoPago }
          ]}
          onClick={() => onModuleSelect('egresos')}
        />
      </div>
    </div>
  );
}

export default DashboardPage;