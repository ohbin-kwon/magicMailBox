import { Request, Response } from 'express';
import { evaluateCardReqDto, makeCardReqDto } from './card.dto';
import CardService from './card.service';

const cardService = new CardService();

class CardController {
  public async getAllCardController(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const response = await cardService.getAllEvaluatedCard();
    return res.send(response);
  }

  public async makeCardController(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const reqDto: makeCardReqDto = req.body
    const answer = await cardService.makeCard(reqDto);
    return res.send(answer);
  }

  public async evaluateCardController(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const reqDto: evaluateCardReqDto = req.body
    await cardService.evaluateCard(reqDto);
    return res.send("ok");
  }
}

export default CardController;
