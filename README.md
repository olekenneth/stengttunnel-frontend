This is a [Next.js](https://nextjs.org/) version of the https://stengttunnel.no/ site.

## Getting Started

You need to make sure that you got Node 16 with NPM 8 or higher installed, and that you got all the dependencies installed:

```bash
npm install
```

You can then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy

To not need to have a server running, the project utilizes the Next.JS export feature to get a static site.

```bash
npm run build
npm run export
```

The final deployable page src should now be available in the `./out` folder.
