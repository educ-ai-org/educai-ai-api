import { ChatPromptTemplate } from '@langchain/core/prompts'
import { JsonOutputFunctionsParser } from 'langchain/output_parsers'

export const materialTemplate = ChatPromptTemplate.fromTemplate(
    `
    Gere um material com o seguinte conteúdo:

      {{content}}
    `
)
