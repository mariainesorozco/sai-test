import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, BarChart, ChevronLeft, ChevronRight } from 'lucide-react';
import { LineChart, Line, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts';

// Tipos para los datos
interface DataItem {
  nombre: string;
  ingresos: number;
  egresos: number;
  balance: number;
  nota?: string;
}

// Props para el custom tooltip
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<any>;
  label?: string;
}

const AnalisisFinancieroChart: React.FC = () => {
  const [periodoVisualizacion, setPeriodoVisualizacion] = useState<'mensual' | 'trimestral' | 'anual'>('mensual');
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [visibleData, setVisibleData] = useState<DataItem[]>([]);
  const [startIndex, setStartIndex] = useState<number>(0);
  
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

  // Datos para el período mensual (último año)
  const datosMensuales: DataItem[] = [
    { nombre: 'May', ingresos: 48200000, egresos: 45800000, balance: 2400000 },
    { nombre: 'Jun', ingresos: 50500000, egresos: 47300000, balance: 3200000 },
    { nombre: 'Jul', ingresos: 49800000, egresos: 49100000, balance: 700000 },
    { nombre: 'Ago', ingresos: 48900000, egresos: 50200000, balance: -1300000 },
    { nombre: 'Sep', ingresos: 51200000, egresos: 49500000, balance: 1700000 },
    { nombre: 'Oct', ingresos: 50800000, egresos: 48200000, balance: 2600000 },
    { nombre: 'Nov', ingresos: 49700000, egresos: 47800000, balance: 1900000 },
    { nombre: 'Dic', ingresos: 52100000, egresos: 51500000, balance: 600000 },
    { nombre: 'Ene', ingresos: 49300000, egresos: 48900000, balance: 400000 },
    { nombre: 'Feb', ingresos: 50200000, egresos: 49100000, balance: 1100000 },
    { nombre: 'Mar', ingresos: 51800000, egresos: 50300000, balance: 1500000 },
    { nombre: 'Abr', ingresos: 52450000, egresos: 51300000, balance: 1150000 },
  ];

  // Datos para el período trimestral (últimos 3 años)
  const datosTrimestrales: DataItem[] = [
    { nombre: 'Q2-23', ingresos: 148500000, egresos: 142400000, balance: 6100000 },
    { nombre: 'Q3-23', ingresos: 149900000, egresos: 148800000, balance: 1100000 },
    { nombre: 'Q4-23', ingresos: 152600000, egresos: 147500000, balance: 5100000 },
    { nombre: 'Q1-24', ingresos: 151000000, egresos: 149600000, balance: 1400000 },
    { nombre: 'Q2-24', ingresos: 153200000, egresos: 148700000, balance: 4500000 },
    { nombre: 'Q3-24', ingresos: 152400000, egresos: 150800000, balance: 1600000 },
    { nombre: 'Q4-24', ingresos: 156300000, egresos: 155100000, balance: 1200000 },
    { nombre: 'Q1-25', ingresos: 151800000, egresos: 149300000, balance: 2500000 },
  ];

  // Datos para el período anual (últimos 5 años)
  const datosAnuales: DataItem[] = [
    { nombre: '2021', ingresos: 586000000, egresos: 578500000, balance: 7500000 },
    { nombre: '2022', ingresos: 598300000, egresos: 591900000, balance: 6400000 },
    { nombre: '2023', ingresos: 607200000, egresos: 602100000, balance: 5100000 },
    { nombre: '2024', ingresos: 615700000, egresos: 609500000, balance: 6200000 },
    { nombre: '2025', ingresos: 203950000, egresos: 199400000, balance: 4550000, nota: '(Parcial)' },
  ];

  // Seleccionar el conjunto de datos según el período
  const getDatosActivos = (): DataItem[] => {
    switch (periodoVisualizacion) {
      case 'mensual':
        return datosMensuales;
      case 'trimestral':
        return datosTrimestrales;
      case 'anual':
        return datosAnuales;
      default:
        return datosMensuales;
    }
  };

  // Actualizar los datos visibles cuando cambia el periodo o el índice inicial
  useEffect(() => {
    const allData = getDatosActivos();
    // Si es móvil, mostrar sólo un subconjunto de datos
    if (isMobile) {
      const visibleCount = periodoVisualizacion === 'anual' ? 3 : 4;
      const endIndex = Math.min(startIndex + visibleCount, allData.length);
      setVisibleData(allData.slice(startIndex, endIndex));
    } else {
      // En desktop, mostrar todos los datos
      setVisibleData(allData);
    }
  }, [periodoVisualizacion, startIndex, isMobile]);

  // Función para avanzar en los datos (vista móvil)
  const handleNext = () => {
    const allData = getDatosActivos();
    const visibleCount = periodoVisualizacion === 'anual' ? 3 : 4;
    const maxStartIndex = Math.max(0, allData.length - visibleCount);
    setStartIndex(prev => Math.min(prev + 1, maxStartIndex));
  };

  // Función para retroceder en los datos (vista móvil)
  const handlePrev = () => {
    setStartIndex(prev => Math.max(0, prev - 1));
  };

  // Formato para valores monetarios
  const formatoMoneda = (valor: number): string => {
    if (valor >= 1000000) {
      return `$${(valor / 1000000).toFixed(1)}M`;
    } else if (valor >= 1000) {
      return `$${(valor / 1000).toFixed(0)}K`;
    } else {
      return `$${valor}`;
    }
  };

  // Opciones para el tooltip personalizado
  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-md p-3 shadow-sm">
          <p className="font-medium text-sm">{label}</p>
          <div className="text-sm space-y-1 mt-1">
            <p className="text-blue-500 flex items-center justify-between">
              <span>Ingresos:</span> 
              <span className="font-medium ml-2">{formatoMoneda(payload[0].value)}</span>
            </p>
            <p className="text-red-500 flex items-center justify-between">
              <span>Egresos:</span> 
              <span className="font-medium ml-2">{formatoMoneda(payload[1].value)}</span>
            </p>
            {payload[2] && (
              <p className={`${payload[2].value >= 0 ? 'text-green-500' : 'text-destructive'} flex items-center justify-between`}>
                <span>Balance:</span> 
                <span className="font-medium ml-2">{formatoMoneda(payload[2].value)}</span>
              </p>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  const allData = getDatosActivos();
  const visibleCount = periodoVisualizacion === 'anual' ? 3 : 4;
  const canGoNext = startIndex < (allData.length - visibleCount);
  const canGoPrev = startIndex > 0;

  return (
    <Card className="w-full">
      <CardHeader className={isMobile ? "px-3 py-3" : undefined}>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div>
            <CardTitle className={isMobile ? "text-base" : undefined}>Análisis Financiero</CardTitle>
            <CardDescription className={isMobile ? "text-xs" : undefined}>Evolución de ingresos y egresos</CardDescription>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <Button 
              variant={periodoVisualizacion === 'anual' ? 'default' : 'outline'} 
              size={isMobile ? "sm" : "default"}
              className={isMobile ? "text-xs h-7 px-2" : undefined}
              onClick={() => {
                setPeriodoVisualizacion('anual');
                setStartIndex(0);
              }}
            >
              Anual
            </Button>
            <Button 
              variant={periodoVisualizacion === 'trimestral' ? 'default' : 'outline'} 
              size={isMobile ? "sm" : "default"}
              className={isMobile ? "text-xs h-7 px-2" : undefined}
              onClick={() => {
                setPeriodoVisualizacion('trimestral');
                setStartIndex(0);
              }}
            >
              Trimestral
            </Button>
            <Button 
              variant={periodoVisualizacion === 'mensual' ? 'default' : 'outline'} 
              size={isMobile ? "sm" : "default"}
              className={isMobile ? "text-xs h-7 px-2" : undefined}
              onClick={() => {
                setPeriodoVisualizacion('mensual');
                setStartIndex(0);
              }}
            >
              Mensual
            </Button>
            {!isMobile && (
              <Button variant="outline" size="sm" className="h-8" title="Exportar gráfico">
                <Download className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        </div>
        {isMobile && (
          <div className="flex justify-between items-center mt-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-7 w-7 p-0" 
              disabled={!canGoPrev}
              onClick={handlePrev}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-xs text-muted-foreground">
              {startIndex + 1}-{Math.min(startIndex + visibleCount, allData.length)} de {allData.length}
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-7 w-7 p-0" 
              disabled={!canGoNext}
              onClick={handleNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent className={isMobile ? "h-60 px-2" : "h-80"}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={visibleData}
            margin={isMobile ? { top: 5, right: 5, left: 5, bottom: 5 } : { top: 10, right: 30, left: 20, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="nombre" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: isMobile ? 10 : 12 }}
            />
            <YAxis 
              yAxisId="left" 
              orientation="left" 
              tickFormatter={formatoMoneda}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: isMobile ? 10 : 12 }}
              width={isMobile ? 50 : 60}
            />
            {!isMobile && (
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                tickFormatter={formatoMoneda}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
            )}
            <Tooltip content={<CustomTooltip />} />
            {!isMobile && <Legend />}
            <Bar yAxisId="left" dataKey="ingresos" fill="#3b82f6" name="Ingresos" barSize={isMobile ? 15 : 20} />
            <Bar yAxisId="left" dataKey="egresos" fill="#ef4444" name="Egresos" barSize={isMobile ? 15 : 20} />
            <Line 
              yAxisId={isMobile ? "left" : "right"}
              type="monotone" 
              dataKey="balance" 
              stroke="#10b981" 
              strokeWidth={2}
              name="Balance"
              dot={{ r: isMobile ? 2 : 4 }}
              activeDot={{ r: isMobile ? 4 : 6 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className={`border-t px-3 sm:px-6 py-3 ${isMobile ? 'flex-col space-y-2' : 'flex justify-between'}`}>
        <div className="flex gap-3 sm:gap-4 flex-wrap">
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
            <span className="text-xs sm:text-sm">Ingresos</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <span className="text-xs sm:text-sm">Egresos</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <span className="text-xs sm:text-sm">Balance</span>
          </div>
        </div>
        <Button variant="outline" size="sm" className={isMobile ? "w-full text-xs" : undefined}>
          Ver informe detallado
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AnalisisFinancieroChart;