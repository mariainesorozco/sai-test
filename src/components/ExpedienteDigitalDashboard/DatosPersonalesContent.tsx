"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Calendar, Database, Shield, Mail, Phone, MapPin, Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import InfoItem from './InfoItem';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ExperienciaLaboralContent from './ExperienciaLaboralContent';

const DatosPersonalesContent = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("informacion-basica");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date("1980-01-01"));
  
  // Estados para los datos del formulario (inicializados con datos de ejemplo)
  const [formData, setFormData] = useState({
    // Información básica
    nombres: "Nombre(s)",
    apellidoPaterno: "Apellido Paterno",
    apellidoMaterno: "Apellido Materno",
    rfc: "XXXX000000XXX",
    curp: "XXXX000000XXXXXX00",
    nss: "00000000000",
    sexo: "H",
    
    // Contacto
    email: "correo@ejemplo.com",
    emailAlterno: "correo.alterno@ejemplo.com",
    telefono: "(000) 000-0000",
    telefonoEmergencia: "(000) 000-0000",
    
    // Domicilio fiscal
    calleFiscal: "Calle y número",
    coloniaFiscal: "Colonia",
    cpFiscal: "00000",
    estadoFiscal: "Estado",
    municipioFiscal: "Municipio",
    localidadFiscal: "Localidad",
    
    // Domicilio particular
    calleParticular: "Calle y número",
    coloniaParticular: "Colonia",
    cpParticular: "00000",
    estadoParticular: "Estado",
    municipioParticular: "Municipio",
    localidadParticular: "Localidad",
  });
  
  // Función para manejar cambios en los inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Función para manejar cambios en los selects
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Función para guardar los cambios
  const handleSave = () => {
    // Aquí iría la lógica para guardar los cambios en la base de datos
    console.log("Datos guardados:", formData);
    setOpen(false);
  };
  
  return (
    <div className="grid gap-4 md:gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight hidden md:block">Datos Personales</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm">Editar</Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Editar Datos Personales</DialogTitle>
              <DialogDescription>
                Actualice la información personal del empleado en los campos correspondientes.
              </DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="informacion-basica" className="w-full" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="informacion-basica">Información Básica</TabsTrigger>
                <TabsTrigger value="contacto">Contacto</TabsTrigger>
                <TabsTrigger value="domicilios">Domicilios</TabsTrigger>
              </TabsList>
              
              <TabsContent value="informacion-basica" className="space-y-4">
                <div className="flex justify-center mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/api/placeholder/180/180" alt="Foto empleado" />
                    <AvatarFallback className="text-lg">ET</AvatarFallback>
                  </Avatar>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombres">Nombre(s)</Label>
                    <Input 
                      id="nombres" 
                      name="nombres" 
                      value={formData.nombres} 
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apellidoPaterno">Apellido Paterno</Label>
                    <Input 
                      id="apellidoPaterno" 
                      name="apellidoPaterno" 
                      value={formData.apellidoPaterno} 
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apellidoMaterno">Apellido Materno</Label>
                    <Input 
                      id="apellidoMaterno" 
                      name="apellidoMaterno" 
                      value={formData.apellidoMaterno} 
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fechaNacimiento">Fecha de Nacimiento</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "dd/MM/yyyy") : "Seleccione una fecha"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rfc">RFC</Label>
                    <Input 
                      id="rfc" 
                      name="rfc" 
                      value={formData.rfc} 
                      onChange={handleInputChange}
                      maxLength={13}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="curp">CURP</Label>
                    <Input 
                      id="curp" 
                      name="curp" 
                      value={formData.curp} 
                      onChange={handleInputChange}
                      maxLength={18}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nss">NSS</Label>
                    <Input 
                      id="nss" 
                      name="nss" 
                      value={formData.nss} 
                      onChange={handleInputChange}
                      maxLength={11}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sexo">Sexo</Label>
                    <Select 
                      value={formData.sexo}
                      onValueChange={(value: string) => handleSelectChange("sexo", value)}
                      >
                      <SelectTrigger id="sexo">
                        <SelectValue placeholder="Seleccione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="H">Hombre</SelectItem>
                        <SelectItem value="M">Mujer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="contacto" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email"
                      value={formData.email} 
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emailAlterno">Correo Electrónico Alterno</Label>
                    <Input 
                      id="emailAlterno" 
                      name="emailAlterno" 
                      type="email"
                      value={formData.emailAlterno} 
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono</Label>
                    <Input 
                      id="telefono" 
                      name="telefono" 
                      value={formData.telefono} 
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefonoEmergencia">Teléfono de Emergencia</Label>
                    <Input 
                      id="telefonoEmergencia" 
                      name="telefonoEmergencia" 
                      value={formData.telefonoEmergencia} 
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="domicilios" className="space-y-4">
                <h4 className="text-sm font-medium mb-2">Domicilio Fiscal</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="calleFiscal">Calle y Número</Label>
                    <Input 
                      id="calleFiscal" 
                      name="calleFiscal" 
                      value={formData.calleFiscal} 
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="coloniaFiscal">Colonia</Label>
                    <Input 
                      id="coloniaFiscal" 
                      name="coloniaFiscal" 
                      value={formData.coloniaFiscal} 
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cpFiscal">Código Postal</Label>
                    <Input 
                      id="cpFiscal" 
                      name="cpFiscal" 
                      value={formData.cpFiscal} 
                      onChange={handleInputChange}
                      maxLength={5}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estadoFiscal">Estado</Label>
                    <Select 
                      defaultValue={formData.estadoFiscal}
                      onValueChange={(value: string) => handleSelectChange("estadoFiscal", value)}
                    >
                      <SelectTrigger id="estadoFiscal">
                        <SelectValue placeholder="Seleccione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Nayarit">Nayarit</SelectItem>
                        <SelectItem value="Jalisco">Jalisco</SelectItem>
                        {/* Aquí se agregarían todos los estados */}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="municipioFiscal">Municipio</Label>
                    <Input 
                      id="municipioFiscal" 
                      name="municipioFiscal" 
                      value={formData.municipioFiscal} 
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="localidadFiscal">Localidad</Label>
                    <Input 
                      id="localidadFiscal" 
                      name="localidadFiscal" 
                      value={formData.localidadFiscal} 
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <h4 className="text-sm font-medium mb-2">Domicilio Particular</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="calleParticular">Calle y Número</Label>
                    <Input 
                      id="calleParticular" 
                      name="calleParticular" 
                      value={formData.calleParticular} 
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="coloniaParticular">Colonia</Label>
                    <Input 
                      id="coloniaParticular" 
                      name="coloniaParticular" 
                      value={formData.coloniaParticular} 
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cpParticular">Código Postal</Label>
                    <Input 
                      id="cpParticular" 
                      name="cpParticular" 
                      value={formData.cpParticular} 
                      onChange={handleInputChange}
                      maxLength={5}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estadoParticular">Estado</Label>
                    <Select 
                      defaultValue={formData.estadoParticular}
                      onValueChange={(value: string) => handleSelectChange("estadoParticular", value)}
                    >
                      <SelectTrigger id="estadoParticular">
                        <SelectValue placeholder="Seleccione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Nayarit">Nayarit</SelectItem>
                        <SelectItem value="Jalisco">Jalisco</SelectItem>
                        {/* Aquí se agregarían todos los estados */}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="municipioParticular">Municipio</Label>
                    <Input 
                      id="municipioParticular" 
                      name="municipioParticular" 
                      value={formData.municipioParticular} 
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="localidadParticular">Localidad</Label>
                    <Input 
                      id="localidadParticular" 
                      name="localidadParticular" 
                      value={formData.localidadParticular} 
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
              <Button onClick={handleSave}>Guardar Cambios</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Información Básica</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div className="flex justify-center mb-2">
                <Avatar className="h-20 w-20 md:h-24 md:w-24">
                  <AvatarImage src="/api/placeholder/180/180" alt="Foto empleado" />
                  <AvatarFallback className="text-lg">ET</AvatarFallback>
                </Avatar>
              </div>
              <InfoItem 
                icon={User} 
                label="Nombre completo" 
                value={`${formData.apellidoPaterno} ${formData.apellidoMaterno} ${formData.nombres}`} 
              />
              <InfoItem 
                icon={Calendar} 
                label="Fecha de nacimiento" 
                value={selectedDate ? format(selectedDate, "dd/MM/yyyy") : "No disponible"} 
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoItem icon={Database} label="RFC" value={formData.rfc} />
                <InfoItem icon={Database} label="CURP" value={formData.curp} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoItem icon={Database} label="NSS" value={formData.nss} />
                <InfoItem 
                  icon={Shield} 
                  label="Sexo" 
                  value={formData.sexo === "H" ? "Hombre" : "Mujer"} 
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Contacto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <InfoItem icon={Mail} label="Correo electrónico" value={formData.email} />
              <InfoItem icon={Mail} label="Correo alterno" value={formData.emailAlterno} />
              <InfoItem icon={Phone} label="Teléfono" value={formData.telefono} />
              <InfoItem icon={Phone} label="Teléfono de emergencia" value={formData.telefonoEmergencia} />
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-2 lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Domicilios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Domicilio Fiscal</h4>
                <InfoItem icon={MapPin} label="Dirección" value={`${formData.calleFiscal}, ${formData.coloniaFiscal}`} />
                <InfoItem icon={MapPin} label="CP" value={formData.cpFiscal} />
                <InfoItem 
                  icon={MapPin} 
                  label="Ubicación" 
                  value={`${formData.estadoFiscal}, ${formData.municipioFiscal}, ${formData.localidadFiscal}`} 
                />
              </div>
              <Separator />
              <div>
                <h4 className="text-sm font-medium mb-2">Domicilio Particular</h4>
                <InfoItem 
                  icon={MapPin} 
                  label="Dirección" 
                  value={`${formData.calleParticular}, ${formData.coloniaParticular}`} 
                />
                <InfoItem icon={MapPin} label="CP" value={formData.cpParticular} />
                <InfoItem 
                  icon={MapPin} 
                  label="Ubicación" 
                  value={`${formData.estadoParticular}, ${formData.municipioParticular}, ${formData.localidadParticular}`} 
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-2 lg:col-span-3">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Experiencia Laboral</CardTitle>
            </CardHeader>
            <CardContent className="overflow-auto">
                <ExperienciaLaboralContent />
            </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DatosPersonalesContent;