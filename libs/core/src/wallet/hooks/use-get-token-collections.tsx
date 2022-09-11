import { AptosClient } from 'aptos';
import { Event, MoveResource } from 'aptos/dist/generated';
import get from 'lodash.get';
import { useCallback, useEffect, useState } from 'react';
import { TokenCollection } from '../types';

const eventToTokenCollection = (event: Event): TokenCollection => {
  return {
    sequenceNumber: event.sequence_number,
    collectionName: event.data.collection_name,
    creator: event.data.creator,
    description: event.data.description,
    maximum: event.data.maximum,
    uri: event.data.uri,
  };
};

export const useGetTokenCollections = (
  aptosClient: AptosClient,
  address?: string,
  tokenCollectionsResource?: MoveResource,
  runOnUseEffect = false
) => {
  const [tokenCollections, setTokenCollections] = useState<TokenCollection[]>(
    []
  );

  const fetchTokenCollections = useCallback(async () => {
    if (tokenCollectionsResource) {
      const counter = parseInt(
        get(
          tokenCollectionsResource.data,
          'create_collection_events.counter',
          '0'
        )
      );
      const type = tokenCollectionsResource.type;
      if (address) {
        const events = await aptosClient.getEventsByEventHandle(
          address,
          type,
          'create_collection_events',
          {
            limit: counter,
          }
        );
        setTokenCollections(events.map(eventToTokenCollection));
      } else {
        setTokenCollections([]);
      }
    } else {
      setTokenCollections([]);
    }
  }, [tokenCollectionsResource, aptosClient]);

  useEffect(() => {
    if (tokenCollectionsResource && runOnUseEffect) {
      fetchTokenCollections();
    }
  }, [tokenCollectionsResource]);
  return { tokenCollections, fetchTokenCollections };
};
