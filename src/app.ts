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
// evaluated card들의 feed 를 가져오는 라우터
app.get('/card/list', wrap(cardController.getAllCardController))
// unevaluated card를 생성하는 라우터
app.post('/card/make', wrap(cardController.makeCardController))
// 카드에 대한 유저의 evaluate
app.post('satisfaction', (req, res) => {
  // req: boolean
  // 만족도 조사
  // repo : card update / satisfaction
  // res: 200 ok
})

// 시간에 따른 keyword_satisfaction db업데이트

// todo: throw한 에러를 handling 하는 error handler

app.listen(PORT, () => {
	console.log(`App listening at PORT: ${PORT}`)
})

export default app