"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Database, Briefcase, Home, Clock, Calendar, Users, CreditCard } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import InfoItem from '../InfoItem';

// Datos específicos de Juan Pérez
const datosJuanPerez = {
  // Datos laborales
  puesto: 'Profesor de Tiempo Completo',
  adscripcion: 'Unidad Académica de Economía',
  estatus: 'Activo',
  tipo: 'Académico',
  numeroTrabajador: '12345',
  numeroPlaza: '54321',
  fechaIngreso: '2010-03-15',
  tipoEmpleado: 'Base',
  clasificacion: 'Académico',
  sindicato: 'SPAUAN',
  horario: 'Tiempo Completo',
  categoriaTabulador: 'TIEMPO COMPLETO NIVEL B',
  banco: 'BBVA',
  clabeInterbancaria: '012560789012345678',
  
  // Experiencia laboral
  experiencias: [
    {
      id: 1,
      empresa: 'Secretaría de Economía',
      sector: 'ESTATAL',
      puesto: 'Analista Económico',
      fechaInicio: '2005-06-01',
      fechaFin: '2010-02-28',
      horario: 'Lunes a Viernes 8:00 - 15:00'
    },
    {
      id: 2,
      empresa: 'Universidad Autónoma de Nayarit',
      sector: 'ESTATAL',
      puesto: 'Profesor de Tiempo Completo',
      fechaInicio: '2010-03-15',
      fechaFin: null,
      horario: 'Lunes a Viernes 8:00 - 16:00'
    }
  ],
};

const DatosLaboralesJuanPerez = () => {
  // Función para formatear fechas
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Actual';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="grid gap-4 md:gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight hidden md:block">Datos Laborales</h2>
        <Button size="sm">Editar</Button>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Información Básica</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <InfoItem icon={Database} label="Número de trabajador" value={datosJuanPerez.numeroTrabajador} />
              <InfoItem icon={Database} label="Número de plaza" value={datosJuanPerez.numeroPlaza} />
              <InfoItem icon={Calendar} label="Fecha de ingreso" value={formatDate(datosJuanPerez.fechaIngreso)} />
              <InfoItem icon={Briefcase} label="Tipo de empleado" value={datosJuanPerez.tipoEmpleado} />
              <InfoItem icon={Briefcase} label="Clasificación" value={datosJuanPerez.clasificacion} />
              <InfoItem icon={Briefcase} label="Estatus" value={datosJuanPerez.estatus} />
              <InfoItem icon={Users} label="Sindicato" value={datosJuanPerez.sindicato} />
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Adscripción y Puesto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <InfoItem icon={Home} label="Adscripción" value={datosJuanPerez.adscripcion} />
              <InfoItem icon={Briefcase} label="Puesto" value={datosJuanPerez.puesto} />
              <InfoItem icon={Clock} label="Horario" value={datosJuanPerez.horario} />
              <InfoItem icon={Database} label="Categoría tabulador" value={datosJuanPerez.categoriaTabulador} />
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Datos para pago</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <InfoItem icon={CreditCard} label="Banco" value={datosJuanPerez.banco} />
              <InfoItem icon={CreditCard} label="Clabe interbancaria" value={datosJuanPerez.clabeInterbancaria} />
              <div className="flex items-center mt-2">
                <Badge variant="outline" className="mr-2">Estado de cuenta</Badge>
                <Button variant="ghost" size="sm">Ver</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-3">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Experiencia Laboral</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 md:hidden">
              {/* Vista móvil: tarjetas */}
              {datosJuanPerez.experiencias.map((exp) => (
                <Card key={exp.id} className="border-l-4 border-l-primary">
                  <CardContent className="pt-6 pb-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-base">{exp.puesto}</h3>
                        <p className="text-sm text-muted-foreground">{exp.empresa}</p>
                      </div>
                      <Badge variant="outline">
                        {exp.sector === "PRIVADO" ? "Privado" : exp.sector === "FEDERAL" ? "Federal" : "Estatal"}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <Calendar className="h-3.5 w-3.5 mr-1.5" />
                      <span>
                        {formatDate(exp.fechaInicio)} - {exp.fechaFin ? formatDate(exp.fechaFin) : "Actual"}
                      </span>
                    </div>
                    
                    {exp.horario && (
                      <div className="flex items-center text-sm mb-3">
                        <Clock className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                        <span>{exp.horario}</span>
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
                    <TableHead>Empresa/Institución</TableHead>
                    <TableHead>Sector</TableHead>
                    <TableHead>Puesto</TableHead>
                    <TableHead>Período</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {datosJuanPerez.experiencias.map((exp) => (
                    <TableRow key={exp.id}>
                      <TableCell className="font-medium">{exp.empresa}</TableCell>
                      <TableCell>
                        {exp.sector === "PRIVADO" ? "Privado" : exp.sector === "FEDERAL" ? "Federal" : "Estatal"}
                      </TableCell>
                      <TableCell>{exp.puesto}</TableCell>
                      <TableCell>
                        {formatDate(exp.fechaInicio)} - {exp.fechaFin ? formatDate(exp.fechaFin) : "Actual"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DatosLaboralesJuanPerez;