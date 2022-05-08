import FsCardRepository from "./card.repository";
import FsAnswerRepository from "./answer/answer.repository";
import domain from "../domain/card"
import { evaluateCardReqDto, makeCardReqDto } from "./card.dto";
import { Card, ICardService } from "./card.type";
const fsCardRepository =  new FsCardRepository()
const fsAnswerRepository = new FsAnswerRepository()

class CardService implements ICardService{
  public async getAllCard(): Promise<Card[]> {
    return await fsCardRepository.getAllCard()
  }

  public async makeCard(reqDto: makeCardReqDto): Promise<string> {
    const AllAnswer: Map<string, string> = await fsAnswerRepository.getAllAnswer()
    const random = +Math.floor(Math.random() * AllAnswer.size).toString() + 1

    const id = (await fsCardRepository.getAllCard()).length + 1
    const question = reqDto.question
    const answerId = random

    const newCard = domain.makeCard(id, question, answerId)
    await fsCardRepository.makeCard(newCard)

    const answer = AllAnswer.get(String(random))
    if(!answer) throw new Error('answer is not exist')
    
    return answer
  }

  public async evaluateCard(reqDto: evaluateCardReqDto): Promise<Card> {
    const unevaluatedCards = await fsCardRepository.getAllCard()
    const targetCard = unevaluatedCards.filter(card => card.id === reqDto.cardId)[0]

    const satisfaction = reqDto.satisfaction
    const evaluatedCard = domain.evaluateCard(targetCard, satisfaction)
    return evaluatedCard
  }
}

export default CardService