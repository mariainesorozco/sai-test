// -----------------------------------
// DatosFamiliaresJuanPerez.tsx
// -----------------------------------

"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Calendar, User } from 'lucide-react';

// Datos específicos de Juan Pérez
const datosJuanPerez = {
  familiares: [
    {
      id: 1,
      parentesco: 'CONYUGE',
      nombre: 'María Rodríguez López',
      sexo: 'M',
      fechaNac: '1982-05-15',
      dependienteEconomico: true,
      esBeneficiario: true,
      porcentaje: 50,
      fileActa: 'acta_matrimonio.pdf'
    },
    {
      id: 2,
      parentesco: 'HIJO',
      nombre: 'Carlos Pérez Rodríguez',
      sexo: 'H',
      fechaNac: '2008-10-12',
      dependienteEconomico: true,
      esBeneficiario: true,
      porcentaje: 25,
      fileActa: 'acta_nacimiento_hijo1.pdf'
    },
    {
      id: 3,
      parentesco: 'HIJO',
      nombre: 'Laura Pérez Rodríguez',
      sexo: 'M',
      fechaNac: '2012-03-22',
      dependienteEconomico: true,
      esBeneficiario: true,
      porcentaje: 25,
      fileActa: 'acta_nacimiento_hijo2.pdf'
    }
  ]
};

const DatosFamiliaresJuanPerez = () => {
  // Función para formatear fechas
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', {
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

  return (
    <div className="grid gap-4 md:gap-6">
      <div className="md:hidden flex items-center justify-between">
        <h2 className="text-lg font-semibold">Datos Familiares</h2>
        <Button size="sm">Editar</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Familiares y Beneficiarios</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Vista móvil: tarjetas */}
          <div className="space-y-4 md:hidden">
            {datosJuanPerez.familiares.map((familiar) => (
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
                      <span>Nacimiento: {formatDate(familiar.fechaNac)}</span>
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
                  
                  {familiar.fileActa && (
                    <div className="flex items-center mt-2">
                      <Badge variant="outline" className="text-xs flex items-center">
                        <FileText className="h-3 w-3 mr-1" /> 
                        {familiar.parentesco === 'CONYUGE' ? 'Acta matrimonio' : 'Acta nacimiento'}
                      </Badge>
                      <Button variant="ghost" size="sm">Ver</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Vista desktop: tabla */}
          <div className="hidden md:block">
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {datosJuanPerez.familiares.map((familiar) => (
                  <TableRow key={familiar.id}>
                    <TableCell className="font-medium">{familiar.nombre}</TableCell>
                    <TableCell>{getParentescoText(familiar.parentesco)}</TableCell>
                    <TableCell>{familiar.sexo === 'H' ? 'Hombre' : 'Mujer'}</TableCell>
                    <TableCell>{formatDate(familiar.fechaNac)}</TableCell>
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
                      <Button variant="ghost" size="sm">
                        <FileText className="h-3.5 w-3.5 mr-1" /> 
                        Ver acta
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DatosFamiliaresJuanPerez;