# Add Chuck Norris quotes to your Azure Pipelines build report #
This Azure Pipelines build extension will show a new section in your build report with an encouraging Chuck Norris quote.

![](docs/chuck-build-report.png)

See [Overview](docs/overview.md) for details on how the extension works and is intended to be used.

# Building the extension #

[![Build Status](https://solidify.visualstudio.com/OSS/_apis/build/status/DevOps.Extensions.ChuckNorris)](https://solidify.visualstudio.com/OSS/_build/latest?definitionId=44)

The extension is built and deployed to the Azure DevOps Marketpace using Azure Pipelines in a public Azure DevOps project, if you want to contibute to the public extension see [Contributions are welcome](#contributions-are-welcome).

## Pre-requisites ##
The extension has the following pre-requisites:

1. [Node.js](https://nodejs.org)

## Building the extension ##
The extension uses a `package.json` to define the build process. You should modify `vss-extension.json` and replace the publisher with the one you intend to use.

1. Download dependencies `npm install`.
2. Build the extension `npm run build`. 
3. Upload the generated .vsix file to your Azure DevOps account.

See [https://www.visualstudio.com/en-us/docs/integrate/extensions/get-started/node](https://www.visualstudio.com/en-us/docs/integrate/extensions/get-started/node) for details on how to create and publish an extension.

# Contributions #

## Team ##

We thank the following contributor(s): **Mathias Olausson**.

## Credits ##

[The Ultimate Top 25 Chuck Norris “The Programmer” Jokes](http://codesqueeze.com/the-ultimate-top-25-chuck-norris-the-programmer-jokes/)

## Contributions are welcome ##

Here is how you can contribute to this project:  

- Submit bugs and help us verify fixes  
- Submit pull requests for bug fixes and features and discuss existing proposals   

Please refer to [Contribution guidelines](docs/CONTRIBUTING.md) and the [Code of Conduct](docs/CODE_OF_CONDUCT.md) for more details.
