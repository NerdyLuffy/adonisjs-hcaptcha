/*
 * adonisjs-hcaptcha
 *
 * (c) Yash K <yash@tuta.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

declare module '@ioc:Hcaptcha' {
  export interface HcaptchaConfig {
    secretKey: string
    siteKey: string
  }

  export interface HcaptchaResponse {
    /**
     * True when the token is valid meet security criteria specified in the siteKey
     */
    readonly success: boolean

    /**
     * timestamp of the challenge (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
     */
    readonly challengeTimestamp?: string

    /** the hostname of the site where the challenge was solved */
    readonly hostname?: string

    /** optional: whether the response will be credited*/
    readonly credit?: boolean

    /**
     * optional: any error codes
     * additional information at https://docs.hcaptcha.com/#siteverify-error-codes-table
     */
    readonly errorCodes?: HcaptchaError[]

    /** ENTERPRISE feature: a score denoting malicious activity */
    readonly score?: number

    /** ENTERPRISE feature: reason(s) for score*/
    readonly scoreReason?: string[]
  }

  export type HcaptchaError =
    | 'missing-input-secret'
    | 'invalid-input-secret'
    | 'missing-input-response'
    | 'invalid-input-response'
    | 'invalid-sitekey'
    | 'invalid-remoteip'
    | 'bad-request'
    | 'invalid-or-already-seen-response'
    | 'not-using-dummy-passcode'
    | 'not-using-dummy-secret'
    | 'sitekey-secret-mismatch'

  export function verifyToken(token: string, remoteIp?: string): Promise<HcaptchaResponse>
}
