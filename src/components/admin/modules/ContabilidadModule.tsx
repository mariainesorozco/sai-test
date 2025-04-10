"use client";

// Importaciones de React y Next.js
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// Importación de los componentes personalizados para gráficos
import DistribucionPresupuestoChart from './DistribucionPresupuestoChart';
import AnalisisFinancieroChart from './AnalisisFinancieroChart';

// Importaciones de componentes UI de Shadcn
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart as BarChartIcon, 
  BookOpenText, 
  FileSpreadsheet, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  ChevronRight,
  FileText,
  ArrowUp,
  ArrowDown,
  Wallet,
  Building2,
  Microscope,
  BadgeCheck,
  Clock,
  PlusCircle,
  RefreshCw,
  ExternalLink,
  Search,
  Download,
  Plus
} from 'lucide-react';

// Tipos
interface Movimiento {
  id: number;
  concepto: string;
  beneficiario: string;
  importe: number;
  fecha: string;
  tipo: 'Ingreso' | 'Egreso';
  categoria?: string;
}

interface PartidaContable {
  id: number;
  nombre: string;
  monto: number;
  ejecutado: number;
  porcentaje: number;
  estado: 'En proceso' | 'Completado' | 'Pendiente';
}

interface ProyectoInvestigacion {
  id: number;
  nombre: string;
  director: string;
  monto: number;
  estado: 'En progreso' | 'Iniciado' | 'Completado' | 'Suspendido';
  avance: number;
  fechaInicio: string;
  fechaFin: string;
}

interface DistribucionItem {
  categoria: string;
  color: string;
  importe: number;
  porcentaje: number;
}

interface EstadisticasFinancieras {
  ingresosTotales: number;
  ingresosDiferenciaMes: number; 
  investigacion: number;
  investigacionPorcentaje: number;
  docencia: number;
  docenciaPorcentaje: number;
  administrativos: number;
  administrativosPorcentaje: number;
  otros: number;
  otrosPorcentaje: number;
}

const ContabilidadModule: React.FC = () => {
  const router = useRouter();
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState<'mensual' | 'trimestral' | 'anual'>('mensual');
  const [tabActiva, setTabActiva] = useState<'todos' | 'ingresos' | 'egresos'>('todos');

  // Datos simulados para estadísticas
  const estadisticas: EstadisticasFinancieras = {
    ingresosTotales: 52450000,
    ingresosDiferenciaMes: 7.3,
    investigacion: 5200000,
    investigacionPorcentaje: 9.9,
    docencia: 32750000,
    docenciaPorcentaje: 62.4,
    administrativos: 14500000,
    administrativosPorcentaje: 27.7,
    otros: 445000,
    otrosPorcentaje: 0.8
  };

  // Movimientos recientes
  const movimientosRecientes: Movimiento[] = [
    { 
      id: 1, 
      concepto: 'Ingreso Matrícula', 
      beneficiario: 'Alumnos UAN', 
      importe: 12500000, 
      fecha: '15/04/2025',
      tipo: 'Ingreso',
      categoria: 'Docencia'
    },
    { 
      id: 2, 
      concepto: 'Subsidio Gubernamental', 
      beneficiario: 'Gobierno Estatal', 
      importe: 5600000, 
      fecha: '10/04/2025',
      tipo: 'Ingreso',
      categoria: 'Administrativos'
    },
    { 
      id: 3, 
      concepto: 'Pago Infraestructura', 
      beneficiario: 'Proveedores', 
      importe: 3750000, 
      fecha: '05/04/2025',
      tipo: 'Egreso',
      categoria: 'Administrativos'
    },
    { 
      id: 4, 
      concepto: 'Proyectos Investigación', 
      beneficiario: 'Departamento de Investigación', 
      importe: 2300000, 
      fecha: '02/04/2025',
      tipo: 'Egreso',
      categoria: 'Investigación'
    },
    { 
      id: 5, 
      concepto: 'Convenio Colaboración', 
      beneficiario: 'Instituto Tecnológico', 
      importe: 1800000, 
      fecha: '28/03/2025',
      tipo: 'Ingreso',
      categoria: 'Investigación'
    }
  ];

  // Partidas contables
  const partidasContables: PartidaContable[] = [
    { 
      id: 1, 
      nombre: 'Presupuesto Docencia', 
      monto: 32750000, 
      ejecutado: 27600000, 
      porcentaje: 84.3,
      estado: 'En proceso'
    },
    { 
      id: 2, 
      nombre: 'Fondo Investigación', 
      monto: 5200000, 
      ejecutado: 4160000, 
      porcentaje: 80.0,
      estado: 'En proceso'
    },
    { 
      id: 3, 
      nombre: 'Gastos Administrativos', 
      monto: 14500000, 
      ejecutado: 12350000, 
      porcentaje: 85.2,
      estado: 'Completado'
    },
    { 
      id: 4, 
      nombre: 'Desarrollo Tecnológico', 
      monto: 3800000, 
      ejecutado: 1950000, 
      porcentaje: 51.3,
      estado: 'En proceso'
    }
  ];

  // Proyectos de investigación
  const proyectosInvestigacion: ProyectoInvestigacion[] = [
    { 
      id: 1, 
      nombre: 'Innovación Tecnológica', 
      director: 'Dr. Juan Pérez', 
      monto: 1200000, 
      estado: 'En progreso',
      avance: 65,
      fechaInicio: '01/02/2025',
      fechaFin: '30/11/2025'
    },
    { 
      id: 2, 
      nombre: 'Desarrollo Sustentable', 
      director: 'Dra. María González', 
      monto: 950000, 
      estado: 'Iniciado',
      avance: 15,
      fechaInicio: '15/03/2025',
      fechaFin: '15/12/2025'
    },
    { 
      id: 3, 
      nombre: 'Salud Comunitaria', 
      director: 'Dr. Carlos Ramírez', 
      monto: 750000, 
      estado: 'En progreso',
      avance: 45,
      fechaInicio: '10/01/2025',
      fechaFin: '10/10/2025'
    },
    { 
      id: 4, 
      nombre: 'Transformación Digital', 
      director: 'Dra. Ana Martínez', 
      monto: 600000, 
      estado: 'Iniciado',
      avance: 10,
      fechaInicio: '01/04/2025',
      fechaFin: '01/12/2025'
    }
  ];

  // Distribución de ingresos
  const distribucionIngresos: DistribucionItem[] = [
    { 
      categoria: 'Docencia', 
      color: 'bg-primary', 
      importe: estadisticas.docencia, 
      porcentaje: estadisticas.docenciaPorcentaje 
    },
    { 
      categoria: 'Investigación', 
      color: 'bg-blue-500', 
      importe: estadisticas.investigacion, 
      porcentaje: estadisticas.investigacionPorcentaje 
    },
    { 
      categoria: 'Administrativos', 
      color: 'bg-green-500', 
      importe: estadisticas.administrativos, 
      porcentaje: estadisticas.administrativosPorcentaje 
    },
    { 
      categoria: 'Otros Ingresos', 
      color: 'bg-amber-500', 
      importe: estadisticas.otros, 
      porcentaje: estadisticas.otrosPorcentaje 
    }
  ];

  // Opciones de filtro por periodo
  const opcionesPeriodo = [
    { valor: 'mensual', etiqueta: 'Mensual' },
    { valor: 'trimestral', etiqueta: 'Trimestral' },
    { valor: 'anual', etiqueta: 'Anual' }
  ];

  // Filtrar movimientos según la pestaña activa
  const filtrarMovimientos = () => {
    if (tabActiva === 'todos') return movimientosRecientes;
    return movimientosRecientes.filter(m => m.tipo.toLowerCase() === tabActiva);
  };

  // Utilidades de formato para moneda
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2
    }).format(value);
  };

  // Formato abreviado para móviles
  const formatCurrencyShort = (value: number): string => {
    if (value >= 1000000) {
      return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
        maximumFractionDigits: 1
      }).format(value / 1000000) + 'M';
    } else if (value >= 1000) {
      return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
        maximumFractionDigits: 1
      }).format(value / 1000) + 'K';
    } else {
      return formatCurrency(value);
    }
  };

  // Determinar clase de color según estado
  const getEstadoColorClass = (estado: string): string => {
    switch (estado) {
      case 'Completado':
        return 'bg-green-500';
      case 'En proceso':
      case 'En progreso':
        return 'bg-blue-500';
      case 'Iniciado':
        return 'bg-amber-500';
      case 'Suspendido':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Obtener icono según tipo de movimiento
  const getMovimientoIcon = (tipo: 'Ingreso' | 'Egreso') => {
    return tipo === 'Ingreso' 
      ? <TrendingUp className="h-4 w-4 text-green-500" /> 
      : <TrendingDown className="h-4 w-4 text-red-500" />;
  };

  // Obtener icono según categoría de movimiento
  const getCategoriaIcon = (categoria?: string) => {
    switch (categoria) {
      case 'Docencia':
        return <Building2 className="h-4 w-4" />;
      case 'Investigación':
        return <Microscope className="h-4 w-4" />;
      case 'Administrativos':
        return <Wallet className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  // Obtener variant de badge según estado
  const getBadgeVariant = (estado: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (estado) {
      case 'Completado':
        return 'default';
      case 'En proceso':
      case 'En progreso':
      case 'Iniciado':
        return 'secondary';
      case 'Suspendido':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  // Renderizar indicador de tendencia
  const renderTendencia = (valor: number, claseAdicional: string = '') => {
    return (
      <div className={`flex items-center ${valor >= 0 ? 'text-green-600' : 'text-red-600'} ${claseAdicional}`}>
        {valor >= 0 ? <ArrowUp className="h-3 w-3 mr-0.5" /> : <ArrowDown className="h-3 w-3 mr-0.5" />}
        {Math.abs(valor)}%
      </div>
    );
  };

  return (
    <div className="grid gap-3 sm:gap-6">
      {/* Header con selección de periodo */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h2 className="sm:text-xl md:text-xl font-semibold">Contabilidad</h2>
          <p className="text-sm text-muted-foreground">Panel de gestión contable y financiera</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xs text-muted-foreground mr-2">Periodo:</div>
          <div className="flex border rounded-md overflow-hidden">
            {opcionesPeriodo.map((opcion) => (
              <button
                key={opcion.valor}
                className={`px-2 py-1 text-xs ${periodoSeleccionado === opcion.valor 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-background hover:bg-accent'}`}
                onClick={() => setPeriodoSeleccionado(opcion.valor as any)}
              >
                {opcion.etiqueta}
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm" title="Actualizar datos">
            <RefreshCw className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid gap-2 sm:gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-0 sm:py-0">
          <CardHeader className="p-3 pb-1 sm:pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xs sm:text-sm md:text-base font-medium">Ingresos Totales</CardTitle>
                <CardDescription className="text-xs sm:text-sm md:text-base text-muted-foreground">Mes actual</CardDescription>
              </div>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="p-3">
            <div className="flex items-baseline justify-between">
              <div className="text-lg sm:text-2xl font-bold">{formatCurrencyShort(estadisticas.ingresosTotales)}</div>
              {renderTendencia(estadisticas.ingresosDiferenciaMes, 'text-[10px] sm:text-xs')}
            </div>
          </CardContent>
        </Card>
        
        <Card className="p-0 sm:py-0">
          <CardHeader className="p-3 pb-1 sm:pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xs sm:text-sm md:text-base font-medium">Docencia</CardTitle>
                <CardDescription className="text-xs sm:text-sm md:text-base text-muted-foreground">Mes actual</CardDescription>
              </div>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="p-3">
            <div className="text-lg sm:text-2xl font-bold">{formatCurrencyShort(estadisticas.docencia)}</div>
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              {estadisticas.docenciaPorcentaje}% del total
            </p>
          </CardContent>
        </Card>
        
        <Card className="p-0 sm:py-0">
          <CardHeader className="p-3 pb-1 sm:pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xs sm:text-sm md:text-base font-medium">Investigación</CardTitle>
                <CardDescription className="text-xs sm:text-sm md:text-base text-muted-foreground">Mes actual</CardDescription>
              </div>
              <Microscope className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="p-3">
            <div className="text-lg sm:text-2xl font-bold">{formatCurrencyShort(estadisticas.investigacion)}</div>
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              {estadisticas.investigacionPorcentaje}% del total
            </p>
          </CardContent>
        </Card>
        
        <Card className="p-0 sm:py-0">
          <CardHeader className="p-3 pb-1 sm:pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xs sm:text-sm md:text-base font-medium">Administrativos</CardTitle>
                <CardDescription className="text-xs sm:text-sm md:text-base text-muted-foreground">Mes actual</CardDescription>
              </div>
              <BadgeCheck className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="p-3">
            <div className="text-lg sm:text-2xl font-bold">{formatCurrencyShort(estadisticas.administrativos)}</div>
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              {estadisticas.administrativosPorcentaje}% del total
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Movimientos recientes - Tabs para móvil */}
      <Card className="md:hidden">
        <CardHeader className="p-3 pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-sm">Movimientos Recientes</CardTitle>
            <Button variant="ghost" size="sm" className="h-7 px-2">
              <Search className="h-3.5 w-3.5" />
            </Button>
          </div>
          <div className="flex space-x-1 pt-1">
            <Button 
              variant={tabActiva === 'todos' ? 'default' : 'outline'} 
              size="sm" 
              className="text-[10px] h-6 px-2"
              onClick={() => setTabActiva('todos')}
            >
              Todos
            </Button>
            <Button 
              variant={tabActiva === 'ingresos' ? 'default' : 'outline'} 
              size="sm" 
              className="text-[10px] h-6 px-2"
              onClick={() => setTabActiva('ingresos')}
            >
              Ingresos
            </Button>
            <Button 
              variant={tabActiva === 'egresos' ? 'default' : 'outline'} 
              size="sm" 
              className="text-[10px] h-6 px-2"
              onClick={() => setTabActiva('egresos')}
            >
              Egresos
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {filtrarMovimientos().slice(0, 3).map((movimiento) => (
              <div 
                key={movimiento.id} 
                className="p-3 flex items-start justify-between"
              >
                <div className="flex gap-2">
                  <div className={`rounded-full p-1 flex-shrink-0 ${movimiento.tipo === 'Ingreso' ? 'bg-green-100' : 'bg-red-100'}`}>
                    {getCategoriaIcon(movimiento.categoria)}
                  </div>
                  <div>
                    <div className="text-xs font-medium">{movimiento.concepto}</div>
                    <div className="text-[10px] text-muted-foreground">{movimiento.beneficiario}</div>
                    <div className="text-[10px] flex items-center text-muted-foreground mt-1">
                      <Calendar className="h-2.5 w-2.5 mr-1" />
                      {movimiento.fecha}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-xs font-medium ${movimiento.tipo === 'Ingreso' ? 'text-green-600' : 'text-red-600'}`}>
                    {movimiento.tipo === 'Ingreso' ? '+' : '-'}{formatCurrencyShort(movimiento.importe)}
                  </div>
                  <Button variant="ghost" size="sm" className="h-6 p-0 text-[10px] mt-1">
                    Ver <ChevronRight className="h-3 w-3 ml-0.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full text-[10px] h-7"
            >
              Ver todos
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Partidas contables - Versión móvil */}
      <Card className="md:hidden">
        <CardHeader className="p-3 pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-sm">Partidas Contables</CardTitle>
            <Button variant="ghost" size="sm" className="h-7 px-2" title="Exportar">
              <Download className="h-3.5 w-3.5" />
            </Button>
          </div>
          <CardDescription className="text-[10px]">Estado de partidas</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {partidasContables.slice(0, 3).map((partida) => (
              <div 
                key={partida.id} 
                className="p-3"
              >
                <div className="flex justify-between mb-1">
                  <div className="text-xs font-medium">{partida.nombre}</div>
                  <Badge variant={getBadgeVariant(partida.estado)} className="text-[9px] h-4">
                    {partida.estado}
                  </Badge>
                </div>
                <div className="text-[10px] flex items-center justify-between text-muted-foreground mb-1.5">
                  <span>Presupuesto: {formatCurrencyShort(partida.monto)}</span>
                  <span>Ejecutado: {formatCurrencyShort(partida.ejecutado)}</span>
                </div>
                <div className="relative pt-1">
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${getEstadoColorClass(partida.estado)}`}
                      style={{ width: `${partida.porcentaje}%` }}
                    />
                  </div>
                  <div className="flex justify-end mt-1">
                    <span className="text-[10px] text-muted-foreground">{partida.porcentaje}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full text-[10px] h-7"
            >
              Ver todas
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Distribución del Presupuesto - Gráfico interactivo */}
      <DistribucionPresupuestoChart />
            {/* Acceso rápido - Versión móvil */}
            <div className="md:hidden">
        <Card>
          <CardHeader className="p-3 pb-2">
            <CardTitle className="text-sm">Acceso rápido</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="grid grid-cols-4 gap-2">
              <Button variant="outline" className="h-auto py-3 flex flex-col text-[10px]">
                <BookOpenText className="h-4 w-4 mb-1" />
                <span>Libros</span>
              </Button>
              <Button variant="outline" className="h-auto py-3 flex flex-col text-[10px]">
                <FileText className="h-4 w-4 mb-1" />
                <span>Reportes</span>
              </Button>
              <Button variant="outline" className="h-auto py-3 flex flex-col text-[10px]">
                <BarChartIcon className="h-4 w-4 mb-1" />
                <span>Análisis</span>
              </Button>
              <Button variant="outline" className="h-auto py-3 flex flex-col text-[10px]">
                <FileSpreadsheet className="h-4 w-4 mb-1" />
                <span>Estados</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Movimientos recientes y Partidas contables - Versión desktop */}
      <div className="hidden md:grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Movimientos recientes */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Movimientos Recientes</CardTitle>
                <CardDescription>Últimas transacciones</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-8">
                  <PlusCircle className="h-3.5 w-3.5 mr-2" />
                  Nuevo
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2" title="Exportar datos">
                  <Download className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
            <div className="flex space-x-1 pt-2">
              <Button 
                variant={tabActiva === 'todos' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setTabActiva('todos')}
              >
                Todos
              </Button>
              <Button 
                variant={tabActiva === 'ingresos' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setTabActiva('ingresos')}
              >
                Ingresos
              </Button>
              <Button 
                variant={tabActiva === 'egresos' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setTabActiva('egresos')}
              >
                Egresos
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Concepto</TableHead>
                  <TableHead className="hidden sm:table-cell">Beneficiario</TableHead>
                  <TableHead>Importe</TableHead>
                  <TableHead className="hidden md:table-cell">Fecha</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtrarMovimientos().map((movimiento) => (
                  <TableRow key={movimiento.id}>
                    <TableCell className="w-12">
                      <div className={`rounded-full p-1 ${movimiento.tipo === 'Ingreso' ? 'bg-green-100' : 'bg-red-100'}`}>
                        {getCategoriaIcon(movimiento.categoria)}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span>{movimiento.concepto}</span>
                        <span className="text-xs text-muted-foreground md:hidden">{movimiento.beneficiario}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">{movimiento.beneficiario}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={movimiento.tipo === 'Ingreso' ? 'default' : 'destructive'}
                        className="font-medium"
                      >
                        {movimiento.tipo === 'Ingreso' ? '+' : '-'}{formatCurrency(movimiento.importe)}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{movimiento.fecha}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="h-8">
                        Ver detalles
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="border-t px-6 py-3">
            <Button variant="outline" size="sm" className="ml-auto">
              Ver todos los movimientos
            </Button>
          </CardFooter>
        </Card>
        
        {/* Partidas contables */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Partidas Contables</CardTitle>
                <CardDescription>Estado de partidas</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="h-8" title="Exportar a Excel">
                <FileSpreadsheet className="h-3.5 w-3.5 mr-2" />
                Exportar
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {partidasContables.map((partida) => (
                <div key={partida.id} className="border-b pb-3">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-sm">{partida.nombre}</p>
                    <Badge 
                      variant={getBadgeVariant(partida.estado)}
                    >
                      {partida.estado}
                    </Badge>
                  </div>
                  
                  <div className="text-sm text-muted-foreground flex items-center justify-between mb-2">
                    <span>Presupuesto: {formatCurrency(partida.monto)}</span>
                    <span>Ejecutado: {formatCurrency(partida.ejecutado)}</span>
                  </div>
                  
                  <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                    <div 
                      className={`h-full ${getEstadoColorClass(partida.estado)}`} 
                      style={{ width: `${partida.porcentaje}%` }}
                    />
                  </div>
                  <div className="flex justify-end mt-1">
                    <span className="text-xs text-muted-foreground">{partida.porcentaje}% completado</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-3">
            <Button variant="outline" size="sm" className="ml-auto">
              Ver todas las partidas
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Acceso rápido y distribución de ingresos - Versión desktop */}
      <div className="hidden md:grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Acceso rápido */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Acceso rápido</CardTitle>
            <CardDescription>Funciones comunes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-auto py-4 flex flex-col">
                <BookOpenText className="h-5 w-5 mb-2" />
                <span className="text-xs">Libros contables</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col">
                <FileText className="h-5 w-5 mb-2" />
                <span className="text-xs">Reportes financieros</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col">
                <BarChartIcon className="h-5 w-5 mb-2" />
                <span className="text-xs">Análisis presupuestal</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col">
                <FileSpreadsheet className="h-5 w-5 mb-2" />
                <span className="text-xs">Estados financieros</span>
              </Button>
            </div>
            <Separator className="my-4" />
            <div className="rounded-md border p-3">
              <h4 className="text-sm font-medium mb-2">Reportes rápidos</h4>
              <div className="space-y-2 text-sm">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Informe mensual de ingresos
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Reporte de balance general
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Estado de resultados
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Distribución de ingresos para desktop se maneja en la estructura común */}
        <Card className="hidden md:flex lg:col-span-2 flex-col">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Proyectos destacados</CardTitle>
                <CardDescription>Proyectos de mayor presupuesto</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="h-8">
                <ExternalLink className="h-3.5 w-3.5 mr-2" />
                Ver todos
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="space-y-4">
              {proyectosInvestigacion.slice(0, 3).map((proyecto) => (
                <div key={proyecto.id} className="border-b pb-3">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-sm">{proyecto.nombre}</p>
                    <p className="text-sm font-medium">{formatCurrency(proyecto.monto)}</p>
                  </div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Director: {proyecto.director}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={getBadgeVariant(proyecto.estado)}>
                      {proyecto.estado}
                    </Badge>
                    <span className="text-xs flex items-center text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {proyecto.fechaInicio} - {proyecto.fechaFin}
                    </span>
                  </div>
                  <div className="relative pt-1">
                    <div className="text-xs text-muted-foreground mb-1 flex justify-between">
                      <span>Avance:</span>
                      <span>{proyecto.avance}%</span>
                    </div>
                    <Progress value={proyecto.avance} className="h-1.5" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Proyectos de investigación - Versión móvil */}
      <Card className="md:hidden">
        <CardHeader className="p-3 pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-sm">Proyectos de Investigación</CardTitle>
            <Button variant="ghost" size="sm" className="h-7 px-2">
              <Plus className="h-3.5 w-3.5" />
            </Button>
          </div>
          <CardDescription className="text-[10px]">Proyectos activos</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {proyectosInvestigacion.slice(0, 3).map((proyecto) => (
              <div 
                key={proyecto.id} 
                className="p-3"
              >
                <div className="flex items-start justify-between mb-1">
                  <div className="flex-1">
                    <div className="text-xs font-medium">{proyecto.nombre}</div>
                    <div className="text-[10px] text-muted-foreground">{proyecto.director}</div>
                  </div>
                  <Badge 
                    variant={getBadgeVariant(proyecto.estado)}
                    className="text-[9px] h-4 ml-2"
                  >
                    {proyecto.estado}
                  </Badge>
                </div>
                <div className="flex justify-between text-[10px] text-muted-foreground mb-1.5">
                  <span>Presupuesto: {formatCurrencyShort(proyecto.monto)}</span>
                  <span>Avance: {proyecto.avance}%</span>
                </div>
                <div className="relative pt-1">
                  <Progress value={proyecto.avance} className="h-1.5" />
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full text-[10px] h-7"
            >
              Ver todos los proyectos
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Proyectos de investigación - Versión desktop */}
      <Card className="hidden md:block">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Proyectos de Investigación</CardTitle>
              <CardDescription>Proyectos activos con financiamiento</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="h-8">
              <PlusCircle className="h-3.5 w-3.5 mr-2" />
              Nuevo proyecto
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre del Proyecto</TableHead>
                <TableHead className="hidden sm:table-cell">Director</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead className="hidden md:table-cell">Estado</TableHead>
                <TableHead>Avance</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {proyectosInvestigacion.map((proyecto) => (
                <TableRow key={proyecto.id}>
                  <TableCell className="font-medium">{proyecto.nombre}</TableCell>
                  <TableCell className="hidden sm:table-cell">{proyecto.director}</TableCell>
                  <TableCell>{formatCurrency(proyecto.monto)}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant={getBadgeVariant(proyecto.estado)}>
                      {proyecto.estado}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={proyecto.avance} className="h-2 flex-1" />
                      <span className="text-xs">{proyecto.avance}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Detalles
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="border-t px-6 py-3">
          <Button variant="outline" size="sm" className="ml-auto">
            Ver todos los proyectos
          </Button>
        </CardFooter>
      </Card>
      
      {/* Componente de visualización de datos interactivo (versión escritorio) */}
      <div className="hidden lg:block">
        <AnalisisFinancieroChart />
      </div>
    </div>
  );
};

export default ContabilidadModule;