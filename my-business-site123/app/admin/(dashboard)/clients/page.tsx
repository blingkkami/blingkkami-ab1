import ClientManagementContainer from './ClientManagementContainer';

export const dynamic = 'force-dynamic';

export default function ClientsPage() {
  return (
    <div className="w-full h-full">
      <ClientManagementContainer />
    </div>
  );
}
