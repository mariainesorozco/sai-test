"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  DollarSign, 
  FileText, 
  Users, 
  BarChart,
  Plus
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

  return (
    <div className="grid gap-6">
      {/* Tarjetas de estadísticas de egresos */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Egresos Totales</CardTitle>
            <CardDescription>Mes actual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(estadisticas.egresosTotales)}</div>
            <p className="text-xs text-muted-foreground">
              +{estadisticas.egresosDiferenciaMes}% respecto al mes anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Nómina</CardTitle>
            <CardDescription>Mes actual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(estadisticas.nomina)}</div>
            <p className="text-xs text-muted-foreground">
              {estadisticas.nominaPorcentaje}% del total de egresos
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Proveedores</CardTitle>
            <CardDescription>Mes actual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(estadisticas.proveedores)}</div>
            <p className="text-xs text-muted-foreground">
              {estadisticas.proveedoresPorcentaje}% del total de egresos
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Otros</CardTitle>
            <CardDescription>Mes actual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(estadisticas.otros)}</div>
            <p className="text-xs text-muted-foreground">
              {estadisticas.otrosPorcentaje}% del total de egresos
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Egresos recientes y pagos pendientes */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
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
      
      {/* Acceso rápido y distribución de egresos */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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

      {/* Tabla de proveedores frecuentes */}
      <Card>
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