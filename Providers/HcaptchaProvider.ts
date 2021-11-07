/*
 * adonisjs-hcaptcha
 *
 * (c) Yash K <yash@tuta.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { HcaptchaConfig } from '@ioc:Hcaptcha'
import HcaptchaValidator from '../src/Hcaptcha'

export default class MongoProvider {
  public static needsApplication = true

  constructor(protected application: ApplicationContract) {
    this.application.container.singleton('Hcaptcha', () => {
      const config: HcaptchaConfig = this.application.container
        .use('Adonis/Core/Config')
        .get('hcaptcha', {})

      return new HcaptchaValidator(config)
    })
  }

  public register() {}

  public async boot() {}

  public async ready() {}

  public async shutdown() {}
}
