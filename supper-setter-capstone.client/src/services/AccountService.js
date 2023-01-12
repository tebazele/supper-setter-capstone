import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import { Account } from '../models/Account.js'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async editAccount(body) {
    const res = await api.put('/account', body)
    // logger.log(res.data)
    AppState.account = new Account(res.data)
  }


}

export const accountService = new AccountService()
