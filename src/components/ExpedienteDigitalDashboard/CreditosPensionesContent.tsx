"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Calendar, Plus, CreditCard, FileText, Edit, Trash2, DollarSign } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import InfoItem from './InfoItem';
import { Separator } from '@/components/ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Interfaces para datos tipados
interface CreditoItem {
  id: number;
  numero: string;
  importe: string;
  fechaInicio: string;
  fechaTermino: string;
  documento: string;
}

interface PensionItem {
  id: number;
  beneficiario: string;
  juzgado: string;
  numeroOficio: string;
  importe: string;
  fechaInicio: string;
  fechaTermino: string | null;
  documento: string;
}

const CreditosPensionesContent = () => {
  // Datos de ejemplo
  const creditosInfonavit: CreditoItem[] = [
    {
      id: 1,
      numero: "0000000000",
      importe: "$000,000.00",
      fechaInicio: "01/01/2020",
      fechaTermino: "01/01/2030",
      documento: "credito_infonavit.pdf"
    }
  ];
  
  const creditosFonacot: CreditoItem[] = [];
  
  const pensionesAlimenticias: PensionItem[] = [];
  
  // Determinar si estamos en móvil o escritorio
  const isMobile = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  };

  return (
    <div className="grid gap-4 md:gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight hidden md:block">Créditos y Pensiones</h2>
        <Button size="sm">Agregar</Button>
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
            {creditosInfonavit.length > 0 ? (
              <div className="space-y-4 p-4">
                {creditosInfonavit.map(credito => (
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
                            {credito.fechaInicio} - {credito.fechaTermino}
                          </span>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex justify-between">
                          <Button variant="outline" size="sm" className="text-xs">
                            <FileText className="h-3 w-3 mr-1" /> Ver documento
                          </Button>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-destructive">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="w-[90%]">
                                <AlertDialogHeader>
                                  <AlertDialogTitle>¿Eliminar crédito?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Esta acción eliminará permanentemente el registro de este crédito INFONAVIT.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction>Eliminar</AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
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
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {creditosInfonavit.length > 0 ? creditosInfonavit.map(credito => (
                  <TableRow key={credito.id}>
                    <TableCell className="font-medium">{credito.numero}</TableCell>
                    <TableCell>{credito.importe}</TableCell>
                    <TableCell>{credito.fechaInicio}</TableCell>
                    <TableCell>{credito.fechaTermino}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">Ver</Button>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">Editar</Button>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                      No hay créditos INFONAVIT registrados
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
          
          <CardFooter className="justify-center">
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" /> Agregar crédito INFONAVIT
            </Button>
          </CardFooter>
        </Card>

        {/* Tarjeta de Créditos FONACOT */}
        <Card>
          <CardHeader>
            <CardTitle>Créditos FONACOT</CardTitle>
            <CardDescription>Información de créditos vigentes con FONACOT</CardDescription>
          </CardHeader>
          
          {/* Vista móvil: Mensaje vacío o tarjetas */}
          <div className="md:hidden">
            <CardContent>
              <div className="text-center py-4 text-muted-foreground">
                No hay créditos FONACOT registrados
              </div>
            </CardContent>
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

        {/* Tarjeta de Pensiones Alimenticias */}
        <Card>
          <CardHeader>
            <CardTitle>Pensiones Alimenticias</CardTitle>
            <CardDescription>Información de pensiones alimenticias registradas</CardDescription>
          </CardHeader>
          
          {/* Vista móvil: Mensaje vacío o tarjetas */}
          <div className="md:hidden">
            <CardContent>
              <div className="text-center py-4 text-muted-foreground">
                No hay pensiones alimenticias registradas
              </div>
            </CardContent>
          </div>
          
          {/* Vista desktop: Tabla */}
          <CardContent className="hidden md:block">
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

        {/* Tarjeta de Cuotas Sindicales */}
        <Card>
          <CardHeader>
            <CardTitle>Cuotas Sindicales</CardTitle>
            <CardDescription>Información de afiliación sindical</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
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