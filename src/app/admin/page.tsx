import MainLayout from '@/components/admin/MainLayout';

export function generateStaticParams() {
    return [{ slug: 'admin' }];
}

export default function AdminPage() {
  return <MainLayout />;
}