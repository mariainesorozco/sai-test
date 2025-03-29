"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';

const FormacionAcademicaContent = () => {
  return (
    <div className="grid gap-4 md:gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight hidden md:block">Formación Académica</h2>
        <Button size="sm">Agregar</Button>
      </div>

      <Tabs defaultValue="logros" className="w-full">
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
            <CardContent className="overflow-auto">
              <div className="min-w-[400px]">
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
                      <TableCell className="font-medium">Mejor promedio generación</TableCell>
                      <TableCell>2020</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ver documento</Badge>
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
            <CardContent className="overflow-auto">
              <div className="min-w-[400px]">
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
              </div>
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
            <CardContent className="overflow-auto">
              <div className="min-w-[500px]">
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
                    <TableRow>
                      <TableCell className="font-medium">Reconocimiento al mérito docente</TableCell>
                      <TableCell>Universidad Autónoma de Nayarit</TableCell>
                      <TableCell>Mayo 2019</TableCell>
                      <TableCell>
                        <Badge variant="outline">Ver documento</Badge>
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
            <CardContent className="overflow-auto">
                <div className="min-w-[600px]">
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
                </div>
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
            <CardContent className="overflow-auto">
                <div className="min-w-[600px]">
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
                </div>
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
            <CardContent className="overflow-auto">
              <div className="min-w-[600px]">
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
                    <TableRow>
                      <TableCell className="font-medium">Desarrollo de habilidades docentes</TableCell>
                      <TableCell>Pedagogía</TableCell>
                      <TableCell>UAN</TableCell>
                      <TableCell>01/01/2022 - 30/06/2022</TableCell>
                      <TableCell>
                        <Badge>Terminado</Badge>
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
                <Plus className="h-4 w-4 mr-2" /> Agregar curso
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FormacionAcademicaContent;