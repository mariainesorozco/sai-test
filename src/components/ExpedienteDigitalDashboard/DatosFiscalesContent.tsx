"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Database, Calendar, CreditCard } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import InfoItem from './InfoItem';

const DatosFiscalesContent = () => {
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
              <InfoItem icon={Database} label="RFC" value="XXXX000000XXX" />
              <InfoItem icon={Database} label="CURP" value="XXXX000000XXXXXX00" />
              <InfoItem icon={Database} label="Régimen fiscal" value="Asalariados" />
              <InfoItem icon={Calendar} label="Fecha emisión RFC" value="DD/MM/AAAA" />
              <div className="flex items-center mt-2">
                <Badge variant="outline" className="mr-2">Documento RFC</Badge>
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
              <InfoItem icon={CreditCard} label="Banco" value="Nombre del banco" />
              <InfoItem icon={CreditCard} label="Tipo de cuenta" value="NÓMINA" />
              <InfoItem icon={CreditCard} label="Número de cuenta" value="0000000000" />
              <InfoItem icon={CreditCard} label="CLABE" value="000000000000000000" />
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

export default DatosFiscalesContent;