<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of contents

- [adonis5-hcaptcha](#adonis5-hcaptcha)
  - [Installation](#installation)
  - [Usage](#usage)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# adonis5-hcaptcha
> Stop more bots. Start protecting user privacy. hCaptcha for Adonis

[![github-actions-image]][github-actions-url] [![npm-image]][npm-url] [![license-image]][license-url] [![typescript-image]][typescript-url]

A package to keep your AdonisJS applications safe from bots, spam and protect your user privacy

## Installation
Install and configure the package in your Adonis project.

```bash
# npm
npm i adonisJS-hcaptcha
node ace configure adonisJS-hcaptcha

# yarn
yarn add adonisJS-hcaptcha
node ace configure adonisJS-hcaptcha
```


## Usage

### Step 1: Registration

Signup for a account on [hCaptcha website](https://www.hcaptcha.com/signup-interstitial) 
Login and follow the steps to get your <b>secret</b> and <b>site</b> key

### Step 2: Add variables in `.env` file 

```txt
HCAPTCHA_SECRET_KEY=YOUR_SECRET_KEY 
HCAPTCHA_SITE_KEY=YOUR_SITE_KEY
```

### Step 3: Add validation in the `.env.ts` file

```ts
import Env from '@ioc:Adonis/Core/Env'

export default Env.rules({
  // ....
  RECAPTCHA_SITE_KEY: Env.schema.string(),
  RECAPTCHA_SECRET_KEY: Env.schema.string(),
})
```

### Step 4: Add middleware to `start/kernel.ts`

```ts
Server.middleware.registerNamed({
  // ....
  hcaptcha: () => import('App/Middleware/Hcaptcha'),
})
```

### Step 5: Add middleware to your route

```ts
Route.post('login', 'UserController.login').middleware('hcaptcha')
```

The new middleware will check for `h-captcha-response` field in request input

> Field `h-captcha-response` will contain the unique one time non repeating token which will be validated with hCaptcha to make sure its not a bot



[github-actions-image]: https://github.com/adonis5-hcaptcha/actions/workflows/test.yml
[github-actions-url]: https://img.shields.io/github/workflow/status/adonis5-hcaptcha/test?style=for-the-badge "github-actions"

[npm-image]: https://img.shields.io/npm/v/adonis5-hcaptcha.svg?style=for-the-badge&logo=npm
[npm-url]: https://npmjs.org/package/adonis5-hcaptcha "npm"

[license-image]: https://img.shields.io/npm/l/adonis5-hcaptcha?color=blueviolet&style=for-the-badge
[license-url]: LICENSE.md "license"

[typescript-image]: https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript
[typescript-url]:  "typescript"
