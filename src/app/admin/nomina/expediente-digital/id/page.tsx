"use client";

import { useParams } from 'next/navigation';
import ExpedienteDigitalDashboard from '@/components/ExpedienteDigitalDashboard';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ExpedienteDigitalPage() {
  const params = useParams();
  const id = params.id;

  return (
    <div className="space-y-6 p-4 md:p-6">
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
                Expediente #{id}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <ExpedienteDigitalDashboard />
    </div>
  );
}