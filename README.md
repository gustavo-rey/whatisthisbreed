# WhatIsThisBreed

WhatIsThisBreed is a client-side web application that helps users identify dog breeds from an image.

The app lets the user:

- open the device camera,
- capture a dog photo or upload an image,
- run inference directly in the browser,
- and view the most likely breed predictions.

The interface is designed as a simple mobile-first flow with multiple languages and a lightweight static deployment model.

## What the project does

This project uses **TensorFlow.js** in the browser to load a converted deep learning model and classify dog breeds from an input image.

At a high level, the flow is:

1. The user opens the app.
2. The user captures or uploads an image.
3. The image is resized and converted into a tensor.
4. The TensorFlow.js model runs inference in the browser.
5. The app sorts the predictions and displays the top results.

Because inference runs on the client side, the app can be deployed as a **static website** without requiring a backend server for prediction.

## Model information

The application uses:

- **TensorFlow.js** for browser-based inference
- a converted model derived from **NASNetMobile**
- model artifacts served from `public/models/`

The runtime loads:

- `public/models/model.json`
- the associated binary shard files in the same folder

These files are fetched by the browser at runtime when the user starts a prediction.

## Main technologies

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **TensorFlow.js**
- **Lucide React**

## Project structure

Important folders:

- `app/` — application shell and global layout
- `components/` — app screens and reusable UI components
- `assets/` — local image assets such as the logo
- `lib/` — breed metadata, i18n, and utilities
- `public/models/` — TensorFlow.js model files used in the browser

## Development

Install dependencies:

```powershell
pnpm install
```

Start the local development server:

```powershell
pnpm dev
```

Then open:

```text
http://localhost:3000
```

## Static build for hosting

This project is configured to generate a **fully static export**.

When you build the app, Next.js generates final static files such as:

- `HTML`
- `CSS`
- `JavaScript`
- copied public assets
- model files under `models/`

The generated output is written to the `out/` folder.

### Step-by-step: generate the final static files

#### 1. Install dependencies

```powershell
pnpm install
```

#### 2. Build the project

```powershell
pnpm build
```

#### 3. Locate the final static output

After the build finishes, Next.js creates:

```text
out/
```

That folder contains the final files ready for static hosting.

Typical contents include:

```text
out/index.html
out/_next/...
out/models/model.json
out/models/group1-shard*.bin
```

#### 4. Upload the contents of `out/`

Deploy the generated files to any static hosting provider, such as:

- GitHub Pages
- Netlify
- Vercel static hosting
- Cloudflare Pages
- Amazon S3 + CloudFront
- Firebase Hosting
- any web server that serves static files

You should upload the **contents of `out/`** or configure your hosting platform to publish that folder.

## Important deployment notes

### 1. Model files must remain accessible

The app loads the model from:

```text
/models/model.json
```

Make sure your hosting setup publishes the `models/` folder exactly as part of the final static output.

### 2. Browser camera support depends on HTTPS

Camera access usually requires a secure context in production.

For best results, deploy the app using:

- `https://`
- or `localhost` during development

### 3. Hosting in a subfolder

If you deploy the app under a subpath such as:

```text
https://example.com/whatisthisbreed/
```

you may need to configure `basePath` and `assetPrefix` in `next.config.mjs` before building.

## Production checklist

Before publishing, verify that:

- the app opens correctly from the generated `out/` build,
- the favicon and logo assets load,
- `models/model.json` is reachable,
- all model shard files are reachable,
- camera capture works on supported devices,
- image upload works,
- predictions render successfully.

## Summary

WhatIsThisBreed is a static-friendly dog breed identification app powered by **TensorFlow.js** and a **NASNetMobile-based model**.

Its main advantage is that inference runs directly in the browser, making it easy to deploy as plain static files for hosting environments that only serve `HTML`, `CSS`, and `JavaScript`.
