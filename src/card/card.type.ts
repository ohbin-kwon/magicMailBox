import { evaluateCardReqDto, makeCardReqDto } from "./card.dto";

export type Card = {
  id: number;
  question: string;
  answerId: number;
  satisfaction?: boolean;
};

// 추후 cqrs를 위한 description
export declare interface ICardService{
  getAllCard: () => Promise<Card[]>
  getCard: (cardId: string) => Promise<Card>
  makeCard: (reqDto: makeCardReqDto) => Promise<void> // mutation 발생
  evaluateCard: (reqDto: evaluateCardReqDto) => Promise<void> // mutation 발생
}

export declare interface ICardRepository {
  getAllCard: () => Promise<Card[]>
  getCard: (cardId: number) => Promise<Card>
  makeCard: (newCard: Card) => Promise<void> // mutation 발생
  changeCard: (changedCard: Card) => Promise<void> // mutation 발생
}