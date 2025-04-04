"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText } from 'lucide-react';

// Datos específicos de Juan Pérez
const datosJuanPerez = {
  titulosAcademicos: [
    {
      id: 1,
      grado: 'LICENCIATURA',
      titulo: 'Licenciatura en Economía',
      institucion: 'Universidad Autónoma de Nayarit',
      cedula: '12345678',
      anioRegistro: 2003,
      federal: true,
      verificado: true
    },
    {
      id: 2,
      grado: 'MAESTRÍA',
      titulo: 'Maestría en Economía Aplicada',
      institucion: 'Universidad Autónoma de Nayarit',
      cedula: '87654321',
      anioRegistro: 2008,
      federal: true,
      verificado: true
    }
  ],
  cursos: [
    {
      id: 1,
      titulo: 'Desarrollo de habilidades docentes',
      area: 'Pedagogía',
      institucion: 'UAN',
      periodo: '01/01/2022 - 30/06/2022',
      estado: 'Terminado'
    }
  ],
  reconocimientos: [
    {
      id: 1,
      descripcion: 'Reconocimiento al mérito docente',
      otorgadoPor: 'Universidad Autónoma de Nayarit',
      fecha: 'Mayo 2019',
      documento: 'reconocimiento.pdf'
    }
  ]
};

const FormacionAcademicaJuanPerez = () => {
  return (
    <div className="grid gap-4 md:gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight hidden md:block">Formación Académica</h2>
        <Button size="sm">Agregar</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Títulos Académicos</CardTitle>
          <CardDescription>Información sobre los grados académicos obtenidos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 md:hidden">
            {/* Vista móvil: tarjetas */}
            {datosJuanPerez.titulosAcademicos.map((titulo) => (
              <Card key={titulo.id} className="relative">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-base mb-1">{titulo.titulo}</h3>
                      <p className="text-sm text-muted-foreground">{titulo.institucion}</p>
                    </div>
                    <Badge className={
                      titulo.grado === 'DOCTORADO' ? 'bg-purple-600' :
                      titulo.grado === 'MAESTRÍA' ? 'bg-blue-600' :
                      titulo.grado === 'LICENCIATURA' ? 'bg-green-600' : 'bg-gray-600'
                    }>
                      {titulo.grado}
                    </Badge>
                  </div>
                  
                  <div className="mt-3 space-y-2">
                    <div className="grid grid-cols-2 text-sm">
                      <span className="text-muted-foreground">Cédula:</span>
                      <span>{titulo.cedula}</span>
                    </div>
                    <div className="grid grid-cols-2 text-sm">
                      <span className="text-muted-foreground">Año de registro:</span>
                      <span>{titulo.anioRegistro}</span>
                    </div>
                    <div className="grid grid-cols-2 text-sm">
                      <span className="text-muted-foreground">Tipo:</span>
                      <span>{titulo.federal ? 'Federal' : 'Estatal'}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs flex items-center">
                      <FileText className="h-3 w-3 mr-1" /> Título
                    </Badge>
                    <Badge variant="outline" className="text-xs flex items-center">
                      <FileText className="h-3 w-3 mr-1" /> Cédula
                    </Badge>
                    {titulo.verificado && (
                      <Badge className="bg-green-600 text-xs flex items-center">
                        Verificado
                      </Badge>
                    )}
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
                  <TableHead>Título</TableHead>
                  <TableHead>Grado</TableHead>
                  <TableHead>Institución</TableHead>
                  <TableHead>Cédula</TableHead>
                  <TableHead>Año de registro</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Estatus</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {datosJuanPerez.titulosAcademicos.map((titulo) => (
                  <TableRow key={titulo.id}>
                    <TableCell className="font-medium">{titulo.titulo}</TableCell>
                    <TableCell>
                      <Badge className={
                        titulo.grado === 'DOCTORADO' ? 'bg-purple-600' :
                        titulo.grado === 'MAESTRÍA' ? 'bg-blue-600' :
                        titulo.grado === 'LICENCIATURA' ? 'bg-green-600' : 'bg-gray-600'
                      }>
                        {titulo.grado}
                      </Badge>
                    </TableCell>
                    <TableCell>{titulo.institucion}</TableCell>
                    <TableCell>{titulo.cedula}</TableCell>
                    <TableCell>{titulo.anioRegistro}</TableCell>
                    <TableCell>{titulo.federal ? 'Federal' : 'Estatal'}</TableCell>
                    <TableCell>
                      {titulo.verificado && (
                        <Badge className="bg-green-600">Verificado</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cursos y capacitaciones</CardTitle>
          <CardDescription>Cursos y capacitaciones realizados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 md:hidden">
            {/* Vista móvil: tarjetas */}
            {datosJuanPerez.cursos.map((curso) => (
              <Card key={curso.id}>
                <CardContent className="pt-6">
                  <h3 className="font-medium text-base mb-2">{curso.titulo}</h3>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-sm">
                    <div className="text-muted-foreground">Área:</div>
                    <div>{curso.area}</div>
                    <div className="text-muted-foreground">Institución:</div>
                    <div>{curso.institucion}</div>
                    <div className="text-muted-foreground">Período:</div>
                    <div>{curso.periodo}</div>
                    <div className="text-muted-foreground">Estado:</div>
                    <div><Badge>{curso.estado}</Badge></div>
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
                  <TableHead>Curso</TableHead>
                  <TableHead>Área</TableHead>
                  <TableHead>Institución</TableHead>
                  <TableHead>Período</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {datosJuanPerez.cursos.map((curso) => (
                  <TableRow key={curso.id}>
                    <TableCell className="font-medium">{curso.titulo}</TableCell>
                    <TableCell>{curso.area}</TableCell>
                    <TableCell>{curso.institucion}</TableCell>
                    <TableCell>{curso.periodo}</TableCell>
                    <TableCell>
                      <Badge>{curso.estado}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reconocimientos</CardTitle>
          <CardDescription>Reconocimientos obtenidos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 md:hidden">
            {/* Vista móvil: tarjetas */}
            {datosJuanPerez.reconocimientos.map((reconocimiento) => (
              <Card key={reconocimiento.id}>
                <CardContent className="pt-6 pb-4">
                  <h3 className="font-medium text-base mb-2">{reconocimiento.descripcion}</h3>
                  <div className="text-sm text-muted-foreground mb-1">
                    <span className="font-medium">Otorgado por:</span> {reconocimiento.otorgadoPor}
                  </div>
                  <div className="text-sm text-muted-foreground mb-3">
                    <span className="font-medium">Fecha:</span> {reconocimiento.fecha}
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <Badge variant="outline" className="mr-2">Ver documento</Badge>
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
                  <TableHead>Descripción</TableHead>
                  <TableHead>Otorgado por</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Documento</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {datosJuanPerez.reconocimientos.map((reconocimiento) => (
                  <TableRow key={reconocimiento.id}>
                    <TableCell className="font-medium">{reconocimiento.descripcion}</TableCell>
                    <TableCell>{reconocimiento.otorgadoPor}</TableCell>
                    <TableCell>{reconocimiento.fecha}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">Ver</Button>
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

export default FormacionAcademicaJuanPerez;