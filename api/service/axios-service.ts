import { Context } from '@nuxt/types'

class AxiosService {
  private _context!: Context
  public get context (): Context {
    return this._context
  }

  public set context (value: Context) {
    this._context = value
  }

  async get<T> (url: string, params?: any) {
    const { data } = await this.context.$axios.get<T>(url, { params })

    return data
  }

  async put<T> (url: string, body?: any) {
    const { data } = await this.context.$axios.put<T>(url, body)

    return data
  }

  async post<T> (url: string, body?: any, config?: any) {
    const { data } = await this.context.$axios.post<T>(url, body, config)

    return data
  }

  async delete<T> (url: string, body?: any) {
    const { data } = await this.context.$axios.delete<T>(url, { data: body })

    return data
  }

  async patch<T> (url: string, body?: any, config?: any) {
    const { data } = await this.context.$axios.patch<T>(url, body, config)
    return data
  }
}

const axiosService = new AxiosService()

export {
  axiosService
}
