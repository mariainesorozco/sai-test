// -----------------------------------
// SeguridadSocialJuanPerez.tsx
// -----------------------------------

"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Database, LifeBuoy, Calendar, Heart, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import InfoItem from '../InfoItem';

// Datos específicos de Juan Pérez
const datosJuanPerez = {
  nss: '12345678901',
  umf: 'UMF No. 1 Tepic',
  fechaAltaImss: '2010-03-15',
  fechaBajaImss: null,
  tipoSangre: 'O+',
  alergias: 'Ninguna',
  padecimientosCronicos: 'Ninguno',
  discapacidad: false,
  servicioMedicoUniversitario: true
};

const SeguridadSocialJuanPerez = () => {
  // Función para formatear fechas
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'No aplica';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="grid gap-4 md:gap-6">
      <div className="md:hidden flex items-center justify-between">
        <h2 className="text-lg font-semibold">Seguridad Social</h2>
        <Button size="sm">Editar</Button>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Información del IMSS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <InfoItem icon={Database} label="NSS" value={datosJuanPerez.nss} />
              <InfoItem icon={LifeBuoy} label="UMF" value={datosJuanPerez.umf} />
              <InfoItem icon={Calendar} label="Fecha alta IMSS" value={formatDate(datosJuanPerez.fechaAltaImss)} />
              <InfoItem icon={Calendar} label="Fecha baja IMSS" value={formatDate(datosJuanPerez.fechaBajaImss)} />
              <div className="flex items-center mt-2">
                <Badge variant="outline">Documento alta</Badge>
                <Button variant="ghost" size="sm">Ver</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Información médica</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <InfoItem icon={Heart} label="Tipo de sangre" value={datosJuanPerez.tipoSangre} />
              <InfoItem icon={Heart} label="Alergias" value={datosJuanPerez.alergias} />
              <InfoItem icon={Heart} label="Padecimientos crónicos" value={datosJuanPerez.padecimientosCronicos} />
              <InfoItem icon={Heart} label="Discapacidad" value={datosJuanPerez.discapacidad ? "Sí" : "No"} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Servicio Médico Universitario</CardTitle>
            <CardDescription>Información del Servicio Médico Universitario (si aplica)</CardDescription>
          </CardHeader>
          <CardContent>
            {datosJuanPerez.servicioMedicoUniversitario ? (
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertTitle>Servicio Activo</AlertTitle>
                <AlertDescription>
                  El trabajador cuenta con Servicio Médico Universitario para docentes ingresados hasta 31/12/2004.
                </AlertDescription>
              </Alert>
            ) : (
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertTitle>Servicio No Disponible</AlertTitle>
                <AlertDescription>
                  El trabajador no cuenta con Servicio Médico Universitario.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SeguridadSocialJuanPerez;