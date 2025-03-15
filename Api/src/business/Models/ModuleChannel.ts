export default interface IModuleChannel {
  type: ModuleChannelType;
  channelId: string;
  guildId: string; // Uniquement lorsque type === ModuleChannelType.Guild
  modules: IModuleChannelConfig[];
  errorCount: number;
  createdAt: Date;
  updatedAt?: Date;
}

export enum ModuleChannelType {
  Guild,
  DirectMessage,
}

export interface IModuleChannelConfig {
  type: ModulesTypesEnum;
  lang: string;
  /**
   * Utilisé pour les Tweets et News, permet de définir le compte (`@DOFUSFR` pour les tweets, `Dofus` pour les news)
   */
  key: string;
  roleId: string;
}

export enum ModulesTypesEnum {
  HaapiClient = 'HaapiClient',
  HaapiNews = 'HaapiNews',
  Twitter = 'Twitter',
  AnkamaShop = 'AnkamaShop',
  Almanax = 'Almanax',
}
