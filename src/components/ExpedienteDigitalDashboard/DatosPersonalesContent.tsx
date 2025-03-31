"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Calendar, Database, Shield, Mail, Phone, MapPin, Plus, FileText, Heart, Globe } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
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

// Componente para previsualizar documentos
const DocumentPreview = ({ 
  title, 
  documentUrl,
  onClose 
}: { 
  title: string; 
  documentUrl: string;
  onClose: () => void;
}) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[85vh]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-auto">
          <iframe
            src={documentUrl}
            className="w-full h-[calc(85vh-120px)]"
            frameBorder="0"
          />
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const DatosPersonalesContent = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("informacion-basica");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date("1980-01-01"));
  const [defuncionDate, setDefuncionDate] = useState<Date | undefined>(undefined);
  const [showDocumentPreview, setShowDocumentPreview] = useState<{show: boolean, url: string, title: string}>({
    show: false,
    url: "",
    title: ""
  });
  
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
    estadoCivil: "SOLTERO",
    paisNacimiento: "México",
    estadoNacimiento: "Nayarit",
    municipioNacimiento: "Tepic",
    localidadNacimiento: "Tepic",
    numeroActaNacimiento: "",
    numeroActaDefuncion: "",
    fallecido: false,
    tieneActaNacimiento: false,
    tieneActaDefuncion: false,
    
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
    tieneComprobanteFiscal: false,
    tipoComprobanteFiscal: "AGUA",
    fechaComprobanteFiscal: "",
    
    // Domicilio particular
    calleParticular: "Calle y número",
    coloniaParticular: "Colonia",
    cpParticular: "00000",
    estadoParticular: "Estado",
    municipioParticular: "Municipio",
    localidadParticular: "Localidad",
    tieneComprobanteParticular: false,
    tipoComprobanteParticular: "AGUA",
    fechaComprobanteParticular: "",
  });
  
  // Función para manejar cambios en los inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Función para manejar cambios en los checkbox
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
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

  // Función para simular visualización de documentos
  const handleViewDocument = (docType: string) => {
    // En un escenario real, esta URL provendría de la API o del estado
    const mockUrl = "/api/documents/preview/sample.pdf";
    
    let title = "";
    switch(docType) {
      case "nacimiento":
        title = "Acta de Nacimiento";
        break;
      case "defuncion":
        title = "Acta de Defunción";
        break;
      case "comprobanteFiscal":
        title = `Comprobante de Domicilio Fiscal (${formData.tipoComprobanteFiscal})`;
        break;
      case "comprobanteParticular":
        title = `Comprobante de Domicilio Particular (${formData.tipoComprobanteParticular})`;
        break;
      default:
        title = "Documento";
    }
    
    setShowDocumentPreview({
      show: true,
      url: mockUrl,
      title: title
    });
  };

  // Función para cerrar la previsualización de documentos
  const handleCloseDocumentPreview = () => {
    setShowDocumentPreview({
      show: false,
      url: "",
      title: ""
    });
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
                    <Label htmlFor="estadoCivil">Estado Civil</Label>
                    <Select 
                      value={formData.estadoCivil}
                      onValueChange={(value: string) => handleSelectChange("estadoCivil", value)}
                    >
                      <SelectTrigger id="estadoCivil">
                        <SelectValue placeholder="Seleccione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SOLTERO">Soltero(a)</SelectItem>
                        <SelectItem value="CASADO">Casado(a)</SelectItem>
                        <SelectItem value="DIVORCIADO">Divorciado(a)</SelectItem>
                        <SelectItem value="VIUDO">Viudo(a)</SelectItem>
                        <SelectItem value="UNION_LIBRE">Unión Libre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fechaNacimiento">Fecha de Nacimiento</Label>
                    <Input 
                      id="fechaNacimiento"
                      type="date"
                      value={selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""}
                      onChange={(e) => {
                        if (e.target.value) {
                          setSelectedDate(new Date(e.target.value));
                        }
                      }}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="paisNacimiento">País de Nacimiento</Label>
                    <Input 
                      id="paisNacimiento" 
                      name="paisNacimiento" 
                      value={formData.paisNacimiento} 
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estadoNacimiento">Estado de Nacimiento</Label>
                    <Input 
                      id="estadoNacimiento" 
                      name="estadoNacimiento" 
                      value={formData.estadoNacimiento} 
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="municipioNacimiento">Municipio de Nacimiento</Label>
                    <Input 
                      id="municipioNacimiento" 
                      name="municipioNacimiento" 
                      value={formData.municipioNacimiento} 
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="localidadNacimiento">Localidad de Nacimiento</Label>
                    <Input 
                      id="localidadNacimiento" 
                      name="localidadNacimiento" 
                      value={formData.localidadNacimiento} 
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="numeroActaNacimiento">Número de Acta Nacimiento</Label>
                    <Input 
                      id="numeroActaNacimiento" 
                      name="numeroActaNacimiento" 
                      value={formData.numeroActaNacimiento} 
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2 flex items-center">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="tieneActaNacimiento"
                        name="tieneActaNacimiento"
                        checked={formData.tieneActaNacimiento}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4"
                      />
                      <Label htmlFor="tieneActaNacimiento">Documento Acta de Nacimiento</Label>
                    </div>
                    <div className="ml-auto">
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        disabled={!formData.tieneActaNacimiento}
                      >
                        Cargar Acta
                      </Button>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <Separator className="my-4" />
                    <div className="flex items-center space-x-2 mb-4">
                      <input
                        type="checkbox"
                        id="fallecido"
                        name="fallecido"
                        checked={formData.fallecido}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4"
                      />
                      <Label htmlFor="fallecido">Registrar defunción</Label>
                    </div>
                  </div>
                  {formData.fallecido && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="fechaDefuncion">Fecha de Defunción</Label>
                        <Input 
                          id="fechaDefuncion"
                          type="date"
                          value={defuncionDate ? format(defuncionDate, "yyyy-MM-dd") : ""}
                          onChange={(e) => {
                            if (e.target.value) {
                              setDefuncionDate(new Date(e.target.value));
                            }
                          }}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="numeroActaDefuncion">Número de Acta Defunción</Label>
                        <Input 
                          id="numeroActaDefuncion" 
                          name="numeroActaDefuncion" 
                          value={formData.numeroActaDefuncion} 
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2 flex items-center">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="tieneActaDefuncion"
                            name="tieneActaDefuncion"
                            checked={formData.tieneActaDefuncion}
                            onChange={handleCheckboxChange}
                            className="h-4 w-4"
                          />
                          <Label htmlFor="tieneActaDefuncion">Documento Acta de Defunción</Label>
                        </div>
                        <div className="ml-auto">
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="sm"
                            disabled={!formData.tieneActaDefuncion}
                          >
                            Cargar Acta
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                  <div className="col-span-2">
                    <Separator className="my-4" />
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

                <div className="space-y-2 col-span-2">
                    <div className="flex items-center space-x-2 mb-2">
                        <input
                        type="checkbox"
                        id="tieneComprobanteFiscal"
                        name="tieneComprobanteFiscal"
                        checked={formData.tieneComprobanteFiscal}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4"
                        />
                        <Label htmlFor="tieneComprobanteFiscal">Documento de comprobante de domicilio</Label>
                    </div>
                    
                    {formData.tieneComprobanteFiscal && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="tipoComprobanteFiscal">Tipo de comprobante</Label>
                            <Select 
                            value={formData.tipoComprobanteFiscal}
                            onValueChange={(value: string) => handleSelectChange("tipoComprobanteFiscal", value)}
                            >
                            <SelectTrigger id="tipoComprobanteFiscal">
                                <SelectValue placeholder="Seleccione tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="CFE">CFE</SelectItem>
                                <SelectItem value="AGUA">Agua</SelectItem>
                                <SelectItem value="TELEFONO">Teléfono</SelectItem>
                                <SelectItem value="PREDIAL">Predial</SelectItem>
                                <SelectItem value="OTRO">Otro</SelectItem>
                            </SelectContent>
                            </Select>
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="fechaComprobanteFiscal">Fecha del comprobante</Label>
                            <Input 
                            id="fechaComprobanteFiscal"
                            type="date"
                            name="fechaComprobanteFiscal"
                            value={formData.fechaComprobanteFiscal}
                            onChange={handleInputChange}
                            className="w-full"
                            />
                        </div>
                        
                        <div className="space-y-2 col-span-2 flex items-center">
                            <Label htmlFor="comprobanteFile" className="mr-auto">Subir comprobante</Label>
                            <Button 
                            type="button" 
                            variant="outline" 
                            size="sm"
                            >
                            Cargar archivo
                            </Button>
                        </div>
                        </div>
                    )}
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

                  <div className="space-y-2 col-span-2">
                    <div className="flex items-center space-x-2 mb-2">
                        <input
                        type="checkbox"
                        id="tieneComprobanteParticular"
                        name="tieneComprobanteParticular"
                        checked={formData.tieneComprobanteParticular}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4"
                        />
                        <Label htmlFor="tieneComprobanteParticular">Documento de comprobante de domicilio</Label>
                    </div>
                    
                    {formData.tieneComprobanteParticular && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="tipoComprobanteParticular">Tipo de comprobante</Label>
                            <Select 
                            value={formData.tipoComprobanteParticular}
                            onValueChange={(value: string) => handleSelectChange("tipoComprobanteParticular", value)}
                            >
                            <SelectTrigger id="tipoComprobanteParticular">
                                <SelectValue placeholder="Seleccione tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="CFE">CFE</SelectItem>
                                <SelectItem value="AGUA">Agua</SelectItem>
                                <SelectItem value="TELEFONO">Teléfono</SelectItem>
                                <SelectItem value="PREDIAL">Predial</SelectItem>
                                <SelectItem value="OTRO">Otro</SelectItem>
                            </SelectContent>
                            </Select>
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="fechaComprobanteParticular">Fecha del comprobante</Label>
                            <Input 
                            id="fechaComprobanteParticular"
                            type="date"
                            name="fechaComprobanteParticular"
                            value={formData.fechaComprobanteParticular}
                            onChange={handleInputChange}
                            className="w-full"
                            />
                        </div>
                        
                        <div className="space-y-2 col-span-2 flex items-center">
                            <Label htmlFor="comprobanteParticularFile" className="mr-auto">Subir comprobante</Label>
                            <Button 
                            type="button" 
                            variant="outline" 
                            size="sm"
                            >
                            Cargar archivo
                            </Button>
                        </div>
                        </div>
                    )}
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
                icon={Heart} 
                label="Estado civil" 
                value={
                  formData.estadoCivil === "SOLTERO" ? "Soltero(a)" :
                  formData.estadoCivil === "CASADO" ? "Casado(a)" :
                  formData.estadoCivil === "DIVORCIADO" ? "Divorciado(a)" :
                  formData.estadoCivil === "VIUDO" ? "Viudo(a)" :
                  "Unión Libre"
                } 
              />
              <InfoItem 
                icon={Calendar} 
                label="Fecha de nacimiento" 
                value={selectedDate ? format(selectedDate, "dd/MM/yyyy") : "No disponible"} 
              />
              <InfoItem 
                icon={Globe} 
                label="Lugar de nacimiento" 
                value={`${formData.localidadNacimiento}, ${formData.municipioNacimiento}, ${formData.estadoNacimiento}, ${formData.paisNacimiento}`} 
              />
              {formData.numeroActaNacimiento && (
                <InfoItem 
                  icon={FileText} 
                  label="Acta de nacimiento" 
                  value={formData.numeroActaNacimiento} 
                />
              )}
              {formData.tieneActaNacimiento && (
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">Documento acta de nacimiento</Badge>
                  <Button variant="ghost" size="sm" onClick={() => handleViewDocument("nacimiento")}>
                    Ver
                  </Button>
                </div>
              )}

              {formData.fallecido && (
                <>
                  <Separator className="my-2" />
                  <InfoItem 
                    icon={Calendar} 
                    label="Fecha de defunción" 
                    value={defuncionDate ? format(defuncionDate, "dd/MM/yyyy") : "No disponible"} 
                  />
                  {formData.numeroActaDefuncion && (
                    <InfoItem 
                      icon={FileText} 
                      label="Acta de defunción" 
                      value={formData.numeroActaDefuncion} 
                    />
                  )}
                  {formData.tieneActaDefuncion && (
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">Documento acta de defunción</Badge>
                      <Button variant="ghost" size="sm" onClick={() => handleViewDocument("defuncion")}>
                        Ver
                      </Button>
                    </div>
                  )}
                </>
              )}

              <Separator className="my-2" />
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
                {formData.tieneComprobanteFiscal && (
                    <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                        Comprobante {formData.tipoComprobanteFiscal === "CFE" ? "CFE" : 
                                    formData.tipoComprobanteFiscal === "AGUA" ? "Agua" : 
                                    formData.tipoComprobanteFiscal === "TELEFONO" ? "Teléfono" : 
                                    formData.tipoComprobanteFiscal === "PREDIAL" ? "Predial" : "Otro"}
                        </Badge>
                        <Button variant="ghost" size="sm" onClick={() => handleViewDocument("comprobanteFiscal")}>
                        Ver
                        </Button>
                    </div>
                )}
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
                {formData.tieneComprobanteParticular && (
                    <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                        Comprobante {formData.tipoComprobanteParticular === "CFE" ? "CFE" : 
                                    formData.tipoComprobanteParticular === "AGUA" ? "Agua" : 
                                    formData.tipoComprobanteParticular === "TELEFONO" ? "Teléfono" : 
                                    formData.tipoComprobanteParticular === "PREDIAL" ? "Predial" : "Otro"}
                        </Badge>
                        <Button variant="ghost" size="sm" onClick={() => handleViewDocument("comprobanteParticular")}>
                        Ver
                        </Button>
                    </div>
                )}
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

      {/* Componente para previsualizar documentos */}
      {showDocumentPreview.show && (
        <DocumentPreview
          title={showDocumentPreview.title}
          documentUrl={showDocumentPreview.url}
          onClose={handleCloseDocumentPreview}
        />
      )}
    </div>
  );
};

export default DatosPersonalesContent;