'use client'

import React from "react";
import { PlaylistDocument } from "src/app/context/realm.context.type";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const noop = <T = Realm.Services.MongoDB.ChangeEvent<PlaylistDocument>>(change: T) => { };

const defaultChangeHandlers = {
    onInsert: noop<Realm.Services.MongoDB.InsertEvent<PlaylistDocument>>,
    onUpdate: noop<Realm.Services.MongoDB.UpdateEvent<PlaylistDocument>>,
    onReplace: noop<Realm.Services.MongoDB.ReplaceEvent<PlaylistDocument>>,
    onDelete: noop<Realm.Services.MongoDB.DeleteEvent<PlaylistDocument>>,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useWatch(collection: Realm.Services.MongoDB.MongoDBCollection<PlaylistDocument> | undefined, changeHandlers: Partial<typeof defaultChangeHandlers>) {
    const filter = React.useMemo(() => ({}), []);
    const handlers = { ...defaultChangeHandlers, ...changeHandlers };
    // We copy the handlers into a ref so that we can always call the latest version of each handler
    // without causing a re-render when the callbacks change. This can prevent infinite render loops
    // that would otherwise happen if the caller doesn't memoize their change handler functions.
    const handlersRef = React.useRef(handlers);
    React.useEffect(() => {
        handlersRef.current = {
            onInsert: handlers.onInsert,
            onUpdate: handlers.onUpdate,
            onReplace: handlers.onReplace,
            onDelete: handlers.onDelete,
        };
    }, [
        handlers.onInsert,
        handlers.onUpdate,
        handlers.onReplace,
        handlers.onDelete,
    ]);
    // Set up a MongoDB change stream that calls the provided change handler callbacks.
    React.useEffect(() => {
        if (!collection) return;

        let stream: ReturnType<typeof collection.watch> | null = null;
        const watchTodos = async () => {
            try {

                stream = collection.watch({ filter });
                for await (const change of stream) {
                    switch (change.operationType) {
                        case "insert": {
                            handlersRef.current.onInsert(change);
                            break;
                        }
                        case "update": {
                            handlersRef.current.onUpdate(change);
                            break;
                        }
                        case "replace": {
                            handlersRef.current.onReplace(change);
                            break;
                        }
                        case "delete": {
                            handlersRef.current.onDelete(change);
                            break;
                        }
                        default: {
                            // change.operationType will always be one of the specified cases, so we should never hit this default
                            throw new Error(
                                `Invalid change operation type: ${change.operationType}`
                            );
                        }
                    }
                }
            } catch (err) {
                console.log(err);
                watchTodos();
            }
        };
        watchTodos();
        return () => {
            // Close the change stream in the effect cleanup
            stream?.return(undefined)
        }
    }, [collection, filter]);
}
