import { makeCardReqDto } from "./card.dto";

export type Card = {
  id: number;
  question: string;
  answerId: number;
  satisfaction?: boolean;
};

export declare interface ICardService{
  getAllCard: () => Promise<Card[]>
  makeCard: (reqDto: makeCardReqDto) => Promise<string>
}

export declare interface ICardRepository {
  getAllCard: () => Promise<Card[]>
  makeCard: (newCard: Card) => Promise<void>
}