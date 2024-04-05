# TAFTHANAN: WEB FORUM

## Description
This repository contains the source code for Tafthanan, a centralized platform where condo owners can list their available spaces for rent, and existing tenants can easily browse and connect with them.. It is built using Svelte and SvelteKit for frontend and backend development, MongoDB Atlas for database management, and hosted on Vercel.

## Building

Required Dependencies: Node.js, npm

1. Download the "main" branch.
2. Extract the zip file to a directory of your choosing.
3. On your terminal of choice, run the following commands:

```bash
npm install
npm run dev
# or start the server and open the app in a new browser tab
npm run dev -- --open
```
4. The website will run on localhost:5173.
   
<br />
## Development

### MongoDB+ Atlas
1. Sign up for an account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new cluster and follow the setup instructions.
3. Once your cluster is set up, you can connect to it from your Svelte application using the MongoDB driver for Svelte.

<br />

### Vercel
a cloud platform for static sites and serverless functions

#### Deploying the Application
1. Sign up for an account on [Vercel](https://vercel.com/).
2. Install Vercel CLI globally using npm:
   ```bash
   npm install -g vercel
   ```

3. Login to your Vercel account using the CLI:
   ```bash
   vercel login
   ```

4. Navigate to your SvelteKit project directory and run:
   ```bash
   vercel
   ```

5. Follow the prompts to deploy your application.
