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

  public async getCard(cardId: string): Promise<Card> {
    const intCardId = Number(cardId)
    const card = await fsCardRepository.getCard(intCardId)
    return card
  }

  public async makeCard(reqDto: makeCardReqDto): Promise<void> {
    const AllAnswer: Map<string, string> = await fsAnswerRepository.getAllAnswer()
    const random = +Math.floor(Math.random() * AllAnswer.size).toString() + 1

    const id = (await fsCardRepository.getAllCard()).length + 1
    const question = reqDto.question
    const answerId = random

    const newCard = domain.makeCard(id, question, answerId)
    await fsCardRepository.makeCard(newCard)

    const answer = AllAnswer.get(String(random))
    if(!answer) throw new Error('answer is not exist')
    
  }

  public async evaluateCard(reqDto: evaluateCardReqDto): Promise<void> {
    const targetCard = await fsCardRepository.getCard(reqDto.cardId)
    if(targetCard.satisfaction !== undefined){
      throw new Error('already evaluated')
    }

    const satisfaction = reqDto.satisfaction
    const evaluatedCard = domain.evaluateCard(targetCard, satisfaction)
    
    await fsCardRepository.changeCard(evaluatedCard)
  }
}

export default CardService