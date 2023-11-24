import * as Realm from 'realm-web';

import { MediaItem } from '../music-search/actions';

export type PlaylistDocument = MediaItem & { _id: Realm.BSON.ObjectId };
