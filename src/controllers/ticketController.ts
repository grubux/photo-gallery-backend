import { Response, Request } from "express";
export interface IArticlesIsFoodOrNot {
  articleName: string;
  price: number;
  quantity: number;
  TVAType: "B" | "D";
}

export interface Igeneral {
  articles: IArticlesIsFoodOrNot[];
  total?: string;
  discountPercentageFood: number;
  discountPercentageNotFood: number;
}

export interface IrequestCustom {
  itemsinTicket: IArticlesIsFoodOrNot[];
  general: Igeneral;
}

const ticketController = {
  count: async (req: Request, res: Response): Promise<void> => {
    const { articles, discountPercentageFood, discountNotFood } = req.body;
    const articlesFood: IArticlesIsFoodOrNot[] = articles.isFood;
    const articlesNotFood = articles.isNotFood;
    console.log(articlesFood);
    let finalGlobalPrice: number = 0;
    const articlesFoodFinal: IArticlesIsFoodOrNot[] = articlesFood;

    for (let i = 0; i < articlesFood.length; i++) {
      // Round + percentage
      const toFixedNumberPlusPercentage = (num: number, coef: number) => {
        return Math.round(num * coef) / 100;
      };

      // Round
      const toFixedNumber = (num: number) => {
        return +num.toFixed(2);
      };
      console.log(articlesFood[i].price);
      // Deducating discount from HT Price
      const discount = toFixedNumberPlusPercentage(
        articlesFood[i].price,
        discountPercentageFood
      );
      const HTMinusDiscount = articlesFood[i].price - discount;
      console.log("discount", discount);
      console.log("HTMinusDiscount", HTMinusDiscount);
      //Last + VAT
      const VAT = articlesFood[i].TVAType === "B" ? 5.5 : 20;
      const VATAmount: number = (HTMinusDiscount * VAT) / 100;
      const articleFinalPriceRaw = HTMinusDiscount + VATAmount;
      const articleFinalPrice = toFixedNumber(articleFinalPriceRaw);
      console.log("articleFinalPrice", articleFinalPrice);

      // Assigning final price
      articlesFoodFinal[i].price = articleFinalPrice;

      // Incrementing final global price
      finalGlobalPrice = finalGlobalPrice + articleFinalPrice;
    }

    console.log("articlesFoodFinal", articlesFoodFinal);
    console.log(finalGlobalPrice);
    res.send("sent");
  },
};

export default ticketController;
