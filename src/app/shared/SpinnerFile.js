import React, {useState} from 'react';

import DotLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/core";

import './SpinnerFile.css'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function SpinnerFile({ isLoading }){

    let [color, setColor] = useState("#014F97");

    return (
      <div className='spinner-container'>
         <DotLoader color={color} loading={isLoading} css={override} size={150} />
      </div>
    )

}

