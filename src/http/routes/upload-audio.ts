import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { db } from '../../db/connection.ts'
import { audio_chunks } from '../../db/schema/audio-chunks.ts'
import { generateEmbeddings, transcribeAudio } from '../../services/gemini.ts'

export const uploadAudioRoute: FastifyPluginCallbackZod = app => {
  app.post(
    '/rooms/:roomId/audio',
    {
      schema: {
        params: z.object({
          roomId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { roomId } = request.params
      const audio = await request.file()

      if (!audio) {
        throw new Error('No audio file uploaded.')
      }

      // Acumula em memória o arquivo
      const audioBuffer = await audio.toBuffer()
      const audioAsBase64 = audioBuffer.toString('base64')

      // Trasncrever o audio
      const transcription = await transcribeAudio(audioAsBase64, audio.mimetype)

      // Gerar o vetor semantico (embeddings)
      const embeddings = await generateEmbeddings(transcription)

      const result = await db
        .insert(audio_chunks)
        .values({ roomId, transcription, embeddings })
        .returning()

      const chunk = result[0]

      if (!chunk) {
        throw new Error('Failed to create new chunk.')
      }

      return reply.status(201).send({ chunkId: chunk.id })
    },
  )
}
