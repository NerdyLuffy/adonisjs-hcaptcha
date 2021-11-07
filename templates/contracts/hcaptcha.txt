declare module '@ioc:Adonis/Core/HttpContext' {
  import { HcaptchaResponse } from '@ioc:Hcaptcha'

  interface HttpContextContract {
    hcaptcha: HcaptchaResponse
  }
}
