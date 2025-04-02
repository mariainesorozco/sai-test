"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Calendar, User, Heart, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
interface FamiliarItem {
  id: number;
  parentesco: 'CONYUGE' | 'HIJO' | 'PADRE' | 'MADRE' | 'HERMANO' | 'OTRO';
  nombre: string;
  sexo: 'H' | 'M';
  fechaNac: string | null;
  dependienteEconomico: boolean;
  esBeneficiario: boolean;
  porcentaje: number | null;
  fileActa: string | null;
  fileActaOk: boolean;
  fileFormatoBeneficiario: string | null;
  fileFormatoBeneficiarioOk: boolean;
}

const DatosFamiliaresContent = () => {
  // Estado para los familiares registrados
  const [familiares, setFamiliares] = useState<FamiliarItem[]>([
    {
      id: 1,
      parentesco: 'CONYUGE',
      nombre: 'Nombre del cónyuge',
      sexo: 'M',
      fechaNac: '1980-01-01',
      dependienteEconomico: true,
      esBeneficiario: true,
      porcentaje: 50,
      fileActa: 'acta_matrimonio.pdf',
      fileActaOk: true,
      fileFormatoBeneficiario: 'formato_beneficiario_conyuge.pdf',
      fileFormatoBeneficiarioOk: true
    },
    {
      id: 2,
      parentesco: 'HIJO',
      nombre: 'Nombre del hijo',
      sexo: 'H',
      fechaNac: '2010-01-01',
      dependienteEconomico: true,
      esBeneficiario: true,
      porcentaje: 50,
      fileActa: 'acta_nacimiento_hijo.pdf',
      fileActaOk: true,
      fileFormatoBeneficiario: 'formato_beneficiario_hijo.pdf',
      fileFormatoBeneficiarioOk: true
    }
  ]);

  // Función para formatear fecha
  const formatearFecha = (fechaStr: string | null) => {
    if (!fechaStr) return 'No disponible';
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Función para obtener texto de parentesco
  const getParentescoText = (parentesco: string) => {
    const parentescos: { [key: string]: string } = {
      'CONYUGE': 'Cónyuge',
      'HIJO': 'Hijo(a)',
      'PADRE': 'Padre',
      'MADRE': 'Madre',
      'HERMANO': 'Hermano(a)',
      'OTRO': 'Otro'
    };
    return parentescos[parentesco] || parentesco;
  };
  
  // Para verificar si estamos en dispositivo móvil
  const isMobile = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  };

  // Renderizar tarjetas para vista móvil
  const renderMobileCards = () => {
    if (familiares.length === 0) {
      return (
        <div className="text-center py-4 text-muted-foreground">
          No hay familiares registrados
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {familiares.map((familiar) => (
          <Card key={familiar.id} className="border-l-4 border-l-primary">
            <CardContent className="pt-6 pb-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-medium text-base">{familiar.nombre}</h3>
                  <p className="text-sm text-muted-foreground">{getParentescoText(familiar.parentesco)}</p>
                </div>
                <Badge variant={familiar.esBeneficiario ? "default" : "outline"}>
                  {familiar.sexo === 'H' ? 'Hombre' : 'Mujer'}
                </Badge>
              </div>
              
              {familiar.fechaNac && (
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <Calendar className="h-3.5 w-3.5 mr-1.5" />
                  <span>Nacimiento: {formatearFecha(familiar.fechaNac)}</span>
                </div>
              )}
              
              <div className="flex flex-wrap gap-2 mb-3">
                {familiar.dependienteEconomico && (
                  <Badge variant="secondary" className="text-xs">Dependiente económico</Badge>
                )}
                {familiar.esBeneficiario && (
                  <Badge className="text-xs">Beneficiario {familiar.porcentaje}%</Badge>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {familiar.fileActa && (
                  <Badge variant="outline" className="text-xs flex items-center">
                    <FileText className="h-3 w-3 mr-1" /> 
                    {familiar.parentesco === 'CONYUGE' ? 'Acta matrimonio' : 'Acta nacimiento'}
                  </Badge>
                )}
                {familiar.fileFormatoBeneficiario && (
                  <Badge variant="outline" className="text-xs flex items-center">
                    <FileText className="h-3 w-3 mr-1" /> Formato beneficiario
                  </Badge>
                )}
              </div>
              
              <Separator className="my-3" />
              
              <div className="flex justify-end space-x-1">
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
                      <AlertDialogTitle>¿Eliminar familiar?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta acción eliminará permanentemente a {familiar.nombre} del registro de familiares.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction>Eliminar</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };
  
  // Componente principal
  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight hidden md:block">Datos Familiares</h2>
        <Button size="sm">Agregar</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Familiares y Beneficiarios</CardTitle>
            <CardDescription>Información de familiares y beneficiarios registrados</CardDescription>
          </CardHeader>
          
          {/* Vista móvil: Tarjetas */}
          <div className="md:hidden">
            <CardContent>
              {renderMobileCards()}
            </CardContent>
            
            <CardFooter className="justify-center pt-6">
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" /> Agregar familiar
              </Button>
            </CardFooter>
          </div>
          
          {/* Vista desktop: Tabla */}
          <div className="hidden md:block">
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Parentesco</TableHead>
                    <TableHead>Sexo</TableHead>
                    <TableHead>Fecha de nacimiento</TableHead>
                    <TableHead>Dependiente</TableHead>
                    <TableHead>Beneficiario</TableHead>
                    <TableHead>Porcentaje</TableHead>
                    <TableHead>Documentos</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {familiares.length > 0 ? (
                    familiares.map((familiar) => (
                      <TableRow key={familiar.id}>
                        <TableCell className="font-medium">{familiar.nombre}</TableCell>
                        <TableCell>{getParentescoText(familiar.parentesco)}</TableCell>
                        <TableCell>{familiar.sexo === 'H' ? 'Hombre' : 'Mujer'}</TableCell>
                        <TableCell>{formatearFecha(familiar.fechaNac)}</TableCell>
                        <TableCell>
                          {familiar.dependienteEconomico ? (
                            <Badge variant="secondary">Sí</Badge>
                          ) : (
                            <span className="text-muted-foreground">No</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {familiar.esBeneficiario ? (
                            <Badge>Sí</Badge>
                          ) : (
                            <span className="text-muted-foreground">No</span>
                          )}
                        </TableCell>
                        <TableCell>{familiar.porcentaje ? `${familiar.porcentaje}%` : '-'}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {familiar.fileActa && (
                              <Button variant="ghost" size="sm" className="h-8 px-2">
                                <FileText className="h-3.5 w-3.5 mr-1" /> 
                                Acta
                              </Button>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
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
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>¿Eliminar familiar?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Esta acción eliminará permanentemente a {familiar.nombre} del registro de familiares.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction>Eliminar</AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-4 text-muted-foreground">
                        No hay familiares registrados
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
            
            <CardFooter className="justify-center pt-6">
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" /> Agregar familiar
              </Button>
            </CardFooter>
          </div>
        </Card>

        {/* Resumen de Beneficiarios */}
        <Card>
          <CardHeader>
            <CardTitle>Resumen de Beneficiarios</CardTitle>
            <CardDescription>Distribución del porcentaje entre beneficiarios designados</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Vista móvil: Lista de resumen */}
            <div className="md:hidden space-y-4">
              {familiares.filter(f => f.esBeneficiario).length > 0 ? (
                <>
                  {familiares
                    .filter(f => f.esBeneficiario)
                    .map((familiar) => (
                      <div key={`resumen-${familiar.id}`} className="flex justify-between items-center border-b pb-2">
                        <div>
                          <p className="font-medium">{familiar.nombre}</p>
                          <p className="text-sm text-muted-foreground">{getParentescoText(familiar.parentesco)}</p>
                        </div>
                        <Badge className="text-lg h-7">{familiar.porcentaje}%</Badge>
                      </div>
                    ))}
                  
                  <div className="mt-4 pt-2 border-t flex justify-between">
                    <span className="font-semibold">Total:</span>
                    <span className="font-semibold">
                      {familiares
                        .filter(f => f.esBeneficiario)
                        .reduce((sum, f) => sum + (f.porcentaje || 0), 0)}%
                    </span>
                  </div>
                </>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  No hay beneficiarios designados
                </div>
              )}
            </div>
            
            {/* Vista desktop: Tabla */}
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Parentesco</TableHead>
                    <TableHead>Porcentaje</TableHead>
                    <TableHead>Documento</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {familiares.filter(f => f.esBeneficiario).length > 0 ? (
                    <>
                      {familiares
                        .filter(f => f.esBeneficiario)
                        .map((familiar) => (
                          <TableRow key={`resumen-${familiar.id}`}>
                            <TableCell className="font-medium">{familiar.nombre}</TableCell>
                            <TableCell>{getParentescoText(familiar.parentesco)}</TableCell>
                            <TableCell>{familiar.porcentaje}%</TableCell>
                            <TableCell>
                              {familiar.fileFormatoBeneficiario && (
                                <Badge variant="outline">Formato de beneficiarios</Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      <TableRow>
                        <TableCell colSpan={2} className="text-right font-bold">Total:</TableCell>
                        <TableCell className="font-bold">
                          {familiares
                            .filter(f => f.esBeneficiario)
                            .reduce((sum, f) => sum + (f.porcentaje || 0), 0)}%
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </>
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                        No hay beneficiarios designados
                      </TableCell>
                    </TableRow>
                  )}
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