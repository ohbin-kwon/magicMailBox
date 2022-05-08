import { EvaluatedCard, UnevaluatedCard } from "src/card/card.type"

export function makeCard (id: number, question: string, answerId: number): UnevaluatedCard {
  const newCard: UnevaluatedCard = { id, question, answerId }
  return newCard
}

export function evaluateCard(unevaluatedCard: UnevaluatedCard, satisfaction: boolean): EvaluatedCard {
  const evaluateCard: EvaluatedCard = unevaluatedCard
  evaluateCard.satisfaction = satisfaction
  return evaluateCard
}

const domain = {
  makeCard,
  evaluateCard
}

export default domain