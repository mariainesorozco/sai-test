"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Calendar, Database, Shield, Mail, Phone, MapPin, Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import InfoItem from './InfoItem';

const DatosPersonalesContent = () => {
  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Datos Personales</h2>
        <Button size="sm">Editar</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Información Básica</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div className="flex justify-center mb-2">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/api/placeholder/180/180" alt="Foto empleado" />
                  <AvatarFallback className="text-lg">ET</AvatarFallback>
                </Avatar>
              </div>
              <InfoItem icon={User} label="Nombre completo" value="Apellido Paterno Apellido Materno Nombre(s)" />
              <InfoItem icon={Calendar} label="Fecha de nacimiento" value="DD/MM/AAAA" />
              <div className="grid grid-cols-2 gap-4">
                <InfoItem icon={Database} label="RFC" value="XXXX000000XXX" />
                <InfoItem icon={Database} label="CURP" value="XXXX000000XXXXXX00" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <InfoItem icon={Database} label="NSS" value="00000000000" />
                <InfoItem icon={Shield} label="Sexo" value="H/M" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Contacto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <InfoItem icon={Mail} label="Correo electrónico" value="correo@ejemplo.com" />
              <InfoItem icon={Mail} label="Correo alterno" value="correo.alterno@ejemplo.com" />
              <InfoItem icon={Phone} label="Teléfono" value="(000) 000-0000" />
              <InfoItem icon={Phone} label="Teléfono de emergencia" value="(000) 000-0000" />
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Domicilios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Domicilio Fiscal</h4>
                <InfoItem icon={MapPin} label="Dirección" value="Calle y número, Colonia" />
                <InfoItem icon={MapPin} label="CP" value="00000" />
                <InfoItem icon={MapPin} label="Ubicación" value="Estado, Municipio, Localidad" />
              </div>
              <Separator />
              <div>
                <h4 className="text-sm font-medium mb-2">Domicilio Particular</h4>
                <InfoItem icon={MapPin} label="Dirección" value="Calle y número, Colonia" />
                <InfoItem icon={MapPin} label="CP" value="00000" />
                <InfoItem icon={MapPin} label="Ubicación" value="Estado, Municipio, Localidad" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Experiencia Laboral</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Empresa/Institución</TableHead>
                  <TableHead>Sector</TableHead>
                  <TableHead>Puesto</TableHead>
                  <TableHead>Período</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Nombre de la empresa</TableCell>
                  <TableCell>Privado</TableCell>
                  <TableCell>Nombre del puesto</TableCell>
                  <TableCell>01/01/2020 - 31/12/2022</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">Ver</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    <Button variant="outline" size="sm" className="mt-2">
                      <Plus className="h-4 w-4 mr-2" /> Agregar experiencia
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DatosPersonalesContent;