import express from 'express'
import TranscribeAudio from '../services/TranscribeAudio/transcribe-audio'
import generateQuestions from '../services/generateQuestions/generate-questions'

const router = express.Router()
const textMock = `O golpe de Estado no Brasil em 1964 foi a deposição do presidente brasileiro João Goulart por um golpe militar de 31 de março a 1.º de abril de 1964, pondo fim à Quarta República (1946–1964) e iniciando a ditadura militar brasileira (1964–1985). Teve início na forma de uma rebelião militar e foi seguido pela declaração de vacância da Presidência da República pelo Congresso Nacional, em 2 de abril, pela formação de uma junta militar (o Comando Supremo da Revolução) e pelo exílio do presidente, no dia 4. Em seu lugar assumiu provisoriamente o presidente da Câmara dos Deputados, Ranieri Mazzilli, até a eleição pelo Congresso do general Humberto de Alencar Castelo Branco, um dos principais líderes do golpe. Democraticamente eleito vice-presidente em 1960, Jango, como Goulart era conhecido, assumiu o poder após a renúncia do presidente Jânio Quadros em 1961 e a Campanha da Legalidade, que derrotou uma tentativa de golpe militar para impedir sua posse. Em seu governo a crise econômica e os conflitos sociais aprofundaram-se. Movimentos sociais em vários meios — político, sindical, camponês, estudantil, as praças (baixas patentes militares) — militavam pelas reformas de base, propostas também pelo presidente. Ele teve crescente oposição entre a elite, classe média urbana, grande parte do oficialato, Igreja e imprensa, sendo acusado de ameaçar a ordem legal e de ser conivente com o comunismo, o caos social e a quebra da hierarquia militar. Ao longo de seu mandato, esteve sob numerosos esforços para pressionar e desestabilizar seu governo e conspirações para destituí-lo. As relações com os Estados Unidos deterioraram e o governo americano aliou-se às forças oposicionistas e seus esforços, apoiando o golpe. Goulart perdeu o apoio do centro, não conseguiu aprovar as reformas no Congresso e no estágio final de seu governo contou com a pressão dos movimentos reformistas para superar a resistência do Legislativo, levando ao ápice da crise política em março de 1964.`

router.get('/health', (_, res) => {
    res.status(200).send('OK')
})

router.get('/transcribe', async (_, res) => {
    const transcription = await TranscribeAudio('https://replicate.delivery/mgxm/e5159b1b-508a-4be4-b892-e1eb47850bdc/OSR_uk_000_0050_8k.wav')
    res.status(200).send(transcription)
})

router.get('/generate', async (req, res) => {
    const input = await generateQuestions(textMock, 1)
    res.status(200).send(input)
})


export default router