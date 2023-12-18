/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import axios from 'axios';

interface Data {
  id: string;
  razao: string;
  endereco: string;
  email: string;
}

export async function POST(req: Request) {
  const data = await req.json();

  if (!data.cpf) {
    return NextResponse.json(
      { error: 'Não há um cpf ou cnpj' },
      {
        status: 404,
      },
    );
  }

  const token = process.env.NEXT_PUBLIC_TOKEN || '';
  const url = process.env.NEXT_PUBLIC_URL_API || '';

  const options = {
    method: 'GET',
    url: `${url}cliente`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + token,
      ixcsoft: 'listar',
    },
    data: {
      qtype: 'cliente.cnpj_cpf',
      query: `${data.cpf}`,
      oper: '=',
      page: '1',
      rp: '1000',
      sortname: '',
      sortorder: 'asc',
    },
    json: true,
  };

  const response = await axios(options);

  const data_ixc: { registros: Data[] } = await response.data;

  if (!data_ixc.registros) {
    return NextResponse.json(
      { error: 'usuário invalido' + `${data_ixc}` },
      {
        status: 404,
      },
    );
  }

  const client = data_ixc.registros.map(
    ({ id, razao, endereco, email }: Data) => ({
      id,
      name: razao,
      endereco,
      email,
    }),
  );

  return NextResponse.json({ client });
}
