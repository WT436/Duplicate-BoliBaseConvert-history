import { L } from '../lib/abpUtility';
import { routers } from '../components/Router/router.config';

declare var abp: any;

class Utils {
  
  _randomColor = (index: number | boolean): string => {
    var color = ["#b3d4ff","#50e991", "#0bb4ff", "#e6d800", "#e60049", "#9b19f5", "#ffa300", "#dc0ab4",  "#00bfa0"];
    if (index < color.length) {
      return color[Number(index)]
    }
    else {
      return "#" + Math.floor(Math.random() * 16777215).toString(16);
    }
  }

  loadScript(url: string) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    document.body.appendChild(script);
  }

  extend(...args: any[]) {
    let options,
      name,
      src,
      srcType,
      copy,
      copyIsArray,
      clone,
      target = args[0] || {},
      i = 1,
      length = args.length,
      deep = false;
    if (typeof target === 'boolean') {
      deep = target;
      target = args[i] || {};
      i++;
    }
    if (typeof target !== 'object' && typeof target !== 'function') {
      target = {};
    }
    if (i === length) {
      target = this;
      i--;
    }
    for (; i < length; i++) {
      if ((options = args[i]) !== null) {
        for (name in options) {
          src = target[name];
          copy = options[name];
          if (target === copy) {
            continue;
          }
          srcType = Array.isArray(src) ? 'array' : typeof src;
          if (deep && copy && ((copyIsArray = Array.isArray(copy)) || typeof copy === 'object')) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && srcType === 'array' ? src : [];
            } else {
              clone = src && srcType === 'object' ? src : {};
            }
            target[name] = this.extend(deep, clone, copy);
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }

    return target;
  }

  getPageTitle = (pathname: string) => {
    const localizedAppName = L('Common.AppName');
    return L(pathname) + ' | ' + localizedAppName;
  };

  getRoute = (path: string): any => {
    return routers.filter(route => route.path === path)[0];
  };

  setLocalization() {
    if (!abp.utils.getCookieValue('Localization')) {
      let language = "vi";
      abp.utils.setCookieValue('Localization', language, new Date(new Date().getTime() + 5 * 365 * 86400000), abp.appPath);
    }
  }

  getCurrentClockProvider(currentProviderName: string): abp.timing.IClockProvider {
    if (currentProviderName === 'unspecifiedClockProvider') {
      return abp.timing.unspecifiedClockProvider;
    }

    if (currentProviderName === 'utcClockProvider') {
      return abp.timing.utcClockProvider;
    }

    return abp.timing.localClockProvider;
  }
}

export default new Utils();
