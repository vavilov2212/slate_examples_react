import React, {useState} from 'react';
import SlateWithLinks from 'containers/SlateWithLinks/SlateWithLinks';
import SlateWithMarkdownSerialize from 'containers/SlateWithMarkdownSerialize/SlateWithMarkdownSerialize';
import SlateExampleWithAllFormattingOptions from 'containers/SlateExampleWithAllFormattingOptions/SlateExampleWithAllFormattingOptions';

const App = () => {
  return(
    <>
      <SlateWithLinks />
      <SlateWithMarkdownSerialize />
      <SlateExampleWithAllFormattingOptions />
    </>
  );
}

export default App;
