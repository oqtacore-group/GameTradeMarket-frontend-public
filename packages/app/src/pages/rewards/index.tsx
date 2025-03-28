import { InferGetServerSidePropsType } from 'next';
import { RewardsContainer } from '@/containers/rewards';

export async function getServerSideProps(context: any) {
  return {
    props: {
      serverSideData: {
        cats: {},
      },
    },
  };
}

function RewardsLandingPage({
  serverSideData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <RewardsContainer serverSideData={serverSideData} />;
}

export default RewardsLandingPage;
