import PageContainer from '@/components/layout/page-container';
import NotificationCardContainer from '@/app/[locale]/customer/address/_components/notification-view';

type AddressViewPageProps = {
  session: any; // Adjust the type according to your session object structure
};

export default function AddressViewPage({ session }: AddressViewPageProps) {
  return (
    <PageContainer>
      <div className="space-y-4">
        <NotificationCardContainer
          categories={[]}
          initialData={null}
          session={session}
        />
      </div>
    </PageContainer>
  );
}
