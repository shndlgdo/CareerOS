import CareerOSApp from '@/components/CareerOSApp';

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug = [] } = await params;
  return <CareerOSApp slug={slug} />;
}
