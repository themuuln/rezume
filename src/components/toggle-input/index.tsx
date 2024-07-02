import type { EditModes } from '@/app/build/types';
import React, { useEffect, type ChangeEvent } from 'react';
import Input from '../ui/input-custom';
import { camelCaseToSpaced, isEmpty } from '@/lib/utils';

type ToggleInputProps = {
  isEdit: boolean;
  label: string;
  value: string;
  handleValueChange: ({ e, label }: { e: ChangeEvent<HTMLInputElement>; label: string }) => void;
  handleEditClick: (mode: EditModes) => void;
  inputRefs: {
    [mode: string]: React.RefObject<HTMLInputElement>;
  };
  mode: EditModes;
  variant: string;
};

const ToggleInput = ({ isEdit, label, value, handleValueChange, handleEditClick, inputRefs, mode, variant }: ToggleInputProps) => {
  let textStyle = ``;

  (() => {
    switch (variant) {
      case 'h1':
        textStyle = 'uppercase text-2xl font-semibold';
        return 'uppercase text-2xl font-semibold';
      case 'h2':
        textStyle = 'uppercase text-2xl font-semibold text-gray-400';
        return 'uppercase text-2xl font-semibold text-gray-400';
      case 'title':
        textStyle = 'text-4xl';
        return 'text-4xl';
      case 'p':
        textStyle = 'text-2xl';
        return 'text-2xl';
      default:
        textStyle = 'text-2xl';
        return 'text-2xl';
    }
  })();

  return (
    <>
      <div className='flex flex-row space-x-4'>
        {isEdit ? (
          <>
            <Input ref={inputRefs[mode]} name={label} className={textStyle} value={value} onChange={(e) => handleValueChange({ e, label })} />
          </>
        ) : (
          <p className={textStyle}>{isEmpty(value) ? camelCaseToSpaced(label) : value}</p>
        )}
        {!isEdit ? (
          <button className='font-semibold text-gray-500 uppercase' onClick={() => handleEditClick(mode)}>
            Edit
          </button>
        ) : null}
      </div>
    </>
  );
};

export default ToggleInput;
