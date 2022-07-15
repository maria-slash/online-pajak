import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Item } from '~/api/dto'
import { service } from '~/api/service/service'

export const state = () => ({
  items: new Array<Item>(),
  total: 0,
  item: <Item>{},
  isError: false
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  getAllItems: (state: { items: any }) => state.items
}

export const mutations: MutationTree<RootState> = {
  GET_ITEM: (state, items: []) => {
    state.items = items
    state.total = state.items.length
  },
  ADD_ITEM: (state, item: Item) => {
    state.isError = false
    state.item = item
    state.items.push(item)
    state.total += 1
  },
  UPDATE_ITEM: (state, item: Item) => {
    state.isError = false
    state.item = item
    const index = state.items.findIndex((data: Item) => data.id === item.id)
    state.items[index] = item
  },
  FAILED_SAVE: state => (state.isError = true)
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchItems({ commit }) {
    const result: any = await service.fetchItems()
    commit('GET_ITEM', result.data)
  },
  async addItem({ commit }, body: Item) {
    const result: any = await service.add(body)
    commit('ADD_ITEM', { ...body, id: result.data.id })
  },
  async editItem({ commit }, { id, body }) {
    const result: any = await service.update(id, body)
    if (result.data) {
      commit('UPDATE_ITEM', { ...body, id })
    } else {
      commit('FAILED_SAVE')
    }
  }
}
