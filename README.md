<p align="center">
  <a href="https://www.gatsbyjs.com">
    <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Microsoft Learn Catalog Source Plugin for Gatsby
</h1>

A simple source plugin for querying Microsoft Learn Catalog API in Gatsby.
See: https://docs.microsoft.com/api/learn/catalog/

## 🚀 Quick start

Include the plugin in a Gatsby site

Inside of the `gatsby-config.js` file of your site , include the plugin in the `plugins` array:

```javascript
module.exports = {
  plugins: [
    // other gatsby plugins
    // ...
    require.resolve(`../my-plugin`),
  ],
}
```
See [adding plugins ](https://www.gatsbyjs.com/docs/using-a-plugin-in-your-site/) for more info. 
You can read about other ways to connect your plugin to your site including using `npm link` or `yarn workspaces` in the [doc on creating local plugins](https://www.gatsbyjs.com/docs/creating-a-local-plugin/#developing-a-local-plugin-that-is-outside-your-project)._

1. Verify the plugin was added correctly

When you run `gatsby develop` or `gatsby build` in the site that implements your plugin, you should see this message:
```shell
Loaded plugin: gatsby-source-microsoft-learn-catalog
```

You can verify your plugin was added to your site correctly by running `gatsby develop` for the site.

You should now see a message logged to the console in the preinit phase of the Gatsby build process.

## 🧐 What's inside?

This was generated using the starter that generated the [files Gatsby looks for in plugins](https://www.gatsbyjs.com/docs/files-gatsby-looks-for-in-a-plugin/).

```text
/gatsby-source-microsoft-learn
├── .gitignore
├── gatsby-browser.js
├── gatsby-node.js
├── gatsby-ssr.js
├── index.js
├── LICENSE
├── package.json
└── README.md
```

- **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.
- **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.com/docs/browser-apis/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.
- **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.com/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.
- **`gatsby-ssr.js`**: This file is where Gatsby expects to find any usage of the [Gatsby server-side rendering APIs](https://www.gatsbyjs.com/docs/ssr-apis/) (if any). These allow customization of default Gatsby settings affecting server-side rendering.
- **`index.js`**: A file that will be loaded by default when the plugin is [required by another application](https://docs.npmjs.com/creating-node-js-modules#create-the-file-that-will-be-loaded-when-your-module-is-required-by-another-application0). You can adjust what file is used by updating the `main` field of the `package.json`.
- **`LICENSE`**: This plugin starter is licensed under the 0BSD license. This means that you can see this file as a placeholder and replace it with your own license.
- **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the plugin's name, author, etc). This manifest is how npm knows which packages to install for your project.
- **`README.md`**: A text file containing useful reference information about your plugin.

## 🎓 How to use / GraphQL 

TBD