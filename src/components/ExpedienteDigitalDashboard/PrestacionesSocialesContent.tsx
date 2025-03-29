"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Calendar, FileText, DollarSign, Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import InfoItem from './InfoItem';

const PrestacionesSocialesContent = () => {
  return (
    <div className="grid gap-4 md:gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight hidden md:block">Prestaciones Sociales</h2>
        <Button size="sm">Editar</Button>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Información Laboral UAN</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <InfoItem icon={Clock} label="Años de servicio UAN" value="5 años" />
              <InfoItem icon={Calendar} label="Fecha para jubilación UAN" value="DD/MM/AAAA" />
              <InfoItem icon={Clock} label="Licencias sin goce de sueldo" value="Ninguna" />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm">
              Ver detalle de licencias
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Jubilación</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <h4 className="text-sm font-medium">UAN</h4>
              <InfoItem icon={Calendar} label="Fecha dictamen Comisión Fondo" value="No aplica" />
              <InfoItem icon={FileText} label="Número oficio" value="No aplica" />
              <InfoItem icon={DollarSign} label="Importe quincenal" value="$0.00" />
              
              <Separator className="my-2" />

              <h4 className="text-sm font-medium">IMSS</h4>
              <InfoItem icon={Calendar} label="Fecha resolución IMSS" value="No aplica" />
              <InfoItem icon={FileText} label="Folio Resolución" value="No aplica" />
              <InfoItem icon={DollarSign} label="Importe mensual" value="$0.00" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Resoluciones por Invalidez</CardTitle>
            <CardDescription>Información de resoluciones por invalidez del IMSS</CardDescription>
          </CardHeader>
          <CardContent className="overflow-auto">
            <div className="min-w-[600px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Fecha dictamen</TableHead>
                    <TableHead>Folio</TableHead>
                    <TableHead>Importe</TableHead>
                    <TableHead>Período</TableHead>
                    <TableHead>Documento</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                      No hay resoluciones por invalidez registradas
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter className="justify-center">
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" /> Agregar resolución
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PrestacionesSocialesContent;