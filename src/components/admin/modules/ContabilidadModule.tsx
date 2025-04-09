"use client";

// Importaciones de React y Next.js
import React from 'react';
import { useRouter } from 'next/navigation';

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
import { 
  BookOpenText, 
  FileSpreadsheet, 
  BarChart, 
  TrendingUp, 
  TrendingDown,
  Plus,
  Calendar,
  ChevronRight,
  Users,
  FileText,
  ArrowUp
} from 'lucide-react';

const ContabilidadModule = () => {
  const router = useRouter();

  // Datos simulados para estadísticas
  const estadisticas = {
    ingresosTotales: 52450000,
    ingresosDiferenciaMes: 7.3,
    investigacion: 5200000,
    investigacionPorcentaje: 9.9,
    docencia: 32750000,
    docenciaPorcentaje: 62.4,
    administrativos: 14500000,
    administrativosPorcentaje: 27.7
  };

  // Movimientos recientes
  const movimientosRecientes = [
    { 
      id: 1, 
      concepto: 'Ingreso Matrícula', 
      beneficiario: 'Alumnos UAN', 
      importe: 12500000, 
      fecha: '15/04/2025',
      tipo: 'Ingreso'
    },
    { 
      id: 2, 
      concepto: 'Subsidio Gubernamental', 
      beneficiario: 'Gobierno Estatal', 
      importe: 5600000, 
      fecha: '10/04/2025',
      tipo: 'Ingreso'
    },
    { 
      id: 3, 
      concepto: 'Pago Infraestructura', 
      beneficiario: 'Proveedores', 
      importe: -3750000, 
      fecha: '05/04/2025',
      tipo: 'Egreso'
    },
    { 
      id: 4, 
      concepto: 'Proyectos Investigación', 
      beneficiario: 'Departamento de Investigación', 
      importe: -2300000, 
      fecha: '02/04/2025',
      tipo: 'Egreso'
    }
  ];

  // Partidas contables
  const partidasContables = [
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
    }
  ];

  // Distribución de ingresos
  const distribucionIngresos = [
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
      importe: 445000, 
      porcentaje: 0.8 
    }
  ];

  // Formato de moneda
  const formatCurrency = (value: any) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2
    }).format(value);
  };

  // Formato abreviado para móviles
  const formatCurrencyShort = (value: any) => {
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

  return (
    <div className="grid gap-3 sm:gap-6">
      {/* Tarjetas de estadísticas */}
      <div className="grid gap-2 sm:gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-0 sm:py-0">
          <CardHeader className="p-3 pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Ingresos Totales</CardTitle>
            <CardDescription className="text-[10px] sm:text-xs">Mes actual</CardDescription>
          </CardHeader>
          <CardContent className="p-3">
            <div className="flex items-baseline justify-between">
              <div className="text-lg sm:text-2xl font-bold">{formatCurrencyShort(estadisticas.ingresosTotales)}</div>
              <div className="flex items-center text-[10px] sm:text-xs text-green-600">
                <ArrowUp className="h-3 w-3 mr-0.5" />
                {estadisticas.ingresosDiferenciaMes}%
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="p-0 sm:py-0">
          <CardHeader className="p-3 pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Docencia</CardTitle>
            <CardDescription className="text-[10px] sm:text-xs">Mes actual</CardDescription>
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
            <CardTitle className="text-xs sm:text-sm font-medium">Investigación</CardTitle>
            <CardDescription className="text-[10px] sm:text-xs">Mes actual</CardDescription>
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
            <CardTitle className="text-xs sm:text-sm font-medium">Administrativos</CardTitle>
            <CardDescription className="text-[10px] sm:text-xs">Mes actual</CardDescription>
          </CardHeader>
          <CardContent className="p-3">
            <div className="text-lg sm:text-2xl font-bold">{formatCurrencyShort(estadisticas.administrativos)}</div>
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              {estadisticas.administrativosPorcentaje}% del total
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Movimientos recientes - Versión móvil */}
      <Card className="md:hidden">
        <CardHeader className="p-3 pb-2">
          <CardTitle className="text-sm">Movimientos Recientes</CardTitle>
          <CardDescription className="text-[10px]">Últimas transacciones</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {movimientosRecientes.slice(0, 3).map((movimiento) => (
              <div 
                key={movimiento.id} 
                className="p-3 flex items-start justify-between"
              >
                <div>
                  <div className="text-xs font-medium">{movimiento.concepto}</div>
                  <div className="text-[10px] text-muted-foreground">{movimiento.beneficiario}</div>
                  <div className="text-[10px] flex items-center text-muted-foreground mt-1">
                    <Calendar className="h-2.5 w-2.5 mr-1" />
                    {movimiento.fecha}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-xs font-medium ${movimiento.tipo === 'Ingreso' ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrencyShort(movimiento.importe)}
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
          <CardTitle className="text-sm">Partidas Contables</CardTitle>
          <CardDescription className="text-[10px]">Estado de partidas</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {partidasContables.slice(0, 3).map((partida) => (
              <div 
                key={partida.id} 
                className="p-3 flex items-start justify-between"
              >
                <div>
                  <div className="text-xs font-medium">{partida.nombre}</div>
                  <div className="text-[10px] flex items-center text-muted-foreground mt-1">
                    Presupuesto: {formatCurrencyShort(partida.monto)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-medium">{formatCurrencyShort(partida.ejecutado)}</div>
                  <Badge 
                    variant={partida.estado === 'Completado' ? 'default' : 'secondary'}
                    className="text-[9px] h-4 mt-1"
                  >
                    {partida.estado}
                  </Badge>
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
      
      {/* Distribución de Ingresos */}
      <Card>
        <CardHeader className="p-3 pb-2 sm:p-6 sm:pb-6">
          <CardTitle className="text-sm sm:text-base">Distribución de Ingresos</CardTitle>
          <CardDescription className="text-[10px] sm:text-sm">Mes actual</CardDescription>
        </CardHeader>
        <CardContent className="p-3 pt-0 sm:p-6">
          <div className="space-y-3 sm:space-y-4">
            {distribucionIngresos.map((item, index) => (
              <div key={index} className="space-y-1 sm:space-y-2">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <div className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full ${item.color}`}></div>
                    <span className="font-medium">{item.categoria}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium hidden xs:inline">{formatCurrencyShort(item.importe)}</span>
                    <span className="text-muted-foreground">{item.porcentaje}%</span>
                  </div>
                </div>
                <div className="w-full h-1.5 sm:h-2 rounded-full bg-muted">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.porcentaje}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
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
                <BarChart className="h-4 w-4 mb-1" />
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
            <CardTitle>Movimientos Recientes</CardTitle>
            <CardDescription>Últimas transacciones</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Concepto</TableHead>
                  <TableHead className="hidden sm:table-cell">Beneficiario</TableHead>
                  <TableHead>Importe</TableHead>
                  <TableHead className="hidden md:table-cell">Fecha</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {movimientosRecientes.map((movimiento) => (
                  <TableRow key={movimiento.id}>
                    <TableCell className="font-medium">{movimiento.concepto}</TableCell>
                    <TableCell className="hidden sm:table-cell">{movimiento.beneficiario}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={movimiento.tipo === 'Ingreso' ? 'default' : 'destructive'}
                      >
                        {formatCurrency(movimiento.importe)}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{movimiento.fecha}</TableCell>
                    <TableCell className="text-right">
                      {movimiento.tipo === 'Ingreso' ? (
                        <TrendingUp className="h-4 w-4 text-green-500 inline-block" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500 inline-block" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="border-t px-6 py-3">
            <Button variant="outline" size="sm" className="ml-auto">
              Ver todos
            </Button>
          </CardFooter>
        </Card>
        
        {/* Partidas contables */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Partidas Contables</CardTitle>
            <CardDescription>Estado de partidas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {partidasContables.map((partida) => (
                <div key={partida.id} className="flex items-center justify-between border-b pb-3">
                  <div>
                    <p className="font-medium text-sm">{partida.nombre}</p>
                    <p className="text-sm text-muted-foreground">{formatCurrency(partida.monto)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">{formatCurrency(partida.ejecutado)}</p>
                    <Badge 
                      variant={partida.estado === 'Completado' ? 'default' : 'secondary'}
                    >
                      {partida.estado}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-3">
            <Button variant="outline" size="sm" className="ml-auto">
              Ver todos
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
                <span className="text-xs">Libros</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col">
                <FileText className="h-5 w-5 mb-2" />
                <span className="text-xs">Reportes</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col">
                <BarChart className="h-5 w-5 mb-2" />
                <span className="text-xs">Análisis</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col">
                <FileSpreadsheet className="h-5 w-5 mb-2" />
                <span className="text-xs">Estados</span>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Distribución de ingresos */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Distribución de Ingresos</CardTitle>
            <CardDescription>Distribución por categoría (mes actual)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {distribucionIngresos.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`h-3 w-3 rounded-full ${item.color}`}></div>
                      <span className="text-sm font-medium">{item.categoria}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{formatCurrency(item.importe)}</span>
                      <span className="text-sm text-muted-foreground">{item.porcentaje}%</span>
                    </div>
                  </div>
                  <div className="w-full h-2 rounded-full bg-muted">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.porcentaje}%` }}></div>
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
          <CardTitle className="text-sm">Proyectos de Investigación</CardTitle>
          <CardDescription className="text-[10px]">Proyectos activos</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {[
              { id: 1, nombre: 'Innovación Tecnológica', director: 'Dr. Juan Pérez', monto: 1200000, estado: 'En progreso' },
              { id: 2, nombre: 'Desarrollo Sustentable', director: 'Dra. María González', monto: 950000, estado: 'Iniciado' },
              { id: 3, nombre: 'Salud Comunitaria', director: 'Dr. Carlos Ramírez', monto: 750000, estado: 'En progreso' },
            ].map((proyecto) => (
              <div 
                key={proyecto.id} 
                className="p-3 flex items-start justify-between"
              >
                <div>
                  <div className="text-xs font-medium">{proyecto.nombre}</div>
                  <div className="text-[10px] text-muted-foreground">{proyecto.director}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-medium">{formatCurrencyShort(proyecto.monto)}</div>
                  <Badge 
                    variant={proyecto.estado === 'En progreso' ? 'default' : 'secondary'}
                    className="text-[9px] h-4 mt-1"
                  >
                    {proyecto.estado}
                  </Badge>
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
          <CardTitle>Proyectos de Investigación</CardTitle>
          <CardDescription>Proyectos activos</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre del Proyecto</TableHead>
                <TableHead className="hidden sm:table-cell">Director</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead className="hidden md:table-cell">Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { id: 1, nombre: 'Innovación Tecnológica', director: 'Dr. Juan Pérez', monto: 1200000, estado: 'En progreso' },
                { id: 2, nombre: 'Desarrollo Sustentable', director: 'Dra. María González', monto: 950000, estado: 'Iniciado' },
                { id: 3, nombre: 'Salud Comunitaria', director: 'Dr. Carlos Ramírez', monto: 750000, estado: 'En progreso' },
                { id: 4, nombre: 'Transformación Digital', director: 'Dra. Ana Martínez', monto: 600000, estado: 'Iniciado' },
              ].map((proyecto) => (
                <TableRow key={proyecto.id}>
                  <TableCell className="font-medium">{proyecto.nombre}</TableCell>
                  <TableCell className="hidden sm:table-cell">{proyecto.director}</TableCell>
                  <TableCell>{formatCurrency(proyecto.monto)}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge 
                      variant={proyecto.estado === 'En progreso' ? 'default' : 'secondary'}
                    >
                      {proyecto.estado}
                    </Badge>
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
    </div>
  );
};

export default ContabilidadModule;