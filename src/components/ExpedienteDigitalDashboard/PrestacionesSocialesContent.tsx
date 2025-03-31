"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Calendar, FileText, DollarSign, Plus, Edit, Trash2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import InfoItem from './InfoItem';
import { Badge } from '@/components/ui/badge';
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

// Interfaces para tipado
interface ResolucionItem {
  id: number;
  tipo: string;
  fechaDictamen: string;
  folio: string;
  importe: string;
  fechaInicio: string;
  fechaTermino?: string;
  documento: string;
}

const PrestacionesSocialesContent = () => {
  // Datos de ejemplo
  const resoluciones: ResolucionItem[] = [];

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
          
          {/* Vista móvil: Mensaje o tarjetas */}
          <div className="md:hidden">
            {resoluciones.length > 0 ? (
              <div className="space-y-4 p-4">
                {resoluciones.map(resolucion => (
                  <Card key={resolucion.id} className="border-l-4 border-l-amber-500">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-base">{resolucion.tipo}</h3>
                        <Badge variant="outline">{resolucion.fechaDictamen}</Badge>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Folio:</span>
                          <span>{resolucion.folio}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Importe:</span>
                          <span className="font-medium">{resolucion.importe}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Período:</span>
                          <span>{resolucion.fechaInicio} - {resolucion.fechaTermino || 'Indefinido'}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between mt-4">
                        <Button variant="outline" size="sm" className="text-xs">
                          <FileText className="h-3.5 w-3.5 mr-1" /> Ver documento
                        </Button>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="w-[90%]">
                              <AlertDialogHeader>
                                <AlertDialogTitle>¿Eliminar resolución?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Esta acción eliminará permanentemente este registro de resolución por invalidez.
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
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <CardContent>
                <div className="text-center py-4 text-muted-foreground">
                  No hay resoluciones por invalidez registradas
                </div>
              </CardContent>
            )}
          </div>
          
          {/* Vista desktop: Tabla */}
          <CardContent className="hidden md:block">
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
                {resoluciones.length > 0 ? resoluciones.map(resolucion => (
                  <TableRow key={resolucion.id}>
                    <TableCell>{resolucion.tipo}</TableCell>
                    <TableCell>{resolucion.fechaDictamen}</TableCell>
                    <TableCell>{resolucion.folio}</TableCell>
                    <TableCell>{resolucion.importe}</TableCell>
                    <TableCell>
                      {resolucion.fechaInicio} - {resolucion.fechaTermino || 'Indefinido'}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">Ver</Button>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                      No hay resoluciones por invalidez registradas
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
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