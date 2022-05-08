import * as fs from 'fs';
import { EvaluatedCard, UnevaluatedCard } from 'src/global';
import path from 'path'

class FsCardRepository {
  public async getAllUnevaluatedCard(): Promise<UnevaluatedCard[]> {
    const json = fs.readFileSync(path.join(__dirname + '/unevaluatedCard.json'), {encoding: 'utf-8'})
    return JSON.parse(json) as UnevaluatedCard[]
  }

  public async getAllEvaluatedCard(): Promise<EvaluatedCard[]> {
    const json = fs.readFileSync(path.join(__dirname + '/evaluatedCard.json'), {encoding: 'utf-8'})
    return JSON.parse(json) as EvaluatedCard[]
  }

  public async makeCard(newCard: UnevaluatedCard) {
    const cardList = await this.getAllUnevaluatedCard()
    cardList.push(newCard)
    const data = JSON.stringify(cardList)
    fs.writeFileSync(path.join(__dirname + '/unevaluatedCard.json'), data, {encoding: 'utf-8'})
  }
}

export default FsCardRepository