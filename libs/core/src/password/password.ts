import passworder from '@metamask/browser-passworder';

export const encrypt = <R>(password: string, data: R): Promise<string> => {
  return passworder.encrypt(password, data);
};

export const decrypt = <R>(password: string, text: string): Promise<R> => {
  return passworder.decrypt(password, text);
};
