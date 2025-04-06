// app/admin/nomina/expediente-digital/page.tsx
"use client";

import ExpedienteDigitalModule from '@/components/admin/modules/ExpedienteDigitalModule';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home, FileText, Users } from 'lucide-react';
import Link from 'next/link';

export default function ExpedienteDigitalPage() {
  return (
    <div className="space-y-6">
      <div className="hidden md:block">
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
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    Nómina y Recursos Humanos
                  </span>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                <span className="flex items-center gap-1">
                  <FileText className="h-3.5 w-3.5" />
                  Expediente Digital
                </span>
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <ExpedienteDigitalModule />
    </div>
  );
}