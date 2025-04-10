"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { 
  DollarSign, 
  FileText, 
  Users, 
  BarChart,
  Plus,
  ChevronRight,
  Clock,
  AlertCircle,
  Calendar,
  ArrowUp
} from 'lucide-react';

const EgresosModule = () => {
  // Datos simulados para estadísticas
  const estadisticas = {
    egresosTotales: 12854632.75,
    egresosDiferenciaMes: 5.2,
    nomina: 8437521.43,
    nominaPorcentaje: 65.6,
    proveedores: 3254876.18,
    proveedoresPorcentaje: 25.3,
    otros: 1162235.14,
    otrosPorcentaje: 9.1
  };

  // Egresos recientes
  const egresosRecientes = [
    { id: 1, concepto: 'Nómina Quincenal', beneficiario: 'Empleados UAN', importe: 4218765.32, fecha: '15/03/2025' },
    { id: 2, concepto: 'Pago Electricidad', beneficiario: 'CFE', importe: 387452.12, fecha: '10/03/2025' },
    { id: 3, concepto: 'Material de Oficina', beneficiario: 'Papelería Central S.A.', importe: 128745.50, fecha: '08/03/2025' },
    { id: 4, concepto: 'Servicio de Internet', beneficiario: 'Telmex', importe: 45876.25, fecha: '05/03/2025' },
  ];

  // Pagos pendientes
  const pagosPendientes = [
    { id: 1, concepto: 'Nómina Quincenal', importe: 4225432.18, fecha: '31/03/2025', estatus: 'Programado' },
    { id: 2, concepto: 'Pago a Proveedores', importe: 783542.20, fecha: '27/03/2025', estatus: 'Pendiente Autorización' },
    { id: 3, concepto: 'Impuestos ISR', importe: 1458275.34, fecha: '17/04/2025', estatus: 'Programado' },
    { id: 4, concepto: 'Pago IMSS', importe: 875432.19, fecha: '17/04/2025', estatus: 'Programado' },
  ];

  // Distribución de egresos
  const distribucionEgresos = [
    { 
      categoria: 'Nómina', 
      color: 'bg-primary', 
      importe: estadisticas.nomina, 
      porcentaje: estadisticas.nominaPorcentaje 
    },
    { 
      categoria: 'Proveedores', 
      color: 'bg-blue-500', 
      importe: estadisticas.proveedores, 
      porcentaje: estadisticas.proveedoresPorcentaje 
    },
    { 
      categoria: 'Servicios', 
      color: 'bg-green-500', 
      importe: 745368.27, 
      porcentaje: 5.8 
    },
    { 
      categoria: 'Impuestos', 
      color: 'bg-amber-500', 
      importe: 318754.63, 
      porcentaje: 2.5 
    },
    { 
      categoria: 'Otros', 
      color: 'bg-purple-500', 
      importe: 98112.24, 
      porcentaje: 0.8 
    }
  ];

  // Formato de moneda
  const formatCurrency = (value:any) => {
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="sm:text-xl md:text-xl font-semibold">Egresos</h1>
          <p className="text-sm text-muted-foreground">Panel de control de pagos y egresos institucionales</p>
        </div>
      </div>
      {/* Tarjetas de estadísticas de egresos - Versión optimizada para móvil */}
      <div className="grid gap-2 sm:gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-0 sm:py-0">
          <CardHeader className="p-3 pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm md:text-base font-medium">Egresos Totales</CardTitle>
            <CardDescription className="text-xs sm:text-sm md:text-base text-muted-foreground">Mes actual</CardDescription>
          </CardHeader>
          <CardContent className="p-3">
            <div className="flex items-baseline justify-between">
              <div className="text-lg sm:text-2xl font-bold">{formatCurrencyShort(estadisticas.egresosTotales)}</div>
              <div className="flex items-center text-[10px] sm:text-xs text-green-600">
                <ArrowUp className="h-3 w-3 mr-0.5" />
                {estadisticas.egresosDiferenciaMes}%
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="p-0 sm:py-0">
          <CardHeader className="p-3 pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm md:text-base font-medium">Nómina</CardTitle>
            <CardDescription className="text-xs sm:text-sm md:text-base text-muted-foreground">Mes actual</CardDescription>
          </CardHeader>
          <CardContent className="p-3">
            <div className="text-lg sm:text-2xl font-bold">{formatCurrencyShort(estadisticas.nomina)}</div>
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              {estadisticas.nominaPorcentaje}% del total
            </p>
          </CardContent>
        </Card>
        
        <Card className="p-0 sm:py-0">
          <CardHeader className="p-3 pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm md:text-base font-medium">Proveedores</CardTitle>
            <CardDescription className="text-xs sm:text-sm md:text-base text-muted-foreground">Mes actual</CardDescription>
          </CardHeader>
          <CardContent className="p-3">
            <div className="text-lg sm:text-2xl font-bold">{formatCurrencyShort(estadisticas.proveedores)}</div>
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              {estadisticas.proveedoresPorcentaje}% del total
            </p>
          </CardContent>
        </Card>
        
        <Card className="p-0 sm:py-0">
          <CardHeader className="p-3 pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm md:text-base font-medium">Otros</CardTitle>
            <CardDescription className="text-xs sm:text-sm md:text-base text-muted-foreground">Mes actual</CardDescription>
          </CardHeader>
          <CardContent className="p-3">
            <div className="text-lg sm:text-2xl font-bold">{formatCurrencyShort(estadisticas.otros)}</div>
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              {estadisticas.otrosPorcentaje}% del total
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Egresos recientes - Versión móvil */}
      <Card className="md:hidden">
        <CardHeader className="p-3 pb-2">
          <CardTitle className="text-sm">Egresos Recientes</CardTitle>
          <CardDescription className="text-[10px]">Últimos pagos</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {egresosRecientes.slice(0, 3).map((egreso) => (
              <div 
                key={egreso.id} 
                className="p-3 flex items-start justify-between"
              >
                <div>
                  <div className="text-xs font-medium">{egreso.concepto}</div>
                  <div className="text-[10px] text-muted-foreground">{egreso.beneficiario}</div>
                  <div className="text-[10px] flex items-center text-muted-foreground mt-1">
                    <Calendar className="h-2.5 w-2.5 mr-1" />
                    {egreso.fecha}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-medium">{formatCurrencyShort(egreso.importe)}</div>
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
      
      {/* Pagos pendientes - Versión móvil */}
      <Card className="md:hidden">
        <CardHeader className="p-3 pb-2">
          <CardTitle className="text-sm">Pagos Pendientes</CardTitle>
          <CardDescription className="text-[10px]">Próximos pagos</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {pagosPendientes.slice(0, 3).map((pago) => (
              <div 
                key={pago.id} 
                className="p-3 flex items-start justify-between"
              >
                <div>
                  <div className="text-xs font-medium">{pago.concepto}</div>
                  <div className="text-[10px] flex items-center text-muted-foreground mt-1">
                    <Clock className="h-2.5 w-2.5 mr-1" />
                    {pago.fecha}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-medium">{formatCurrencyShort(pago.importe)}</div>
                  <Badge 
                    variant={pago.estatus === 'Programado' ? 'outline' : 'secondary'}
                    className="text-[9px] h-4 mt-1"
                  >
                    {pago.estatus}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 p-3 border-t">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full text-[10px] h-7"
            >
              <Plus className="h-3 w-3 mr-1" />
              Nuevo pago
            </Button>
          </div>
          <div className="p-3">
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
      
      {/* Distribución de egresos - Versión móvil */}
      <Card>
        <CardHeader className="p-3 pb-2 sm:p-6 sm:pb-6">
          <CardTitle className="text-sm sm:text-base">Distribución de Egresos</CardTitle>
          <CardDescription className="text-[10px] sm:text-sm">Mes actual</CardDescription>
        </CardHeader>
        <CardContent className="p-3 pt-0 sm:p-6">
          <div className="space-y-3 sm:space-y-4">
            {distribucionEgresos.map((item, index) => (
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
                <DollarSign className="h-4 w-4 mb-1" />
                <span>Nuevo pago</span>
              </Button>
              <Button variant="outline" className="h-auto py-3 flex flex-col text-[10px]">
                <FileText className="h-4 w-4 mb-1" />
                <span>Reporte</span>
              </Button>
              <Button variant="outline" className="h-auto py-3 flex flex-col text-[10px]">
                <Users className="h-4 w-4 mb-1" />
                <span>Proveedores</span>
              </Button>
              <Button variant="outline" className="h-auto py-3 flex flex-col text-[10px]">
                <BarChart className="h-4 w-4 mb-1" />
                <span>Estadísticas</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Egresos recientes y pagos pendientes - Versión desktop */}
      <div className="hidden md:grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Egresos recientes */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Egresos Recientes</CardTitle>
            <CardDescription>Últimos pagos realizados</CardDescription>
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
                {egresosRecientes.map((egreso) => (
                  <TableRow key={egreso.id}>
                    <TableCell className="font-medium">{egreso.concepto}</TableCell>
                    <TableCell className="hidden sm:table-cell">{egreso.beneficiario}</TableCell>
                    <TableCell>{formatCurrency(egreso.importe)}</TableCell>
                    <TableCell className="hidden md:table-cell">{egreso.fecha}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Ver detalle</Button>
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
        
        {/* Pagos pendientes */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Pagos Pendientes</CardTitle>
            <CardDescription>Próximos egresos programados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pagosPendientes.map((pago) => (
                <div key={pago.id} className="flex items-center justify-between border-b pb-3">
                  <div>
                    <p className="font-medium text-sm">{pago.concepto}</p>
                    <p className="text-sm text-muted-foreground">{pago.fecha}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">{formatCurrency(pago.importe)}</p>
                    <Badge variant={pago.estatus === 'Programado' ? 'outline' : 'secondary'}>
                      {pago.estatus}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-3">
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo pago
            </Button>
            <Button variant="outline" size="sm" className="ml-auto">
              Ver todos
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Acceso rápido y distribución de egresos - Versión desktop */}
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
                <DollarSign className="h-5 w-5 mb-2" />
                <span className="text-xs">Nuevo pago</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col">
                <FileText className="h-5 w-5 mb-2" />
                <span className="text-xs">Generar reporte</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col">
                <Users className="h-5 w-5 mb-2" />
                <span className="text-xs">Proveedores</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col">
                <BarChart className="h-5 w-5 mb-2" />
                <span className="text-xs">Estadísticas</span>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Distribución de egresos */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Distribución de Egresos</CardTitle>
            <CardDescription>Distribución por categoría (mes actual)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {distribucionEgresos.map((item, index) => (
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

      {/* Proveedores frecuentes - Versión móvil */}
      <Card className="md:hidden">
        <CardHeader className="p-3 pb-2">
          <CardTitle className="text-sm">Proveedores Frecuentes</CardTitle>
          <CardDescription className="text-[10px]">Pagos frecuentes</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {[
              { id: 1, proveedor: 'CFE', rfc: 'CFE370814QI0', acumulado: 1245678.25, ultimo: '10/03/2025' },
              { id: 2, proveedor: 'Papelería Central S.A.', rfc: 'PCS981123XYZ', acumulado: 387450.86, ultimo: '08/03/2025' },
              { id: 3, proveedor: 'Telmex', rfc: 'TME840315KT6', acumulado: 134567.72, ultimo: '05/03/2025' },
            ].map((proveedor) => (
              <div 
                key={proveedor.id} 
                className="p-3 flex items-start justify-between"
              >
                <div>
                  <div className="text-xs font-medium">{proveedor.proveedor}</div>
                  <div className="text-[10px] text-muted-foreground">{proveedor.rfc}</div>
                  <div className="text-[10px] flex items-center text-muted-foreground mt-1">
                    <Calendar className="h-2.5 w-2.5 mr-1" />
                    Último: {proveedor.ultimo}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-medium">{formatCurrencyShort(proveedor.acumulado)}</div>
                  <Button variant="ghost" size="sm" className="h-6 p-0 text-[10px] mt-1">
                    Ver pagos <ChevronRight className="h-3 w-3 ml-0.5" />
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
              Ver todos los proveedores
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de proveedores frecuentes - Versión desktop */}
      <Card className="hidden md:block">
        <CardHeader>
          <CardTitle>Proveedores Frecuentes</CardTitle>
          <CardDescription>Proveedores con pagos frecuentes</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Proveedor</TableHead>
                <TableHead className="hidden sm:table-cell">RFC</TableHead>
                <TableHead>Pagos acumulados</TableHead>
                <TableHead className="hidden md:table-cell">Último pago</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { id: 1, proveedor: 'CFE', rfc: 'CFE370814QI0', acumulado: 1245678.25, ultimo: '10/03/2025' },
                { id: 2, proveedor: 'Papelería Central S.A.', rfc: 'PCS981123XYZ', acumulado: 387450.86, ultimo: '08/03/2025' },
                { id: 3, proveedor: 'Telmex', rfc: 'TME840315KT6', acumulado: 134567.72, ultimo: '05/03/2025' },
                { id: 4, proveedor: 'Autoservicio de Limpieza S.A.', rfc: 'ALS051212ABC', acumulado: 98764.35, ultimo: '02/03/2025' },
              ].map((proveedor) => (
                <TableRow key={proveedor.id}>
                  <TableCell className="font-medium">{proveedor.proveedor}</TableCell>
                  <TableCell className="hidden sm:table-cell">{proveedor.rfc}</TableCell>
                  <TableCell>{formatCurrency(proveedor.acumulado)}</TableCell>
                  <TableCell className="hidden md:table-cell">{proveedor.ultimo}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Ver pagos</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="border-t px-6 py-3">
          <Button variant="outline" size="sm" className="ml-auto">
            Ver todos los proveedores
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EgresosModule;