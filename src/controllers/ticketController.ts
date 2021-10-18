import { Response, Request } from "express";

export interface IitemsInTicket {
  item: string;
  TVAType: "B" | "D";
  priceHT: number;
  isFood: boolean;
}

export interface Igeneral {
  total?: string;
  discountPercentageFood: number;
  discountPercentageNotFood: number;
}

export interface requestCustom {
  itemsinTicket: IitemsInTicket[];
  general: Igeneral;
}

const ticketController = {
  count: async (req: Request, res: Response): Promise<void> => {
    res.send("sent !");
  },
};
//
// 0.0737(de 1.58-0.24)+0.0902(de 1.93-0.29)

export default ticketController;
