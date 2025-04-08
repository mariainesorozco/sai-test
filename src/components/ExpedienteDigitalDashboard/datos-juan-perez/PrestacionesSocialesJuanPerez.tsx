// -----------------------------------
// PrestacionesSocialesJuanPerez.tsx
// -----------------------------------

"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Calendar, FileText } from 'lucide-react';
import InfoItem from '../InfoItem';

// Datos específicos de Juan Pérez
const datosJuanPerez = {
  aniosServicioUAN: '15 años',
  fechaJubilacionUAN: '2040-03-15',
  licenciasSinGoce: 'Ninguna',
  resoluciones: []
};

const PrestacionesSocialesJuanPerez = () => {
  return (
    <div className="grid gap-4 md:gap-6">
      <div className="md:hidden flex items-center justify-between">
        <h2 className="text-lg font-semibold">Prestaciones Sociales</h2>
        <Button size="sm">Editar</Button>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Información Laboral UAN</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <InfoItem icon={Clock} label="Años de servicio UAN" value={datosJuanPerez.aniosServicioUAN} />
              <InfoItem icon={Calendar} label="Fecha para jubilación UAN" value={datosJuanPerez.fechaJubilacionUAN} />
              <InfoItem icon={Clock} label="Licencias sin goce de sueldo" value={datosJuanPerez.licenciasSinGoce} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Jubilación</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <h4 className="text-sm font-medium">UAN</h4>
              <InfoItem icon={Calendar} label="Fecha dictamen Comisión Fondo" value="No aplica" />
              <InfoItem icon={FileText} label="Número oficio" value="No aplica" />
              <InfoItem icon={FileText} label="Importe quincenal" value="$0.00" />
              
              <h4 className="text-sm font-medium mt-4">IMSS</h4>
              <InfoItem icon={Calendar} label="Fecha resolución IMSS" value="No aplica" />
              <InfoItem icon={FileText} label="Folio Resolución" value="No aplica" />
              <InfoItem icon={FileText} label="Importe mensual" value="$0.00" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Resoluciones por Invalidez</CardTitle>
            <CardDescription>Información de resoluciones por invalidez del IMSS</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4 text-muted-foreground">
              No hay resoluciones por invalidez registradas
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrestacionesSocialesJuanPerez;