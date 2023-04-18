import { env } from "../../kernel/env";
import { XMLHttpRequest } from 'w3c-xmlhttprequest';
import axios from 'axios';
import Log from "../services/log";

export default class Helpers {
  // both without / at the end
  static appRoot(path: string = '') {
    const end = path ? `/${path.replace(/^\/|\/$/g, '')}` : '';
    return `${env.baseDir}${end}`;
  }
  static storageRoot(path: string = '') {
    const end = path ? `/${path.replace(/^\/|\/$/g, '')}` : '';
    if (env.storage_root) return `${env.storage_root}${end}`;
    return Helpers.appRoot(`storage${end}`);
  }

  static async httpRequest({ url, verb = 'get', path, timeout = 30000, callbackError }:
    { url?: string, verb?: 'get' | 'post', path: string, timeout?: number, request?: string, headers?: { [key: string]: string }, query?: string[], callbackError: (xhttp: any) => void }) {
    const log = new Log({ route: 'httpRequest' });

    let xhttp;
    const config = {
      headers: {
        'User-Agent': 'Innovae/1.0',
      },
      maxRedirects: 0,
      validateStatus: (v: any) => true,
      timeout,
    }

    try {
      xhttp = await axios[verb](`${url}/${(path || '').replace(/^\/|\/$/g, '')}`, config);

      if ([200, 201, 204, 302].includes(xhttp.status)) {
        return xhttp;
      } else {
        if (callbackError) callbackError(xhttp);
      }
    } catch (error) {
      log.setResponse({ status: 13 }).setError(error as any).save();
      if (callbackError) callbackError({status: 7});
    }
  }
}
