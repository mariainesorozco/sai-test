"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Search, Users, FileText, DollarSign, BookOpen } from 'lucide-react';

interface WelcomeMessageProps {
  onViewExpediente: () => void;
  onOpenSearch: () => void;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ onViewExpediente, onOpenSearch }) => {
  return (
    <div className="grid gap-6">
      <Card className="border-2 border-primary/20">
        <CardHeader className="pb-2">
          <CardTitle>Bienvenido al Sistema de Administración Institucional (SAI)</CardTitle>
          <CardDescription>
            Universidad Autónoma de Nayarit
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground">
            Este sistema le permite gestionar la información del personal, nómina, impuestos, egresos y catálogos de la universidad.
            Para comenzar, puede seleccionar un módulo del menú lateral o ver el expediente de muestra.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Button onClick={onViewExpediente} className="gap-2">
              <Eye className="h-4 w-4" />
              Ver expediente de Juan Pérez
            </Button>
            <Button variant="outline" onClick={onOpenSearch} className="gap-2">
              <Search className="h-4 w-4" />
              Buscar otro expediente
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="group hover:border-primary/50 transition-all cursor-pointer">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4" />
              Nómina y RH
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Gestión de personal, expedientes y nómina
            </p>
          </CardContent>
        </Card>
        
        <Card className="group hover:border-primary/50 transition-all cursor-pointer">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Impuestos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Gestión de impuestos y obligaciones fiscales
            </p>
          </CardContent>
        </Card>
        
        <Card className="group hover:border-primary/50 transition-all cursor-pointer">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Egresos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Control de pagos y egresos institucionales
            </p>
          </CardContent>
        </Card>
        
        <Card className="group hover:border-primary/50 transition-all cursor-pointer">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Catálogos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Administración de catálogos del sistema
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WelcomeMessage;