import * as fs from 'fs';
import path from 'path'
import { EvaluatedCard, ICardRepository, UnevaluatedCard } from './card.type';

class FsCardRepository implements ICardRepository {
  public async getAllUnevaluatedCard(): Promise<UnevaluatedCard[]> {
    const json = fs.readFileSync(path.join(__dirname + '/unevaluatedCard.json'), {encoding: 'utf-8'})
    return JSON.parse(json) as UnevaluatedCard[]
  }

  public async getAllEvaluatedCard(): Promise<EvaluatedCard[]> {
    const json = fs.readFileSync(path.join(__dirname + '/evaluatedCard.json'), {encoding: 'utf-8'})
    return JSON.parse(json) as EvaluatedCard[]
  }

  public async makeCard(newCard: UnevaluatedCard): Promise<void> {
    const cardList = await this.getAllUnevaluatedCard()
    cardList.push(newCard)
    const data = JSON.stringify(cardList)
    fs.writeFileSync(path.join(__dirname + '/unevaluatedCard.json'), data, {encoding: 'utf-8'})
  }
}

export default FsCardRepository