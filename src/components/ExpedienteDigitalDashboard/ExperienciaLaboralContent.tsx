"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ExperienciaLaboral {
  id: number;
  empresa: string;
  sector: 'PRIVADO' | 'FEDERAL' | 'ESTATAL';
  puesto: string;
  fechaInicio: Date;
  fechaFin: Date | null;
  horario: string | null;
}

const ExperienciaLaboralContent = () => {
  // Estado para manejar los registros de experiencia laboral
  const [experiencias, setExperiencias] = useState<ExperienciaLaboral[]>([
    {
      id: 1,
      empresa: "Nombre de la empresa",
      sector: "PRIVADO",
      puesto: "Nombre del puesto",
      fechaInicio: new Date(2020, 0, 1),
      fechaFin: new Date(2022, 11, 31),
      horario: null
    }
  ]);
  
  // Estado para el diálogo de edición
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  
  // Estado para el formulario y la experiencia seleccionada para editar
  const [selectedExperiencia, setSelectedExperiencia] = useState<ExperienciaLaboral | null>(null);
  const [isNewExperiencia, setIsNewExperiencia] = useState(false);
  
  // Estados para form inputs
  const [empresa, setEmpresa] = useState("");
  const [sector, setSector] = useState<'PRIVADO' | 'FEDERAL' | 'ESTATAL'>("PRIVADO");
  const [puesto, setPuesto] = useState("");
  const [fechaInicio, setFechaInicio] = useState<Date | undefined>(undefined);
  const [fechaFin, setFechaFin] = useState<Date | undefined>(undefined);
  const [horario, setHorario] = useState("");
  const [trabajaActualmente, setTrabajaActualmente] = useState(false);
  
  // Inicializar formulario para edición o creación
  const initializeForm = (experiencia: ExperienciaLaboral | null = null, isNew = false) => {
    if (experiencia) {
      setEmpresa(experiencia.empresa);
      setSector(experiencia.sector);
      setPuesto(experiencia.puesto);
      setFechaInicio(experiencia.fechaInicio);
      setFechaFin(experiencia.fechaFin || undefined);
      setHorario(experiencia.horario || "");
      setTrabajaActualmente(!experiencia.fechaFin);
    } else {
      setEmpresa("");
      setSector("PRIVADO");
      setPuesto("");
      setFechaInicio(undefined);
      setFechaFin(undefined);
      setHorario("");
      setTrabajaActualmente(false);
    }
    setSelectedExperiencia(experiencia);
    setIsNewExperiencia(isNew);
  };
  
  // Abrir diálogo para crear nueva experiencia
  const handleNewExperiencia = () => {
    initializeForm(null, true);
    setEditDialogOpen(true);
  };
  
  // Abrir diálogo para editar experiencia existente
  const handleEditExperiencia = (id: number) => {
    const experiencia = experiencias.find(exp => exp.id === id);
    if (experiencia) {
      initializeForm(experiencia, false);
      setEditDialogOpen(true);
    }
  };
  
  // Guardar cambios (crear o actualizar)
  const handleSaveExperiencia = () => {
    if (!fechaInicio) {
      return; // Validación básica
    }
    
    const updatedExperiencia: ExperienciaLaboral = {
      id: isNewExperiencia ? Math.max(0, ...experiencias.map(e => e.id)) + 1 : (selectedExperiencia?.id || 0),
      empresa,
      sector,
      puesto,
      fechaInicio,
      fechaFin: trabajaActualmente ? null : fechaFin || null,
      horario: horario || null
    };
    
    if (isNewExperiencia) {
      setExperiencias([...experiencias, updatedExperiencia]);
    } else {
      setExperiencias(experiencias.map(exp => 
        exp.id === updatedExperiencia.id ? updatedExperiencia : exp
      ));
    }
    
    setEditDialogOpen(false);
  };
  
  // Eliminar experiencia
  const handleDeleteExperiencia = (id: number) => {
    setExperiencias(experiencias.filter(exp => exp.id !== id));
  };
  
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">Empresa/Institución</TableHead>
            <TableHead>Sector</TableHead>
            <TableHead>Puesto</TableHead>
            <TableHead>Período</TableHead>
            <TableHead className="w-[120px]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {experiencias.length > 0 ? (
            experiencias.map((exp) => (
              <TableRow key={exp.id}>
                <TableCell className="font-medium">{exp.empresa}</TableCell>
                <TableCell>{exp.sector === "PRIVADO" ? "Privado" : exp.sector === "FEDERAL" ? "Federal" : "Estatal"}</TableCell>
                <TableCell>{exp.puesto}</TableCell>
                <TableCell>
                  {format(exp.fechaInicio, "dd/MM/yyyy")} - {exp.fechaFin ? format(exp.fechaFin, "dd/MM/yyyy") : "Actual"}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEditExperiencia(exp.id)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción eliminará el registro de experiencia laboral en {exp.empresa} y no se puede deshacer.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteExperiencia(exp.id)}>Eliminar</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                No hay experiencias laborales registradas
              </TableCell>
            </TableRow>
          )}
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              <Button variant="outline" size="sm" className="mt-2" onClick={handleNewExperiencia}>
                <Plus className="h-4 w-4 mr-2" /> Agregar experiencia
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      
      {/* Diálogo para crear/editar experiencia */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>{isNewExperiencia ? "Agregar Experiencia Laboral" : "Editar Experiencia Laboral"}</DialogTitle>
            <DialogDescription>
              Complete los detalles de la experiencia laboral del empleado.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="empresa">Empresa/Institución</Label>
              <Input 
                id="empresa" 
                value={empresa} 
                onChange={(e) => setEmpresa(e.target.value)} 
                placeholder="Nombre de la empresa" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sector">Sector</Label>
              <Select value={sector} onValueChange={(value) => setSector(value as 'PRIVADO' | 'FEDERAL' | 'ESTATAL')}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PRIVADO">Privado</SelectItem>
                  <SelectItem value="FEDERAL">Federal</SelectItem>
                  <SelectItem value="ESTATAL">Estatal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="puesto">Puesto</Label>
              <Input 
                id="puesto" 
                value={puesto} 
                onChange={(e) => setPuesto(e.target.value)} 
                placeholder="Nombre del puesto" 
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="fechaInicio">Fecha de inicio</Label>
                </div>
                <Input 
                  id="fechaInicio"
                  type="date"
                  value={fechaInicio ? format(fechaInicio, "yyyy-MM-dd") : ""}
                  onChange={(e) => {
                    if (e.target.value) {
                      setFechaInicio(new Date(e.target.value));
                    }
                  }}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="fechaFin">Fecha de término</Label>
                </div>
                <Input 
                  id="fechaFin"
                  type="date"
                  value={fechaFin && !trabajaActualmente ? format(fechaFin, "yyyy-MM-dd") : ""}
                  onChange={(e) => {
                    if (e.target.value) {
                      setFechaFin(new Date(e.target.value));
                    }
                  }}
                  disabled={trabajaActualmente}
                  className="w-full"
                />
              </div>
            </div>
            
            <div className="flex items-center mt-1">
              <input
                type="checkbox"
                id="trabajaActualmente"
                checked={trabajaActualmente}
                onChange={(e) => setTrabajaActualmente(e.target.checked)}
                className="mr-2 h-4 w-4"
              />
              <Label htmlFor="trabajaActualmente" className="text-sm font-normal">
                Trabaja actualmente
              </Label>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="horario">Horario (opcional)</Label>
              <Input 
                id="horario" 
                value={horario} 
                onChange={(e) => setHorario(e.target.value)} 
                placeholder="Ej: Lunes a Viernes 9:00 - 18:00" 
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSaveExperiencia}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExperienciaLaboralContent;