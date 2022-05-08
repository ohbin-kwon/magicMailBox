import FsCardRepository from "./card.repository";
import FsAnswerRepository from "./answer/answer.repository";
import domain from "../domain/card"
import { makeCardReqDto } from "./card.dto";
import { UnevaluatedCard } from "src/global";
const fsCardRepository =  new FsCardRepository()
const fsAnswerRepository = new FsAnswerRepository()

class CardService {
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
    if(!answer) throw new Error('dfddf')
    
    return answer
  }
}

export default CardService