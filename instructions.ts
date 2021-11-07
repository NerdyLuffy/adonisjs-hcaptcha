import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import * as sinkStatic from '@adonisjs/sink'
import { join } from 'path'

/**
 * Instructions to be executed when setting up the package.
 */
export default async function instructions(
  projectRoot: string,
  app: ApplicationContract,
  sink: typeof sinkStatic
): Promise<void> {
  const middlewareDir = app.resolveNamespaceDirectory('middleware') || 'app/Middleware'
  const contractDir = app.resolveNamespaceDirectory('contracts') || 'contracts'

  const middlewarePath = join(middlewareDir, 'Hcaptcha.ts')
  const middlewareTemplate = join(__dirname, 'templates/middleware/Hcaptcha.txt')

  const middleware = new sink.files.TemplateLiteralFile(
    projectRoot,
    middlewarePath,
    middlewareTemplate
  )
  if (middleware.exists()) {
    sink.logger.action('create').skipped(`${middlewarePath} file already exists`)
  } else {
    middleware.apply().commit()
    sink.logger.action('create').succeeded(middlewarePath)
  }

  const contractPath = join(contractDir, 'hcaptcha.ts')
  const contractTemplate = join(__dirname, 'templates/contracts/hcaptcha.txt')

  const contract = new sink.files.TemplateLiteralFile(projectRoot, contractPath, contractTemplate)
  if (contract.exists()) {
    sink.logger.action('create').skipped(`${contractPath} file already exists`)
  } else {
    contract.apply().commit()
    sink.logger.action('create').succeeded(contractPath)
  }
}
