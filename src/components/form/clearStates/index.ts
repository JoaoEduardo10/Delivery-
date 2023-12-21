interface ClearStatesParams {
  setClearCpfCnpj: React.Dispatch<React.SetStateAction<boolean>>;
  setClearEmail: React.Dispatch<React.SetStateAction<boolean>>;
  setClearNumber: React.Dispatch<React.SetStateAction<boolean>>;
  setClearBoletus: React.Dispatch<React.SetStateAction<boolean>>;
  clearCpfCnpj: boolean;
  clearEmail: boolean;
  clearNumber: boolean;
  clearBoletus: boolean;
}

class ClearStates {
  static clear({
    setClearCpfCnpj,
    setClearEmail,
    setClearNumber,
    setClearBoletus,
    clearCpfCnpj,
    clearEmail,
    clearNumber,
    clearBoletus,
  }: ClearStatesParams): void {
    if (clearCpfCnpj) {
      setClearCpfCnpj(false);
    }

    if (clearEmail) {
      setClearEmail(false);
    }

    if (clearNumber) {
      setClearNumber(false);
    }

    if (clearBoletus) {
      setClearBoletus(false);
    }
  }
}

export { ClearStates };
