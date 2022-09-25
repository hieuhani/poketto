import { useEffect, useState } from 'react';
import { TokenDetail } from '../types';
import { useWallet } from '../WalletContext';

export const useTokenDetails = () => {
  const [tokenDetails, setTokenDetails] = useState<TokenDetail[]>([]);

  const { tokens, tokenClient, fetchTokens } = useWallet();

  useEffect(() => {
    fetchTokens();
  }, []);

  const fetchTokenDetails = async () => {
    const details = await Promise.all(
      tokens.map((token) =>
        tokenClient
          .getTokenData(token.creator, token.collection, token.name)
          .then((tokenDetail) => ({
            ...token,
            uri: tokenDetail.uri,
            supply: tokenDetail.supply,
            description: tokenDetail.description,
          }))
      )
    );
    setTokenDetails(details);
  };
  useEffect(() => {
    if (tokens.length > 0) {
      fetchTokenDetails();
    }
  }, [tokens, tokenClient]);

  return { tokenDetails };
};
