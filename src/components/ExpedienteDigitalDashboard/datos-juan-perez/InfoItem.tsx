"use client";

import React from 'react';

// Componente de utilidad para mostrar información en formato de etiqueta y valor
const InfoItem = ({ 
  icon: Icon, 
  label, 
  value 
}: { 
  icon?: React.ElementType; 
  label: string; 
  value: string | number;
}) => {
  return (
    <div className="flex items-start space-x-2">
      {Icon && <Icon className="h-4 w-4 text-muted-foreground mt-0.5" />}
      <div className="space-y-0.5">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium">{value || 'No disponible'}</p>
      </div>
    </div>
  );
};

export default InfoItem;