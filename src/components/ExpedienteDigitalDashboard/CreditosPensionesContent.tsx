"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Calendar, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import InfoItem from './InfoItem';

const CreditosPensionesContent = () => {
  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Créditos y Pensiones</h2>
        <Button size="sm">Agregar</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Créditos INFONAVIT</CardTitle>
            <CardDescription>Información de créditos vigentes con INFONAVIT</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número de crédito</TableHead>
                  <TableHead>Importe</TableHead>
                  <TableHead>Fecha inicio</TableHead>
                  <TableHead>Fecha término</TableHead>
                  <TableHead>Documento</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">0000000000</TableCell>
                  <TableCell>$000,000.00</TableCell>
                  <TableCell>01/01/2020</TableCell>
                  <TableCell>01/01/2030</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">Ver</Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">Editar</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="justify-center">
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" /> Agregar crédito INFONAVIT
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Créditos FONACOT</CardTitle>
            <CardDescription>Información de créditos vigentes con FONACOT</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número de crédito</TableHead>
                  <TableHead>Importe</TableHead>
                  <TableHead>Fecha inicio</TableHead>
                  <TableHead>Fecha término</TableHead>
                  <TableHead>Documento</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                    No hay créditos FONACOT registrados
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="justify-center">
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" /> Agregar crédito FONACOT
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pensiones Alimenticias</CardTitle>
            <CardDescription>Información de pensiones alimenticias registradas</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Beneficiario</TableHead>
                  <TableHead>Juzgado</TableHead>
                  <TableHead>Número oficio</TableHead>
                  <TableHead>Importe</TableHead>
                  <TableHead>Periodo</TableHead>
                  <TableHead>Documento</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                    No hay pensiones alimenticias registradas
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="justify-center">
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" /> Agregar pensión alimenticia
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cuotas Sindicales</CardTitle>
            <CardDescription>Información de afiliación sindical</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <InfoItem icon={Users} label="Sindicato" value="SETUAN/SPAUAN" />
                <InfoItem icon={Calendar} label="Fecha de afiliación" value="DD/MM/AAAA" />
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

export default CreditosPensionesContent;