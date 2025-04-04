"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Database, Calendar, CreditCard, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import InfoItem from '../InfoItem';

// Datos específicos de Juan Pérez
const datosJuanPerez = {
  rfc: 'PEGJ800101ABC',
  curp: 'PEGJ800101HDFRRN02',
  fechaEmisionRFC: '2003-05-10',
  regimenFiscal: 'Sueldos y salarios e ingresos asimilados a salarios',
  banco: 'BBVA',
  tipoCuenta: 'NÓMINA',
  numeroCuenta: '1234567890',
  clabeInterbancaria: '012560789012345678',
};

const DatosFiscalesJuanPerez = () => {
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
        <h2 className="text-2xl font-bold tracking-tight hidden md:block">Datos Fiscales</h2>
        <Button size="sm">Editar</Button>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Información Fiscal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <InfoItem icon={Database} label="RFC" value={datosJuanPerez.rfc} />
              <InfoItem icon={Database} label="CURP" value={datosJuanPerez.curp} />
              <InfoItem icon={Database} label="Régimen fiscal" value={datosJuanPerez.regimenFiscal} />
              <InfoItem icon={Calendar} label="Fecha emisión RFC" value={formatDate(datosJuanPerez.fechaEmisionRFC)} />
              <div className="flex items-center mt-2">
                <Badge variant="outline" className="mr-2">Constancia Fiscal</Badge>
                <Button variant="ghost" size="sm">Ver</Button>
              </div>
              <div className="flex items-center mt-2">
                <Badge variant="outline" className="mr-2">Cédula RFC</Badge>
                <Button variant="ghost" size="sm">Ver</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Datos Bancarios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <InfoItem icon={CreditCard} label="Banco" value={datosJuanPerez.banco} />
              <InfoItem icon={CreditCard} label="Tipo de cuenta" value={datosJuanPerez.tipoCuenta} />
              <InfoItem icon={CreditCard} label="Número de cuenta" value={datosJuanPerez.numeroCuenta} />
              <InfoItem icon={CreditCard} label="CLABE" value={datosJuanPerez.clabeInterbancaria} />
              <div className="flex items-center mt-2">
                <Badge variant="outline" className="mr-2">Estado de cuenta</Badge>
                <Button variant="ghost" size="sm">Ver</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DatosFiscalesJuanPerez;