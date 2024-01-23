import React from 'react';
import { TailSpin } from 'react-loader-spinner';

function Loader(): React.ReactElement {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '35dvh'
    }}>
      <TailSpin
        visible={true}
        height="100"
        width="100"
        color="#de8f2f"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}

export default Loader;
