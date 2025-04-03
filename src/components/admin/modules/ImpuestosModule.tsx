"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  FileText, 
  DollarSign, 
  Calendar, 
  BarChart,
  ChevronRight
} from 'lucide-react';

const ImpuestosModule = () => {
  // Datos simulados para estadísticas
  const estadisticas = {
    isrRetenido: 1458275.34,
    isrDiferenciaMes: 3.2,
    imss: 875432.19,
    imssDiferenciaMes: 2.1,
    infonavit: 563217.58,
    infonavitDiferenciaMes: 1.8,
    iva: 328975.42,
    ivaDiferenciaMes: -0.5
  };

  // Obligaciones fiscales próximas
  const obligacionesProximas = [
    { id: 1, obligacion: 'Declaración ISR', periodo: 'Marzo 2025', estatus: 'Pendiente', fecha: '17/04/2025' },
    { id: 2, obligacion: 'IMSS', periodo: 'Marzo 2025', estatus: 'Completado', fecha: '03/04/2025' },
    { id: 3, obligacion: 'Declaración IVA', periodo: 'Marzo 2025', estatus: 'Pendiente', fecha: '17/04/2025' },
    { id: 4, obligacion: 'Declaración anual', periodo: 'Ejercicio 2024', estatus: 'En proceso', fecha: '30/04/2025' },
  ];

  // Resumen de cumplimiento
  const resumenCumplimiento = {
    totalObligaciones: 25,
    cumplidas: 24,
    porcentajeCumplimiento: 96,
    pendientes: 1,
    vencidas: 0
  };

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
      {/* Tarjetas de estadísticas de impuestos */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">ISR Retenido</CardTitle>
            <CardDescription>Mes actual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(estadisticas.isrRetenido)}</div>
            <p className="text-xs text-muted-foreground">
              {estadisticas.isrDiferenciaMes >= 0 ? '+' : ''}{estadisticas.isrDiferenciaMes}% respecto al mes anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">IMSS</CardTitle>
            <CardDescription>Mes actual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(estadisticas.imss)}</div>
            <p className="text-xs text-muted-foreground">
              {estadisticas.imssDiferenciaMes >= 0 ? '+' : ''}{estadisticas.imssDiferenciaMes}% respecto al mes anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">INFONAVIT</CardTitle>
            <CardDescription>Mes actual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(estadisticas.infonavit)}</div>
            <p className="text-xs text-muted-foreground">
              {estadisticas.infonavitDiferenciaMes >= 0 ? '+' : ''}{estadisticas.infonavitDiferenciaMes}% respecto al mes anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">IVA</CardTitle>
            <CardDescription>Mes actual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(estadisticas.iva)}</div>
            <p className="text-xs text-muted-foreground">
              {estadisticas.ivaDiferenciaMes >= 0 ? '+' : ''}{estadisticas.ivaDiferenciaMes}% respecto al mes anterior
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Calendario fiscal y acceso rápido */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Calendario fiscal */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Calendario Fiscal</CardTitle>
            <CardDescription>Obligaciones próximas</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Obligación</TableHead>
                  <TableHead>Período</TableHead>
                  <TableHead className="hidden md:table-cell">Estatus</TableHead>
                  <TableHead>Fecha límite</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {obligacionesProximas.map((obligacion) => (
                  <TableRow key={obligacion.id}>
                    <TableCell className="font-medium">{obligacion.obligacion}</TableCell>
                    <TableCell>{obligacion.periodo}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant={
                        obligacion.estatus === 'Completado' ? 'default' : 
                        obligacion.estatus === 'En proceso' ? 'secondary' : 'outline'
                      }>
                        {obligacion.estatus}
                      </Badge>
                    </TableCell>
                    <TableCell>{obligacion.fecha}</TableCell>
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
              Ver calendario completo
            </Button>
          </CardFooter>
        </Card>
        
        {/* Acceso rápido */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Acceso rápido</CardTitle>
            <CardDescription>Funciones comunes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Generar constancias de retención
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Generar CFDI
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <DollarSign className="mr-2 h-4 w-4" />
                Cálculo de impuestos
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Consultar pagos realizados
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart className="mr-2 h-4 w-4" />
                Reportes fiscales
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Resumen de cumplimiento fiscal */}
      <Card>
        <CardHeader>
          <CardTitle>Resumen de Obligaciones Fiscales</CardTitle>
          <CardDescription>Estado actual de cumplimiento fiscal</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-2">
              <div className="text-4xl font-bold text-green-600">{resumenCumplimiento.porcentajeCumplimiento}%</div>
              <p className="text-sm font-medium">Obligaciones al corriente</p>
              <p className="text-xs text-muted-foreground text-center">
                {resumenCumplimiento.cumplidas} de {resumenCumplimiento.totalObligaciones} obligaciones fiscales cumplidas en tiempo y forma
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="text-4xl font-bold text-amber-500">{resumenCumplimiento.pendientes}</div>
              <p className="text-sm font-medium">Obligaciones pendientes</p>
              <p className="text-xs text-muted-foreground text-center">
                {resumenCumplimiento.pendientes} obligación fiscal pendiente de cumplir con fecha próxima
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="text-4xl font-bold text-red-600">{resumenCumplimiento.vencidas}</div>
              <p className="text-sm font-medium">Obligaciones vencidas</p>
              <p className="text-xs text-muted-foreground text-center">
                Sin obligaciones fiscales vencidas en el ejercicio actual
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de declaraciones recientes */}
      <Card>
        <CardHeader>
          <CardTitle>Declaraciones Recientes</CardTitle>
          <CardDescription>Últimas declaraciones presentadas</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo</TableHead>
                <TableHead>Periodo</TableHead>
                <TableHead className="hidden sm:table-cell">Fecha presentación</TableHead>
                <TableHead>Importe</TableHead>
                <TableHead className="hidden md:table-cell">Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { id: 1, tipo: 'Declaración ISR', periodo: 'Febrero 2025', fecha: '17/03/2025', importe: 1432865.26, estado: 'Presentada' },
                { id: 2, tipo: 'Declaración IVA', periodo: 'Febrero 2025', fecha: '17/03/2025', importe: 326548.92, estado: 'Presentada' },
                { id: 3, tipo: 'IMSS', periodo: 'Febrero 2025', fecha: '03/03/2025', importe: 868742.31, estado: 'Presentada' },
                { id: 4, tipo: 'INFONAVIT', periodo: 'Bimestre 1 2025', fecha: '15/03/2025', importe: 1125432.86, estado: 'Presentada' },
              ].map((declaracion) => (
                <TableRow key={declaracion.id}>
                  <TableCell className="font-medium">{declaracion.tipo}</TableCell>
                  <TableCell>{declaracion.periodo}</TableCell>
                  <TableCell className="hidden sm:table-cell">{declaracion.fecha}</TableCell>
                  <TableCell>{formatCurrency(declaracion.importe)}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="default">{declaracion.estado}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Ver acuse
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="border-t px-6 py-3">
          <Button variant="outline" size="sm" className="ml-auto">
            Ver historial completo
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ImpuestosModule;