import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json(
      { error: "Acesso negado." },
      { status: 403, statusText: "Acesso negado." }
    );
  }

  try {
    const { qualifications } = await req.json();

    if (
      !Array.isArray(qualifications) ||
      !qualifications.every((q) => typeof q === "string")
    ) {
      return NextResponse.json(
        { error: "Qualificações devem ser um array de strings." },
        { status: 400, statusText: "Dados inválidos." }
      );
    }

    const updatedProfessional = await prisma.professional.update({
      where: { id: params.id },
      data: { qualifications },
    });

    return NextResponse.json(updatedProfessional, {
      status: 200,
      statusText: "Qualificações atualizadas com sucesso!",
    });
  } catch {
    return NextResponse.json(
      { error: "Erro ao atualizar profissional." },
      { status: 500, statusText: "Erro ao atualizar profissional." }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json(
      { error: "Acesso negado." },
      { status: 403, statusText: "Acesso negado." }
    );
  }

  try {
    await prisma.professional.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      { message: "Profissional removido com sucesso." },
      { status: 200, statusText: "Profissional removido com sucesso." }
    );
  } catch {
    return NextResponse.json(
      { error: "Erro ao excluir profissional." },
      { status: 500, statusText: "Erro ao excluir profissional." }
    );
  }
}
