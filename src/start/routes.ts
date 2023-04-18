import { HttpContextContract } from "../contracts/requestsContracts";
import Route from "../kernel/routehandler";

Route.group([
  Route.get('', 'NewsController.index'),
])
  .prefix('api/v1/news')

Route.get('*', async ({params, response}: HttpContextContract) => {response.status(201).send(params)})

export default Route.solveRoutes();
