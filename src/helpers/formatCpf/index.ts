function formatCPF(cpf_cnpj: string): string {
  const numericDocument = cpf_cnpj.replace(/\D/g, '');

  if (numericDocument.length === 11) {
    return `${numericDocument.slice(0, 3)}.${numericDocument.slice(
      3,
      6,
    )}.${numericDocument.slice(6, 9)}-${numericDocument.slice(9, 11)}`;
  }

  if (numericDocument.length === 14) {
    return `${numericDocument.slice(0, 2)}.${numericDocument.slice(
      2,
      5,
    )}.${numericDocument.slice(5, 8)}/${numericDocument.slice(
      8,
      12,
    )}-${numericDocument.slice(12, 14)}`;
  }

  return cpf_cnpj;
}

export { formatCPF };
