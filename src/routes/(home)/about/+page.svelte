<h2>By</h2>
<h1>Batac, Joel Ethan</h1>
<h1>Damuy, Khryssha Claire</h1>
<h1>Rimando, Alonzo Rimando</h1>
<h1>Victoria, Boris</h1>

<br>

<h1>TAFTHANAN: WEB FORUM</h1>

<h2>Description</h2>
<p>
    This repository contains the source code for Tafthanan, a centralized platform where condo owners can list their available spaces for rent, and existing tenants can easily browse and connect with them. It is built using Svelte and SvelteKit for frontend and backend development, MongoDB Atlas for database management, and hosted on Vercel.
</p>

<br>

<h2>Building</h2>
<p>
    Required Dependencies: Node.js, npm
</p>
<ol>
    <li>Download the "main" branch.</li>
    <li>Extract the zip file to a directory of your choosing.</li>
    <li>On your terminal of choice, run the following commands:</li>
</ol>
<pre><code>npm install
npm run dev
# or start the server and open the app in a new browser tab
npm run dev -- --open
</code></pre>
<p>
    The website will run on localhost:5173.
</p>

<br>

<h2>Development</h2>

<h3>MongoDB+ Atlas</h3>
<ol>
    <li>Sign up for an account on <a href="https://www.mongodb.com/cloud/atlas">MongoDB Atlas</a>.</li>
    <li>Create a new cluster and follow the setup instructions.</li>
    <li>Once your cluster is set up, you can connect to it from your Svelte application using the MongoDB driver for Svelte.</li>
</ol>

<br>

<h3>Vercel</h3>
<p>A cloud platform for static sites and serverless functions</p>

<h4>Deploying the Application</h4>
<ol>
    <li>Sign up for an account on <a href="https://vercel.com/">Vercel</a>.</li>
    <li>Install Vercel CLI globally using npm:</li>
</ol>
<pre><code>npm install -g vercel
</code></pre>
<ol start="3">
    <li>Login to your Vercel account using the CLI:</li>
</ol>
<pre><code>vercel login
</code></pre>
<ol start="4">
    <li>Navigate to your SvelteKit project directory and run:</li>
</ol>
<pre><code>vercel
</code></pre>
<ol start="5">
    <li>Follow the prompts to deploy your application.</li>
</ol>