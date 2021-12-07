<div align="center">
  <img src="https://res.cloudinary.com/adonisjs/image/upload/q_100/v1558612869/adonis-readme_zscycu.jpg" width="600px">
</div>

<div align="center">
  <h2>adonisjs-hcaptcha</h2>
  <p>
    A package to keep your AdonisJS applications safe from bots, spam and protect your user privacy
  </p>
</div>

<br/>

<div align="center">

[![github-actions-image]][github-actions-url] [![npm-image]][npm-url] [![license-image]][license-url] ![][typescript-image] [![synk-image]][synk-url]

 </div>

<hr/>

<h2> Installation </h2>
Install and configure the package in your Adonis project.

```bash
# npm
npm i adonisjs-hcaptcha
node ace configure adonisjs-hcaptcha

# yarn
yarn add adonisjs-hcaptcha
node ace configure adonisjs-hcaptcha
```

<hr/>

<h2> Usage </h2>

<h3> Step 1: Registration </h3>

Signup for a account on [hCaptcha website](https://www.hcaptcha.com/signup-interstitial) 
Login and follow the steps to get your <b>secret</b> and <b>site</b> key

<h3> Step 2: Add variables in `.env` file </h3>

```txt
HCAPTCHA_SECRET_KEY=YOUR_SECRET_KEY 
HCAPTCHA_SITE_KEY=YOUR_SITE_KEY
```

<h3> Step 3: Add validation in the `.env.ts` file </h3>

```ts
import Env from '@ioc:Adonis/Core/Env'

export default Env.rules({
  // ....
  HCAPTCHA_SITE_KEY: Env.schema.string(),
  HCAPTCHA_SECRET_KEY: Env.schema.string(),
})
```

<h3> Step 4: Add middleware to `start/kernel.ts` </h3>

```ts
Server.middleware.registerNamed({
  // ....
  hcaptcha: () => import('App/Middleware/Hcaptcha'),
})
```

<h3> Step 5: Add middleware to your route </h3>

```ts
Route.post('login', 'UserController.login').middleware('hcaptcha')
```
The new middleware will check for `h-captcha-response` field in [request input](https://docs.adonisjs.com/guides/request#requestinput)

> `h-captcha-response` field will contain the unique one time non repeating token which will be validated with hCaptcha to make sure its not a bot

<h3> Step 6: Check response in your controller </h3>

```ts
export default class UsersController {
  public async index({ hcaptcha }: HttpContextContract) {
    if (hcaptcha.success) {
      // Do some action
    }
    // Throw error
  }
}

```

[github-actions-image]: https://img.shields.io/github/workflow/status/NerdyLuffy/adonisjs-hcaptcha/test?style=for-the-badge
[github-actions-url]: https://github.com/NerdyLuffy/adonisjs-hcaptcha/actions/workflows/test.yml "github-actions"

[npm-image]: https://img.shields.io/npm/v/adonisjs-hcaptcha.svg?style=for-the-badge&logo=npm
[npm-url]: https://npmjs.org/package/adonisjs-hcaptcha "npm"

[license-image]: https://img.shields.io/npm/l/adonisjs-hcaptcha?color=blueviolet&style=for-the-badge
[license-url]: LICENSE.md "license"

[typescript-image]: https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript
[typescript-url]:  "typescript"

[synk-image]: https://img.shields.io/snyk/vulnerabilities/github/NerdyLuffy/adonisjs-hcaptcha?style=for-the-badge
[synk-url]: https://snyk.io/test/github/NerdyLuffy/adonisjs-hcaptcha?targetFile=package.json "synk"
