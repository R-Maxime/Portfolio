/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import React from 'react';

function InputField({
  label, id, value, onChange, type = 'text'
}: {
  label: string; id: string; value: string; onChange: (value: string) => void; type?: string
}): React.ReactElement {
  return (
    <div className='flex column'>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

export default InputField;
