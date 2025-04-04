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
import { Home, FileText } from 'lucide-react';
import Link from 'next/link';

export default function ExpedienteDigitalListPage() {
  return (
    <div className="space-y-6 p-4 md:p-6">
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
                  Nómina y Recursos Humanos
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