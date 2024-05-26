import { Question } from '../../models/Question';
import { ResourcesUploaded } from '../../models/ResourcesUploaded'

export async function generateQuestion({
    youtubeLink,
    document,
    audio,
    instructions,
}: ResourcesUploaded): Promise<Question> {
    return {
        description: 'Complete corretamente: We _______ an interesting movie tonight',
        correctAnswerKey: 'c',
        options: [
            {
                key: 'a',
                description: 'watch',
            },
            {
                key: 'b',
                description: 'watched',
            },
            {
                key: 'c',
                description: 'are watching',
            },
            {
                key: 'd',
                description: 'watching',
            }
        ]
    };
}
