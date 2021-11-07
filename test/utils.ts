import { HcaptchaError, HcaptchaResponse } from '@ioc:Hcaptcha'
import nock from 'nock'
import { Chance } from 'chance'

const host = 'https://hcaptcha.com'
const path = '/siteverify'

type ResponseCode = 200 | 400 | 500

export const chance = new Chance()

export const successResponse: HcaptchaResponse = {
  success: chance.bool(),
  challengeTimestamp: '2021-11-06T07:32:21.000000Z',
  hostname: chance.domain(),
  credit: undefined,
  errorCodes: undefined,
  score: undefined,
  scoreReason: undefined,
}

export const errorResponse = (errorCode: HcaptchaError[]): HcaptchaResponse => {
  return {
    success: chance.bool(),
    challengeTimestamp: '2021-11-06T07:32:21.000000Z',
    hostname: chance.domain(),
    credit: undefined,
    errorCodes: errorCode,
    score: undefined,
    scoreReason: undefined,
  }
}

export const hcaptchaNock = (
  secretKey: string,
  siteKey: string,
  token: string,
  responseCode: ResponseCode,
  response: HcaptchaResponse
) =>
  nock(host)
    .matchHeader('Content-Type', 'application/x-www-form-urlencoded')
    .post(path, `secret=${secretKey}&response=${token}&sitekey=${siteKey}`)
    .reply(responseCode, {
      'success': response.success,
      'challenge_ts': response.challengeTimestamp,
      'hostname': response.hostname,
      'credit': response.credit,
      'error-codes': response.errorCodes,
      'score': response.score,
      'score_reason': response.scoreReason,
    })
