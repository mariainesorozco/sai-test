// -----------------------------------
// CreditosPensionesJuanPerez.tsx
// -----------------------------------

"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Calendar, CreditCard, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import InfoItem from '../InfoItem';

// Datos específicos de Juan Pérez
const datosJuanPerez = {
  creditosInfonavit: [
    {
      id: 1,
      numero: "1234567890",
      importe: "$850,000.00",
      fechaInicio: "2018-06-15",
      fechaTermino: "2033-06-15",
      documento: "credito_infonavit.pdf"
    }
  ],
  creditosFonacot: [],
  pensionesAlimenticias: [],
  sindicato: {
    nombre: "SPAUAN",
    fechaAfiliacion: "2010-04-01",
    documentoAfiliacion: "afiliacion_spauan.pdf"
  }
};

const CreditosPensionesJuanPerez = () => {
  // Función para formatear fechas
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="grid gap-4 md:gap-6">
      <div className="md:hidden flex items-center justify-between">
        <h2 className="text-lg font-semibold">Créditos y Pensiones</h2>
        <Button size="sm">Editar</Button>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1">
        {/* Tarjeta de Créditos INFONAVIT */}
        <Card>
          <CardHeader>
            <CardTitle>Créditos INFONAVIT</CardTitle>
            <CardDescription>Información de créditos vigentes con INFONAVIT</CardDescription>
          </CardHeader>
          
          {/* Vista móvil: Tarjetas */}
          <div className="md:hidden">
            {datosJuanPerez.creditosInfonavit.length > 0 ? (
              <div className="space-y-4 p-4">
                {datosJuanPerez.creditosInfonavit.map(credito => (
                  <Card key={credito.id} className="border-l-4 border-l-primary">
                    <CardContent className="pt-6">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-muted-foreground">Número de crédito:</span>
                          <span className="font-medium">{credito.numero}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-muted-foreground">Importe:</span>
                          <span className="font-medium">{credito.importe}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {formatDate(credito.fechaInicio)} - {formatDate(credito.fechaTermino)}
                          </span>
                        </div>
                        <div className="flex items-center mt-3">
                          <Badge variant="outline" className="mr-2">Ver documento</Badge>
                          <Button variant="ghost" size="sm">Ver</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <CardContent>
                <div className="text-center py-4 text-muted-foreground">
                  No hay créditos INFONAVIT registrados
                </div>
              </CardContent>
            )}
          </div>
          
          {/* Vista desktop: Tabla */}
          <CardContent className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número de crédito</TableHead>
                  <TableHead>Importe</TableHead>
                  <TableHead>Fecha inicio</TableHead>
                  <TableHead>Fecha término</TableHead>
                  <TableHead>Documento</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {datosJuanPerez.creditosInfonavit.length > 0 ? datosJuanPerez.creditosInfonavit.map(credito => (
                  <TableRow key={credito.id}>
                    <TableCell className="font-medium">{credito.numero}</TableCell>
                    <TableCell>{credito.importe}</TableCell>
                    <TableCell>{formatDate(credito.fechaInicio)}</TableCell>
                    <TableCell>{formatDate(credito.fechaTermino)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">Ver</Button>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                      No hay créditos INFONAVIT registrados
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Tarjeta de Créditos FONACOT */}
        <Card>
          <CardHeader>
            <CardTitle>Créditos FONACOT</CardTitle>
            <CardDescription>Información de créditos vigentes con FONACOT</CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="text-center py-4 text-muted-foreground">
              No hay créditos FONACOT registrados
            </div>
          </CardContent>
        </Card>

        {/* Tarjeta de Pensiones Alimenticias */}
        <Card>
          <CardHeader>
            <CardTitle>Pensiones Alimenticias</CardTitle>
            <CardDescription>Información de pensiones alimenticias registradas</CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="text-center py-4 text-muted-foreground">
              No hay pensiones alimenticias registradas
            </div>
          </CardContent>
        </Card>

        {/* Tarjeta de Cuotas Sindicales */}
        <Card>
          <CardHeader>
            <CardTitle>Cuotas Sindicales</CardTitle>
            <CardDescription>Información de afiliación sindical</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <InfoItem icon={Users} label="Sindicato" value={datosJuanPerez.sindicato.nombre} />
                <InfoItem icon={Calendar} label="Fecha de afiliación" value={formatDate(datosJuanPerez.sindicato.fechaAfiliacion)} />
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline">Documento de afiliación</Badge>
                  <Button variant="ghost" size="sm">Ver</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreditosPensionesJuanPerez;