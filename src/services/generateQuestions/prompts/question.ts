import { ChatPromptTemplate } from '@langchain/core/prompts'

export type Question = {
    description: string
    correctAnswerKey: string
    options: {
        key: string
        description: string
    }[]
}

export const questionTemplate = ChatPromptTemplate.fromTemplate(
  `I am the best english teacher in the world, your task is to generate questions based on the following text.
  Please read this text carefully.
  {text}.
  After understanding its content, generate {number} multiple-choice questions based on the key information extracted from the text.
  Each question should have four possible answers labeled as 'a', 'b', 'c', and 'd', with one of these being the correct answer.
  Remember, it is just {number} questions.
  The difficulty level of the questions should be {difficulty}.
  The theme of the questions should be related to {theme}.
  Try to relate the questions to {relatedTo}.
  Ensure that the questions and answers are detailed and comprehensive, similar to the style of college entrance exams. The questions should test deeper understanding and critical thinking about the text.
  Dont create small questions descriptions, make them long and detailed.
  The class pay your salary, so you need to do your best. They are the richest class in the world and they want the best teacher.
  The education is the most important thing in the world, so you need to do your best.
  The family of the students are the most rich people in the world, so you need to do your best to prove that you are the best teacher in the world.
  Format the questions and their corresponding answers in JSON format. Ensure that each question is structured as a separate JSON object within an array.
  Each object should include the question text, a list of answers, and the correct answer's label.
  Just send me the JSON structure with the questions and answers, no text before or after the JSON structure.
  Use the following JSON structure as a guideline:
  ###
  [{{"description":"Hereisasamplequestion","correctAnswerKey":"a","options":[{{"key":"a","description":"Sampleanswer"}},{{"key":"b","description":"Sampleanswer"}},{{"key":"c","description":"Sampleanswer"}},{{"key":"d","description":"Sampleanswer"}}]}},{{"description":"Hereisasamplequestion","correctAnswerKey":"a","options":[{{"key":"a","description":"Sampleanswer"}},{{"key":"b","description":"Sampleanswer"}},{{"key":"c","description":"Sampleanswer"}},{{"key":"d","description":"Sampleanswer"}}]}}]
  ###
  Ensure that the questions are clear, relevant to the document's content, and designed in a way that tests understanding of the material. The answers should be plausible to prevent the correct answer from being obvious, except through understanding the content. Furthermore, it is extremely important that the generated JSON makes it possible to use JavaScript's JSON parse function`
)
