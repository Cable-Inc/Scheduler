# cable-landlord

Use `lerna create xyz` to create a new package

# firebase

Use `npm install -g firebase-tools`

Run `firebase login`

Go to the firebase console, then go to cog (options), users and permissions,
click service accounts, generate a new private key. This will download a json
file. Place this into the `keys` directory in the project root (or anywhere else
outside of the project). Make a `packages/app/.env` and copy everything from
`.env.sample` to it. Change the path there to the path of your new key.

# starting
`npm run dev` to run the development server. This will start storybook and the nextjs local website.

`npm run serve` will run a production build locally. Isn't really a reason to use this right now until firebase emulators are setup.

You need to manually open localhost:3000 to view
# Branches

DO NOT push to main ever.

PREFERABLY do not directly push to development. Branch OFF OF development. Make
pull requests from YOUR FEATURE BRANCH to DEVELOPMENT.

