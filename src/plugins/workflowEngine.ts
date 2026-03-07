import type { Plugin } from 'payload'

export const workflowPlugin = (): Plugin => {
  return (config) => {

    console.log('Workflow Plugin Loaded')

    return {
      ...config,
    }
  }
}
