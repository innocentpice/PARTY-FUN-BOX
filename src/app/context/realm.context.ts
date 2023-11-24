import * as Realm from 'realm-web';

import { atom } from 'jotai';
import { PlaylistDocument } from './realm.context.type';

const realmConfig = {
  appId: 'application-0-vmrdx',
  appUrl:
    'https://realm.mongodb.com/groups/65606a5119540d009ea6ca07/apps/656072e85069f55d6faa2d5c',
  baseUrl: 'https://realm.mongodb.com',
  clientApiBaseUrl: 'https://ap-southeast-1.aws.realm.mongodb.com',
  dataApiBaseUrl: 'https://ap-southeast-1.aws.data.mongodb-api.com',
  dataExplorerLink:
    'https://cloud.mongodb.com/links/65606a5119540d009ea6ca07/explorer/RealmPOC-Cluster-1/database/collection/find',
  dataSourceName: 'mongodb-atlas',
};

export const realmAtom = atom(async () => {
  const app = new Realm.App({ id: realmConfig.appId });
  await app.logIn(Realm.Credentials.anonymous());

  return app;
});

export const realmCollectionsAtom = atom(async (get) => {
  const app = await get(realmAtom);

  const mongo = app.currentUser?.mongoClient(realmConfig.dataSourceName);
  const playlist = mongo
    ?.db('party-fun-box')
    .collection<PlaylistDocument>('playlist');

  return {
    playlist,
  };
});
