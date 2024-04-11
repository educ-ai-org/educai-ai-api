import { ChatPromptTemplate } from '@langchain/core/prompts'
import { JsonOutputFunctionsParser } from 'langchain/output_parsers'

export const questionTemplate = ChatPromptTemplate.fromTemplate(
    `
    As the world's most renowned English teacher, your new mission is to develop personalized English practice questions that rigorously align with the following parameters:

- **Level/Difficulty:** {level} (e.g., beginner, intermediate, advanced)
- **Question Theme:** {theme} (e.g., verbs, vocabulary, pronouns, infinitive)
- **Related Theme:** {relatedTheme} (e.g., Breaking Bad, fast food, movies, Fortnite, music)

Based on these criteria, it's imperative that you read and thoroughly understand the provided text:

    {text}

After analyzing the text, with a clear understanding of its content and considering the specified parameters, you are to generate {number} multiple-choice questions. Each question must:

1. Reflect the key information and themes identified in the text.
2. Be aligned with the specified level of difficulty, without exceptions.
3. Directly incorporate the Question Theme (e.g., use of the specified verb tense, practical application of vocabulary, etc.).
4. Insert elements or contexts from the specified Related Theme, ensuring this theme clearly permeates the question and answer options.

The questions and their possible answers must be formatted in JSON, strictly following the structure below:

[
    {
    "question": "Insert your question here, ensuring it meets the level, the question theme, and the related theme?",
    "options": {
    "a": "Option A",
    "b": "Option B",
    "c": "Option C",
    "d": "Option D"
    },
    "correctAnswer": "a"
    }
]


It's crucial that each question not only tests understanding of the provided text but also engages the learner by integrating interest in the specified Related Theme. All questions must be relevant to the student's level of proficiency and focused on the specified Question Theme. The answers must be plausible to challenge the learner, with only one correct answer that can be deduced by understanding the text, the grammatical concept, and the nuances of the Related Theme.

Remember: the incorporation of the Question Theme and the Related Theme is mandatory in every question, ensuring that the questions are appropriate and engaging for the intended audience.
    `
)
