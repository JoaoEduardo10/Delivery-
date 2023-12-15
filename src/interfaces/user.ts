export type TypeGroupDTO =
  | 'ADM'
  | 'tecnico'
  | 'atendimento'
  | 'vendas_ativo'
  | 'vendas_passivo'
  | 'estoque'
  | 'financeiro';

export interface UserDTO {
  id: string;
  email: string;
  name: string;
  groups: TypeGroupDTO[];
}
