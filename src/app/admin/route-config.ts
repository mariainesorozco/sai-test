// src/app/admin/route-config.ts

export const routes = {
    inicio: '/admin',
    nomina: {
      root: '/admin/nomina',
      expedienteDigital: '/admin/nomina/expediente-digital',
      perfiles: '/admin/nomina/perfiles',
      nominas: '/admin/nomina/nominas',
    },
    impuestos: {
      root: '/admin/impuestos',
      declaraciones: '/admin/impuestos/declaraciones',
      obligaciones: '/admin/impuestos/obligaciones',
    },
    egresos: {
      root: '/admin/egresos',
      pagos: '/admin/egresos/pagos',
      proveedores: '/admin/egresos/proveedores',
    },
    catalogos: {
      root: '/admin/catalogos',
      general: '/admin/catalogos/general',
      nomina: '/admin/catalogos/nomina',
      contabilidad: '/admin/catalogos/contabilidad',
    },
    expediente: {
      root: '/admin/expediente-digital',
      empleado: (id: string | number) => `/admin/expediente-digital/${id}`,
    }
  };