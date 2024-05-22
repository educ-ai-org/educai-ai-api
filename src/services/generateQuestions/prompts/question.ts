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
    Format the questions and their corresponding answers in JSON format. Ensure that each question is structured as a separate JSON object within an array.
    Each object should include the question text, a list of answers, and the correct answer's label.
    Just send me the JSON structure with the questions and answers, no text before or after the JSON structure.
    Use the following JSON structure as a guideline:
    ###
    [
        {{
            "description": "Here is a sample question",
            "correctAnswerKey": "a",
            "options": [
                {{
                    "key": "a",
                    "description": "Sample answer"
                }},
                {{
                    "key": "b",
                    "description": "Sample answer"
                }},
                {{
                    "key": "c",
                    "description": "Sample answer"
                }},
                {{
                    "key": "d",
                    "description": "Sample answer"
                }}
            ]
        }},
        {{
            "description": "Here is a sample question",
            "correctAnswerKey": "a",
            "options": [
                {{
                    "key": "a",
                    "description": "Sample answer"
                }},
                {{
                    "key": "b",
                    "description": "Sample answer"
                }},
                {{
                    "key": "c",
                    "description": "Sample answer"
                }},
                {{
                    "key": "d",
                    "description": "Sample answer"
                }}
            ]
        }}
    ]
    ###
    Ensure that the questions are clear, relevant to the document's content, and designed in a way that tests understanding of the material. The answers should be plausible to prevent the correct answer from being obvious, except through understanding the content.`,
)
