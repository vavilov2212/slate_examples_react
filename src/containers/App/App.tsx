import React from 'react';

const App = () => {
  return(
    <>
      <p>Examples</p>
    <ul>
      <li>
        <a href="/withLinks">Slate with `Link` button</a>
      </li>
      <li>
        <a href="/withMarkdownSerialize">Slate with `Link` button and serialize to markdown</a>
      </li>
      <li>
        <a href="/withAllFormattingOptions">Slate with all formatting buttons and serialize to markdown</a>
      </li>
    </ul>
    </>
  );
}

export default App;
