export interface DeliveryDTO {
  id: string;
  deliveredByName: string;
  deliveredByEmail: string;
  recipient: {
    cpf_cnpj: string;
    email?: string;
    boletus_id: number;
    number?: string;
    someoneAtHome?: boolean; //alguém em casa
  };
  latitude: number;
  longitude: number;
  imageReference: string;
  deliveryDate?: Date;
}
