import React, { useEffect, useState } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { SvgMagnifier } from '@game-trade/icons';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import { useTranslation } from '@game-trade/lib/services/i18n/index.js';

import { substringAsPath } from '@game-trade/app/src/containers/marketplace/utils';

import { ControlledField } from '../../../../../forms/controlled-field';
import { ALIGN, Loader, SIZE } from '../../../../../elements/loader';
import { FilterBlockWrapper } from '../filter-block-wrapper';
import { Checkbox, CheckboxGroup } from '../components/checkbox';

import { GenreListWrapper, GenreListOuter, GenreListInner, EmptyGenreListMessage } from './style';
import { InputText } from './components/input-text';

export interface IGenreItem {
  code: string;
  title: string;
  disable: boolean;
  checked: boolean;
}

export interface IGenreData {
  key?: any;
  title?: any;
  type?: any;
  items?: IGenreItem[] | null;
  [key: string]: any;
}

interface IProps {
  data?: IGenreData | null;
  serverSideData?: any;
  loading: boolean;
}

export const GenresFilterBlock = (props: IProps) => {
  const { t } = useTranslation('gamesPage', { keyPrefix: 'translation' });

  const { data, loading, serverSideData } = props;
  const genreList = data?.items;
  const [search, setSearch] = useState('');

  const router = useRouter();
  const queryGenreCodes = queryString.parse(substringAsPath(router.asPath), {
    arrayFormat: 'bracket-separator' as any,
    arrayFormatSeparator: '|',
  }).genreCodes;

  const { setValue: mainFormSetValue } = useFormContext();
  const { control, setValue, watch } = useForm<any>({
    mode: 'onTouched',
  });

  const [filteredList, setFilteredList] = useState(genreList);
  const genres = watch('genre');

  useEffect(() => {
    setFilteredList(genreList);
  }, [genreList]);

  useEffect(() => {
    if (queryGenreCodes?.length) {
      setValue(
        'genre',
        (queryGenreCodes as string[])?.map((item) => {
          return {
            code: item,
            title: item.charAt(0).toUpperCase() + item.slice(1).toLowerCase(),
            checked: true,
            disable: false,
          };
        })
      );
    }
  }, []);

  useEffect(() => {
    if (router.query['genreCodes[]'] && !genres) {
      mainFormSetValue('genre', {
        key: 'GENRE',
        title: 'Genre',
        items:
          queryGenreCodes?.length &&
          (queryGenreCodes as string[])?.map((item) => {
            return {
              code: item,
              title: item.charAt(0).toUpperCase() + item.slice(1).toLowerCase(),
              checked: true,
              disable: false,
            };
          }),
      });
      return;
    }
    mainFormSetValue(
      'genre',
      genres?.length
        ? {
            ...data,
            items: genres,
          }
        : undefined
    );
  }, [genres]);

  // const list = genreList?.map((item) => {
  //   if (queryGenreCodes?.includes(item.code)) return { ...item, checked: true };
  //   return item;
  // });

  // const list = genreList?.map((item) => {
  //   if (queryGenreCodes?.includes(item.code)) return { ...item, checked: true };
  //   return item;
  // });

  // console.log('genreList', genreList);

  // const serverSideGenre = serverSideData?.gameFilters?.find((filter: any) => {
  //   return filter.key === 'GENRE';
  // });

  // const [filteredList, setFilteredList] = useState<IGenreItem[]>();

  // useEffect(() => {
  //   if (!router.query['genreCodes[]']) {
  //     mainFormSetValue('genre', filteredList);
  //     return;
  //   }
  //   mainFormSetValue('genre', genreList);
  // }, [genreList]);
  //
  // useEffect(() => {
  //   if (router.query['genreCodes[]']) return;
  // }, [mainFormGenre]);

  // useEffect(() => {
  //   if (!mainFormGenre) {
  //     setValue('genre', []);
  //   }
  // }, [mainFormGenre]);

  // useEffect(() => {
  //   if (router.query['genreCodes[]']) {
  //     const list = genreList?.map((item) => {
  //       if (queryGenreCodes?.includes(item.code)) return { ...item, checked: true };
  //       return item;
  //     });
  //     console.log('list', list);
  //     setFilteredList(list);
  //   }
  // }, [data]);

  // useEffect(() => {
  //   if (genreList) {
  //     setFilteredList(
  //       genreList.filter((item: IGenreItem) =>
  //         item.title.toLowerCase().includes(search.toLowerCase())
  //       )
  //     );
  //   }
  // }, [search]);
  //
  // useEffect(() => {
  //   if (genreList) {
  //     setFilteredList(genreList);
  //   }
  // }, [genreList]);

  // useEffect(() => {
  //   if (queryCodeGenres && !mainFormGenre) {
  //     if (queryGenres) {
  //       mainFormSetValue('genre', {
  //         ...data,
  //         items: queryGenres,
  //       });
  //       setValue('genre', queryGenres);
  //     }
  //   }
  // }, [queryCodeGenres, mainFormGenre, queryGenres]);

  // useEffect(() => {
  //   if (!mainFormGenre) {
  //     setValue('genre', []);
  //   }
  // }, [mainFormGenre]);
  //
  // useEffect(() => {
  //   if (genres) {
  //     mainFormSetValue(
  //       'genre',
  //       genres?.length
  //         ? {
  //             ...data,
  //             items: genres,
  //           }
  //         : undefined
  //     );
  //   }
  // }, [genres]);

  return (
    <FilterBlockWrapper title={t('genre')}>
      {(!loading || serverSideData) && (
        <>
          <InputText value={search} onChange={setSearch} placeholder={t('filterGenre') || ''}>
            <SvgMagnifier size={16} />
          </InputText>
          <GenreListWrapper>
            <GenreListOuter>
              <GenreListInner>
                <ControlledField control={control} name="genre">
                  <CheckboxGroup>
                    {filteredList &&
                      filteredList?.map((genreItem: IGenreItem) => {
                        return (
                          <Checkbox
                            key={genreItem.code}
                            grouped={true}
                            value={genreItem}
                            valueKey="code"
                            label={`${genreItem.title}`}
                            disabled={genreItem.disable}
                          />
                        );
                      })}
                  </CheckboxGroup>
                </ControlledField>
              </GenreListInner>
            </GenreListOuter>
            {!genreList?.length && (
              <EmptyGenreListMessage>{t('genresNotFound')}</EmptyGenreListMessage>
            )}
          </GenreListWrapper>
        </>
      )}
      {!serverSideData && loading && <Loader size={SIZE.MICRO} position={ALIGN.CENTER} />}
    </FilterBlockWrapper>
  );
};
