import { hashPassword, registrarUsuarioScheme, prisma } from '@/lib';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, name, password, lastName } = await registrarUsuarioScheme.validate(await req.json());
    
    const findUserByEmail = await prisma.user?.findFirst({ where: { email }});
    if (findUserByEmail) {
      return NextResponse.json({
        message: `El usuario con el correo ${email} ya está registrado.`
      }, { status: 400 });
    }

    const hash = await hashPassword(password);

    const userCreated = await prisma.user?.create({
      data: {
        email,
        name,
        password: hash,
        lastName
      }
    });

    return NextResponse.json({
      message: 'El usuario se ha creado correctamente',
      data: {
        ...userCreated
      }
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      message: 'Se ha producido un error al crear el usuario, verifique los datos enviados e intente nuevamente.',
    }, { status: 500 });
  }
}