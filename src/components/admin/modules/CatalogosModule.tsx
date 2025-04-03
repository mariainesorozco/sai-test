"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CatalogosModule = () => {
  const [selectedTab, setSelectedTab] = useState("general");
  
  // Catálogos generales
  const catalogosGenerales = [
    { id: 1, nombre: 'Dependencias', cantidad: 32, actualizacion: '05/01/2025' },
    { id: 2, nombre: 'Personal', cantidad: 2287, actualizacion: '05/01/2025' },
    { id: 3, nombre: 'Regímenes fiscales', cantidad: 18, actualizacion: '15/01/2025' },
    { id: 4, nombre: 'Unidades Académicas', cantidad: 24, actualizacion: '10/01/2025' },
    { id: 5, nombre: 'Tipos de documento', cantidad: 12, actualizacion: '05/01/2025' },
    { id: 6, nombre: 'Bancos', cantidad: 45, actualizacion: '20/01/2025' },
  ];
  
  // Catálogos de nómina
  const catalogosNomina = [
    { id: 1, nombre: 'Puestos', cantidad: 124, actualizacion: '15/02/2025' },
    { id: 2, nombre: 'Adscripciones', cantidad: 87, actualizacion: '10/02/2025' },
    { id: 3, nombre: 'Categorías académicas', cantidad: 32, actualizacion: '28/02/2025' },
    { id: 4, nombre: 'Niveles salariales', cantidad: 65, actualizacion: '12/03/2025' },
    { id: 5, nombre: 'Tipos de trabajador', cantidad: 8, actualizacion: '05/03/2025' },
    { id: 6, nombre: 'Tipos de baja', cantidad: 12, actualizacion: '22/02/2025' },
    { id: 7, nombre: 'Derechos de pago', cantidad: 18, actualizacion: '15/03/2025' },
    { id: 8, nombre: 'Tipos de percepción', cantidad: 42, actualizacion: '28/02/2025' },
    { id: 9, nombre: 'Tipos de deducción', cantidad: 36, actualizacion: '28/02/2025' },
  ];
  
  // Catálogos de contabilidad
  const catalogosContabilidad = [
    { id: 1, nombre: 'Cuentas contables', cantidad: 347, actualizacion: '28/03/2025' },
    { id: 2, nombre: 'Centros de costo', cantidad: 75, actualizacion: '15/03/2025' },
    { id: 3, nombre: 'Tipos de póliza', cantidad: 8, actualizacion: '10/03/2025' },
    { id: 4, nombre: 'Tipos de impuesto', cantidad: 6, actualizacion: '05/03/2025' },
    { id: 5, nombre: 'Ejercicios fiscales', cantidad: 10, actualizacion: '15/01/2025' },
    { id: 6, nombre: 'Formas de pago', cantidad: 12, actualizacion: '05/02/2025' },
  ];
  
  // Catálogos de administración
  const catalogosAdministracion = [
    { id: 1, nombre: 'Usuarios', cantidad: 245, actualizacion: '01/04/2025' },
    { id: 2, nombre: 'Roles', cantidad: 12, actualizacion: '15/03/2025' },
    { id: 3, nombre: 'Permisos', cantidad: 87, actualizacion: '15/03/2025' },
    { id: 4, nombre: 'Funcionarios', cantidad: 45, actualizacion: '10/02/2025' },
    { id: 5, nombre: 'Periodos', cantidad: 8, actualizacion: '05/03/2025' },
    { id: 6, nombre: 'Parámetros del sistema', cantidad: 35, actualizacion: '25/03/2025' },
  ];
  
  // Catálogos más utilizados
  const catalogosMasUtilizados = [
    { id: 1, nombre: 'Puestos', modulo: 'Nómina', registros: 124, actualizacion: '15/02/2025' },
    { id: 2, nombre: 'Adscripciones', modulo: 'Nómina', registros: 87, actualizacion: '10/02/2025' },
    { id: 3, nombre: 'Usuarios', modulo: 'Administración', registros: 245, actualizacion: '01/04/2025' },
    { id: 4, nombre: 'Cuentas contables', modulo: 'Contabilidad', registros: 347, actualizacion: '28/03/2025' },
  ];

  // Función para renderizar catálogos en formato de grid
  const renderCatalogos = (catalogos:any) => {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {catalogos.map((catalogo:any) => (
          <Button 
            key={catalogo.id} 
            variant="outline" 
            className="h-auto py-3 px-4 justify-start text-left"
          >
            <div className="w-full">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{catalogo.nombre}</span>
                <Badge variant="outline">{catalogo.cantidad}</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Última actualización: {catalogo.actualizacion}
              </p>
            </div>
          </Button>
        ))}
      </div>
    );
  };

  return (
    <div className="grid gap-6">
      <Tabs defaultValue="general" value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="nomina">Nómina</TabsTrigger>
          <TabsTrigger value="contabilidad">Contabilidad</TabsTrigger>
          <TabsTrigger value="administracion">Administración</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Catálogos Generales</CardTitle>
              <CardDescription>Catálogos de uso general en el sistema</CardDescription>
            </CardHeader>
            <CardContent>
              {renderCatalogos(catalogosGenerales)}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="nomina" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Catálogos de Nómina</CardTitle>
              <CardDescription>Catálogos relacionados con nómina y recursos humanos</CardDescription>
            </CardHeader>
            <CardContent>
              {renderCatalogos(catalogosNomina)}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contabilidad" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Catálogos de Contabilidad</CardTitle>
              <CardDescription>Catálogos relacionados con contabilidad y finanzas</CardDescription>
            </CardHeader>
            <CardContent>
              {renderCatalogos(catalogosContabilidad)}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="administracion" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Catálogos de Administración</CardTitle>
              <CardDescription>Catálogos para la administración del sistema</CardDescription>
            </CardHeader>
            <CardContent>
              {renderCatalogos(catalogosAdministracion)}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>Catálogos más utilizados</CardTitle>
          <CardDescription>Catálogos con mayor frecuencia de consulta</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Catálogo</TableHead>
                <TableHead className="hidden md:table-cell">Módulo</TableHead>
                <TableHead className="hidden sm:table-cell">Registros</TableHead>
                <TableHead>Última actualización</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {catalogosMasUtilizados.map((catalogo) => (
                <TableRow key={catalogo.id}>
                  <TableCell className="font-medium">{catalogo.nombre}</TableCell>
                  <TableCell className="hidden md:table-cell">{catalogo.modulo}</TableCell>
                  <TableCell className="hidden sm:table-cell">{catalogo.registros}</TableCell>
                  <TableCell>{catalogo.actualizacion}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Editar</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Historial de actualizaciones de catálogos */}
      <Card>
        <CardHeader>
          <CardTitle>Historial de Actualizaciones</CardTitle>
          <CardDescription>Últimas modificaciones a los catálogos</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Catálogo</TableHead>
                <TableHead className="hidden sm:table-cell">Acción</TableHead>
                <TableHead>Usuario</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead className="text-right">Detalles</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { id: 1, catalogo: 'Puestos', accion: 'Adición', usuario: 'admin@uan.edu.mx', fecha: '15/03/2025 10:23' },
                { id: 2, catalogo: 'Niveles salariales', accion: 'Modificación', usuario: 'rh@uan.edu.mx', fecha: '12/03/2025 14:45' },
                { id: 3, catalogo: 'Adscripciones', accion: 'Adición', usuario: 'admin@uan.edu.mx', fecha: '10/03/2025 09:30' },
                { id: 4, catalogo: 'Usuarios', accion: 'Modificación', usuario: 'sistemas@uan.edu.mx', fecha: '01/03/2025 16:15' },
              ].map((registro) => (
                <TableRow key={registro.id}>
                  <TableCell className="font-medium">{registro.catalogo}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant={registro.accion === 'Adición' ? 'default' : 'secondary'}>
                      {registro.accion}
                    </Badge>
                  </TableCell>
                  <TableCell>{registro.usuario}</TableCell>
                  <TableCell>{registro.fecha}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Ver cambios</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="border-t px-6 py-3">
          <Button variant="outline" size="sm" className="ml-auto">
            Ver historial completo
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CatalogosModule;