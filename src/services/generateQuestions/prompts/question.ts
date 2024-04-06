import { ChatPromptTemplate } from '@langchain/core/prompts'
import { JsonOutputFunctionsParser } from 'langchain/output_parsers'

export const questionTemplate = ChatPromptTemplate.fromTemplate(
    `I are the best english teacher in the world, your task is to generate questions based on the following text.

    Please read this text carefully. 

    {text}.

    After understanding its content, generate {number} multiple-choice questions based on the key information extracted from the text. 
    Each question should have four possible answers labeled as 'a', 'b', 'c', and 'd', with one of these being the correct answer.
    Remember, is just {number} questions.
    Format the questions and their corresponding answers in JSON format. Ensure that each question is structured as a separate JSON object within an array. 
    Each object should include the question text, a list of answers, and the correct answer's label. 
    Just send me the JSON structure with the questions and answers, no text before or after the JSON structure.
    Use the following JSON structure as a guideline:

    ###
    [
    {{
    "question": "What is the main theme of the document?",
    "options": {{
    "a": "Option A",
    "b": "Option B",
    "c": "Option C",
    "d": "Option D"
    }},
    "correctAnswer": "a"
    }},
    ]
    ###
    Ensure that the questions are clear, relevant to the document's content, and designed in a way that tests understanding of the material. The answers should be plausible to prevent the correct answer from being obvious, except through understanding the content.`,
)
