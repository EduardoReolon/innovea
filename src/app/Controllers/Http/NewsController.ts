import { HttpContextContract } from "../../../contracts/requestsContracts";
import { env } from "../../../kernel/env";
import Helpers from "../../Helpers";

export default class AuthController {
  public async index({request, response}: HttpContextContract) {
    const {query, from} = request.all();

    let error: any;
    const resp = await Helpers.httpRequest({
        url: 'https://newsapi.org',
        verb: 'get',
        path: `v2/everything?q=${query}&from=${from}&sortBy=publishedAt&apiKey=${env.apiKey}`,
        callbackError: (xhttp) => {
            error = xhttp.data;
        },
    });
    if (error) return response.status(400).send(error);
    if (!resp) return response.status(400);
    response.status(200).send((resp as any).data);
  }
}
