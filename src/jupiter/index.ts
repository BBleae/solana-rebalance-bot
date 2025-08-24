import { getConfig } from '../config'

const baseUrlLite = 'https://lite-api.jup.ag/trigger/v1'
const baseUrlPro = 'https://api.jup.ag/trigger/v1'

export const getBaseUrl = () => (getConfig().jupiter.isPro ? baseUrlPro : baseUrlLite)
