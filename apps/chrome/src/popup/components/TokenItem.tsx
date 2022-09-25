import { TokenDetail } from '@poketto/core';

interface Props {
  token: TokenDetail;
}
export const TokenItem: React.FunctionComponent<Props> = ({ token }) => {
  return (
    <div>
      <div className="h-20 w-max">
        <img
          src={token.uri}
          alt=""
          className="h-full rounded-lg object-cover"
        />
      </div>
      <div>
        <h4 className="font-medium">{token.name}</h4>
        <p className="text-sm">{token.description}</p>
      </div>
    </div>
  );
};
