// -----------------------------------
// CargaHorariaJuanPerez.tsx
// -----------------------------------

"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Clock, Calendar, Book, FileText, Briefcase, Building, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Datos ficticios para Juan Pérez (profesor de tiempo completo)
const datosJuanPerez = {
  // Datos de la carga horaria
  cargaHoraria: {
    id: 1234,
    periodo: "2025-A (Enero-Junio 2025)",
    dependencia: "Unidad Académica de Economía",
    dependenciaComision: null,
    tipoCarga: "DOCENTE",
    estatusCarga: "AUTORIZADA",
    tipoHorario: "NORMAL",
    laboresInicio: "2025-01-13",
    laboresFin: "2025-06-20",
    numRevision: 1,
    observacion: "",
    vobDocente: true,
    vobDocenteFecha: "2025-01-10T10:15:30",
    autorizado: true,
    autorizadoFecha: "2025-01-11T09:30:45",
    totalHorasDocencia: 15,
    totalHorasAsesorias: 5,
    totalHorasGestion: 20
  },
  // Horarios por día de la semana
  horarios: [
    // Lunes
    [
      {
        id: 1,
        dia: 1, // Lunes
        horaInicio: "08:00",
        horaFin: "10:00",
        sesiones: 2,
        actividad: "DOCENCIA",
        materia: "Microeconomía Avanzada",
        grupo: "EC-501",
        ubicacion: "Aula A-12"
      },
      {
        id: 2,
        dia: 1, // Lunes
        horaInicio: "10:00",
        horaFin: "12:00",
        sesiones: 2,
        actividad: "DOCENCIA",
        materia: "Teoría Económica",
        grupo: "EC-302",
        ubicacion: "Aula B-05"
      },
      {
        id: 3,
        dia: 1, // Lunes
        horaInicio: "12:00",
        horaFin: "14:00",
        sesiones: 2,
        actividad: "GESTION",
        materia: null,
        grupo: null,
        ubicacion: "Coordinación Académica"
      }
    ],
    // Martes
    [
      {
        id: 4,
        dia: 2, // Martes
        horaInicio: "08:00",
        horaFin: "10:00",
        sesiones: 2,
        actividad: "ACADEMICA",
        materia: null,
        grupo: null,
        ubicacion: "Sala de Juntas"
      },
      {
        id: 5,
        dia: 2, // Martes
        horaInicio: "10:00",
        horaFin: "12:00",
        sesiones: 2,
        actividad: "DOCENCIA",
        materia: "Desarrollo Económico",
        grupo: "EC-701",
        ubicacion: "Aula C-08"
      }
    ],
    // Miércoles
    [
      {
        id: 6,
        dia: 3, // Miércoles
        horaInicio: "08:00",
        horaFin: "10:00",
        sesiones: 2,
        actividad: "DOCENCIA",
        materia: "Microeconomía Avanzada",
        grupo: "EC-501",
        ubicacion: "Aula A-12"
      },
      {
        id: 7,
        dia: 3, // Miércoles
        horaInicio: "10:00",
        horaFin: "12:00",
        sesiones: 2,
        actividad: "DOCENCIA",
        materia: "Teoría Económica",
        grupo: "EC-302",
        ubicacion: "Aula B-05"
      },
      {
        id: 8,
        dia: 3, // Miércoles
        horaInicio: "12:00",
        horaFin: "14:00",
        sesiones: 2,
        actividad: "GESTION",
        materia: null,
        grupo: null,
        ubicacion: "Coordinación Académica"
      }
    ],
    // Jueves
    [
      {
        id: 9,
        dia: 4, // Jueves
        horaInicio: "08:00",
        horaFin: "10:00",
        sesiones: 2,
        actividad: "ACADEMICA",
        materia: null,
        grupo: null,
        ubicacion: "Sala de Juntas"
      },
      {
        id: 10,
        dia: 4, // Jueves
        horaInicio: "10:00",
        horaFin: "12:00",
        sesiones: 2,
        actividad: "DOCENCIA",
        materia: "Desarrollo Económico",
        grupo: "EC-701",
        ubicacion: "Aula C-08"
      }
    ],
    // Viernes
    [
      {
        id: 11,
        dia: 5, // Viernes
        horaInicio: "08:00",
        horaFin: "10:00",
        sesiones: 2,
        actividad: "ACADEMICA",
        materia: null,
        grupo: null,
        ubicacion: "Sala de maestros"
      },
      {
        id: 12,
        dia: 5, // Viernes
        horaInicio: "10:00",
        horaFin: "14:00",
        sesiones: 4,
        actividad: "GESTION",
        materia: null,
        grupo: null,
        ubicacion: "Coordinación Académica"
      }
    ]
  ],
  // Historial de cargas
  historialCargas: [
    {
      id: 1233,
      periodo: "2024-B (Agosto-Diciembre 2024)",
      dependencia: "Unidad Académica de Economía",
      estatusCarga: "COMPLETADA",
      totalHoras: 40
    },
    {
      id: 1198,
      periodo: "2024-A (Enero-Junio 2024)",
      dependencia: "Unidad Académica de Economía",
      estatusCarga: "COMPLETADA",
      totalHoras: 40
    },
    {
      id: 1154,
      periodo: "2023-B (Agosto-Diciembre 2023)",
      dependencia: "Unidad Académica de Economía",
      estatusCarga: "COMPLETADA",
      totalHoras: 40
    }
  ]
};

// Función para convertir el número de día de la semana a texto
const getDayName = (dayNumber: number): string => {
  const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  return days[dayNumber];
};

// Función para formatear fechas
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-MX', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

const CargaHorariaJuanPerez = () => {
  const [activeDay, setActiveDay] = useState(1); // Por defecto empieza en Lunes (día 1)
  
  return (
    <div className="grid gap-4 md:gap-6">
      <div className="md:hidden flex items-center justify-between">
        <h2 className="text-lg font-semibold">Carga Horaria</h2>
        <Button size="sm">Ver PDF</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Información de Carga Horaria</CardTitle>
          <CardDescription>Periodo: {datosJuanPerez.cargaHoraria.periodo}</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Vista de información para dispositivos móviles */}
          <div className="md:hidden space-y-3 mb-4">
            <div className="border rounded-md p-3">
              <div className="text-xs text-muted-foreground mb-1">Unidad Académica</div>
              <div className="flex items-center">
                <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm font-medium">{datosJuanPerez.cargaHoraria.dependencia}</span>
              </div>
            </div>
            
            <div className="border rounded-md p-3">
              <div className="text-xs text-muted-foreground mb-1">Periodo de Labores</div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm font-medium">
                  {formatDate(datosJuanPerez.cargaHoraria.laboresInicio)} al {formatDate(datosJuanPerez.cargaHoraria.laboresFin)}
                </span>
              </div>
            </div>
            
            <div className="border rounded-md p-3">
              <div className="text-xs text-muted-foreground mb-1">Estatus</div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                <Badge className="bg-green-500">
                  {datosJuanPerez.cargaHoraria.estatusCarga}
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="border rounded-md p-3">
                <div className="text-xs text-muted-foreground mb-1">Tipo de Horario</div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm font-medium">{datosJuanPerez.cargaHoraria.tipoHorario}</span>
                </div>
              </div>
              
              <div className="border rounded-md p-3">
                <div className="text-xs text-muted-foreground mb-1">Horas Totales</div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm font-medium">40 hrs/sem</span>
                </div>
              </div>
            </div>
            
            <div className="border rounded-md p-3">
              <div className="text-xs text-muted-foreground mb-1">Autorización</div>
              <div className="flex flex-col space-y-1 text-sm">
                <div className="flex items-center">
                  <CheckCircle className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                  <span>Vo.Bo. Docente: {formatDate(datosJuanPerez.cargaHoraria.vobDocenteFecha)}</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                  <span>Autorizado: {formatDate(datosJuanPerez.cargaHoraria.autorizadoFecha)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Vista de información para escritorio */}
          <div className="hidden md:grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-4">
            <div className="space-y-2">
              <div className="text-sm font-medium">Unidad Académica</div>
              <div className="flex items-center">
                <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{datosJuanPerez.cargaHoraria.dependencia}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm font-medium">Periodo de Labores</div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>
                  {formatDate(datosJuanPerez.cargaHoraria.laboresInicio)} al {formatDate(datosJuanPerez.cargaHoraria.laboresFin)}
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm font-medium">Estatus</div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                <Badge className="bg-green-500">
                  {datosJuanPerez.cargaHoraria.estatusCarga}
                </Badge>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm font-medium">Tipo de Horario</div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{datosJuanPerez.cargaHoraria.tipoHorario}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm font-medium">Horas Totales</div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>40 horas por semana</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm font-medium">Autorización</div>
              <div className="flex flex-wrap items-center">
                <Badge variant="outline" className="mr-2 mb-1">
                  Vo.Bo. Docente: {formatDate(datosJuanPerez.cargaHoraria.vobDocenteFecha)}
                </Badge>
                <Badge variant="outline" className="mb-1">
                  Autorizado: {formatDate(datosJuanPerez.cargaHoraria.autorizadoFecha)}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mb-4">
            <Button variant="outline" size="sm" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Ver documento de carga horaria
            </Button>
          </div>

                      <div className="pt-2">
            <h3 className="text-base font-medium mb-4">Distribución de horas semanales</h3>
            
            {/* Vista móvil de distribución de horas */}
            <div className="md:hidden mb-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between border rounded-lg p-3">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-blue-500 mr-3"></div>
                    <span className="text-sm font-medium">Docencia</span>
                  </div>
                  <span className="font-bold text-lg">{datosJuanPerez.cargaHoraria.totalHorasDocencia} hrs</span>
                </div>
                
                <div className="flex items-center justify-between border rounded-lg p-3">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-amber-500 mr-3"></div>
                    <span className="text-sm font-medium">Asesorías</span>
                  </div>
                  <span className="font-bold text-lg">{datosJuanPerez.cargaHoraria.totalHorasAsesorias} hrs</span>
                </div>
                
                <div className="flex items-center justify-between border rounded-lg p-3">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-green-500 mr-3"></div>
                    <span className="text-sm font-medium">Gestión</span>
                  </div>
                  <span className="font-bold text-lg">{datosJuanPerez.cargaHoraria.totalHorasGestion} hrs</span>
                </div>
              </div>
              
              {/* Barra de progreso para visualizar distribución */}
              <div className="h-3 w-full bg-gray-100 rounded-full mt-4 flex overflow-hidden">
                <div 
                  className="h-full bg-blue-500" 
                  style={{width: `${(datosJuanPerez.cargaHoraria.totalHorasDocencia / 40) * 100}%`}}
                ></div>
                <div 
                  className="h-full bg-amber-500" 
                  style={{width: `${(datosJuanPerez.cargaHoraria.totalHorasAsesorias / 40) * 100}%`}}
                ></div>
                <div 
                  className="h-full bg-green-500" 
                  style={{width: `${(datosJuanPerez.cargaHoraria.totalHorasGestion / 40) * 100}%`}}
                ></div>
              </div>
              <div className="text-sm text-center text-muted-foreground mt-2">
                Total: 40 horas
              </div>
            </div>
            
            {/* Vista desktop de distribución de horas */}
            <div className="hidden md:grid grid-cols-3 gap-2 mb-6">
              <Card className="p-4 border-l-4 border-l-blue-500">
                <div className="text-sm text-muted-foreground">Docencia</div>
                <div className="text-2xl font-bold">{datosJuanPerez.cargaHoraria.totalHorasDocencia} hrs</div>
              </Card>
              <Card className="p-4 border-l-4 border-l-amber-500">
                <div className="text-sm text-muted-foreground">Asesorías</div>
                <div className="text-2xl font-bold">{datosJuanPerez.cargaHoraria.totalHorasAsesorias} hrs</div>
              </Card>
              <Card className="p-4 border-l-4 border-l-green-500">
                <div className="text-sm text-muted-foreground">Gestión</div>
                <div className="text-2xl font-bold">{datosJuanPerez.cargaHoraria.totalHorasGestion} hrs</div>
              </Card>
            </div>
            
            {/* Vista móvil: selector de días simplificado */}
            <div className="md:hidden mb-4">
              <div className="flex justify-between items-center mb-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="h-9 w-9 p-0"
                  onClick={() => setActiveDay(activeDay === 1 ? 5 : activeDay - 1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <div className="font-medium text-lg">
                  {getDayName(activeDay)}
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="h-9 w-9 p-0"
                  onClick={() => setActiveDay(activeDay === 5 ? 1 : activeDay + 1)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex justify-between px-1">
                {[1, 2, 3, 4, 5].map((day) => (
                  <button
                    key={day}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm ${
                      activeDay === day 
                        ? 'bg-primary text-primary-foreground font-bold' 
                        : 'text-muted-foreground border'
                    }`}
                    onClick={() => setActiveDay(day)}
                  >
                    {getDayName(day).charAt(0)}
                  </button>
                ))}
              </div>
            </div>

            {/* Contenido para móvil - fuera de las Tabs */}
            {activeDay >= 1 && activeDay <= 5 && (
                <div className="space-y-3 md:hidden">
                {datosJuanPerez.horarios[activeDay-1].length > 0 ? 
                datosJuanPerez.horarios[activeDay-1].map((horario) => (
                    <div key={horario.id} className="border rounded-lg overflow-hidden shadow-sm">
                    {/* Franja de color para tipo de actividad */}
                    <div className={`px-3 py-1.5 text-white text-xs font-medium ${
                        horario.actividad === "DOCENCIA" ? "bg-blue-500" : 
                        horario.actividad === "ACADEMICA" ? "bg-amber-500" : 
                        "bg-green-500"
                    }`}>
                        {horario.horaInicio} - {horario.horaFin} • {horario.actividad}
                    </div>
                    
                    <div className="p-3">
                        {horario.materia ? (
                        <>
                            {/* Información de materia */}
                            <div className="flex items-center mb-1">
                            <Book className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                            <span className="text-sm font-medium">{horario.materia}</span>
                            </div>
                            
                            {/* Información de grupo y ubicación */}
                            <div className="grid grid-cols-2 text-xs text-muted-foreground mt-2">
                            <div className="flex items-center">
                                <span className="font-medium mr-1">Grupo:</span>
                                <span>{horario.grupo || "-"}</span>
                            </div>
                            <div className="flex items-center justify-end">
                                <Building className="h-3 w-3 mr-1 text-muted-foreground" />
                                <span>{horario.ubicacion}</span>
                            </div>
                            </div>
                        </>
                        ) : (
                        <>
                            {/* Actividad no docente */}
                            <div className="flex items-center">
                            <Building className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                            <span className="text-sm">{horario.ubicacion}</span>
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                            Actividad administrativa/académica
                            </div>
                        </>
                        )}
                    </div>
                    </div>
                )) : (
                    <div className="text-center py-6 text-muted-foreground bg-muted/20 rounded-lg">
                    No hay horas asignadas para este día
                    </div>
                )
                }
            </div>
            )}
            
            {/* Vista desktop: pestañas completas */}
            <Tabs value={activeDay.toString()} onValueChange={(value) => setActiveDay(parseInt(value))} className="hidden md:block">
              <TabsList className="w-full mb-4 overflow-auto">
                {datosJuanPerez.horarios.map((_, index) => (
                  <TabsTrigger 
                    key={index + 1} 
                    value={(index + 1).toString()}
                    className="flex-1"
                  >
                    {getDayName(index + 1)}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {/* Contenido para desktop - dentro de las Tabs */}
              {datosJuanPerez.horarios.map((horariosDia, index) => (
                <TabsContent key={index + 1} value={(index + 1).toString()} className="mt-0 hidden md:block">
                  <div className="space-y-4">
                    
                    {/* Vista desktop: tabla */}
                    <div className="hidden md:block">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[150px]">Horario</TableHead>
                            <TableHead>Actividad</TableHead>
                            <TableHead>Materia</TableHead>
                            <TableHead>Grupo</TableHead>
                            <TableHead>Ubicación</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {horariosDia.length > 0 ? horariosDia.map((horario) => (
                            <TableRow key={horario.id}>
                              <TableCell className="font-medium">
                                {horario.horaInicio} - {horario.horaFin}
                              </TableCell>
                              <TableCell>
                                <Badge 
                                  className={
                                    horario.actividad === "DOCENCIA" ? "bg-blue-500" : 
                                    horario.actividad === "ACADEMICA" ? "bg-amber-500" : 
                                    "bg-green-500"
                                  }
                                >
                                  {horario.actividad}
                                </Badge>
                              </TableCell>
                              <TableCell>{horario.materia || "-"}</TableCell>
                              <TableCell>{horario.grupo || "-"}</TableCell>
                              <TableCell>{horario.ubicacion}</TableCell>
                            </TableRow>
                          )) : (
                            <TableRow>
                              <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                                No hay horas asignadas para este día
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Historial de Cargas Horarias</CardTitle>
          <CardDescription>Cargas horarias en periodos anteriores</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Vista móvil: tarjetas */}
          <div className="space-y-2 md:hidden">
            {datosJuanPerez.historialCargas.map((carga) => (
              <div key={carga.id} className="border rounded-lg p-3">
                <div className="flex justify-between items-center mb-1">
                  <div className="text-sm font-medium">{carga.periodo}</div>
                  <Badge variant="outline" className="text-xs">{carga.totalHoras} hrs</Badge>
                </div>
                <div className="text-xs text-muted-foreground mb-2">
                  {carga.dependencia}
                </div>
                <div className="flex items-center justify-between">
                  <Badge className="bg-green-500 text-xs">{carga.estatusCarga}</Badge>
                  <Button variant="ghost" size="sm" className="h-7 px-2 ml-auto">
                    <FileText className="h-3.5 w-3.5" />
                    <span className="ml-1 text-xs">Ver</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Vista desktop: tabla */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Periodo</TableHead>
                  <TableHead>Dependencia</TableHead>
                  <TableHead>Estatus</TableHead>
                  <TableHead>Horas Totales</TableHead>
                  <TableHead className="text-right">Documento</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {datosJuanPerez.historialCargas.map((carga) => (
                  <TableRow key={carga.id}>
                    <TableCell className="font-medium">{carga.periodo}</TableCell>
                    <TableCell>{carga.dependencia}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500">{carga.estatusCarga}</Badge>
                    </TableCell>
                    <TableCell>{carga.totalHoras} horas</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <FileText className="h-4 w-4 mr-2" /> Ver
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

export default CargaHorariaJuanPerez;