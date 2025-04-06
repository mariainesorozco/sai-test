// app/admin/nomina/expediente-digital/[id]/page.tsx
"use client";

import { useParams } from 'next/navigation';
import ExpedienteJuanPerez from '@/components/ExpedienteDigitalDashboard/datos-juan-perez/ExpedienteJuanPerez';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from '@/components/ui/badge';
import { Home, Users, FileText, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ExpedienteDetallePage() {
  const params = useParams();
  const id = params.id as string;
  
  // Aquí podrías cargar los datos del expediente basado en el ID
  // Por ahora usamos datos de ejemplo
  const expedienteData = {
    nombre: "Juan Pérez",
    puesto: "Profesor de Tiempo Completo",
    adscripcion: "Unidad Académica de Economía",
    estatus: "Activo"
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Expediente Digital</h2>
          <div className="text-sm text-muted-foreground">
            Visualización y edición de expediente digital del empleado
          </div>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/nomina/expediente-digital">
            Volver a la lista
          </Link>
        </Button>
      </div>
      
      <div className="hidden md:block">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin">
                <Home className="h-3.5 w-3.5" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/nomina">
                Nómina y Recursos Humanos
              </BreadcrumbLink>
            </BreadcrumbItem>
            
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/nomina/expediente-digital">
                <span className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  Expediente Digital
                </span>
              </BreadcrumbLink>
            </BreadcrumbItem>
            
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                <span className="flex items-center gap-1">
                  <User className="h-3.5 w-3.5" />
                  {expedienteData.nombre}
                </span>
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      {/* Encabezado del expediente */}
      <div className="bg-muted/20 border rounded-md p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/api/placeholder/48/48" alt={expedienteData.nombre} />
              <AvatarFallback>{expedienteData.nombre.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold">
                {expedienteData.nombre}
              </div>
              <div className="text-sm text-muted-foreground">
                {`${expedienteData.puesto} - ${expedienteData.adscripcion}`}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              Académico
            </Badge>
            <Badge className="text-xs">
              {expedienteData.estatus}
            </Badge>
          </div>
        </div>
      </div>
      
      {/* Contenido del expediente */}
      <ExpedienteJuanPerez />
    </div>
  );
}