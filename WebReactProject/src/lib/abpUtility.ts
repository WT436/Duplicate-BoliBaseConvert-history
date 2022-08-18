import AppConsts from './appconst';

declare var abp: any;

export function L(key: string, sourceName?: string): string {
  let localizationSourceName = AppConsts.localization.defaultLocalizationSourceName;
  return abp.localization.localize(key, sourceName ? sourceName : localizationSourceName);
}

export function isGranted(permissionName: string): boolean {
  if (abp.auth.getRoles().indexOf(permissionName) >= 0){
    return true;
  }
  else {
    return false;
  }
}