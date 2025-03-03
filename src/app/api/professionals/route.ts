import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface IProfessional {
  id: string;
  name: string;
  email: string;
  qualifications: string[];
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const [professionals, total] = await Promise.all([
      prisma.professional.findMany({
        skip,
        take: limit,
      }),
      prisma.professional.count(),
    ]);

    const formattedProfessionals = professionals.map((prof) => ({
      ...prof,
      qualifications: Array.isArray(prof.qualifications)
        ? prof.qualifications
        : [],
    }));

    return NextResponse.json(
      {
        professionals: formattedProfessionals,
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Erro ao buscar profissionais." },
      { status: 500, statusText: "Erro ao buscar profissionais." }
    );
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json(
      { error: "Acesso negado." },
      { status: 403, statusText: "Acesso negado." }
    );
  }

  try {
    const { name, email, qualifications } = await req.json();

    if (!Array.isArray(qualifications)) {
      return NextResponse.json(
        { error: "Qualificações devem ser um array de strings." },
        { status: 400, statusText: "Dados inválidos." }
      );
    }

    const existingProfessional = await prisma.professional.findUnique({
      where: { email },
    });

    if (existingProfessional) {
      return NextResponse.json(
        { error: "Email em uso." },
        { status: 400, statusText: "Email em uso." }
      );
    }

    const newProfessional = await prisma.professional.create({
      data: {
        name,
        email,
        qualifications,
      },
    });

    return NextResponse.json(newProfessional, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Erro ao criar profissional." },
      { status: 500, statusText: "Erro ao criar profissional." }
    );
  }
}
