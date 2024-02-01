import { comparePassword } from "@/utils";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import { prisma } from ".";
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credenciales",
      credentials: {
        email: { label: "Correo electrónico", type: "email", placeholder: "Ejm. email@email.com" },
        password: { label: "Contraseña", type: "password", placeholder: "Ejm. **********" },
      },
      async authorize(credentials, req) {
        try {
          const user = await prisma.user.findUnique({ where: { email: credentials?.email } });

          const findUser = await prisma.user.findUnique({ where: { email: credentials?.email } });
          if (!findUser) {
            throw new Error("El usuario no está registrado en la aplicación.");
          }

          if (!findUser.password) {
            throw new Error("Usuario no tiene contraseña, para acceder debes restablecer tu contraseña.");
          }

          const isPasswordValid = await comparePassword(credentials?.password || '', findUser.password);
          if (!isPasswordValid) {
            throw new Error("Contraseña incorrecta");
          }

          return { id: user?.id, email: user?.email, roles: user?.roles, name: user?.name, lastName: user?.lastName };
        } catch (error) {
          throw new Error(`Se ha producido un error en el servidor al iniciar sesión.`);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      const findUSer = await prisma.user.findUnique({ where: { email: token?.email || 'no-email' } });

      token.roles = findUSer?.roles || ['no-role'];
      token.id = findUSer?.id || '';

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.roles = token.roles;
        session.user.id = token.id;
      }

      return session;
    },
  },
};