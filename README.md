This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Setting up ION backend

1. Prepare up a server with docker capabilities (DigitalOcean has that out of the box)
2. Clone `https://github.com/sagittaros/ion`
3. Export `CADDY_DOMAIN=yourdomain` and `CADDY_EMAIL=youremail` that correpond to this [this](https://github.com/sagittaros/ion/blob/aee5acb82207d137c8eb87815e34a5f25facdc7c/docker-compose.yml#L97)
4. Run `docker-compose up --build .`
5. Be excited.

## Running the example

### Setup environment variable

Read [NextJS environment variable's guide](https://nextjs.org/docs/basic-features/environment-variables)

Refer to [the example](.env.sample) and add your environment to
`.env.local`, `.env.production`, `.env` accordingly

### Deploy

```bash
yarn global add vercel
vercel
```

## SDK version

[Ion-Sdk-JS](https://github.com/pion/ion-sdk-js) v0.3.7

## Credits

They go to the [Pion](https://github.com/pion) team
