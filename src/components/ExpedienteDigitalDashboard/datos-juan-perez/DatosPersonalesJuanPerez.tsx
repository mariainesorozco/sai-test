"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Calendar, Database, Shield, Mail, Phone, MapPin, FileText, Heart, Globe } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import InfoItem from '../InfoItem';

// Datos específicos de Juan Pérez
const datosJuanPerez = {
  nombre: 'Juan Pérez',
  apellidoPaterno: 'Pérez',
  apellidoMaterno: 'García',
  rfc: 'PEGJ800101ABC',
  curp: 'PEGJ800101HDFRRN02',
  nss: '12345678901',
  sexo: 'H',
  estadoCivil: 'CASADO',
  fechaNacimiento: '1980-01-01',
  paisNacimiento: 'México',
  estadoNacimiento: 'Nayarit',
  municipioNacimiento: 'Tepic',
  localidadNacimiento: 'Tepic',
  email: 'juan.perez@uan.edu.mx',
  emailAlterno: 'juanperez@gmail.com',
  telefono: '311-123-4567',
  telefonoEmergencia: '311-234-5678',
  
  // Domicilio fiscal
  calleFiscal: 'Av. Universidad 100',
  coloniaFiscal: 'Ciudad Universitaria',
  cpFiscal: '63000',
  estadoFiscal: 'Nayarit',
  municipioFiscal: 'Tepic',
  localidadFiscal: 'Tepic',
  
  // Domicilio particular
  calleParticular: 'Av. México 200',
  coloniaParticular: 'Centro',
  cpParticular: '63000',
  estadoParticular: 'Nayarit',
  municipioParticular: 'Tepic',
  localidadParticular: 'Tepic',
};

const DatosPersonalesJuanPerez = () => {
  // Función para formatear fechas
  const formatDate = (dateString: string) => {
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
        <h2 className="text-2xl font-bold tracking-tight hidden md:block">Datos Personales</h2>
        <Button size="sm">Editar</Button>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Información Básica</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div className="flex justify-center mb-2">
                <Avatar className="h-20 w-20 md:h-24 md:w-24">
                  <AvatarImage src="/api/placeholder/96/96" alt="Foto empleado" />
                  <AvatarFallback className="text-lg">JP</AvatarFallback>
                </Avatar>
              </div>
              <InfoItem 
                icon={User} 
                label="Nombre completo" 
                value={`${datosJuanPerez.apellidoPaterno} ${datosJuanPerez.apellidoMaterno} ${datosJuanPerez.nombre}`} 
              />
              <InfoItem 
                icon={Heart} 
                label="Estado civil" 
                value={datosJuanPerez.estadoCivil === "CASADO" ? "Casado(a)" : "No disponible"} 
              />
              <InfoItem 
                icon={Calendar} 
                label="Fecha de nacimiento" 
                value={formatDate(datosJuanPerez.fechaNacimiento)} 
              />
              <InfoItem 
                icon={Globe} 
                label="Lugar de nacimiento" 
                value={`${datosJuanPerez.localidadNacimiento}, ${datosJuanPerez.municipioNacimiento}, ${datosJuanPerez.estadoNacimiento}, ${datosJuanPerez.paisNacimiento}`} 
              />

              <Separator className="my-2" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoItem icon={Database} label="RFC" value={datosJuanPerez.rfc} />
                <InfoItem icon={Database} label="CURP" value={datosJuanPerez.curp} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoItem icon={Database} label="NSS" value={datosJuanPerez.nss} />
                <InfoItem 
                  icon={Shield} 
                  label="Sexo" 
                  value={datosJuanPerez.sexo === "H" ? "Hombre" : "Mujer"} 
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Contacto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <InfoItem icon={Mail} label="Correo electrónico" value={datosJuanPerez.email} />
              <InfoItem icon={Mail} label="Correo alterno" value={datosJuanPerez.emailAlterno} />
              <InfoItem icon={Phone} label="Teléfono" value={datosJuanPerez.telefono} />
              <InfoItem icon={Phone} label="Teléfono de emergencia" value={datosJuanPerez.telefonoEmergencia} />
              <div className="flex items-center mt-2">
                <Badge variant="outline" className="mr-2">Comprobante domicilio</Badge>
                <Button variant="ghost" size="sm">Ver</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-2 lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Domicilios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Domicilio Fiscal</h4>
                <InfoItem icon={MapPin} label="Dirección" value={`${datosJuanPerez.calleFiscal}, ${datosJuanPerez.coloniaFiscal}`} />
                <InfoItem icon={MapPin} label="CP" value={datosJuanPerez.cpFiscal} />
                <InfoItem 
                  icon={MapPin} 
                  label="Ubicación" 
                  value={`${datosJuanPerez.estadoFiscal}, ${datosJuanPerez.municipioFiscal}, ${datosJuanPerez.localidadFiscal}`} 
                />
              </div>
              <Separator />
              <div>
                <h4 className="text-sm font-medium mb-2">Domicilio Particular</h4>
                <InfoItem 
                  icon={MapPin} 
                  label="Dirección" 
                  value={`${datosJuanPerez.calleParticular}, ${datosJuanPerez.coloniaParticular}`} 
                />
                <InfoItem icon={MapPin} label="CP" value={datosJuanPerez.cpParticular} />
                <InfoItem 
                  icon={MapPin} 
                  label="Ubicación" 
                  value={`${datosJuanPerez.estadoParticular}, ${datosJuanPerez.municipioParticular}, ${datosJuanPerez.localidadParticular}`} 
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DatosPersonalesJuanPerez;