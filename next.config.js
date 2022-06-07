module.exports = () => {
  function webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        /* test: /\.(js|ts)x?$/, */
        // for webpack 5 use
        and: [/\.(js|ts)x?$/]
      },

      use: [
        {
          loader: '@svgr/webpack',
        }, 
        /*
         * This actually works, but emits error
         * `SvgoParserError no white space before first tag` TODO: try to make it work
         */
        /* { */
        /*   loader: 'svg-sprite-loader', */
        /*   options: { */
        /*     name: '[name].[hash]', */
        /*     prefixize: true, */
        /*   } */
        /* }, */
        /* { */
        /*   loader: 'svgo-loader', */
        /*   options: { */
        /*     removeTitle: true, */
        /*     convertPathData: false, */
        /*     removeUselessStrokeAndFill: true, */
        /*   } */
        /* }, */
      ],
    });
    return config
  }
  return {
    webpack
  }
}
