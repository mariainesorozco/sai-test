"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Database, LifeBuoy, Calendar, Heart, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import InfoItem from './InfoItem';

const SeguridadSocialContent = () => {
  return (
    <div className="grid gap-4 md:gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight hidden md:block">Seguridad Social</h2>
        <Button size="sm">Editar</Button>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Información del IMSS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <InfoItem icon={Database} label="NSS" value="00000000000" />
              <InfoItem icon={LifeBuoy} label="UMF" value="Nombre de la UMF asignada" />
              <InfoItem icon={Calendar} label="Fecha alta IMSS" value="DD/MM/AAAA" />
              <InfoItem icon={Calendar} label="Fecha baja IMSS" value="No aplica" />
              <div className="flex items-center gap-2 mt-2">
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
              <InfoItem icon={Heart} label="Tipo de sangre" value="O+" />
              <InfoItem icon={Heart} label="Alergias" value="Ninguna" />
              <InfoItem icon={Heart} label="Padecimientos crónicos" value="Ninguno" />
              <InfoItem icon={Heart} label="Discapacidad" value="No" />
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
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertTitle>Servicio Activo</AlertTitle>
              <AlertDescription>
                El trabajador cuenta con Servicio Médico Universitario para docentes ingresados hasta 31/12/2004.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SeguridadSocialContent;