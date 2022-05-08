import { Request, Response } from 'express';
import { makeCardReqDto } from './card.dto';
import CardService from './card.service';

const cardService = new CardService();

class CardController {
  public async getAllCardController(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const response = await cardService.getAllUnevaluatedCard();
    return res.send(response);
  }

  public async makeCardController(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const reqDto: makeCardReqDto = req.body
    await cardService.makeCard(reqDto);
    return res.send("ok");
  }
}

export default CardController;
