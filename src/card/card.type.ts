import { makeCardReqDto } from "./card.dto";

export type Card = {
  id: number;
  question: string;
  answerId: number;
  satisfaction?: boolean;
};

export declare interface ICardService{
  getAllCard: () => Promise<Card[]>
  getCard: (cardId: string) => Promise<Card>
  makeCard: (reqDto: makeCardReqDto) => Promise<void>
}

export declare interface ICardRepository {
  getAllCard: () => Promise<Card[]>
  getCard: (cardId: number) => Promise<Card>
  makeCard: (newCard: Card) => Promise<void>
}