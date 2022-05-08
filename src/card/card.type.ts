import { makeCardReqDto } from "./card.dto";

export type EvaluatedCard = {
  id: number;
  question: string;
  answerId: number;
  satisfaction?: boolean;
};

export type UnevaluatedCard = {
  id: number;
  question: string;
  answerId: number;
};

export declare interface ICardService{
  getAllUnevaluatedCard: () => Promise<UnevaluatedCard[]>
  makeCard: (reqDto: makeCardReqDto) => Promise<string>
}

export declare interface ICardRepository {
  getAllUnevaluatedCard: () => Promise<UnevaluatedCard[]>
  getAllEvaluatedCard: () => Promise<EvaluatedCard[]>
  makeCard: (newCard: UnevaluatedCard) => Promise<void>
}