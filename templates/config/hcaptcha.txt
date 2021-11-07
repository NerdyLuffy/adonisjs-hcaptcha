import Env from '@ioc:Adonis/Core/Env'
import { HcaptchaConfig } from '@ioc:Hcaptcha'

const hcaptchaConfig: HcaptchaConfig = {
    /*
  |--------------------------------------------------------------------------
  | Site Key
  |--------------------------------------------------------------------------
  |
  | Your public API site key
  |
  */
  siteKey: Env.get('HCAPTCHA_SITE_KEY'),

  /*
  |--------------------------------------------------------------------------
  | Secret Key
  |--------------------------------------------------------------------------
  |
  | Your Secret Key 
  | * Do not share your secretKey with anyone
  |
  */
  secretKey: Env.get('HCAPTCHA_SECRET_KEY'),
}
export default hcaptchaConfig
