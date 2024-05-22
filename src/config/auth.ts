export interface IAuthConfigDTO {
  readonly config: {
    readonly jwt: {
      readonly expiresIn: string;
    };
  };
}

export const authConfig: IAuthConfigDTO = {
  config: {
    jwt: {
      expiresIn: process.env.JWT_LIFETIME ?? '1d',
    },
  },
};
