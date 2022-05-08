import express from 'express'
import CardController from './card/card.controller'
import wrap from 'express-async-error-wrapper'

const app = express()
const PORT = 3000
app.use(express.json())

const cardController = new CardController()
// test용 라우터
app.get('/', wrap(async (req, res, next) => {
  throw new Error('fsadfas')
}))
// todo: 현재는 evalutated와 undevaluated를 나누어서 도메인을 관리하는데, 이를 어떻게 할지 
// feed 를 가져오는 라우터(모든 카드를 가져옴)
app.get('/card/feed', wrap(cardController.getAllCardController))
// 하나의 card를 가져오는 라우터
app.get('/card/:id', wrap(cardController.getCardController))
// unevaluated card를 생성하는 라우터
app.post('/card/make', wrap(cardController.makeCardController))
// 카드에 대한 유저의 evaluate
app.patch('/card/evaluate', wrap(cardController.evaluateCardController))

// 시간에 따른 keyword_satisfaction db업데이트

// todo: throw한 에러를 handling 하는 error handler, nest와 같이 에러를 next를 사옹하지 않고도 handling이 가능할까?
// todo: 필요하다면 cqrs를 이용해 mutation과 의존성이 있는 함수를 분리

app.listen(PORT, () => {
	console.log(`App listening at PORT: ${PORT}`)
})

export default app