// src/app/page.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, FileText, DollarSign, BookOpen, User } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center gap-6 p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Sistema de Administración Institucional</h1>
          <p className="text-xl text-muted-foreground">Universidad Autónoma de Nayarit</p>
        </div>
        
        <Card className="mb-8">
          <CardHeader className="pb-3 text-center">
            <CardTitle>Bienvenido al SAI</CardTitle>
            <CardDescription>
              Seleccione el módulo al que desea acceder
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <Link href="/admin" className="col-span-1 flex flex-col items-center">
                <Button variant="outline" className="h-auto py-6 w-full flex flex-col items-center">
                  <Users className="h-8 w-8 mb-2" />
                  <span className="text-sm font-medium">Nómina y RH</span>
                </Button>
              </Link>
              
              <Link href="/admin" className="col-span-1 flex flex-col items-center">
                <Button variant="outline" className="h-auto py-6 w-full flex flex-col items-center">
                  <FileText className="h-8 w-8 mb-2" />
                  <span className="text-sm font-medium">Impuestos</span>
                </Button>
              </Link>
              
              <Link href="/admin" className="col-span-1 flex flex-col items-center">
                <Button variant="outline" className="h-auto py-6 w-full flex flex-col items-center">
                  <DollarSign className="h-8 w-8 mb-2" />
                  <span className="text-sm font-medium">Egresos</span>
                </Button>
              </Link>
              
              <Link href="/admin" className="col-span-1 flex flex-col items-center">
                <Button variant="outline" className="h-auto py-6 w-full flex flex-col items-center">
                  <BookOpen className="h-8 w-8 mb-2" />
                  <span className="text-sm font-medium">Catálogos</span>
                </Button>
              </Link>
              
              <Link href="/expediente-digital-dashboard" className="col-span-1 flex flex-col items-center">
                <Button variant="outline" className="h-auto py-6 w-full flex flex-col items-center relative">
                  <User className="h-8 w-8 mb-2" />
                  <span className="text-sm font-medium">Expediente Digital</span>
                  <Badge className="absolute -top-2 -right-2 bg-primary">Nuevo</Badge>
                </Button>
              </Link>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/admin">
              <Button size="lg">
                Ingresar al Sistema
              </Button>
            </Link>
          </CardFooter>
        </Card>
        
        <div className="text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Universidad Autónoma de Nayarit - Todos los derechos reservados</p>
          <p>Versión 2.5.0 - Última actualización: 01/04/2025</p>
        </div>
      </div>
    </div>
  );
}