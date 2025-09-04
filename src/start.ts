import { PikkuUWSServer } from '@pikku/uws'

import '../pikku-gen/pikku-bootstrap.gen.js'
import {
  createConfig,
  createSessionServices,
  createSingletonServices,
} from './services.js'

async function main(): Promise<void> {
  try {
    const config = await createConfig()
    const singletonServices = await createSingletonServices(config)
    const appServer = new PikkuUWSServer(
      { ...config, hostname: 'localhost', port: 4002 },
      singletonServices,
      createSessionServices
    )
    appServer.enableExitOnSigInt()
    await appServer.init()
    await appServer.start()
  } catch (e: any) {
    console.error(e.toString())
    process.exit(1)
  }
}

main()
