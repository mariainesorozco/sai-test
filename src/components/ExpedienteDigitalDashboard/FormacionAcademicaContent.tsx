"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, ChevronRight, Calendar, Award, FileText, Edit, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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

// Definición de tipos
interface LogroItem {
  id: number;
  descripcion: string;
  anio: string;
  documento: string;
}

interface ReconocimientoItem {
  id: number;
  descripcion: string;
  otorgadoPor: string;
  fecha: string;
  documento: string;
}

interface CursoItem {
  id: number;
  titulo: string;
  area: string;
  institucion: string;
  periodo: string;
  estado: string;
}

interface PublicacionItem {
  id: number;
  titulo: string;
  editorial: string;
  area: string;
  fecha: string;
}

interface AsociacionItem {
  id: number;
  asociacion: string;
  cargo: string;
  fechaIngreso: string;
}

type TabType = 'logros' | 'distinciones' | 'reconocimientos' | 'publicaciones' | 'asociaciones' | 'cursos';

const FormacionAcademicaContent = () => {
  const [activeTab, setActiveTab] = useState<TabType>("logros");
  const [selectedItem, setSelectedItem] = useState(null);
  
  // Datos de ejemplo
  const logrosData: LogroItem[] = [
    { id: 1, descripcion: "Mejor promedio generación", anio: "2020", documento: "diploma.pdf" },
  ];
  
  const reconocimientosData: ReconocimientoItem[] = [
    { 
      id: 1, 
      descripcion: "Reconocimiento al mérito docente", 
      otorgadoPor: "Universidad Autónoma de Nayarit", 
      fecha: "Mayo 2019", 
      documento: "reconocimiento.pdf" 
    },
  ];
  
  const cursosData: CursoItem[] = [
    { 
      id: 1, 
      titulo: "Desarrollo de habilidades docentes", 
      area: "Pedagogía", 
      institucion: "UAN", 
      periodo: "01/01/2022 - 30/06/2022", 
      estado: "Terminado" 
    },
  ];
  
  // Función para renderizar las tarjetas en vista móvil
  const renderMobileCards = (tipo: TabType) => {
    switch(tipo) {
      case "logros":
        return (
          <div className="space-y-3">
            {logrosData.length > 0 ? logrosData.map(item => (
              <Card key={item.id} className="relative">
                <CardContent className="pt-6">
                  <h3 className="font-medium text-base mb-2">{item.descripcion}</h3>
                  <div className="text-sm text-muted-foreground flex items-center mb-1">
                    <Calendar className="h-3.5 w-3.5 mr-1" /> {item.anio}
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <Badge variant="outline" className="mr-2">Ver documento</Badge>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="w-[90%] rounded-lg">
                          <AlertDialogHeader>
                            <AlertDialogTitle>¿Eliminar este registro?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta acción no se puede deshacer. Eliminará permanentemente este logro
                              de la base de datos.
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
            )) : (
              <Card>
                <CardContent className="py-6 text-center text-muted-foreground">
                  No hay logros registrados
                </CardContent>
              </Card>
            )}
          </div>
        );
        
      case "publicaciones":
        // Datos de ejemplo para publicaciones
        const publicacionesData: PublicacionItem[] = [];
        return (
          <div className="space-y-3">
            {publicacionesData.length > 0 ? publicacionesData.map(item => (
              <Card key={item.id}>
                <CardContent className="pt-6">
                  <h3 className="font-medium text-base mb-2">{item.titulo}</h3>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">Editorial:</span> {item.editorial}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">Área:</span> {item.area}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1" /> {item.fecha}
                    </div>
                  </div>
                  <div className="flex justify-end mt-3">
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="w-[90%] rounded-lg">
                          <AlertDialogHeader>
                            <AlertDialogTitle>¿Eliminar publicación?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta acción no se puede deshacer. Eliminará permanentemente esta publicación
                              de la base de datos.
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
            )) : (
              <Card>
                <CardContent className="py-6 text-center text-muted-foreground">
                  No hay publicaciones registradas
                </CardContent>
              </Card>
            )}
          </div>
        );
        
      case "asociaciones":
        // Datos de ejemplo para asociaciones
        const asociacionesData: AsociacionItem[] = [];
        return (
          <div className="space-y-3">
            {asociacionesData.length > 0 ? asociacionesData.map(item => (
              <Card key={item.id}>
                <CardContent className="pt-6">
                  <h3 className="font-medium text-base mb-2">{item.asociacion}</h3>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">Cargo:</span> {item.cargo}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1" /> {item.fechaIngreso}
                    </div>
                  </div>
                  <div className="flex justify-end mt-3">
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="w-[90%] rounded-lg">
                          <AlertDialogHeader>
                            <AlertDialogTitle>¿Eliminar asociación?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta acción no se puede deshacer. Eliminará permanentemente esta asociación
                              de la base de datos.
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
            )) : (
              <Card>
                <CardContent className="py-6 text-center text-muted-foreground">
                  No hay asociaciones registradas
                </CardContent>
              </Card>
            )}
          </div>
        );
        
      case "reconocimientos":
        return (
          <div className="space-y-3">
            {reconocimientosData.length > 0 ? reconocimientosData.map(item => (
              <Card key={item.id}>
                <CardContent className="pt-6">
                  <h3 className="font-medium text-base mb-2">{item.descripcion}</h3>
                  <div className="text-sm text-muted-foreground mb-1">
                    <span className="font-medium">Otorgado por:</span> {item.otorgadoPor}
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center mb-1">
                    <Calendar className="h-3.5 w-3.5 mr-1" /> {item.fecha}
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <Badge variant="outline" className="mr-2">Ver documento</Badge>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )) : (
              <Card>
                <CardContent className="py-6 text-center text-muted-foreground">
                  No hay reconocimientos registrados
                </CardContent>
              </Card>
            )}
          </div>
        );
          
      case "cursos":
        return (
          <div className="space-y-3">
            {cursosData.length > 0 ? cursosData.map(item => (
              <Card key={item.id}>
                <CardContent className="pt-6">
                  <h3 className="font-medium text-base mb-2">{item.titulo}</h3>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-sm">
                    <div className="text-muted-foreground">Área:</div>
                    <div>{item.area}</div>
                    <div className="text-muted-foreground">Institución:</div>
                    <div>{item.institucion}</div>
                    <div className="text-muted-foreground">Período:</div>
                    <div>{item.periodo}</div>
                    <div className="text-muted-foreground">Estado:</div>
                    <div><Badge>{item.estado}</Badge></div>
                  </div>
                  <div className="flex justify-end mt-3">
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )) : (
              <Card>
                <CardContent className="py-6 text-center text-muted-foreground">
                  No hay cursos registrados
                </CardContent>
              </Card>
            )}
          </div>
        );
          
      case "distinciones":
        return (
          <Card>
            <CardContent className="py-6 text-center text-muted-foreground">
              No hay distinciones registradas
            </CardContent>
          </Card>
        );
          
      default:
        return (
          <Card>
            <CardContent className="py-6 text-center text-muted-foreground">
              No hay registros disponibles
            </CardContent>
          </Card>
        );
    }
  };
  
  return (
    <div className="grid gap-4 md:gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight hidden md:block">Formación Académica</h2>
        <Button size="sm">Agregar</Button>
      </div>
      
      {/* Selector para versión móvil */}
      <div className="block md:hidden">
        <Select value={activeTab} onValueChange={(value) => setActiveTab(value as TabType)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Seleccionar categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="logros">Logros</SelectItem>
            <SelectItem value="distinciones">Distinciones</SelectItem>
            <SelectItem value="reconocimientos">Reconocimientos</SelectItem>
            <SelectItem value="publicaciones">Publicaciones</SelectItem>
            <SelectItem value="asociaciones">Asociaciones</SelectItem>
            <SelectItem value="cursos">Cursos</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="mt-4">
          {/* Vista de tarjetas para móvil */}
          {renderMobileCards(activeTab)}
          
          <Button variant="outline" size="sm" className="w-full mt-4">
            <Plus className="h-4 w-4 mr-2" /> Agregar {activeTab === "logros" ? "logro" : 
                                                        activeTab === "distinciones" ? "distinción" : 
                                                        activeTab === "reconocimientos" ? "reconocimiento" : 
                                                        activeTab === "publicaciones" ? "publicación" : 
                                                        activeTab === "asociaciones" ? "asociación" : "curso"}
          </Button>
        </div>
      </div>

      {/* Tabs para versión desktop */}
      <div className="hidden md:block">
        <Tabs defaultValue="logros" className="w-full" value={activeTab} onValueChange={(value) => setActiveTab(value as TabType)}>
          <ScrollArea className="w-full">
            <TabsList className="w-max mb-4 inline-flex">
              <TabsTrigger value="logros">Logros</TabsTrigger>
              <TabsTrigger value="distinciones">Distinciones</TabsTrigger>
              <TabsTrigger value="reconocimientos">Reconocimientos</TabsTrigger>
              <TabsTrigger value="publicaciones">Publicaciones</TabsTrigger>
              <TabsTrigger value="asociaciones">Asociaciones</TabsTrigger>
              <TabsTrigger value="cursos">Cursos</TabsTrigger>
            </TabsList>
          </ScrollArea>
          
          <TabsContent value="logros" className="mt-2 md:mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Logros académicos</CardTitle>
                <CardDescription>Logros obtenidos durante su formación académica</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Descripción</TableHead>
                      <TableHead>Año</TableHead>
                      <TableHead>Documento</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {logrosData.length > 0 ? (
                      logrosData.map(item => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.descripcion}</TableCell>
                          <TableCell>{item.anio}</TableCell>
                          <TableCell>
                            <Badge variant="outline">Ver documento</Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">Editar</Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                          No hay logros registrados
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="justify-center">
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" /> Agregar logro
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="distinciones" className="mt-2 md:mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Distinciones académicas</CardTitle>
                <CardDescription>Distinciones recibidas durante su formación</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Descripción</TableHead>
                      <TableHead>Año</TableHead>
                      <TableHead>Documento</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                        No hay distinciones registradas
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="justify-center">
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" /> Agregar distinción
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="reconocimientos" className="mt-2 md:mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Reconocimientos</CardTitle>
                <CardDescription>Reconocimientos obtenidos</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Descripción</TableHead>
                      <TableHead>Otorgado por</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Documento</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reconocimientosData.length > 0 ? (
                      reconocimientosData.map(item => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.descripcion}</TableCell>
                          <TableCell>{item.otorgadoPor}</TableCell>
                          <TableCell>{item.fecha}</TableCell>
                          <TableCell>
                            <Badge variant="outline">Ver documento</Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">Editar</Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                          No hay reconocimientos registrados
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="justify-center">
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" /> Agregar reconocimiento
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="publicaciones" className="mt-2 md:mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Publicaciones</CardTitle>
                <CardDescription>Publicaciones académicas y profesionales</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Título</TableHead>
                      <TableHead>Editorial</TableHead>
                      <TableHead>Área</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                        No hay publicaciones registradas
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="justify-center">
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" /> Agregar publicación
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        
          <TabsContent value="asociaciones" className="mt-2 md:mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Asociaciones</CardTitle>
                <CardDescription>Membresías en asociaciones profesionales</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asociación</TableHead>
                      <TableHead>Cargo</TableHead>
                      <TableHead>Fecha de ingreso</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                        No hay asociaciones registradas
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="justify-center">
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" /> Agregar asociación
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="cursos" className="mt-2 md:mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Cursos y capacitaciones</CardTitle>
                <CardDescription>Cursos y capacitaciones realizados</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Curso</TableHead>
                      <TableHead>Área</TableHead>
                      <TableHead>Institución</TableHead>
                      <TableHead>Período</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cursosData.length > 0 ? (
                      cursosData.map(item => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.titulo}</TableCell>
                          <TableCell>{item.area}</TableCell>
                          <TableCell>{item.institucion}</TableCell>
                          <TableCell>{item.periodo}</TableCell>
                          <TableCell>
                            <Badge>{item.estado}</Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">Editar</Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                          No hay cursos registrados
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="justify-center">
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" /> Agregar curso
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FormacionAcademicaContent;