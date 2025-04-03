import { Button } from '@/components/ui/button';

export default function HomePage() {
  // Determina el basePath basado en el entorno
  const basePath = process.env.NODE_ENV === 'production' ? '/sai-test' : '';
  
  return (
    <div className="flex flex-col min-h-screen items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">SAI UAN</h1>
      <div className="flex gap-4">
        <a href={`${basePath}/admin`}>
          <Button size="lg">Sistema Administrativo</Button>
        </a>
        <a href={`${basePath}/expediente-digital-dashboard`}>
          <Button size="lg" variant="outline">Expediente Digital</Button>
        </a>
      </div>
    </div>
  );
}