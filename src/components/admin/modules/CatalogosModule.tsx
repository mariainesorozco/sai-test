"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Plus, 
  Edit, 
  BookOpen, 
  Users, 
  FileText, 
  Clock,
  ChevronRight,
  Calendar,
  Check,
  Settings
} from 'lucide-react';

const CatalogosModule = () => {
  const [selectedTab, setSelectedTab] = useState("general");
  const [searchQuery, setSearchQuery] = useState('');
  
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

  // Obtener catálogos actuales según la pestaña seleccionada
  const getCurrentCatalogos = () => {
    switch(selectedTab) {
      case 'general':
        return catalogosGenerales;
      case 'nomina':
        return catalogosNomina;
      case 'contabilidad':
        return catalogosContabilidad;
      case 'administracion':
        return catalogosAdministracion;
      default:
        return catalogosGenerales;
    }
  };

  // Filtrar catálogos por búsqueda
  const filteredCatalogos = getCurrentCatalogos().filter(cat => 
    cat.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Obtener la descripción según la pestaña seleccionada
  const getTabDescription = () => {
    switch(selectedTab) {
      case 'general':
        return "Catálogos generales";
      case 'nomina':
        return "Catálogos de nómina";
      case 'contabilidad':
        return "Catálogos contables";
      case 'administracion':
        return "Catálogos administrativos";
      default:
        return "Catálogos del sistema";
    }
  };

  // Función para renderizar catálogos en formato de grid para desktop
  const renderCatalogosGrid = (catalogos:any) => {
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

  // Función para renderizar catálogos en formato de lista para móviles
  const renderCatalogosList = (catalogos:any) => {
    return (
      <div className="divide-y">
        {catalogos.map((catalogo:any) => (
          <div 
            key={catalogo.id}
            className="py-3 flex items-center justify-between"
          >
            <div>
              <div className="text-sm font-medium">{catalogo.nombre}</div>
              <div className="text-[10px] flex items-center text-muted-foreground mt-0.5">
                <Clock className="h-2.5 w-2.5 mr-1" />
                {catalogo.actualizacion}
              </div>
            </div>
            <div className="flex items-center">
              <Badge variant="outline" className="mr-2">{catalogo.cantidad}</Badge>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="grid gap-3 sm:gap-6">
      {/* Barra de búsqueda para móviles */}
      <div className="md:hidden">
        <div className="relative mb-3">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar catálogo..." 
            className="pl-8 h-9 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="general" value={selectedTab} onValueChange={setSelectedTab}>
        {/* Tabs para todas las pantallas - Responsive */}
        <TabsList className="mb-2 sm:mb-3 md:mb-4 w-auto">
          <TabsTrigger value="general" className="text-xs sm:text-sm">General</TabsTrigger>
          <TabsTrigger value="nomina" className="text-xs sm:text-sm">Nómina</TabsTrigger>
          <TabsTrigger value="contabilidad" className="text-xs sm:text-sm">Contabilidad</TabsTrigger>
          <TabsTrigger value="administracion" className="text-xs sm:text-sm">Administración</TabsTrigger>
        </TabsList>
        
        {/* Contenido para móviles */}
        <div className="md:hidden">
          <Card>
            <CardHeader className="p-3 pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm">{getTabDescription()}</CardTitle>
                  <CardDescription className="text-[10px]">
                    {filteredCatalogos.length} catálogos disponibles
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" className="h-7 p-0 w-7">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              {filteredCatalogos.length > 0 ? (
                renderCatalogosList(filteredCatalogos)
              ) : (
                <div className="py-8 text-center text-muted-foreground">
                  <BookOpen className="h-8 w-8 mb-2 mx-auto opacity-30" />
                  <p className="text-sm">No se encontraron catálogos</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Contenido para Desktop */}
        <div className="hidden md:block">
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Catálogos Generales</CardTitle>
                    <CardDescription>Catálogos de uso general en el sistema</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Buscar catálogo..." 
                        className="pl-8 w-[200px]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Nuevo
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {renderCatalogosGrid(filteredCatalogos)}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="nomina" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Catálogos de Nómina</CardTitle>
                    <CardDescription>Catálogos relacionados con nómina y recursos humanos</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Buscar catálogo..." 
                        className="pl-8 w-[200px]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Nuevo
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {renderCatalogosGrid(filteredCatalogos)}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="contabilidad" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Catálogos de Contabilidad</CardTitle>
                    <CardDescription>Catálogos relacionados con contabilidad y finanzas</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Buscar catálogo..." 
                        className="pl-8 w-[200px]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Nuevo
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {renderCatalogosGrid(filteredCatalogos)}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="administracion" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Catálogos de Administración</CardTitle>
                    <CardDescription>Catálogos para la administración del sistema</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Buscar catálogo..." 
                        className="pl-8 w-[200px]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Nuevo
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {renderCatalogosGrid(filteredCatalogos)}
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
      
      {/* Catálogos más utilizados - Versión móvil */}
      <Card className="md:hidden">
        <CardHeader className="p-3 pb-2">
          <CardTitle className="text-sm">Más utilizados</CardTitle>
          <CardDescription className="text-[10px]">Catálogos con mayor frecuencia de uso</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {catalogosMasUtilizados.slice(0, 3).map((catalogo) => (
              <div 
                key={catalogo.id}
                className="p-3 flex items-start justify-between"
              >
                <div>
                  <div className="text-xs font-medium">{catalogo.nombre}</div>
                  <div className="text-[10px] text-muted-foreground">{catalogo.modulo}</div>
                  <div className="text-[10px] flex items-center text-muted-foreground mt-1">
                    <Clock className="h-2.5 w-2.5 mr-1" />
                    {catalogo.actualizacion}
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="text-[9px]">{catalogo.registros}</Badge>
                  <Button variant="ghost" size="sm" className="h-6 px-1 mt-1 text-[10px]">
                    <Edit className="h-3 w-3 mr-1" />
                    Editar
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full text-[10px] h-7"
            >
              Ver todos
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Historial de actualizaciones - Versión móvil simplificada */}
      <Card className="md:hidden">
        <CardHeader className="p-3 pb-2">
          <CardTitle className="text-sm">Actualizaciones recientes</CardTitle>
          <CardDescription className="text-[10px]">Últimos cambios</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {[
              { id: 1, catalogo: 'Puestos', accion: 'Adición', usuario: 'admin@uan.edu.mx', fecha: '15/03/2025 10:23' },
              { id: 2, catalogo: 'Niveles salariales', accion: 'Modificación', usuario: 'rh@uan.edu.mx', fecha: '12/03/2025 14:45' },
              { id: 3, catalogo: 'Adscripciones', accion: 'Adición', usuario: 'admin@uan.edu.mx', fecha: '10/03/2025 09:30' },
            ].map((registro) => (
              <div 
                key={registro.id}
                className="p-3 flex items-start justify-between"
              >
                <div>
                  <div className="text-xs font-medium">{registro.catalogo}</div>
                  <div className="text-[10px] text-muted-foreground">{registro.usuario}</div>
                  <div className="text-[10px] flex items-center text-muted-foreground mt-1">
                    <Calendar className="h-2.5 w-2.5 mr-1" />
                    {registro.fecha}
                  </div>
                </div>
                <div className="text-right">
                  <Badge 
                    variant={registro.accion === 'Adición' ? 'default' : 'secondary'}
                    className="text-[9px]"
                  >
                    {registro.accion}
                  </Badge>
                  <Button variant="ghost" size="sm" className="h-6 px-1 mt-1 text-[10px]">
                    Ver <ChevronRight className="h-3 w-3 ml-0.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full text-[10px] h-7"
            >
              Ver historial completo
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Acceso rápido para móviles */}
      <div className="md:hidden">
        <Card>
          <CardHeader className="p-3 pb-2">
            <CardTitle className="text-sm">Acciones rápidas</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="grid grid-cols-4 gap-2">
              <Button variant="outline" className="h-auto py-3 flex flex-col text-[10px]">
                <Plus className="h-4 w-4 mb-1" />
                <span>Crear</span>
              </Button>
              <Button variant="outline" className="h-auto py-3 flex flex-col text-[10px]">
                <FileText className="h-4 w-4 mb-1" />
                <span>Exportar</span>
              </Button>
              <Button variant="outline" className="h-auto py-3 flex flex-col text-[10px]">
                <Users className="h-4 w-4 mb-1" />
                <span>Usuarios</span>
              </Button>
              <Button variant="outline" className="h-auto py-3 flex flex-col text-[10px]">
                <Settings className="h-4 w-4 mb-1" />
                <span>Ajustes</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Catálogos más utilizados - Versión desktop */}
      <Card className="hidden md:block">
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

      {/* Historial de actualizaciones de catálogos - Versión desktop */}
      <Card className="hidden md:block">
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