# Desafio DataWer

## Sobre o Projeto

A **DataWer** é uma plataforma de gestão de profissionais onde usuários com a permissão de administrador podem gerenciar os profissionais. Isso inclui listar, editar qualificações, criar e deletar profissionais. Cada novo profissional deve ser único, garantindo a validação de e-mail no banco de dados.

## Tecnologias Utilizadas

- **Next.js**
- **Zod**
- **React-Hook-Form**
- **React-Query**
- **Material-UI**
- **TypeScript**

## Passo a Passo para Instalação

### 1. Clonar o Repositório

```sh
git clone https://github.com/wesleydematos/desafio-datawer.git
cd nome-do-repositorio
```

### 2. Instalar Dependências

```sh
npm install
```

### 3. Criar o Banco de Dados e Aplicar Migrations

```sh
npx prisma migrate dev
```

### 4. Executar o Seed para Popular o Banco (IMPORTANTE PARA CONSEGUIR EFETUAR LOGIN)

```sh
npx ts-node prisma/seed.ts
```

### 5. Criar o Arquivo `.env`

Copie o conteúdo de `.env.example` para um novo arquivo `.env` e preencha os valores conforme necessário.

### 6. Rodar o Projeto

```sh
npm run dev
```

## Credenciais de Acesso

### Administrador

- **E-mail:** admin@datawer.com
- **Senha:** admin12345

### Usuário Comum

- **E-mail:** user@datawer.com
- **Senha:** user12345
