const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

// Read the content of the headers.js file
const header = fs.readFileSync(path.resolve(__dirname, 'KG_Chat_Empowerment', 'headers.js'), 'utf8');

// Read the content of the main script file (index.js)
const script = fs.readFileSync(path.resolve(__dirname, 'KG_Chat_Empowerment', 'index.js'), 'utf8');

// Combine the contents: prepend header to script
const combinedContent = header + script;

module.exports = {
  entry: './KG_Chat_Empowerment/index.js',  // Entry point is your main script file (index.js)
  output: {
    filename: 'KG_Chat_Empowerment_with_headers.js', // Final output file
    path: path.resolve(__dirname, 'dist'), // Output directory
    library: 'KGChatEmpowerment', // Optional, in case you need to reference the library globally
    libraryTarget: 'var', // If using as a global variable in the browser
    globalObject: 'this', // Ensures compatibility across environments
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Process all JavaScript files
        use: {
          loader: 'raw-loader', // To load the raw content of JS files
        },
        include: path.resolve(__dirname, 'KG_Chat_Empowerment'), // Your script files
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: combinedContent, // Inject the combined header and script content
      raw: true, // Ensure the content is treated as raw text
      entryOnly: true, // Only add this to the entry file (not external files)
    }),
  ],
  mode: 'production', // You can change this to 'development' for debugging
  optimization: {
    minimize: true, // Minify the output for production
  },
  devtool: 'source-map', // Enables source maps for easier debugging
};
