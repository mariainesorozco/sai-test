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
  ChevronRight,
  ArrowUp,
  ArrowDown,
  Clock,
  AlertTriangle
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
  const formatCurrency = (value: any) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2
    }).format(value);
  };

  // Obtener versión abreviada de moneda para móviles
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
          <h1 className="sm:text-xl md:text-xl font-semibold">Impuestos</h1>
          <p className="text-sm text-muted-foreground">Panel de control de impuestos y obligaciones fiscales</p>
        </div>
      </div>
      {/* Tarjetas de estadísticas de impuestos - Versión Móvil Optimizada */}
      <div className="grid gap-2 sm:gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-0 sm:py-0">
          <CardHeader className="p-3 pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm md:text-base font-medium">ISR Retenido</CardTitle>
            <CardDescription className="text-xs sm:text-sm md:text-base text-muted-foreground">Mes actual</CardDescription>
          </CardHeader>
          <CardContent className="p-3">
            <div className="flex items-baseline justify-between">
              <div className="text-lg sm:text-2xl font-bold">{formatCurrencyShort(estadisticas.isrRetenido)}</div>
              <div className={`flex items-center text-[10px] sm:text-xs ${estadisticas.isrDiferenciaMes >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {estadisticas.isrDiferenciaMes >= 0 ? <ArrowUp className="h-3 w-3 mr-0.5" /> : <ArrowDown className="h-3 w-3 mr-0.5" />}
                {Math.abs(estadisticas.isrDiferenciaMes)}%
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="p-0 sm:py-0">
          <CardHeader className="p-3 pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm md:text-base font-medium">IMSS</CardTitle>
            <CardDescription className="text-xs sm:text-sm md:text-base text-muted-foreground">Mes actual</CardDescription>
          </CardHeader>
          <CardContent className="p-3">
            <div className="flex items-baseline justify-between">
              <div className="text-lg sm:text-2xl font-bold">{formatCurrencyShort(estadisticas.imss)}</div>
              <div className={`flex items-center text-[10px] sm:text-xs ${estadisticas.imssDiferenciaMes >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {estadisticas.imssDiferenciaMes >= 0 ? <ArrowUp className="h-3 w-3 mr-0.5" /> : <ArrowDown className="h-3 w-3 mr-0.5" />}
                {Math.abs(estadisticas.imssDiferenciaMes)}%
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="p-0 sm:py-0">
          <CardHeader className="p-3 pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm md:text-base font-medium">INFONAVIT</CardTitle>
            <CardDescription className="text-xs sm:text-sm md:text-base text-muted-foreground">Mes actual</CardDescription>
          </CardHeader>
          <CardContent className="p-3">
            <div className="flex items-baseline justify-between">
              <div className="text-lg sm:text-2xl font-bold">{formatCurrencyShort(estadisticas.infonavit)}</div>
              <div className={`flex items-center text-[10px] sm:text-xs ${estadisticas.infonavitDiferenciaMes >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {estadisticas.infonavitDiferenciaMes >= 0 ? <ArrowUp className="h-3 w-3 mr-0.5" /> : <ArrowDown className="h-3 w-3 mr-0.5" />}
                {Math.abs(estadisticas.infonavitDiferenciaMes)}%
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="p-0 sm:py-0">
          <CardHeader className="p-3 pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm md:text-base font-medium">IVA</CardTitle>
            <CardDescription className="text-xs sm:text-sm md:text-base text-muted-foreground">Mes actual</CardDescription>
          </CardHeader>
          <CardContent className="p-3">
            <div className="flex items-baseline justify-between">
              <div className="text-lg sm:text-2xl font-bold">{formatCurrencyShort(estadisticas.iva)}</div>
              <div className={`flex items-center text-[10px] sm:text-xs ${estadisticas.ivaDiferenciaMes >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {estadisticas.ivaDiferenciaMes >= 0 ? <ArrowUp className="h-3 w-3 mr-0.5" /> : <ArrowDown className="h-3 w-3 mr-0.5" />}
                {Math.abs(estadisticas.ivaDiferenciaMes)}%
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Obligaciones fiscales próximas - Versión móvil */}
      <Card className="md:hidden">
        <CardHeader className="p-3 pb-2">
          <CardTitle className="text-sm">Obligaciones Próximas</CardTitle>
          <CardDescription className="text-[10px]">Próximas fechas</CardDescription>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <div className="divide-y">
            {obligacionesProximas.slice(0, 3).map((obligacion) => (
              <div 
                key={obligacion.id} 
                className="py-2 flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-medium">{obligacion.obligacion}</div>
                  <div className="text-[10px] text-muted-foreground">{obligacion.periodo}</div>
                </div>
                <div className="flex flex-col items-end">
                  <Badge 
                    variant={
                      obligacion.estatus === 'Completado' ? 'default' : 
                      obligacion.estatus === 'En proceso' ? 'secondary' : 'outline'
                    } 
                    className="text-[9px] h-4 mb-1"
                  >
                    {obligacion.estatus}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground flex items-center">
                    <Calendar className="h-2.5 w-2.5 mr-1" />
                    {obligacion.fecha}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mt-2 text-[10px] h-7"
          >
            Ver calendario completo
          </Button>
        </CardContent>
      </Card>
      
      {/* Calendario fiscal y acceso rápido - Versión desktop */}
      <div className="hidden md:grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
      
      {/* Acceso rápido para móviles */}
      <div className="md:hidden">
        <Card>
          <CardHeader className="p-3 pb-2">
            <CardTitle className="text-sm">Acceso rápido</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" className="h-16 p-1 flex flex-col text-[10px]">
                <FileText className="h-4 w-4 mb-1" />
                <span className="text-center">CFDI</span>
              </Button>
              <Button variant="outline" className="h-16 p-1 flex flex-col text-[10px]">
                <DollarSign className="h-4 w-4 mb-1" />
                <span className="text-center">Cálculos</span>
              </Button>
              <Button variant="outline" className="h-16 p-1 flex flex-col text-[10px]">
                <BarChart className="h-4 w-4 mb-1" />
                <span className="text-center">Reportes</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Resumen de cumplimiento fiscal - Versión móvil */}
      <Card>
        <CardHeader className="p-3 pb-2 sm:pb-2 sm:p-6">
          <CardTitle className="text-sm sm:text-base">Cumplimiento Fiscal</CardTitle>
          <CardDescription className="text-[10px] sm:text-sm">Estado actual</CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
          <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
            <div className="flex flex-row md:flex-col items-center md:items-center justify-between md:justify-center space-y-0 md:space-y-2 border rounded-lg p-2 sm:p-4">
              <div className="flex flex-col items-center">
                <div className="text-lg sm:text-4xl font-bold text-green-600">{resumenCumplimiento.porcentajeCumplimiento}%</div>
                <p className="text-xs sm:text-sm font-medium">Al corriente</p>
              </div>
              <p className="text-[10px] sm:text-xs text-muted-foreground text-center">
                {resumenCumplimiento.cumplidas}/{resumenCumplimiento.totalObligaciones} cumplidas
              </p>
            </div>
            
            <div className="flex flex-row md:flex-col items-center md:items-center justify-between md:justify-center space-y-0 md:space-y-2 border rounded-lg p-2 sm:p-4">
              <div className="flex flex-col items-center">
                <div className="text-lg sm:text-4xl font-bold text-amber-500">{resumenCumplimiento.pendientes}</div>
                <p className="text-xs sm:text-sm font-medium">Pendientes</p>
              </div>
              <div className="flex items-center text-[10px] sm:text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                Próximas a vencer
              </div>
            </div>
            
            <div className="flex flex-row md:flex-col items-center md:items-center justify-between md:justify-center space-y-0 md:space-y-2 border rounded-lg p-2 sm:p-4">
              <div className="flex flex-col items-center">
                <div className="text-lg sm:text-4xl font-bold text-gray-400">{resumenCumplimiento.vencidas}</div>
                <p className="text-xs sm:text-sm font-medium">Vencidas</p>
              </div>
              <div className="flex items-center text-[10px] sm:text-xs text-green-600">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Ninguna este mes
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de declaraciones recientes - Versión móvil */}
      <Card>
        <CardHeader className="p-3 pb-2 sm:p-6 sm:pb-2">
          <CardTitle className="text-sm sm:text-base">Declaraciones Recientes</CardTitle>
          <CardDescription className="text-[10px] sm:text-sm">Últimas presentadas</CardDescription>
        </CardHeader>
        <CardContent className="p-0 sm:p-6">
          {/* Versión móvil */}
          <div className="md:hidden">
            <div className="divide-y">
              {[
                { id: 1, tipo: 'Declaración ISR', periodo: 'Febrero 2025', fecha: '17/03/2025', importe: 1432865.26, estado: 'Presentada' },
                { id: 2, tipo: 'Declaración IVA', periodo: 'Febrero 2025', fecha: '17/03/2025', importe: 326548.92, estado: 'Presentada' },
                { id: 3, tipo: 'IMSS', periodo: 'Febrero 2025', fecha: '03/03/2025', importe: 868742.31, estado: 'Presentada' }
              ].map((declaracion) => (
                <div 
                  key={declaracion.id} 
                  className="px-3 py-2 flex items-start justify-between"
                >
                  <div>
                    <div className="text-xs font-medium">{declaracion.tipo}</div>
                    <div className="text-[10px] text-muted-foreground">{declaracion.periodo}</div>
                    <div className="text-[10px] flex items-center text-muted-foreground mt-1">
                      <Calendar className="h-2.5 w-2.5 mr-1" />
                      {declaracion.fecha}
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-xs font-medium">{formatCurrencyShort(declaracion.importe)}</div>
                    <Badge variant="default" className="mt-1 text-[9px] h-4">
                      {declaracion.estado}
                    </Badge>
                    <Button variant="ghost" size="sm" className="h-6 px-1 mt-1 text-[10px]">
                      <FileText className="h-3 w-3 mr-1" />
                      Ver acuse
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center p-3 border-t">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full text-[10px] h-7"
              >
                Ver historial completo
                <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>
          
          {/* Versión desktop */}
          <div className="hidden md:block">
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
            <CardFooter className="border-t px-6 py-3">
              <Button variant="outline" size="sm" className="ml-auto">
                Ver historial completo
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </CardFooter>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImpuestosModule;