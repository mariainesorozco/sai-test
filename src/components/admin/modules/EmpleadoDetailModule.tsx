"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Briefcase, 
  FileText, 
  GraduationCap, 
  Users, 
  CreditCard, 
  Heart, 
  LifeBuoy,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ArrowLeft,
  Pencil,
  Download,
  ChevronRight
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

// Este componente muestra los detalles del expediente de un empleado específico
interface EmpleadoDetailModuleProps {
  onBack: () => void;
  empleadoId?: number;
}

const EmpleadoDetailModule: React.FC<EmpleadoDetailModuleProps> = ({ onBack, empleadoId = 1 }) => {
  const [activeTab, setActiveTab] = useState('informacion-general');

  // Datos del empleado simulado (Juan Pérez, con ID 1)
  // En una aplicación real, estos datos se obtendrían de una API basada en el empleadoId
  const empleado = empleadoId === 1 ? {
    id: 1,
    nombre: 'Juan Pérez',
    puesto: 'Profesor de Tiempo Completo',
    adscripcion: 'Unidad Académica de Economía',
    estatus: 'Activo',
    email: 'juan.perez@uan.edu.mx',
    telefono: '(311) 123-4567',
    fechaIngreso: '15/01/2020',
    numeroEmpleado: '000123',
    numeroPlaza: 'PT-ECO-045',
    rfc: 'PEJG800101ABC',
    curp: 'PEJG800101HNTRZN09',
    nss: '12345678912',
    direccion: 'Calle Insurgentes 450, Col. Centro, Tepic, Nayarit',
    tipoEmpleado: 'Base',
    categoria: 'Docente',
    sindicato: 'SPAUAN',
    completitudExpediente: 85,
    documentosFaltantes: ['Certificado médico', 'Constancia de estudios de doctorado'],
    urlFoto: '/api/placeholder/180/180'
  } : {
    id: empleadoId,
    nombre: 'Empleado no encontrado',
    puesto: 'N/A',
    adscripcion: 'N/A',
    estatus: 'N/A',
    email: 'N/A',
    telefono: 'N/A',
    fechaIngreso: 'N/A',
    numeroEmpleado: 'N/A',
    numeroPlaza: 'N/A',
    rfc: 'N/A',
    curp: 'N/A',
    nss: 'N/A',
    direccion: 'N/A',
    tipoEmpleado: 'N/A',
    categoria: 'N/A',
    sindicato: 'N/A',
    completitudExpediente: 0,
    documentosFaltantes: [],
    urlFoto: '/api/placeholder/180/180'
  };

  // Información académica simulada
  const formacionAcademica = [
    { grado: 'Licenciatura', titulo: 'Licenciatura en Economía', institucion: 'Universidad Autónoma de Nayarit', anio: 2004 },
    { grado: 'Maestría', titulo: 'Maestría en Desarrollo Económico Local', institucion: 'Universidad Autónoma de Nayarit', anio: 2008 }
  ];

  // Experiencia laboral simulada
  const experienciaLaboral = [
    { empresa: 'Universidad Autónoma de Nayarit', puesto: 'Profesor de Tiempo Completo', periodo: '2020 - Actual' },
    { empresa: 'Instituto Tecnológico de Tepic', puesto: 'Profesor de Asignatura', periodo: '2010 - 2020' }
  ];

  // Carga académica simulada
  const cargaAcademica = [
    { materia: 'Microeconomía Avanzada', grupo: 'ECO-501', horario: 'Lunes y Miércoles 08:00 - 10:00' },
    { materia: 'Teoría Económica', grupo: 'ECO-302', horario: 'Martes y Jueves 10:00 - 12:00' },
    { materia: 'Seminario de Investigación', grupo: 'ECO-701', horario: 'Viernes 12:00 - 15:00' }
  ];

  // Incidencias simuladas
  const incidencias = [
    { tipo: 'Permiso Económico', fechaInicio: '10/03/2025', fechaFin: '12/03/2025', estatus: 'Aprobado' },
    { tipo: 'Licencia Académica', fechaInicio: '15/05/2024', fechaFin: '30/06/2024', estatus: 'Concluido' }
  ];

  // Trámites simulados
  const tramites = [
    { id: 'TRM-2025-031', descripcion: 'Solicitud de constancia laboral', fecha: '18/03/2025', estatus: 'En proceso' },
    { id: 'TRM-2025-015', descripcion: 'Actualización de datos bancarios', fecha: '05/02/2025', estatus: 'Completado' }
  ];

  useEffect(() => {
    // Scroll al inicio cuando se abre el expediente
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="grid gap-6">
      {/* Encabezado con botón para regresar */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-1">
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Volver</span>
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Exportar</span>
          </Button>
          <Button size="sm" className="gap-1">
            <Pencil className="h-4 w-4" />
            <span className="hidden sm:inline">Editar</span>
          </Button>
        </div>
      </div>

      {/* Información general del empleado */}
      <div className="grid gap-6 md:grid-cols-12">
        {/* Tarjeta de información personal */}
        <Card className="md:col-span-4">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center mb-4">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={empleado.urlFoto} alt={empleado.nombre} />
                <AvatarFallback>{empleado.nombre.charAt(0)}</AvatarFallback>
              </Avatar>
              <h3 className="text-lg font-bold">{empleado.nombre}</h3>
              <p className="text-sm text-muted-foreground">{empleado.puesto}</p>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                <Badge>{empleado.estatus}</Badge>
                <Badge variant="outline">{empleado.tipoEmpleado}</Badge>
                <Badge variant="secondary">{empleado.categoria}</Badge>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">Adscripción</p>
                  <p className="text-sm">{empleado.adscripcion}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">Correo electrónico</p>
                  <p className="text-sm">{empleado.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">Teléfono</p>
                  <p className="text-sm">{empleado.telefono}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">Fecha de ingreso</p>
                  <p className="text-sm">{empleado.fechaIngreso}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">Número de empleado</p>
                  <p className="text-sm">{empleado.numeroEmpleado}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">RFC</p>
                  <p className="text-sm">{empleado.rfc}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">CURP</p>
                  <p className="text-sm">{empleado.curp}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <LifeBuoy className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">NSS</p>
                  <p className="text-sm">{empleado.nss}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tarjeta con pestañas de información */}
        <Card className="md:col-span-8">
          <CardHeader className="pb-0">
            <CardTitle>Expediente Digital</CardTitle>
            <CardDescription>
              Información detallada del expediente del empleado
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs defaultValue="informacion-general" value={activeTab} onValueChange={setActiveTab}>
              <div className="overflow-x-auto mb-6">
                <TabsList className="w-max">
                  <TabsTrigger value="informacion-general">Información General</TabsTrigger>
                  <TabsTrigger value="formacion-academica">Formación Académica</TabsTrigger>
                  <TabsTrigger value="carga-academica">Carga Académica</TabsTrigger>
                  <TabsTrigger value="incidencias">Incidencias</TabsTrigger>
                  <TabsTrigger value="tramites">Trámites</TabsTrigger>
                </TabsList>
              </div>

              {/* Contenido de la pestaña de información general */}
              <TabsContent value="informacion-general" className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Completitud del expediente</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Estado general: {empleado.completitudExpediente}%</span>
                      <span className="text-muted-foreground">{empleado.documentosFaltantes.length} documentos pendientes</span>
                    </div>
                    <Progress value={empleado.completitudExpediente} />
                    
                    {empleado.documentosFaltantes.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Documentos pendientes:</h4>
                        <ul className="text-sm space-y-1">
                          {empleado.documentosFaltantes.map((doc, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                              {doc}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-2">Experiencia Laboral</h3>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Empresa/Institución</TableHead>
                          <TableHead>Puesto</TableHead>
                          <TableHead>Periodo</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {experienciaLaboral.map((exp, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{exp.empresa}</TableCell>
                            <TableCell>{exp.puesto}</TableCell>
                            <TableCell>{exp.periodo}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Datos de Contacto</h3>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Dirección</p>
                      <p className="text-sm">{empleado.direccion}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Contenido de la pestaña de formación académica */}
              <TabsContent value="formacion-academica" className="space-y-4">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Grado</TableHead>
                        <TableHead>Título</TableHead>
                        <TableHead>Institución</TableHead>
                        <TableHead>Año</TableHead>
                        <TableHead>Documentos</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {formacionAcademica.map((formacion, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Badge className={
                              formacion.grado === 'Doctorado' ? 'bg-purple-600' :
                              formacion.grado === 'Maestría' ? 'bg-blue-600' :
                              'bg-green-600'
                            }>
                              {formacion.grado}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">{formacion.titulo}</TableCell>
                          <TableCell>{formacion.institucion}</TableCell>
                          <TableCell>{formacion.anio}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Badge variant="outline">Título</Badge>
                              <Badge variant="outline">Cédula</Badge>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <Button variant="outline" size="sm">Ver formación académica completa</Button>
              </TabsContent>

              {/* Contenido de la pestaña de carga académica */}
              <TabsContent value="carga-academica" className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Materia</TableHead>
                      <TableHead>Grupo</TableHead>
                      <TableHead>Horario</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cargaAcademica.map((carga, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{carga.materia}</TableCell>
                        <TableCell>{carga.grupo}</TableCell>
                        <TableCell>{carga.horario}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              {/* Contenido de la pestaña de incidencias */}
              <TabsContent value="incidencias" className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Fecha Inicio</TableHead>
                      <TableHead>Fecha Fin</TableHead>
                      <TableHead>Estatus</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {incidencias.map((incidencia, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{incidencia.tipo}</TableCell>
                        <TableCell>{incidencia.fechaInicio}</TableCell>
                        <TableCell>{incidencia.fechaFin}</TableCell>
                        <TableCell>
                          <Badge variant={incidencia.estatus === "Aprobado" ? "default" : "secondary"}>
                            {incidencia.estatus}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            Ver detalles
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Button variant="outline" size="sm">Registrar nueva incidencia</Button>
              </TabsContent>

              {/* Contenido de la pestaña de trámites */}
              <TabsContent value="tramites" className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Descripción</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Estatus</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tramites.map((tramite, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{tramite.id}</TableCell>
                        <TableCell>{tramite.descripcion}</TableCell>
                        <TableCell>{tramite.fecha}</TableCell>
                        <TableCell>
                          <Badge variant={tramite.estatus === "Completado" ? "default" : "secondary"}>
                            {tramite.estatus}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            Detalles
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Button variant="outline" size="sm">Iniciar nuevo trámite</Button>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="border-t px-6 py-4 flex justify-between">
            <Button variant="outline" size="sm" onClick={() => window.history.back()}>
              Volver a lista de empleados
            </Button>
            <Button variant="outline" size="sm">
              Ver expediente completo 
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default EmpleadoDetailModule;