import React from 'react';
import { NextPage } from 'next';
// InferGetServerSidePropsType
import { PeopleContainer } from '@/containers/people';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '@game-trade/config/next/i18next';
// import { api } from '@game-trade/lib';
// import { PeopleDocument, PeopleQuery, PeopleQueryVariables } from '@game-trade/lib/codegen-types';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// import nextI18NextConfig from '@game-trade/config/next/i18next';

export async function getStaticProps(context: any) {
  return {
    props: {
      ...(await serverSideTranslations(
        context.locale ?? context.defaultLocale,
        ['peoplePage'],
        nextI18NextConfig
      )),
    },
  };
}

const PeoplePage: NextPage = () => <PeopleContainer />;

export default PeoplePage;

// export async function getServerSideProps(ctx: any) {
//   const { data: dataPeopleList } = await api.query<PeopleQuery, PeopleQueryVariables>({
//     query: PeopleDocument,
//     fetchPolicy: 'no-cache',
//   });
//
//   return {
//     props: {
//       ...(await serverSideTranslations(ctx?.locale, ['common'], nextI18NextConfig)),
//       serverSideData: {
//         peopleList: dataPeopleList,
//       },
//     },
//   };
// }
//
// function PeoplePage({ serverSideData }: InferGetServerSidePropsType<typeof getServerSideProps>) {
//   return <PeopleContainer serverSideData={serverSideData} />;
// }
//
// export default PeoplePage;
