// src/app/admin/route-config.ts

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const routes = {
  inicio: `${basePath}/admin`,
  nomina: {
    root: `${basePath}/admin/nomina`,
    expedienteDigital: `${basePath}/admin/nomina/expediente-digital`,
    perfiles: `${basePath}/admin/nomina/perfiles`,
    nominas: `${basePath}/admin/nomina/nominas`,
  },
  impuestos: {
    root: `${basePath}/admin/impuestos`,
    declaraciones: `${basePath}/admin/impuestos/declaraciones`,
    obligaciones: `${basePath}/admin/impuestos/obligaciones`,
  },
  egresos: {
    root: `${basePath}/admin/egresos`,
    pagos: `${basePath}/admin/egresos/pagos`,
    proveedores: `${basePath}/admin/egresos/proveedores`,
  },
  catalogos: {
    root: `${basePath}/admin/catalogos`,
    general: `${basePath}/admin/catalogos/general`,
    nomina: `${basePath}/admin/catalogos/nomina`,
    contabilidad: `${basePath}/admin/catalogos/contabilidad`,
  },
  expediente: {
    root: `${basePath}/admin/expediente-digital`,
    empleado: (id: string | number) => `${basePath}/admin/expediente-digital/${id}`,
  }
};