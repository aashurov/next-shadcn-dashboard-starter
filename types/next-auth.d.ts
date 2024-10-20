import { DefaultSession } from 'next-auth';

import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      name?: string | null | undefined;
      role?: string;
      userName?: string;
      token?: string;
      refreshToken?: string;
      result?: boolean;
      message?: string[];
      isExpired?: boolean;
    } & DefaultSession;
  }

  interface User extends DefaultUser {
    role: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    role: string;
  }
}
