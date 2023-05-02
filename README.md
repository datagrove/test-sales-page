A simple site for selling a digital product using Astro.build, Stripe, SolidJS, Supabase, and Cloudflare. 

Live site: https://cat.datagrove.com

Contents
========

 * [Why?](#why)
 * [Installation](#installation)
 * [Usage](#usage)


## Why?

We wanted to use some of the newest open source tools to build a free to start internet sales channel.

Most of the solutions we found involved added cost solution providers, so we built this.

## Installation

Clone the respository

Run `npm install`

To run locally run `npm run dev`

## Usage

### Stripe Account Setup

Create a stripe account at https://dashboard.stripe.com/register

When asked for your business profile choose "Skip for now", this will create an account where only test mode is active.

On the Home page you can access your publishable and secret keys. You api keys are also available on the developers page. 

BE SURE NOT TO COMMIT YOUR SECRET KEY TO GIT. You can add .env* to your .gitignore file locally to prevent your keys from being committed

To run the site locally add a .env file to your project using the format in sample_env.md. 

    Use your stripe keys to replace the XXX values in 
    PUBLIC_STRIPE_API (Use your publishable key) and 
    PRIVATE_STRIPE_API (Use your secret key)

Create a product on the products dashboard.

Get the Price API ID and use that in the in checkout.ts so that your checkout session has the correct item/price.

To run test payments that result in a "success" use the following test info (more information available in Stripe documentation)

    Card number: 4242 4242 4242 4242
    Expiration: 12/34
    CVV: 999

### Supabase Setup

Sign up for a Supabase Account at https://app.supabase.com/sign-up

On the dashboard create a new project.

Get the project anon public API key and project URL from the setup page or from the API menu (Settings>API). 

To run the site locally add the anon public key to your .env file created in the Stripe Setup Step
    
    Use your Supabase values to replace the XXX value in
    anon_key (Use the anon public key)
    API_URL (Use your Supabase Project URL)

Create tables for your project, you can adjust these as needed for the information you need in your tables. Adjust the subabaseSubmit.ts to send information to your specific tables and fields.

### Cloudflare Hosting

Create a cloudflare pages project linked to your git repository for your project.

   If you don't have a cloudflare account see this video: https://www.youtube.com/watch?v=MTc2CTYoszY

If deploying from git:
    
    Build Command: npm run build
    Build Directory: /dist

## Credits
This project uses the following open source packages:
- [Astro](astro.build)
- [SolidJS](www.solidjs.com)
- [Tailwind CSS](tailwindcss.com)
- [Supabase](supabase.com)
- [Node.js](nodejs.org)
