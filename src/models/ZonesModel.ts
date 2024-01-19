export type Zones = Zone[]

export interface Zone {
  distribution_buckets: DistributionBucket[]
  type: string
  resource_state: number
  sensor_based: boolean
}

export interface DistributionBucket {
  max: number
  min: number
  time: number
}