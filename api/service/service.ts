import { Item } from '../dto'
import { axiosService } from '~/api/service/axios-service'

class Service {
  async fetchItems() {
    return axiosService.get('/signers')
  }

  async add(body: Item) {
    return axiosService.post(
      '/signers', { data: body }, { 'Content-Type': 'application/json' }
    )
  }

  async update(id: number, body: Item) {
    return axiosService.post(
      `/signers/${id}`, { data: body }, { 'Content-Type': 'application/json' }
    )
  }
}

const service = new Service()

export {
  service
}
