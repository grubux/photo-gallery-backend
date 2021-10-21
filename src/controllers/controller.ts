import { Response, Request } from "express";
export interface IInterface {
  articleName: string;
  price: number;
  quantity: number;
}

const controller = {
  count: async (req: Request, res: Response): Promise<void> => {
    res.send("sent");
  },
};

export default controller;
