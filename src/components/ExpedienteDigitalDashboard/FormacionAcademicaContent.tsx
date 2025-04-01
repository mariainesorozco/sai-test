"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, ChevronRight, Calendar, Award, FileText, Edit, Trash2, GraduationCap, Check, CheckCircle2, School, Bookmark, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

interface TituloAcademicoItem {
  id: number;
  grado: 'SIN TÍTULO' | 'LICENCIATURA' | 'ESPECIALIDAD' | 'CANDIDATO A MAESTRO' | 'MAESTRÍA' | 'CANDIDATO A DOCTOR' | 'DOCTORADO';
  titulo: string;
  institucion: string;
  cedula: string;
  anioRegistro: number;
  federal: boolean;
  verificado: boolean;
  fileTitulo: string;
  fileCedula: string;
}

type TabType = 'titulacion' | 'logros' | 'distinciones' | 'reconocimientos' | 'publicaciones' | 'asociaciones' | 'cursos';

const FormacionAcademicaContent = () => {
  const [activeTab, setActiveTab] = useState<TabType>("titulacion");
  const [selectedItem, setSelectedItem] = useState(null);
  const [openTituloDialog, setOpenTituloDialog] = useState(false);
  const [editingTitulo, setEditingTitulo] = useState<TituloAcademicoItem | null>(null);
  
  // Datos de ejemplo para titulación académica
  const titulosData: TituloAcademicoItem[] = [
    {
      id: 1,
      grado: 'LICENCIATURA',
      titulo: 'Licenciatura en Administración',
      institucion: 'Universidad Autónoma de Nayarit',
      cedula: '12345678',
      anioRegistro: 2015,
      federal: true,
      verificado: true,
      fileTitulo: 'titulo_licenciatura.pdf',
      fileCedula: 'cedula_licenciatura.pdf'
    },
    {
      id: 2,
      grado: 'MAESTRÍA',
      titulo: 'Maestría en Administración de Negocios',
      institucion: 'Universidad Autónoma de Nayarit',
      cedula: '87654321',
      anioRegistro: 2018,
      federal: true,
      verificado: true,
      fileTitulo: 'titulo_maestria.pdf',
      fileCedula: 'cedula_maestria.pdf'
    }
  ];
  
  // Datos de ejemplo para otras secciones
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

  // Formulario para añadir/editar título académico
  const [formTitulo, setFormTitulo] = useState<Partial<TituloAcademicoItem>>({
    grado: 'LICENCIATURA',
    titulo: '',
    institucion: '',
    cedula: '',
    anioRegistro: new Date().getFullYear(),
    federal: false,
    verificado: false
  });

  // Función para manejar cambios en el formulario de título
  const handleTituloChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormTitulo(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormTitulo(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Función para guardar el título
  const handleSaveTitulo = () => {
    // Aquí iría la lógica para guardar en la base de datos
    console.log("Guardando título:", formTitulo);
    setOpenTituloDialog(false);
    // Resetear el formulario
    setFormTitulo({
      grado: 'LICENCIATURA',
      titulo: '',
      institucion: '',
      cedula: '',
      anioRegistro: new Date().getFullYear(),
      federal: false,
      verificado: false
    });
    setEditingTitulo(null);
  };

  // Abrir diálogo para editar título
  const handleEditTitulo = (titulo: TituloAcademicoItem) => {
    setEditingTitulo(titulo);
    setFormTitulo({
      ...titulo
    });
    setOpenTituloDialog(true);
  };

  // Abrir diálogo para nuevo título
  const handleNewTitulo = () => {
    setEditingTitulo(null);
    setFormTitulo({
      grado: 'LICENCIATURA',
      titulo: '',
      institucion: '',
      cedula: '',
      anioRegistro: new Date().getFullYear(),
      federal: false,
      verificado: false
    });
    setOpenTituloDialog(true);
  };
  
  // Función para renderizar las tarjetas en vista móvil
  const renderMobileCards = (tipo: TabType) => {
    switch(tipo) {
      case "titulacion":
        return (
          <div className="space-y-3">
            {titulosData.length > 0 ? titulosData.map(item => (
              <Card key={item.id} className="relative">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-base mb-1">{item.titulo}</h3>
                      <p className="text-sm text-muted-foreground">{item.institucion}</p>
                    </div>
                    <Badge className={
                      item.grado === 'DOCTORADO' ? 'bg-purple-600' :
                      item.grado === 'MAESTRÍA' ? 'bg-blue-600' :
                      item.grado === 'LICENCIATURA' ? 'bg-green-600' : 'bg-gray-600'
                    }>
                      {item.grado}
                    </Badge>
                  </div>
                  
                  <div className="mt-3 space-y-2">
                    <div className="grid grid-cols-2 text-sm">
                      <span className="text-muted-foreground">Cédula:</span>
                      <span>{item.cedula}</span>
                    </div>
                    <div className="grid grid-cols-2 text-sm">
                      <span className="text-muted-foreground">Año de registro:</span>
                      <span>{item.anioRegistro}</span>
                    </div>
                    <div className="grid grid-cols-2 text-sm">
                      <span className="text-muted-foreground">Tipo:</span>
                      <span>{item.federal ? 'Federal' : 'Estatal'}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.fileTitulo && (
                      <Badge variant="outline" className="text-xs flex items-center">
                        <FileText className="h-3 w-3 mr-1" /> Título
                      </Badge>
                    )}
                    {item.fileCedula && (
                      <Badge variant="outline" className="text-xs flex items-center">
                        <FileText className="h-3 w-3 mr-1" /> Cédula
                      </Badge>
                    )}
                    {item.verificado && (
                      <Badge className="bg-green-600 text-xs flex items-center">
                        <CheckCircle2 className="h-3 w-3 mr-1" /> Verificado
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-end mt-3">
                    <div className="flex space-x-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEditTitulo(item)}
                      >
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
                            <AlertDialogTitle>¿Eliminar título académico?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta acción no se puede deshacer. Eliminará permanentemente el registro de 
                              "{item.titulo}" de la base de datos.
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
                  No hay títulos académicos registrados
                </CardContent>
              </Card>
            )}
          </div>
        );
      
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
        <Button size="sm" onClick={handleNewTitulo}>Agregar</Button>
      </div>
      
      {/* Selector para versión móvil */}
      <div className="block md:hidden">
        <Select value={activeTab} onValueChange={(value) => setActiveTab(value as TabType)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Seleccionar categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="titulacion">Titulación Académica</SelectItem>
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
          
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mt-4"
            onClick={activeTab === "titulacion" ? handleNewTitulo : undefined}
          >
            <Plus className="h-4 w-4 mr-2" /> Agregar {
              activeTab === "titulacion" ? "título académico" :
              activeTab === "logros" ? "logro" : 
              activeTab === "distinciones" ? "distinción" : 
              activeTab === "reconocimientos" ? "reconocimiento" : 
              activeTab === "publicaciones" ? "publicación" : 
              activeTab === "asociaciones" ? "asociación" : "curso"
            }
          </Button>
        </div>
      </div>

      {/* Tabs para versión desktop */}
      <div className="hidden md:block">
        <Tabs defaultValue="titulacion" className="w-full" value={activeTab} onValueChange={(value) => setActiveTab(value as TabType)}>
          <ScrollArea className="w-full">
            <TabsList className="w-max mb-4 inline-flex">
              <TabsTrigger value="titulacion">Titulación Académica</TabsTrigger>
              <TabsTrigger value="logros">Logros</TabsTrigger>
              <TabsTrigger value="distinciones">Distinciones</TabsTrigger>
              <TabsTrigger value="reconocimientos">Reconocimientos</TabsTrigger>
              <TabsTrigger value="publicaciones">Publicaciones</TabsTrigger>
              <TabsTrigger value="asociaciones">Asociaciones</TabsTrigger>
              <TabsTrigger value="cursos">Cursos</TabsTrigger>
            </TabsList>
          </ScrollArea>
          
          {/* Contenido de Titulación Académica */}
          <TabsContent value="titulacion" className="mt-2 md:mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Títulos Académicos</CardTitle>
                <CardDescription>Información sobre los grados académicos obtenidos</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Título</TableHead>
                      <TableHead>Grado</TableHead>
                      <TableHead>Institución</TableHead>
                      <TableHead>Cédula</TableHead>
                      <TableHead>Documentos</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {titulosData.length > 0 ? (
                      titulosData.map(item => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.titulo}</TableCell>
                          <TableCell>
                            <Badge className={
                              item.grado === 'DOCTORADO' ? 'bg-purple-600' :
                              item.grado === 'MAESTRÍA' ? 'bg-blue-600' :
                              item.grado === 'LICENCIATURA' ? 'bg-green-600' : 'bg-gray-600'
                            }>
                              {item.grado}
                            </Badge>
                          </TableCell>
                          <TableCell>{item.institucion}</TableCell>
                          <TableCell>{item.cedula}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-2">
                              {item.fileTitulo && (
                                <Badge variant="outline">Título</Badge>
                              )}
                              {item.fileCedula && (
                                <Badge variant="outline">Cédula</Badge>
                              )}
                              {item.verificado && (
                                <Badge className="bg-green-600">Verificado</Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleEditTitulo(item)}
                            >
                              Editar
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                          No hay títulos académicos registrados
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="justify-center">
                <Button variant="outline" size="sm" onClick={handleNewTitulo}>
                  <Plus className="h-4 w-4 mr-2" /> Agregar título académico
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
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
      
      {/* Diálogo para agregar/editar título académico */}
      <Dialog open={openTituloDialog} onOpenChange={setOpenTituloDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="px-6 pt-6 pb-2">
            <DialogTitle>{editingTitulo ? "Editar Título Académico" : "Agregar Título Académico"}</DialogTitle>
            <DialogDescription>
              Complete la información del título académico obtenido.
            </DialogDescription>
          </DialogHeader>
          
          <div className="overflow-y-auto px-6 flex-1">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="grado">Grado Académico</Label>
                  <Select 
                    name="grado"
                    value={formTitulo.grado as string}
                    onValueChange={(value) => setFormTitulo({...formTitulo, grado: value as any})}
                  >
                    <SelectTrigger id="grado">
                      <SelectValue placeholder="Seleccione grado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LICENCIATURA">Licenciatura</SelectItem>
                      <SelectItem value="ESPECIALIDAD">Especialidad</SelectItem>
                      <SelectItem value="CANDIDATO A MAESTRO">Candidato a Maestro</SelectItem>
                      <SelectItem value="MAESTRÍA">Maestría</SelectItem>
                      <SelectItem value="CANDIDATO A DOCTOR">Candidato a Doctor</SelectItem>
                      <SelectItem value="DOCTORADO">Doctorado</SelectItem>
                      <SelectItem value="SIN TÍTULO">Sin título</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="anioRegistro">Año de Registro</Label>
                  <Input
                    id="anioRegistro"
                    name="anioRegistro"
                    type="number"
                    min="1950"
                    max={new Date().getFullYear()}
                    value={formTitulo.anioRegistro}
                    onChange={(e) => setFormTitulo({...formTitulo, anioRegistro: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="titulo">Título Obtenido</Label>
                <Input
                  id="titulo"
                  name="titulo"
                  value={formTitulo.titulo}
                  onChange={(e) => setFormTitulo({...formTitulo, titulo: e.target.value})}
                  placeholder="Ej: Licenciatura en Administración de Empresas"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="institucion">Institución Educativa</Label>
                <Input
                  id="institucion"
                  name="institucion"
                  value={formTitulo.institucion}
                  onChange={(e) => setFormTitulo({...formTitulo, institucion: e.target.value})}
                  placeholder="Ej: Universidad Autónoma de Nayarit"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cedula">Número de Cédula Profesional</Label>
                <Input
                  id="cedula"
                  name="cedula"
                  value={formTitulo.cedula}
                  onChange={(e) => setFormTitulo({...formTitulo, cedula: e.target.value})}
                  placeholder="Número de cédula profesional"
                />
              </div>
              
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="federal"
                    name="federal"
                    checked={formTitulo.federal}
                    onChange={(e) => setFormTitulo({...formTitulo, federal: e.target.checked})}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="federal">Cédula Federal</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="verificado"
                    name="verificado"
                    checked={formTitulo.verificado}
                    onChange={(e) => setFormTitulo({...formTitulo, verificado: e.target.checked})}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="verificado">Título Verificado</Label>
                </div>
              </div>
              
              <Separator className="my-2" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Documento del Título</Label>
                  <div className="flex items-center gap-2">
                    <Input type="file" id="fileTitulo" className="hidden" />
                    <Label htmlFor="fileTitulo" className="cursor-pointer inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                      Seleccionar archivo
                    </Label>
                    <span className="text-sm text-muted-foreground truncate max-w-[150px]">
                      {formTitulo.fileTitulo || "No hay archivo seleccionado"}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Documento de la Cédula</Label>
                  <div className="flex items-center gap-2">
                    <Input type="file" id="fileCedula" className="hidden" />
                    <Label htmlFor="fileCedula" className="cursor-pointer inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                      Seleccionar archivo
                    </Label>
                    <span className="text-sm text-muted-foreground truncate max-w-[150px]">
                      {formTitulo.fileCedula || "No hay archivo seleccionado"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter className="px-6 py-4 border-t">
            <Button variant="outline" onClick={() => setOpenTituloDialog(false)}>Cancelar</Button>
            <Button onClick={handleSaveTitulo}>{editingTitulo ? "Actualizar" : "Guardar"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default FormacionAcademicaContent;