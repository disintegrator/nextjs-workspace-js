# Workspace CommonJS bug

This repository is a minimal reproduction of a bug preventing workspace dependencies that are CommonJS from being used into Next.js projects.

The CommonJS package in question is [`./packages/monorepo-sdk`](./packages/monorepo-sdk) which is also published to NPM as [`@disintegrator/httpbin-client`](https://www.npmjs.com/package/@disintegrator/httpbin-client).

The Next.js project is [`apps/web`](./apps/web) which has `monorepo-sdk` linked as a workspace package and also `@disintegrator/httpbin-client` as a regular dependency.

## Steps to reproduce

1. Clone this repository
2. Run `pnpm install`
3. On the main branch, run `pnpm dev` and go to `http://localhost:3000` to see the app working.
4. Stop the development server.
5. Run `git checkout broken`
6. Run `pnpm dev` and go to `http://localhost:3000` and the error thrown:

   ```
   ../../packages/monorepo-sdk/index.js
   Module parse failed: Cannot use 'import.meta' outside a module (60:16)
   |                 // still a Refresh Boundary later.
   |                 // @ts-ignore importMeta is replaced in the loader
   >                 import.meta.webpackHot.accept();
   |                 // This field is set when the previous version of this module was a
   |                 // Refresh Boundary, letting us know we need to check for invalidation or
   ```

On the `main` branch of this repository, the Next.js app uses `@disintegrator/httpbin-client` to generate UUIDs using https://httpbin.org/uuid and everything works as expected.

On the `broken` branch of this repository, the Next.js app uses the workspace package `monorepo-sdk` to generate UUIDs using https://httpbin.org/uuid but it will not render the page and instead throw the error above.

## Random notes

- `./packages/monorepo-sdk` is identical to `@disintegrator/httpbin-client`
- If you remove `"type": "commonjs"` from `monorepo-sdk`'s `package.json`, the app will start working. However, note that it is not treated as a "vendor" package and instead its source is inlined into the page bundle.
