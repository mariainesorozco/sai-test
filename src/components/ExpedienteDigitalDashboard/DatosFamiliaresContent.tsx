"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const DatosFamiliaresContent = () => {
  return (
    <div className="grid gap-4 md:gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight hidden md:block">Datos Familiares</h2>
        <Button size="sm">Agregar</Button>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Beneficiarios y familiares</CardTitle>
            <CardDescription>Información de beneficiarios y familiares registrados</CardDescription>
          </CardHeader>
          <CardContent className="overflow-auto">
            <div className="min-w-[700px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Parentesco</TableHead>
                    <TableHead>Sexo</TableHead>
                    <TableHead>Fecha de nacimiento</TableHead>
                    <TableHead>Beneficiario</TableHead>
                    <TableHead>Porcentaje</TableHead>
                    <TableHead>Documentos</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Nombre completo</TableCell>
                    <TableCell>CÓNYUGE</TableCell>
                    <TableCell>M</TableCell>
                    <TableCell>01/01/1980</TableCell>
                    <TableCell>
                      <Badge>Sí</Badge>
                    </TableCell>
                    <TableCell>50%</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">Ver</Button>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">Editar</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Nombre completo</TableCell>
                    <TableCell>HIJO</TableCell>
                    <TableCell>H</TableCell>
                    <TableCell>01/01/2010</TableCell>
                    <TableCell>
                      <Badge>Sí</Badge>
                    </TableCell>
                    <TableCell>50%</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">Ver</Button>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">Editar</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter className="justify-center">
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" /> Agregar familiar
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Beneficiarios de seguro de vida</CardTitle>
            <CardDescription>Información de beneficiarios designados en póliza de seguro</CardDescription>
          </CardHeader>
          <CardContent className="overflow-auto">
            <div className="min-w-[500px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Parentesco</TableHead>
                    <TableHead>Porcentaje</TableHead>
                    <TableHead>Documento</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Nombre completo</TableCell>
                    <TableCell>CÓNYUGE</TableCell>
                    <TableCell>100%</TableCell>
                    <TableCell>
                      <Badge variant="outline">Formato de beneficiarios</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">Editar</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter className="justify-center">
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" /> Actualizar beneficiarios
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DatosFamiliaresContent;