# [GameTradeMarket PROD](https://gametrade.market) / [GameTradeMarket QA](https://qa.gametrade.market)

## Project Preparation
#### To run the project for work and testing (`yarn dev`) on your computer:
For the correct operation of the `./cli.sh` file, the `env-cmd` package is used to create local variables from `.env` files.

You will likely need to install this package (`env-cmd`) globally on your device

1) Place the following files in the `packages/config` directory:
* `.env.dev` - variables for working with and testing the QA environment (backend API and database)
* `.env.prod` - variables for working with and testing the PROD environment (backend API and database)
* `.env.local` - variables for working with and testing the LOCAL environment (backend and database running on your computer)

(required variables are listed at the bottom of this section, values for variables are stored in aws secret manager)

2) From the `root (GameTradeMarket-frontend-mono/)` directory, run the commands:
* `./cli.sh downloadLocales` - to download language files. Downloaded files are stored at `packages/app/public/locales`
* `yarn` - install all dependencies

3) Now you can run the project with `yarn dev`

#### List of variables for `.env.*` files (_all of them are required!_)
Files should be stored in the `packages/config` directory

The `NEXT_PUBLIC_` prefix - by default, environment variables are only available in the Node.js environment, meaning they won't be displayed in the browser. Adding this prefix makes the variable accessible to the browser
```sh
# global variables
NEXT_PUBLIC_DEVELOPMENT_MODE=number
NEXT_PUBLIC_PATHNAME_PREFIX=string | null
SKIP_PREFLIGHT_CHECK=boolean
NODE_TLS_REJECT_UNAUTHORIZED=number

# For QA/PROD backend
NEXT_PUBLIC_GQ_URL=string_url_backend
NEXT_PUBLIC_WS_URL=string_url_backend
NEXT_PUBLIC_AWS_API_GATEWAY=string_url_labmda
NEXT_PUBLIC_GQ_SCHEMA_URL=string_url_backend

# For LOCAL backend
NEXT_PUBLIC_GQ_URL_LOCAL=http://localhost:8080/api/graphql
NEXT_PUBLIC_WS_URL_LOCAL=http://localhost:8080
NEXT_PUBLIC_GQ_SCHEMA_URL_LOCAL=http://localhost:8080/api/schema.graphql

```

### `./cli.sh` - file for launching development mode / building the project / building icons / generating `graphQL` / running linters / downloading translations
The main commands and description of the build sequence are in the `./cli.sh` file

* `./cli.sh build_production_app` - build the project in production mode
* `./cli.sh downloadLocales` - download locales
* `./cli.sh generate_graphql` - download schema and create types
* `./cli.sh lint` - run linters
* `./cli.sh npm_up_version` - increase package version

Additionally:
* `./cli.sh npm_install` - install dependencies

(each command can be run from the terminal and it will execute)

Old command for running the project and creating global variables through `package.json`: `"build:admin": "branch=$(git rev-parse --symbolic-full-name --abbrev-ref HEAD); if [[ $branch == \"release\" ]]; then env-cmd -f .env.prod npm run build --workspace=@game-trade/admin; else env-cmd -f .env.dev npm run build --workspace=@game-trade/admin; fi;"`.

### Local-mode. Working with local backend
To work in this mode, you need to create a file in the `packages/config` directory called `.env.local` and run the command:
1) `dev:local:app` - for working with the local environment (backend and database) of the main marketplace application
2) `dev:local:admin` - for working with the local environment (backend and database) of the marketplace admin panel

### Dev-mode. Working with API environments
1) To work with the QA environment, select the `develop` branch or any other branch that is **not** `release` and run the command `yarn dev` or `yarn dev:admin` respectively
2) To work with the PROD environment, select the `release` branch and run the command `yarn dev` or `yarn dev:admin` respectively

Open [localhost:3000](http://localhost:3000/) with your browser to see the result.

## Production. Building the project before making a `merge request`
You can run the build command from the terminal: `./cli.sh build_production_app`.

Or check the commands described in the `package.json` file, in the `scripts` section

### Build-mode. Working with environments to check the build
1) To work with the QA environment, select the `develop` branch or any other branch that is **not** `release` and run the command `yarn build` or `yarn build:admin` respectively
2) To work with the PROD environment, select the `release` branch and run the command `yarn build` or `yarn build:admin` respectively
3) To work with LOCAL, you can be on any branch and run the command `yarn build:local:app` or `yarn build:local:admin` respectively

### CI / CD
CI build runs on github. Configuration file: `.github/workflows/webpack.yml`

PRODUCTION build runs on amazon. Configuration file: `amplify.yml`

## Localization

1) Localization works with the libraries `next-i18next, react-i18next, i18n`. Each library is used depending on the folder of the monorepo project.
* `next-i18next` - used in the marketplace (`packages/app`). Library documentation: [next-i18next](https://github.com/isaachinman/next-i18next)
* `react-i18next, i18n` - used in components (`packages/app/*only-component*`, `packages/component`, `packages/lib`, `packages/config`, `packages/icons`)


2)X Translations are pulled from the repository `https://github.com/oqtacore-group/GameTradeMarket-i18n-public` using the required global variable `GITHUB_LANGUAGES_PERSONAL_ACCESS_TOKEN_CLASSIC`
3)X You need to add the `GITHUB_LANGUAGES_PERSONAL_ACCESS_TOKEN_CLASSIC` variable to the `.env.*` files with the value obtained from the [github interface](https://github.com/settings/tokens)


4) The project (monorepo) has two `config` files:
* The main `config` used for the (`packages/app`) marketplace application on `next-js` is located in the directory `packages/config/next/i18next.js`
  * File connections are described in the examples below
* For components (`packages/components`), the `config` is located in the directory `packages/lib/src/i18n/index.js`;
  * File connections happen in the file `packages/lib/src/i18n/index.js`, in the line `ns: ['modifiers', 'elements', 'common', 'buttons', 'otherNameFile'],`

### There are three cases of working with localization:
1) If it's a page with containers (`packages/app`)
* `import { useTranslation } from 'next-i18next';`


2) If it's a reusable component (any component, for example: `price`, `header`, `preview-card`)
* In components from folders `packages/app/*only-component*`, `packages/lib`, `packages/config`, `packages/icons` - `import { useTranslation } from '@game-trade/lib/src/i18n/index.js';`
* In components from the folder `packages/component` - `import { useTranslation } from 'react-i18next';`


4) If it's a reusable function (for example: `getData, getPrice`)
* `import { i18next } from '@game-trade/lib/src/i18n/index.js';`

### Connecting a page to localization
An example can be seen on the page `packages/app/src/pages/developers.tsx`
During server rendering, pages are created in different languages, and you need to import the `config` from `next-i18next`

**Simplified example of connecting an SSR page:**
```sh
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '@game-trade/config/next/i18next.js';

export async function getServerSideProps(ctx: any) {
  const { data } = await api.query<LoopbackQuery, LoopbackQueryVariables>({
    query: LoopbackDocument,
    fetchPolicy: 'no-cache',
  });

  return {
    props: {
      ...(await serverSideTranslations(
        context.locale ?? context.defaultLocale,
#       Connecting files for the page
        ['nameFile', ...'otherNameFiles'],
#       Connecting files for the page
        nextI18NextConfig
      )),
      serverSideData: data,
    },
  };
}
```

On the page itself:
```sh
import { useTranslation } from 'next-i18next';

export const DevelopersContainer = () => {
# nameFile - connection file for the page
  const { t } = useTranslation('nameFile', { keyPrefix: 'translation' });

  return(
    <p>{t('title')}</p>
  )
}
```

### Connecting a component to localization in the `packages/component` directory

```sh
import { useTranslation } from 'react-i18next';

export function PriceComponent() {
  const { t } = useTranslation('nameFile', { keyPrefix: 'translation' });
  return (
    <p>t('price')</p>
  )
}
```

### Connecting a component to localization in directories `packages/app/*only-component*`, `packages/lib`, `packages/config`, `packages/icons`

```sh
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useTranslation } from '@game-trade/lib/src/i18n/index.js';

export function Login() {
  const { t } = useTranslation('nameFile', { keyPrefix: 'translation' });
  return (
    <p>t('title')</p>
  )
}
```

### Connecting a function to localization
```sh
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { i18next } from '@game-trade/lib/src/i18n/index.js';

export function getSnackBarMessage(): string {
 return(i18next.t('translation.title', { ns: 'nameFile' })})
}
```

## Page meta tags
* Meta tags in the page head are necessary for SEO
* Data should be localized
* Add `link` with `hreflang`

An example can be seen on the page `src/pages/developers.tsx` and `src/core-layout/hrad/marketplace-old.tsx`

During server rendering, we need data for meta tags.

We introduce a convention - data is placed in the `metaTags` object
```
const metaTags: IMetaTags = {
    title: 'account.custom_url',
    ogTitle: 'account.display_name',
    ogDescription: 'account.links.add',
    ogImage:
      'https://media.istockphoto.com/photos/background-of-galaxy-and-stars-picture-id1035676256?b=1&k=20&m=1035676256&s=170667a&w=0&h=NOtiiFfDhhUhZgQ4wZmHPXxHvt3RFVD-lTmnWCeyIG4=',
    ogUrl: `https://qa.gametrade.market`,
    description: 'account.save',
    host: ctx.req.headers.host || '',
  };
```

The `IMetaTags` interface is described in `src/core-layout/interfaces`


***
## Icons

A page to view all project icons will soon be available in storybook

Icons are placed in the folder `./src/shared/icons/svg/{ icon group }/{ the icon itself in SVG format }`

#### Importing Icons
You can import any icon like this:

```
import { SvgArrow } from '@/shared/icons'
```

#### Building icons
In the project root, run the command
```
npm run icons
```

You can also simply start the project in dev mode with `npm run dev`, icons will be compiled before nextjs starts

## Running the project on Windows
If dependencies are not installed, install them
```
npm install -g concurrently
```
Install packages to set global variables
```
npm i cross-env -g
```
```
npm i env-cmd -g
```
Start the project
```
yarn
```
Then
```
yarn dev
```
Unresolved error when running the project in dev mode. Go to
```
src/shared/icons/index.ts
```
And comment out the line
```
export { default as SvgIndex } from './build/index'
```

***
## Markdown
About understanding how [Markdown](https://hackmd.io/@RintarouTW/%E6%84%9A%E5%8D%83%E6%85%AE%E3%81%AE%E7%AD%86%E8%A8%98%E6%9C%AC/%2F%40RintarouTW%2Funified_remark_and_rehype) works

Workflow: ```unified -> remark parse -> remark to rehype -> rehype transform -> process result```

Libraries:
* [remark gfm](https://github.com/remarkjs/remark-gfm)
* [mdx](https://github.com/mdx-js/mdx)
* [rehype react](https://github.com/rehypejs/rehype-react)
* [rehype](https://github.com/rehypejs/rehype/blob/main/doc/plugins.md#list-of-plugins)
* [remark](https://github.com/remarkjs/remark/blob/main/doc/plugins.md#list-of-plugins)
* [example remark use](https://snyk.io/advisor/npm-package/remark/functions/remark.parse)

# License

This project is licensed under the [Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/).

This means you are free to:
- Share — copy and redistribute the material in any medium or format
- Adapt — remix, transform, and build upon the material

Under the following terms:
- Attribution — You must give appropriate credit, provide a link to the license, and indicate if changes were made.
- NonCommercial — You may not use the material for commercial purposes.


[//]: # (## Requirements)

[//]: # ()
[//]: # (- [Node.js]&#40;https://nodejs.org&#41; >= 16, npm >= 7)

[//]: # (- Editor with support [TypeScript]&#40;https://code.visualstudio.com/docs/utils/typescript&#41;, [ESLint]&#40;https://eslint.org/docs/user-guide/integrations&#41;, [Prettier]&#40;https://prettier.io/docs/en/editors.html&#41;, [EditorConfig]&#40;https://editorconfig.org&#41;.)

[//]: # ()
[//]: # (### Stack)

[//]: # ()
[//]: # (This is a [Next.js]&#40;https://nextjs.org/&#41;)

[//]: # (## Stage)

[//]: # ()
[//]: # (Dev-branch will be automatically deployed to [qa.gametrade.market]&#40;https://qa.gametrade.market&#41;.)

[//]: # (## Project Structure)

[//]: # (```)

[//]: # (   /public - nextjs folder, fonts, localization, images)

[//]: # (   /src/)

[//]: # (        /containers - view &#40;controller&#41; of the page)

[//]: # (        /core-layout - main application layout &#40;head/footer&#41;)

[//]: # (        /pages - nextjs router, methods for server rendering)

[//]: # (        /shared - application components, providers, api)

[//]: # (        /styles - scss styles &#40;transitioning to styled-components&#41;)

[//]: # (        /test - lighthouse)

[//]: # (```)

[//]: # ()
[//]: # (| `client`          | `server` | `lint`   |)

[//]: # (|:------------------|----------| --------:|)

[//]: # (| React             | nextJS   | eslint   |)

[//]: # (| Mobx              | graphql  | prettier |)

[//]: # (| Typescript        |          |          |)

[//]: # (| Styled-components |          |          |)

[//]: # (For correct operation, a file in the project root `next-i18next.config.js` is required)

[//]: # (```)

[//]: # (module.exports = {)

[//]: # (    i18n: {)

[//]: # (        locales: ['en'],)

[//]: # (        defaultLocale: 'en',)

[//]: # (        localeDetection: true,)

[//]: # (    },)

[//]: # (})

[//]: # (```)

[//]: # ()
[//]: # (Import it in `next.config.js122`)

[//]: # ()
[//]: # (In `_app.tsx` a config is also needed)

[//]: # (```)

[//]: # (import { appWithTranslation } from 'next-i18next' dsds;)

[//]: # (import nextI18NextConfig from '@game-trade/config/next/i18next.js';)

[//]: # ()
[//]: # (export default appWithTranslation&#40;App, nextI18NextConfig&#41;;)


