// -----------------------------------
// DatosFamiliaresJuanPerez.tsx
// -----------------------------------

"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Calendar, User, Heart, ShieldCheck, FileSymlink } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

// Datos específicos de Juan Pérez (actualizado con información de seguros)
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
      fileActa: 'acta_matrimonio.pdf',
      fileFormatoBeneficiario: 'formato_beneficiario_conyuge.pdf',
      fileSeguroVida: 'formato_seguro_vida_conyuge.pdf',
      vigenciaSeguro: '2024-12-31',
      numeroPoliza: 'SV-4568923'
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
      fileActa: 'acta_nacimiento_hijo1.pdf',
      fileFormatoBeneficiario: 'formato_beneficiario_hijo1.pdf',
      fileSeguroVida: 'formato_seguro_vida_hijo1.pdf',
      vigenciaSeguro: '2024-12-31',
      numeroPoliza: 'SV-4568923'
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
      fileActa: 'acta_nacimiento_hijo2.pdf',
      fileFormatoBeneficiario: 'formato_beneficiario_hijo2.pdf',
      fileSeguroVida: 'formato_seguro_vida_hijo2.pdf',
      vigenciaSeguro: '2024-12-31',
      numeroPoliza: 'SV-4568923'
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
                  
                  {/* Información de seguro de vida */}
                  {familiar.esBeneficiario && (
                    <div className="mt-3 pt-2 border-t">
                      <div className="flex items-center mb-2">
                        <ShieldCheck className="h-4 w-4 mr-1.5 text-green-600" />
                        <span className="text-sm font-medium">Seguro de vida</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1 text-xs text-muted-foreground mb-2">
                        <span>Número de póliza:</span>
                        <span>{familiar.numeroPoliza}</span>
                        <span>Vigencia:</span>
                        <span>{formatDate(familiar.vigenciaSeguro)}</span>
                      </div>
                    </div>
                  )}
                  
                  <Separator className="my-2" />
                  
                  {/* Documentos disponibles */}
                  <div className="mt-2">
                    <p className="text-xs text-muted-foreground mb-1">Documentos:</p>
                    <div className="flex flex-wrap gap-1">
                      {familiar.fileActa && (
                        <Button variant="outline" size="sm" className="h-7 text-xs">
                          <FileText className="h-3 w-3 mr-1" /> 
                          {familiar.parentesco === 'CONYUGE' ? 'Acta matrimonio' : 'Acta nacimiento'}
                        </Button>
                      )}
                      {familiar.fileFormatoBeneficiario && (
                        <Button variant="outline" size="sm" className="h-7 text-xs">
                          <FileSymlink className="h-3 w-3 mr-1" /> 
                          Formato beneficiario
                        </Button>
                      )}
                      {familiar.fileSeguroVida && (
                        <Button variant="outline" size="sm" className="h-7 text-xs">
                          <Heart className="h-3 w-3 mr-1" /> 
                          Formato seguro vida
                        </Button>
                      )}
                    </div>
                  </div>
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
                      <div className="flex flex-wrap gap-1">
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <FileText className="h-3.5 w-3.5 mr-1" /> 
                          Ver acta
                        </Button>
                        {familiar.fileFormatoBeneficiario && (
                          <Button variant="ghost" size="sm" className="h-8 px-2">
                            <FileSymlink className="h-3.5 w-3.5 mr-1" /> 
                            Beneficiario
                          </Button>
                        )}
                        {familiar.fileSeguroVida && (
                          <Button variant="ghost" size="sm" className="h-8 px-2">
                            <Heart className="h-3.5 w-3.5 mr-1" /> 
                            Seguro vida
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Información adicional sobre póliza de seguro */}
      <Card>
        <CardHeader>
          <CardTitle>Información de Seguro de Vida</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="text-sm font-medium mb-2 flex items-center">
                  <ShieldCheck className="h-4 w-4 mr-2 text-green-600" />
                  Póliza de Seguro
                </h3>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <span className="text-muted-foreground">Número:</span>
                  <span>SV-4568923</span>
                  <span className="text-muted-foreground">Compañía:</span>
                  <span>Seguros Institucionales</span>
                  <span className="text-muted-foreground">Tipo:</span>
                  <span>Vida Colectivo</span>
                  <span className="text-muted-foreground">Suma asegurada:</span>
                  <span>$500,000.00 MXN</span>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="text-sm font-medium mb-2 flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  Vigencia
                </h3>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <span className="text-muted-foreground">Inicio:</span>
                  <span>01/01/2024</span>
                  <span className="text-muted-foreground">Fin:</span>
                  <span>31/12/2024</span>
                  <span className="text-muted-foreground">Estatus:</span>
                  <span><Badge className="bg-green-600">Activo</Badge></span>
                </div>
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    Ver póliza completa
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="text-sm font-medium mb-2">Distribución de Beneficiarios</h3>
              <div className="relative pt-4">
                <div className="flex items-center mb-2">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="bg-primary h-full" style={{ width: '50%' }}></div>
                  </div>
                  <span className="ml-2 text-sm font-medium">50%</span>
                </div>
                <div className="text-xs text-muted-foreground">María Rodríguez López (Cónyuge)</div>
                
                <div className="flex items-center mb-2 mt-4">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full" style={{ width: '25%' }}></div>
                  </div>
                  <span className="ml-2 text-sm font-medium">25%</span>
                </div>
                <div className="text-xs text-muted-foreground">Carlos Pérez Rodríguez (Hijo)</div>
                
                <div className="flex items-center mb-2 mt-4">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="bg-purple-500 h-full" style={{ width: '25%' }}></div>
                  </div>
                  <span className="ml-2 text-sm font-medium">25%</span>
                </div>
                <div className="text-xs text-muted-foreground">Laura Pérez Rodríguez (Hija)</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DatosFamiliaresJuanPerez;