import os from 'node:os'
import env from '#start/env'

export function getFrontendUrl() {
  const configured = env.get('FRONTEND_URL') ?? 'http://localhost:3000'
  const configuredUrl = new URL(configured)
  const port = configuredUrl.port || (configuredUrl.protocol === 'https:' ? '443' : '80')

  if (!configured.includes('localhost') && !configured.includes('127.0.0.1')) {
    return configured.replace(/\/$/, '')
  }

  const nets = os.networkInterfaces()
  for (const interfaces of Object.values(nets)) {
    for (const net of interfaces ?? []) {
      if (net.family === 'IPv4' && !net.internal) {
        return `http://${net.address}:${port}`
      }
    }
  }

  return configured.replace(/\/$/, '')
}
