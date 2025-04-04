// Archivo: /app/admin/nomina/expediente-digital/juan-perez/page.tsx

"use client";

import ExpedienteJuanPerez from '@/components/ExpedienteDigitalDashboard/datos-juan-perez/ExpedienteJuanPerez';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home, FileText, User } from 'lucide-react';
import Link from 'next/link';

export default function ExpedienteJuanPerezPage() {
  return (
    <div className="space-y-6 p-0">
      <div className="hidden md:block px-6 pt-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/admin">
                  <Home className="h-3.5 w-3.5" />
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/admin/nomina">
                  Nómina y Recursos Humanos
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/admin/nomina/expediente-digital">
                  <span className="flex items-center gap-1">
                    <FileText className="h-3.5 w-3.5" />
                    Expediente Digital
                  </span>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                <span className="flex items-center gap-1">
                  <User className="h-3.5 w-3.5" />
                  Juan Pérez
                </span>
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <ExpedienteJuanPerez />
    </div>
  );
}