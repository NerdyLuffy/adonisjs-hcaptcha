/*
 * adonisjs-hcaptcha
 *
 * (c) Yash K <yash@tuta.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { HcaptchaConfig, HcaptchaResponse, HcaptchaError } from '@ioc:Hcaptcha'
import * as https from 'https'
import { URLSearchParams } from 'url'

export interface HcaptchaClientResponse {
  readonly 'success': boolean
  readonly 'challenge_ts'?: string
  readonly 'hostname'?: string
  readonly 'credit'?: boolean
  readonly 'error-codes'?: string[]
  readonly 'score'?: number
  readonly 'score_reason'?: string[]
}

export default class HcaptchaValidator {
  /**
   * The URL to hit to verify the token
   */
  protected host = 'hcaptcha.com'
  protected path = '/siteverify'

  constructor(public config: HcaptchaConfig) {
    this.config = config
  }

  public async verifyToken(token: string, remoteIp?: string): Promise<HcaptchaResponse> {
    const {
      success,
      'challenge_ts': challengeTimestamp,
      hostname,
      credit,
      'error-codes': errorCodes,
      score,
      'score_reason': scoreReason,
    } = await this.hcaptchaClient(this.config.secretKey, token, this.config.siteKey, remoteIp)

    return {
      success,
      challengeTimestamp,
      hostname,
      credit,
      errorCodes: errorCodes as HcaptchaError[] | undefined,
      score,
      scoreReason,
    }
  }

  private async hcaptchaClient(
    secretKey: string,
    token: string,
    siteKey: string,
    remoteIp?: string
  ): Promise<HcaptchaClientResponse> {
    const payload = new URLSearchParams()

    payload.append('secret', secretKey)
    payload.append('response', token)
    payload.append('sitekey', siteKey)

    if (remoteIp) {
      payload.append('remoteip', remoteIp)
    }

    const hcaptchaPayload = payload.toString()

    /**
     * Setting up the options and hCaptcha accepts data
     * in the form url encode format
     * additional information at https://docs.hcaptcha.com/#verify-the-user-response-server-side
     */

    const options: https.RequestOptions = {
      host: this.host,
      path: this.path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'content-length': Buffer.byteLength(hcaptchaPayload),
      },
    }

    return new Promise((resolve, reject) => {
      const req = https.request(options, (response) => {
        const buffer: string[] = []
        response.setEncoding('utf-8')
        response
          .on('error', reject)
          .on('data', (data) => {
            buffer.push(data)
          })
          .on('end', () => {
            const data = JSON.parse(buffer.join('')) as HcaptchaClientResponse
            resolve(data)
          })
      })

      req.on('error', (err) => {
        reject(err)
      })

      req.write(hcaptchaPayload)
      req.end()
    })
  }
}
