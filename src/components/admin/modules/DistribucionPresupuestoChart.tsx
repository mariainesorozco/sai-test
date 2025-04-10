import React, { useState, ReactElement, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Building2, Microscope, Users, ChevronDown, ChevronUp } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, Sector } from 'recharts';

// Definición de tipos
interface PresupuestoItem {
  name: string;
  value: number;
  porcentaje: number;
  color: string;
  icon: ReactElement;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<any>;
}

interface ActiveShapeProps {
  cx: number;
  cy: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  fill: string;
}

const DistribucionPresupuestoChart: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState<'anterior' | 'actual' | 'proyectado'>('actual');
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [detailsExpanded, setDetailsExpanded] = useState<boolean>(false);
  
  // Comprobar si es dispositivo móvil
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  // Datos de distribución - Periodo actual
  const datosDistribucionActual: PresupuestoItem[] = [
    { name: 'Docencia', value: 32750000, porcentaje: 62.4, color: '#4f46e5', icon: <Building2 className="h-4 w-4" /> },
    { name: 'Administrativos', value: 14500000, porcentaje: 27.7, color: '#10b981', icon: <Users className="h-4 w-4" /> },
    { name: 'Investigación', value: 5200000, porcentaje: 9.9, color: '#8b5cf6', icon: <Microscope className="h-4 w-4" /> }
  ];

  // Datos de distribución - Periodo anterior
  const datosDistribucionAnterior: PresupuestoItem[] = [
    { name: 'Docencia', value: 31050000, porcentaje: 64.2, color: '#4f46e5', icon: <Building2 className="h-4 w-4" /> },
    { name: 'Administrativos', value: 12900000, porcentaje: 26.7, color: '#10b981', icon: <Users className="h-4 w-4" /> },
    { name: 'Investigación', value: 4400000, porcentaje: 9.1, color: '#8b5cf6', icon: <Microscope className="h-4 w-4" /> }
  ];

  // Datos de distribución - Proyectado siguiente periodo
  const datosDistribucionProyectado: PresupuestoItem[] = [
    { name: 'Docencia', value: 33850000, porcentaje: 60.5, color: '#4f46e5', icon: <Building2 className="h-4 w-4" /> },
    { name: 'Administrativos', value: 15200000, porcentaje: 27.2, color: '#10b981', icon: <Users className="h-4 w-4" /> },
    { name: 'Investigación', value: 6850000, porcentaje: 12.3, color: '#8b5cf6', icon: <Microscope className="h-4 w-4" /> }
  ];

  // Seleccionar datos según el período
  const getDatosActivos = (): PresupuestoItem[] => {
    switch (periodoSeleccionado) {
      case 'anterior':
        return datosDistribucionAnterior;
      case 'actual':
        return datosDistribucionActual;
      case 'proyectado':
        return datosDistribucionProyectado;
      default:
        return datosDistribucionActual;
    }
  };

  // Formatear números a moneda
  const formatoMoneda = (valor: number): string => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      maximumFractionDigits: isMobile ? 1 : 2
    }).format(valor);
  };

  // Formatear moneda de manera abreviada para móvil
  const formatoMonedaCorto = (valor: number): string => {
    if (valor >= 1000000) {
      return `$${(valor / 1000000).toFixed(1)}M`;
    } else if (valor >= 1000) {
      return `$${(valor / 1000).toFixed(0)}K`;
    } else {
      return `$${valor}`;
    }
  };

  // Componente para renderizar sector activo (efecto hover)
  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + (isMobile ? 4 : 8)}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={innerRadius - (isMobile ? 2 : 4)}
          outerRadius={innerRadius - 1}
          fill={fill}
        />
      </g>
    );
  };

  // Tooltip personalizado
  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border rounded-md p-2 sm:p-3 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <div style={{ color: data.color }}>{data.icon}</div>
            <p className="font-medium text-xs sm:text-sm">{data.name}</p>
          </div>
          <div className="text-xs sm:text-sm space-y-1">
            <p className="flex items-center justify-between text-muted-foreground">
              <span>Monto:</span> 
              <span className="font-medium ml-2 text-foreground">{isMobile ? formatoMonedaCorto(data.value) : formatoMoneda(data.value)}</span>
            </p>
            <p className="flex items-center justify-between text-muted-foreground">
              <span>Porcentaje:</span> 
              <span className="font-medium ml-2 text-foreground">{data.porcentaje}%</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  // Calcular total
  const calcularTotal = (): number => {
    return getDatosActivos().reduce((sum, item) => sum + item.value, 0);
  };
  
  return (
    <Card className="w-full">
      <CardHeader className={isMobile ? "p-3" : undefined}>
        <div className={`flex ${isMobile ? 'flex-col gap-2' : 'justify-between items-center'}`}>
          <div>
            <CardTitle className={isMobile ? "text-base" : undefined}>Distribución del Presupuesto</CardTitle>
            <CardDescription className={isMobile ? "text-xs" : undefined}>Asignación por categoría</CardDescription>
          </div>
          <div className={`flex items-center ${isMobile ? 'self-start' : ''} gap-1 sm:gap-2`}>
            <Button 
              variant={periodoSeleccionado === 'anterior' ? 'default' : 'outline'} 
              size="sm"
              className={isMobile ? "text-xs h-7 px-2" : undefined}
              onClick={() => setPeriodoSeleccionado('anterior')}
            >
              Anterior
            </Button>
            <Button 
              variant={periodoSeleccionado === 'actual' ? 'default' : 'outline'} 
              size="sm"
              className={isMobile ? "text-xs h-7 px-2" : undefined}
              onClick={() => setPeriodoSeleccionado('actual')}
            >
              Actual
            </Button>
            <Button 
              variant={periodoSeleccionado === 'proyectado' ? 'default' : 'outline'} 
              size="sm"
              className={isMobile ? "text-xs h-7 px-2" : undefined}
              onClick={() => setPeriodoSeleccionado('proyectado')}
            >
              Proyectado
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className={isMobile ? "h-7 w-7 p-0" : "h-8"} 
              title="Exportar gráfico"
            >
              <Download className={isMobile ? "h-3 w-3" : "h-3.5 w-3.5"} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className={`${isMobile ? 'p-3 pt-0' : ''} grid grid-cols-1 ${isMobile ? '' : 'md:grid-cols-2'} gap-4 sm:gap-6`}>
        <div className={`${isMobile ? 'h-48' : 'h-64'} flex items-center justify-center`}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={getDatosActivos()}
                cx="50%"
                cy="50%"
                innerRadius={isMobile ? 40 : 60}
                outerRadius={isMobile ? 60 : 90}
                dataKey="value"
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(undefined)}
              >
                {getDatosActivos().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className={`flex flex-col justify-center ${isMobile && !detailsExpanded ? 'max-h-48 overflow-hidden' : ''}`}>
          <p className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold mb-2`}>
            Presupuesto Total: {isMobile ? formatoMonedaCorto(calcularTotal()) : formatoMoneda(calcularTotal())}
          </p>
          <div className="space-y-4">
            {getDatosActivos().map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{isMobile ? formatoMonedaCorto(item.value) : formatoMoneda(item.value)}</span>
                    <span className="text-muted-foreground">{item.porcentaje}%</span>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                  <div 
                    className="h-full rounded-full" 
                    style={{ width: `${item.porcentaje}%`, backgroundColor: item.color }}
                  />
                </div>
                
                {/* Descripción de la categoría - solo muestra en desktop o si está expandido */}
                {(!isMobile || detailsExpanded) && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.name === 'Docencia' ? 
                      'Incluye salarios de profesores, materiales educativos y becas.' :
                     item.name === 'Administrativos' ? 
                      'Incluye personal administrativo, mantenimiento y servicios.' :
                      'Proyectos de investigación, laboratorios y publicaciones.'}
                  </p>
                )}
              </div>
            ))}
          </div>
         {/* Botón para expandir/colapsar en móvil */}
         {isMobile && (
            <button 
              className="flex items-center justify-center text-muted-foreground text-xs mt-2 py-1 border-t"
              onClick={() => setDetailsExpanded(!detailsExpanded)}
            >
              {detailsExpanded ? (
                <>
                  <ChevronUp className="h-3 w-3 mr-1" /> Mostrar menos
                </>
              ) : (
                <>
                  <ChevronDown className="h-3 w-3 mr-1" /> Mostrar más detalles
                </>
              )}
            </button>
          )}
        </div>
      </CardContent>
      <CardFooter className={`border-t ${isMobile ? 'px-3 py-2 flex-col' : 'px-6 py-3'}`}>
        <div className="text-xs sm:text-sm text-muted-foreground">
          {periodoSeleccionado === 'anterior' ? 
            'Datos del periodo financiero anterior (2024)' : 
           periodoSeleccionado === 'actual' ? 
            'Datos del periodo financiero actual (2025)' : 
            'Proyección para el próximo periodo financiero (2026)'}
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className={`${isMobile ? 'w-full mt-2 text-xs' : 'ml-auto'}`}
        >
          Ver detalles completos
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DistribucionPresupuestoChart;
          