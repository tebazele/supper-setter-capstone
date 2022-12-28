import { Auth0Provider } from "@bcwdev/auth0provider";
import { daysService } from "../services/DaysService";
import BaseController from "../utils/BaseController";



export class DaysController extends BaseController {
  constructor() {
    super('api/days')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createDay)
  }

  async createDay(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const day = daysService.createDay(req.body)
      return res.send()
    } catch (error) {
      next(error)
    }
  }

}