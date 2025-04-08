// src/app/admin/route-config.ts
import { prefixRoute } from '@/utils/route-utils';

export const routes = {
    inicio: prefixRoute('/admin'),
    nomina: {
      root: prefixRoute('/admin/nomina'),
      expedienteDigital: prefixRoute('/admin/nomina/expediente-digital'),
      perfiles: prefixRoute('/admin/nomina/perfiles'),
      nominas: prefixRoute('/admin/nomina/nominas'),
    },
    impuestos: {
      root: prefixRoute('/admin/impuestos'),
      declaraciones: prefixRoute('/admin/impuestos/declaraciones'),
      obligaciones: prefixRoute('/admin/impuestos/obligaciones'),
    },
    egresos: {
      root: prefixRoute('/admin/egresos'),
      pagos: prefixRoute('/admin/egresos/pagos'),
      proveedores: prefixRoute('/admin/egresos/proveedores'),
    },
    catalogos: {
      root: prefixRoute('/admin/catalogos'),
      general: prefixRoute('/admin/catalogos/general'),
      nomina: prefixRoute('/admin/catalogos/nomina'),
      contabilidad: prefixRoute('/admin/catalogos/contabilidad'),
    },
    expediente: {
      root: prefixRoute('/admin/expediente-digital'),
      empleado: (id: string | number) => prefixRoute(`/admin/expediente-digital/${id}`),
    }
};