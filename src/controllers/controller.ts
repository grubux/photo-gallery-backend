import { Response, Request } from "express";
export interface IInterface {
  articleName: string;
  price: number;
  quantity: number;
}

const ticketController = {
  count: async (req: Request, res: Response): Promise<void> => {
    res.send("sent");
  },
};

export default ticketController;
