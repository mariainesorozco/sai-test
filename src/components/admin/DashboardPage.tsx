"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { routes } from '@/app/admin/route-config';
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
  Clipboard,
  ArrowRight
} from 'lucide-react';

// Componente para las tarjetas de módulos (mejorado para móviles pequeños)
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
      <CardHeader className="p-3 sm:pb-2">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-1.5 rounded-md">
            <Icon className="h-4 w-4 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xs sm:text-sm font-medium">{title}</CardTitle>
            <CardDescription className="text-[10px] sm:text-xs">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-3">
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{item.label}</span>
              <div className="flex items-center gap-1.5">
                {item.badge && (
                  <Badge variant={item.badgeVariant || 'default'} className="text-[10px] font-normal px-1 py-0">
                    {item.badge}
                  </Badge>
                )}
                <span className="font-medium">{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <div className="border-t">
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full h-8 text-[10px] text-primary rounded-none flex items-center justify-center"
          onClick={onClick}
        >
          Ir al módulo
          <ArrowRight className="h-3 w-3 ml-1" />
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
  const router = useRouter();
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
    { id: 1, nombre: 'Juan Pérez', puesto: 'Profesor de Tiempo Completo', adscripcion: 'Unidad Académica de Economía', estatus: 'Activo', completitud: 95 },
    { id: 2, nombre: 'María López', puesto: 'Administrativo', adscripcion: 'Recursos Humanos', estatus: 'Activo', completitud: 60 },
    { id: 3, nombre: 'Carlos Rodríguez', puesto: 'Profesor de Asignatura', adscripcion: 'Unidad Académica de Derecho', estatus: 'Licencia', completitud: 75 },
    { id: 4, nombre: 'Ana González', puesto: 'Directivo', adscripcion: 'Rectoría', estatus: 'Activo', completitud: 100 },
  ];

  // Función para navegar al expediente
  const handleNavigateToExpediente = (empleadoId: number) => {
    if (empleadoId === 1) {
      router.push('/admin/nomina/expediente-digital/juan-perez');
    } else {
      alert('Expediente no disponible. Solo el expediente de Juan Pérez está implementado.');
    }
  };

  return (
    <div className="grid gap-3 sm:gap-6 max-w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Sistema de Administración Institucional</h1>
          <p className="text-muted-foreground text-xs sm:text-sm">Resumen del sistema y acceso rápido</p>
        </div>
      </div>

      {/* Tarjetas de resumen */}
      <div className="grid gap-2 sm:gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white">
          <CardHeader className="p-3 pb-1">
            <CardTitle className="text-xs sm:text-sm font-medium">Personal</CardTitle>
            <CardDescription className="text-[10px] sm:text-xs">Plantilla total</CardDescription>
          </CardHeader>
          <CardContent className="p-3 pt-1">
            <div className="text-lg sm:text-2xl font-bold">{stats.personal.total.toLocaleString()}</div>
            <div className="flex items-center justify-between mt-1 sm:mt-2">
              <span className="text-[10px] sm:text-xs text-muted-foreground">Completitud</span>
              <span className="text-[10px] sm:text-xs font-medium">{stats.personal.porcentajeCompletitud}%</span>
            </div>
            <Progress value={stats.personal.porcentajeCompletitud} className="h-1 mt-1" />
          </CardContent>
          <CardFooter className="p-3 pt-1">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full h-7 text-[10px] sm:text-xs"
              onClick={() => onModuleSelect('expediente')}
            >
              <User className="h-3 w-3 mr-1 sm:h-4 sm:w-4 sm:mr-2" />
              Expedientes
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-white">
          <CardHeader className="p-3 pb-1">
            <CardTitle className="text-xs sm:text-sm font-medium">Nómina</CardTitle>
            <CardDescription className="text-[10px] sm:text-xs">Próximo pago</CardDescription>
          </CardHeader>
          <CardContent className="p-3 pt-1">
            <div className="text-lg sm:text-2xl font-bold">
              <span className="text-xs sm:text-base">{stats.nomina.montoQuincenal}</span>
            </div>
            <div className="mt-1 sm:mt-2 space-y-0.5 sm:space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-xs text-muted-foreground">Quincena:</span>
                <span className="text-[10px] sm:text-xs font-medium">{stats.nomina.quincenaActual}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-xs text-muted-foreground">Fecha:</span>
                <span className="text-[10px] sm:text-xs font-medium">{stats.nomina.fechaPago}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-3 pt-1">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full h-7 text-[10px] sm:text-xs"
              onClick={() => onModuleSelect('nomina')}
            >
              <Briefcase className="h-3 w-3 mr-1 sm:h-4 sm:w-4 sm:mr-2" />
              Procesar
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-white">
          <CardHeader className="p-3 pb-1">
            <CardTitle className="text-xs sm:text-sm font-medium">Impuestos</CardTitle>
            <CardDescription className="text-[10px] sm:text-xs">Próximas</CardDescription>
          </CardHeader>
          <CardContent className="p-3 pt-1">
            <div className="text-lg sm:text-2xl font-bold">
              <span className="text-xs sm:text-base">{stats.impuestos.isrRetenidoMes}</span>
            </div>
            <div className="mt-1 sm:mt-2 space-y-0.5 sm:space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-xs text-muted-foreground">Próxima:</span>
                <Badge variant="outline" className="text-[10px] sm:text-xs font-normal px-1 py-0">ISR</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-xs text-muted-foreground">Fecha:</span>
                <span className="text-[10px] sm:text-xs font-medium">{stats.impuestos.fechaLimite}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-3 pt-1">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full h-7 text-[10px] sm:text-xs"
              onClick={() => onModuleSelect('impuestos')}
            >
              <Shield className="h-3 w-3 mr-1 sm:h-4 sm:w-4 sm:mr-2" />
              Ver
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-white">
          <CardHeader className="p-3 pb-1">
            <CardTitle className="text-xs sm:text-sm font-medium">Egresos</CardTitle>
            <CardDescription className="text-[10px] sm:text-xs">Pagos pendientes</CardDescription>
          </CardHeader>
          <CardContent className="p-3 pt-1">
            <div className="text-lg sm:text-2xl font-bold">
              <span className="text-xs sm:text-base">{stats.egresos.montoPendiente}</span>
            </div>
            <div className="mt-1 sm:mt-2 space-y-0.5 sm:space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-xs text-muted-foreground">Pendientes:</span>
                <Badge variant="secondary" className="text-[10px] sm:text-xs font-normal px-1 py-0">{stats.egresos.pagosPendientes}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-xs text-muted-foreground">Próximo:</span>
                <span className="text-[10px] sm:text-xs font-medium">{stats.egresos.proximoPago}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-3 pt-1">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full h-7 text-[10px] sm:text-xs"
              onClick={() => onModuleSelect('egresos')}
            >
              <CreditCard className="h-3 w-3 mr-1 sm:h-4 sm:w-4 sm:mr-2" />
              Pagos
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Contenido principal en Grid */}
      <div className="grid gap-3 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Tareas pendientes */}
        <Card className="lg:col-span-1 bg-white">
          <CardHeader className="p-3 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs sm:text-base font-semibold">Tareas pendientes</CardTitle>
              <Badge variant="secondary" className="text-[10px] font-normal px-1 py-0">{tareasPendientes.length}</Badge>
            </div>
            <CardDescription className="text-[10px] sm:text-xs">Actividades que requieren atención</CardDescription>
          </CardHeader>
          <CardContent className="p-3 pb-2">
            <div className="space-y-2 sm:space-y-3">
              {tareasPendientes.slice(0, 2).map((tarea) => (
                <div key={tarea.id} className="flex items-start justify-between pb-2 border-b last:border-b-0 last:pb-0">
                  <div className="flex items-start gap-2">
                    <Badge variant={
                      tarea.prioridad === 'Alta' ? 'destructive' : 
                      tarea.prioridad === 'Media' ? 'secondary' : 'outline'
                    } className="mt-0.5 text-[8px] sm:text-xs font-normal whitespace-nowrap px-1 py-0">
                      {tarea.prioridad}
                    </Badge>
                    <div>
                      <p className="text-[10px] sm:text-sm font-medium">{tarea.titulo}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-[8px] sm:text-xs text-muted-foreground">{tarea.modulo}</span>
                        <span className="text-[8px] sm:text-xs text-muted-foreground">•</span>
                        <div className="flex items-center gap-0.5 text-[8px] sm:text-xs text-muted-foreground">
                          <Calendar className="h-2 w-2 sm:h-3 sm:w-3" />
                          {tarea.fecha}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-full">
                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="p-3 pt-1">
            <Button variant="outline" size="sm" className="w-full h-7 text-[10px] sm:text-xs">
              <Plus className="h-3 w-3 mr-1 sm:h-3.5 sm:w-3.5 sm:mr-1.5" />
              Ver todas
            </Button>
          </CardFooter>
        </Card>

        {/* Expedientes recientes (para móviles pequeños, mostramos solo tarjetas simplificadas) */}
        <Card className="md:col-span-2 bg-white">
          <CardHeader className="p-3 pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xs sm:text-base font-semibold">Expedientes recientes</CardTitle>
                <CardDescription className="text-[10px] sm:text-xs">Empleados consultados recientemente</CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="h-7 text-[10px] sm:text-xs px-2"
                onClick={() => onModuleSelect('expediente')}
              >
                Ver todos
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {/* Versión móvil: tarjetas simplificadas */}
            <div className="block sm:hidden">
              <div className="divide-y">
                {expedientesRecientes.slice(0, 2).map((empleado) => (
                  <div key={empleado.id} className="p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-primary/10 text-primary text-[8px]">{empleado.nombre.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-[10px] font-medium">{empleado.nombre}</p>
                        <p className="text-[8px] text-muted-foreground">{empleado.puesto}</p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 text-[8px] text-primary px-2"
                      onClick={() => handleNavigateToExpediente(empleado.id)}
                    >
                      Ver
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Versión escritorio: tabla completa */}
            <div className="hidden sm:block overflow-x-auto">
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
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">{empleado.nombre.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-sm truncate max-w-[140px]">{empleado.nombre}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-sm truncate max-w-[140px]">{empleado.puesto}</TableCell>
                      <TableCell className="hidden lg:table-cell text-sm truncate max-w-[140px]">{empleado.adscripcion}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Badge 
                            variant={empleado.estatus === 'Activo' ? 'default' : 'secondary'} 
                            className="text-xs font-normal whitespace-nowrap"
                          >
                            {empleado.estatus}
                          </Badge>
                          <div className="ml-2 flex items-center">
                            <div 
                              className={`h-1.5 w-1.5 rounded-full mr-1 ${
                                empleado.completitud >= 90 ? 'bg-green-500' : 
                                empleado.completitud >= 70 ? 'bg-amber-500' : 'bg-red-500'
                              }`}
                            ></div>
                            <span className="text-xs">{empleado.completitud}%</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs text-primary"
                          onClick={() => handleNavigateToExpediente(empleado.id)}
                        >
                          Ver expediente
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Acceso rápido a los módulos (versión simplificada para móviles pequeños) */}
      <Card className="bg-white">
        <CardHeader className="p-3 pb-2">
          <CardTitle className="text-xs sm:text-base font-semibold">Acceso rápido</CardTitle>
          <CardDescription className="text-[10px] sm:text-xs">Secciones más utilizadas</CardDescription>
        </CardHeader>
        <CardContent className="p-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
            <Button 
              variant="outline" 
              className="h-auto py-3 sm:py-6 flex flex-col items-center bg-white hover:bg-muted/50 text-[10px] sm:text-sm"
              onClick={() => onModuleSelect('nomina')}
            >
              <Users className="h-5 w-5 sm:h-8 sm:w-8 mb-1 sm:mb-2 text-primary" />
              <span>Nómina</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto py-3 sm:py-6 flex flex-col items-center bg-white hover:bg-muted/50 text-[10px] sm:text-sm"
              onClick={() => onModuleSelect('expediente')}
            >
              <User className="h-5 w-5 sm:h-8 sm:w-8 mb-1 sm:mb-2 text-primary" />
              <span>Expedientes</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto py-3 sm:py-6 flex flex-col items-center bg-white hover:bg-muted/50 text-[10px] sm:text-sm"
              onClick={() => onModuleSelect('impuestos')}
            >
              <FileText className="h-5 w-5 sm:h-8 sm:w-8 mb-1 sm:mb-2 text-primary" />
              <span>Impuestos</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto py-3 sm:py-6 flex flex-col items-center bg-white hover:bg-muted/50 text-[10px] sm:text-sm"
              onClick={() => onModuleSelect('egresos')}
            >
              <DollarSign className="h-5 w-5 sm:h-8 sm:w-8 mb-1 sm:mb-2 text-primary" />
              <span>Egresos</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Para móviles solo las 2 primeras tarjetas de módulos (más importantes) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        <ModuleCard 
          title="Personal"
          description="Distribución por tipo"
          icon={Users}
          items={[
            { label: "Docentes", value: stats.personal.docentes },
            { label: "Administrativos", value: stats.personal.administrativos },
            { label: "Expedientes", value: stats.personal.expedientesCompletos }
          ]}
          onClick={() => onModuleSelect('nomina')}
        />
        
        <ModuleCard 
          title="Nómina"
          description="Procesos activos"
          icon={Briefcase}
          items={[
            { label: "Quincena", value: stats.nomina.quincenaActual },
            { label: "Fecha", value: stats.nomina.fechaPago },
            { label: "Proceso", value: stats.nomina.proximoProceso }
          ]}
          onClick={() => onModuleSelect('nomina')}
        />
        
        {/* Estos solo se muestran en pantallas más grandes */}
        <div className="hidden sm:block">
          <ModuleCard 
            title="Impuestos"
            description="Obligaciones fiscales"
            icon={Shield}
            items={[
              { label: "ISR retenido", value: stats.impuestos.isrRetenidoMes },
              { label: "Próxima declaración", value: stats.impuestos.proximaDeclaracion },
              { label: "Fecha límite", value: stats.impuestos.fechaLimite, badge: "Urgente", badgeVariant: "destructive" }
            ]}
            onClick={() => onModuleSelect('impuestos')}
          />
        </div>
        
        <div className="hidden sm:block">
          <ModuleCard 
            title="Egresos"
            description="Pagos y control financiero"
            icon={CreditCard}
            items={[
              { label: "Egresos mes", value: stats.egresos.egresosMes },
              { label: "Pagos pendientes", value: stats.egresos.pagosPendientes },
              { label: "Próximo pago", value: stats.egresos.proximoPago }
            ]}
            onClick={() => onModuleSelect('egresos')}
          />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;