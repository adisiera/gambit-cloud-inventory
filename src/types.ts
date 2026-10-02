export type Provider = 'AWS' | 'GCP' | 'Azure'

export type Environment = 'production' | 'staging' | 'development'

export type Criticality = 'low' | 'medium' | 'high' | 'critical'

export interface Resource {
  id: string
  name: string
  type: string
  provider: Provider
  region: string
  environment: Environment
  criticality: Criticality
  owner: string
  tags: string[]
  openIssues: number
}

export interface Application {
  id: string
  name: string
  description?: string
  resourceIds: string[]
  createdAt: string
}

export interface ResourceFilters {
  provider: Provider | 'all'
  environment: Environment | 'all'
  criticality: Criticality | 'all'
}
