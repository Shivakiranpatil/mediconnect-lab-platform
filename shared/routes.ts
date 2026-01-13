import { z } from 'zod';
import { 
  insertUserSchema, 
  insertAppointmentSchema, 
  users, 
  bundles, 
  tests, 
  appointments, 
  partnerLabs,
  aiQuestions,
  aiRuleSets
} from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  auth: {
    login: {
      method: 'POST' as const,
      path: '/api/auth/login',
      input: z.object({
        username: z.string(),
        password: z.string(),
      }),
      responses: {
        200: z.custom<typeof users.$inferSelect>(),
        401: z.object({ message: z.string() }),
      },
    },
    register: {
      method: 'POST' as const,
      path: '/api/auth/register',
      input: insertUserSchema,
      responses: {
        201: z.custom<typeof users.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    me: {
      method: 'GET' as const,
      path: '/api/auth/me',
      responses: {
        200: z.custom<typeof users.$inferSelect>(),
        401: z.null(),
      },
    },
  },
  bundles: {
    list: {
      method: 'GET' as const,
      path: '/api/bundles',
      responses: {
        200: z.array(z.custom<typeof bundles.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/bundles/:id',
      responses: {
        200: z.custom<typeof bundles.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  ai: {
    questions: {
      method: 'GET' as const,
      path: '/api/ai/questions',
      responses: {
        200: z.array(z.custom<typeof aiQuestions.$inferSelect>()),
      },
    },
    recommend: {
      method: 'POST' as const,
      path: '/api/ai/recommend',
      input: z.object({
        answers: z.record(z.string()),
      }),
      responses: {
        200: z.object({
          recommendations: z.array(z.custom<typeof bundles.$inferSelect & { reason?: string }>()),
        }),
      },
    },
  },
  appointments: {
    create: {
      method: 'POST' as const,
      path: '/api/appointments',
      input: insertAppointmentSchema,
      responses: {
        201: z.custom<typeof appointments.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    list: {
      method: 'GET' as const,
      path: '/api/appointments',
      responses: {
        200: z.array(z.custom<typeof appointments.$inferSelect>()),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
