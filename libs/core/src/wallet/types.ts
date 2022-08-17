import { Types } from 'aptos';

export interface SimulatedTransaction {
  success: boolean;
  gasUsed: number;
  vmStatus: string;
}
export type TransactionPayload = Types.TransactionPayload;
export type AccountResource = Types.MoveResource;
export type WalletState =
  | 'account:pending:createAccount'
  | 'account:pending:loadAccount'
  | 'account:fulfilled:noAccount'
  | 'account:fulfilled:activeAccount'
  | 'account:rejected:createAccount'
  | 'account:pending:faucetFundAccount'
  | 'account:fulfilled:faucetFundAccount'
  | 'account:rejected:faucetFundAccount'
  | 'account:pending:importAccount'
  | 'account:fulfilled:importAccount'
  | 'account:rejected:importAccount'
  | 'account:pending:logout'
  | 'account:fulfilled:logout'
  | 'account:rejected:logout'
  | 'account:pending:revealSeedPhrase'
  | 'account:fulfilled:revealSeedPhrase'
  | 'account:rejected:revealSeedPhrase'
  | 'account:pending:revealPrivateKey'
  | 'account:fulfilled:revealPrivateKey'
  | 'account:rejected:revealPrivateKey'
  | 'account:pending:changePassword'
  | 'account:fulfilled:changePassword'
  | 'account:rejected:changePassword'
  | 'account:pending:createNewSiblingAccount'
  | 'account:fulfilled:createNewSiblingAccount'
  | 'account:rejected:createNewSiblingAccount'
  | 'account:pending:simulateTransaction'
  | 'account:fulfilled:simulateTransaction'
  | 'account:rejected:simulateTransaction'
  | 'account:pending:submitTransaction'
  | 'account:fulfilled:submitTransaction'
  | 'account:rejected:submitTransaction';
