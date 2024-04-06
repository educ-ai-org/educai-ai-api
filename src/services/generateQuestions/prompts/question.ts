import {
    ChatPromptTemplate,
    FewShotChatMessagePromptTemplate,
  } from '@langchain/core/prompts'
  
  // Example of the task to generate multiple-choice questions from a text
  const examples = [
    {
      input: 'The Earth revolves around the Sun. The Earth completes one revolution every 365 days, which is known as a year.',
      output: `[
        {
          'question': 'What does the Earth revolve around?',
          'options': {
            'a': 'The Moon',
            'b': 'The Sun',
            'c': 'Mars',
            'd': 'Venus'
          },
          'correctAnswer': 'b'
        },
        {
          'question': 'How long does it take for the Earth to complete one revolution around the Sun?',
          'options': {
            'a': '365 days',
            'b': '30 days',
            'c': '24 hours',
            'd': '7 days'
          },
          'correctAnswer': 'a'
        }
      ]`
    }
  ];
  
  const examplePrompt = ChatPromptTemplate.fromTemplate(`Text: {input}\nGenerated Questions: {output}`);
  
  const fewShotPrompt = new FewShotChatMessagePromptTemplate({
    prefix: "Generate multiple-choice questions based on the key information extracted from the text. Each question should have four possible answers labeled as 'a', 'b', 'c', and 'd', with one of these being the correct answer. Format the questions in JSON format, structured as separate JSON objects within an array. Here is an example based on a provided text:",
    suffix: 'Text: {input}',
    examplePrompt,
    examples,
    inputVariables: ['input'], // Assuming "input" is the variable holding the text to base questions on
  });
  
export const questionTemplate = fewShotPrompt
  