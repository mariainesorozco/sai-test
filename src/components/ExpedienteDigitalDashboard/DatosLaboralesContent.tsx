"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Database, Briefcase, Home, Clock, Calendar, Users, CreditCard, DollarSign } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import InfoItem from './InfoItem';

// Interfaces para datos tipados
interface PlazaItem {
  id: number;
  plaza: string;
  puesto: string;
  adscripcion: string;
  tipo: string;
  periodo: string;
  estatus: 'Activo' | 'Inactivo' | 'Pendiente';
}

const DatosLaboralesContent = () => {
  // Datos de ejemplo
  const plazasHistorial: PlazaItem[] = [
    {
      id: 1,
      plaza: "00000",
      puesto: "Nombre del puesto",
      adscripcion: "Nombre de la adscripción", 
      tipo: "Administrativo",
      periodo: "01/01/2020 - Actual",
      estatus: "Activo"
    }
  ];

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
              <InfoItem icon={Database} label="Número de trabajador" value="000000" />
              <InfoItem icon={Database} label="Número de plaza" value="00000" />
              <InfoItem icon={Calendar} label="Fecha de ingreso" value="DD/MM/AAAA" />
              <InfoItem icon={Briefcase} label="Tipo de empleado" value="Base/Contrato/Jubilado" />
              <InfoItem icon={Briefcase} label="Clasificación" value="Académico/Administrativo/Directivo" />
              <InfoItem icon={Briefcase} label="Estatus" value="Activo" />
              <InfoItem icon={Users} label="Sindicato" value="SETUAN/SPAUAN/No aplica" />
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Adscripción y Puesto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <InfoItem icon={Home} label="Adscripción" value="Nombre del departamento" />
              <InfoItem icon={Briefcase} label="Puesto" value="Nombre del puesto" />
              <InfoItem icon={Clock} label="Horario" value="Tiempo Completo/Medio Tiempo/etc." />
              <InfoItem icon={Database} label="Categoría tabulador" value="Nivel correspondiente" />
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Datos para pago</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <InfoItem icon={CreditCard} label="Banco" value="Nombre del banco" />
              <InfoItem icon={CreditCard} label="Clabe interbancaria" value="000000000000000000" />
              <InfoItem icon={DollarSign} label="Tipo de cuenta" value="Débito/Nómina/etc." />
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-3">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Historial de Plazas</CardTitle>
          </CardHeader>
          
          {/* Vista móvil: Tarjetas */}
          <div className="md:hidden">
            <CardContent>
              {plazasHistorial.length > 0 ? (
                <div className="space-y-4">
                  {plazasHistorial.map(plaza => (
                    <Card key={plaza.id} className="border-l-4 border-l-primary">
                      <CardContent className="py-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Plaza: {plaza.plaza}</span>
                            <Badge className="bg-green-500">{plaza.estatus}</Badge>
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Puesto:</span> {plaza.puesto}
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Adscripción:</span> {plaza.adscripcion}
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Tipo:</span> {plaza.tipo}
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Período:</span> {plaza.periodo}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  No hay historial de plazas registrado
                </div>
              )}
            </CardContent>
          </div>
          
          {/* Vista desktop: Tabla */}
          <CardContent className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Plaza</TableHead>
                  <TableHead>Puesto</TableHead>
                  <TableHead>Adscripción</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Período</TableHead>
                  <TableHead>Estatus</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {plazasHistorial.map(plaza => (
                  <TableRow key={plaza.id}>
                    <TableCell className="font-medium">{plaza.plaza}</TableCell>
                    <TableCell>{plaza.puesto}</TableCell>
                    <TableCell>{plaza.adscripcion}</TableCell>
                    <TableCell>{plaza.tipo}</TableCell>
                    <TableCell>{plaza.periodo}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500">{plaza.estatus}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DatosLaboralesContent;