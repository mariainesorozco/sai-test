import ExpedienteDigitalDashboard from '@/components/ExpedienteDigitalDashboard';

export function generateStaticParams() {
    return [{ slug: 'expediente-digital-dashboard' }];
}
export default function ExpedientePage() {
  return <ExpedienteDigitalDashboard />;
}