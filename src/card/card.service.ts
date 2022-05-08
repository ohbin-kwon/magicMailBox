import FsCardRepository from "./card.repository";
import FsAnswerRepository from "./answer/answer.repository";
import domain from "../domain/card"
import { makeCardReqDto } from "./card.dto";
import { ICardService, UnevaluatedCard } from "./card.type";
const fsCardRepository =  new FsCardRepository()
const fsAnswerRepository = new FsAnswerRepository()

class CardService implements ICardService{
  public async getAllUnevaluatedCard(): Promise<UnevaluatedCard[]> {
    return await fsCardRepository.getAllUnevaluatedCard()
  }

  public async makeCard(reqDto: makeCardReqDto): Promise<string> {
    const AllAnswer: Map<string, string> = await fsAnswerRepository.getAllAnswer()
    const random = +Math.floor(Math.random() * AllAnswer.size).toString() + 1

    const id = (await fsCardRepository.getAllUnevaluatedCard()).length + 1
    const question = reqDto.question
    const answerId = random

    const newCard = domain.makeCard(id, question, answerId)
    await fsCardRepository.makeCard(newCard)

    const answer = AllAnswer.get(String(random))
    if(!answer) throw new Error('answer is not exist')
    
    return answer
  }
}

export default CardService