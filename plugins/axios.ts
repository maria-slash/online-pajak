import { Context } from '@nuxt/types'
import { axiosService } from '~/api/service/axios-service'
export default (ctx: Context) => {
  const { $axios } = ctx

  $axios.interceptors.request.use((config: any) => {
    config.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': '*'
    }
    return config
  })
  axiosService.context = ctx
}
