import { AptosClient, Types } from 'aptos';
import get from 'lodash.get';
import { useCallback, useEffect, useState } from 'react';
import { Token } from '../types';

interface TokenAggregateEvent {
  data: any;
  depositSequenceNumber: number;
  withdrawSequenceNumber: number;
  difference: number;
}

export const useGetTokens = (
  aptosClient: AptosClient,
  address?: string,
  tokenResource?: Types.MoveResource,
  runOnUseEffect = false
) => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const fetchTokens = useCallback(async () => {
    if (tokenResource) {
      const depositCounter = parseInt(
        get(tokenResource.data, 'deposit_events.counter', '0')
      );

      const withdrawCounter = parseInt(
        get(tokenResource.data, 'withdraw_events.counter', '0')
      );
      const type = tokenResource.type;
      if (address) {
        const depositEvents =
          depositCounter > 0
            ? await aptosClient.getEventsByEventHandle(
                address,
                type,
                'deposit_events',
                {
                  limit: depositCounter,
                }
              )
            : [];

        const withdrawEvents =
          withdrawCounter > 0
            ? await aptosClient.getEventsByEventHandle(
                address,
                type,
                'withdraw_events',
                {
                  limit: withdrawCounter,
                }
              )
            : [];

        const tokenIds = new Set<string>();

        const depositMap: Record<string, any> = {};
        // TODO: use reduce
        depositEvents.forEach((event) => {
          const tokenId = JSON.stringify(event.data.id);
          tokenIds.add(tokenId);

          depositMap[tokenId] = depositMap[tokenId]
            ? {
                count: depositMap[tokenId].count + 1,
                sequenceNumber: event.sequence_number,
                data: event.data.id,
              }
            : {
                count: 1,
                sequenceNumber: event.sequence_number,
                data: event.data.id,
              };
        });

        const withdrawMap: Record<string, any> = {};
        // TODO: use reduce
        withdrawEvents.forEach((event) => {
          const tokenId = JSON.stringify(event.data.id);
          tokenIds.add(tokenId);

          withdrawMap[tokenId] = withdrawMap[tokenId]
            ? {
                count: withdrawMap[tokenId].count + 1,
                sequenceNumber: event.sequence_number,
                data: event.data.id,
              }
            : {
                count: 1,
                sequenceNumber: event.sequence_number,
                data: event.data.id,
              };
        });

        const tokens: TokenAggregateEvent[] = Array.from(tokenIds).map(
          (tokenId) => {
            const depositCount = depositMap[tokenId]
                ? depositMap[tokenId].count
                : 0,
              withdrawCount = withdrawMap[tokenId]
                ? withdrawMap[tokenId].count
                : 0;
            return {
              data: depositMap[tokenId]
                ? depositMap[tokenId].data
                : withdrawMap[tokenId].data,
              depositSequenceNumber: depositMap[tokenId]
                ? depositMap[tokenId].sequenceNumber
                : 0,
              withdrawSequenceNumber: withdrawMap[tokenId]
                ? withdrawMap[tokenId].sequenceNumber
                : 0,
              difference: depositCount - withdrawCount,
            };
          }
        );
        const aggregateTokens = tokens.reduce((prev, current) => {
          const id = JSON.stringify(current.data);

          return {
            ...prev,
            [id]: {
              ...current,
              difference: (prev[id]?.difference || 0) + current.difference,
            },
          };
        }, {} as Record<string, TokenAggregateEvent>);
        const allTokens: Token[] = Object.values(aggregateTokens).map(
          (event) => ({
            version: event.data.property_version,
            ...event.data.token_data_id,
            amount: event.difference,
          })
        );
        setTokens(allTokens);
        return allTokens;
      } else {
        setTokens([]);
        return [];
      }
    }
    setTokens([]);
    return [];
  }, [tokenResource, aptosClient]);

  useEffect(() => {
    if (runOnUseEffect && tokenResource) {
      fetchTokens();
    }
  }, [runOnUseEffect, tokenResource]);
  return {
    fetchTokens,
    tokens,
  };
};
