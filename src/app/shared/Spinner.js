import React from 'react';

import SyncLoader from "react-spinners/SyncLoader";
import ClipLoader from "react-spinners/ClipLoader";

export default function Spinner({ full, inline }){
  if(inline){
    return (
      <div className={ `spinner-wrapper inline` }>
        <ClipLoader
          className="spinner"
          size={20}
          color={"#ff1065"}
          loading={true}
        />
      </div>
    )
  }else{
    return (
      <div className={ `spinner-wrapper ${full ? 'full' : ''}` }>
        <SyncLoader
          className="spinner"
          size={full ? 30 : 15}
          color={"#ff1065"}
          loading={true}
        />
      </div>
    )
  }
}

