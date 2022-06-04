import React, {useState} from 'react';
import SlateWithLinks from 'containers/SlateWithLinks/SlateWithLinks';
import SlateWithMarkdownSerialize from 'containers/SlateWithMarkdownSerialize/SlateWithMarkdownSerialize';

const App = () => {
  return(
    <>
      <SlateWithLinks />
      <SlateWithMarkdownSerialize />
    </>
  );
}

export default App;
