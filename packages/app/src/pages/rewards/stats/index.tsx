import { InferGetServerSidePropsType } from 'next';
import { StatsContainer } from '@/containers/rewards-stats';

export async function getServerSideProps(context: any) {
  return {
    props: {
      serverSideData: {
        rewards: {},
      },
    },
  };
}

function StatsPage({ serverSideData }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <StatsContainer serverSideData={serverSideData} />;
}

export default StatsPage;
