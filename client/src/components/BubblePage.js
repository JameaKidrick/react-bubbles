import React, { useState, useEffect } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth'

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);

  const colors = () => {
    axiosWithAuth()
      .get('/api/colors')
      .then(response => {
        // console.log(response.data)
        setColorList(response.data)
      })
      .catch(error => console.log(error))
  }

    useEffect(() => {
      colors();
    }, [])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} fetchColor={colors} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
