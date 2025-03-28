import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import debounce from 'lodash/debounce';
import { SvgSearch } from '@game-trade/icons';
import { ControlledField, Input } from '@game-trade/ui';

import { SearchFieldStyled } from './style';

type Form = Partial<{
  searchUserName: string;
}>;

export const SearchUsers = () => {
  const [isOpenSearchOverlay, setOpenSearchOverlay] = useState(false);
  isOpenSearchOverlay;
  const { handleSubmit, control } = useForm<Form>();

  const handleFormSubmit = async (variables: Form) => {
    if (variables?.searchUserName && variables?.searchUserName?.length > 5) {
      setOpenSearchOverlay(true);
    }
  };

  const handleOnChange = debounce((evt, value) => {
    handleFormSubmit({ searchUserName: value });
  }, 300);

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <SearchFieldStyled>
          <ControlledField
            name={'searchUserName'}
            control={control}
            rules={{
              required: 'This field is required',
            }}>
            <Input
              placeholder="Search friends"
              onChange={handleOnChange}
              dimension={'free'}
              postIcon={<SvgSearch size={16} />}
            />
          </ControlledField>
        </SearchFieldStyled>
      </form>
    </>
  );
};
