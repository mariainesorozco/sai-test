import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function generateStaticParams() {
    return [{ slug: '' }];
}
export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">SAI UAN</h1>
      <div className="flex gap-4">
        <Link href="/admin">
          <Button size="lg">Sistema Administrativo</Button>
        </Link>
        <Link href="/expediente-digital-dashboard">
          <Button size="lg" variant="outline">Expediente Digital</Button>
        </Link>
      </div>
    </div>
  );
}