import test from 'japa'
import nock from 'nock'
import HcaptchaValidator from '../src/Hcaptcha'
import { HcaptchaError } from '@ioc:Hcaptcha'
import { hcaptchaNock, chance, successResponse, errorResponse } from './utils'

test.group('HcaptchaValidator', (group) => {
  nock.disableNetConnect()

  const secretKey = chance.guid()
  const siteKey = chance.guid()
  const hcaptchaValidator = new HcaptchaValidator({ secretKey, siteKey })

  test('Should be able to verify the token', async (assert) => {
    const token = chance.guid()

    hcaptchaNock(secretKey, siteKey, token, 200, successResponse)

    const response = await hcaptchaValidator.verifyToken(token)

    assert.isDefined(response)
    assert.isObject(response)
    assert.deepEqual(response, successResponse)
    assert.isTrue(nock.isDone())
  })

  const verifyErrorScenarios: {
    description: string
    errorCode: HcaptchaError[]
  }[] = [
    {
      description: 'your secret key is invalid or malformed',
      errorCode: ['invalid-input-secret'],
    },
    {
      description: 'response parameter (verification token) is missing',
      errorCode: ['missing-input-response'],
    },
    {
      description: 'response parameter (verification token) is invalid or malformed',
      errorCode: ['invalid-input-response'],
    },
    {
      description: 'request is invalid or malformed',
      errorCode: ['bad-request'],
    },
    {
      description: 'response parameter has already been checked, or has another issue',
      errorCode: ['invalid-or-already-seen-response'],
    },
    {
      description: 'you have used a testing sitekey but have not used its matching secret',
      errorCode: ['not-using-dummy-passcode'],
    },
    {
      description: 'the sitekey is not registered with the provided secret',
      errorCode: ['sitekey-secret-mismatch'],
    },
  ]

  verifyErrorScenarios.forEach((verifyTest) => {
    test(`Should return error message when ${verifyTest.description}`, async (assert) => {
      const token = chance.guid()
      hcaptchaNock(secretKey, siteKey, token, 200, errorResponse(verifyTest.errorCode))
      const response = await hcaptchaValidator.verifyToken(token)
      assert.isDefined(response)
      assert.isObject(response)
      assert.deepEqual(response.errorCodes, verifyTest.errorCode)
      assert.isTrue(nock.isDone())
    })
  })

  group.afterEach(async () => {
    nock.cleanAll()
  })
})
