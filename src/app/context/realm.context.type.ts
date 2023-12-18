import * as Realm from 'realm-web';

import { MediaItem } from '../v1/music-search/actions';

export type PlaylistDocument = MediaItem & { _id: Realm.BSON.ObjectId };
