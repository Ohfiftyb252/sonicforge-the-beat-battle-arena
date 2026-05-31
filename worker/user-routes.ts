import { Hono } from "hono";
import type { Env } from './core-utils';
import { UserEntity, ChatBoardEntity, BeatEntity, BattleEntity } from "./entities";
import { ok, bad, notFound, isStr } from './core-utils';
import type { Comment } from "@shared/types";
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // BEATS
  app.get('/api/beats', async (c) => {
    await BeatEntity.ensureSeed(c.env);
    const cq = c.req.query('cursor');
    const lq = c.req.query('limit');
    return ok(c, await BeatEntity.list(c.env, cq ?? null, lq ? Math.max(1, (Number(lq) | 0)) : undefined));
  });
  app.get('/api/beats/:id', async (c) => {
    const beat = new BeatEntity(c.env, c.req.param('id'));
    if (!await beat.exists()) return notFound(c, 'Beat not found');
    return ok(c, await beat.getState());
  });
  app.post('/api/beats', async (c) => {
    const data = await c.req.json();
    if (!data.title || !data.audioUrl) return bad(c, 'Missing required fields');
    const beat = await BeatEntity.create(c.env, {
      ...data,
      id: crypto.randomUUID(),
      uploadDate: Date.now()
    });
    return ok(c, beat);
  });
  app.post('/api/beats/:id/comments', async (c) => {
    const { text, userId, userName } = await c.req.json();
    if (!text || !userId) return bad(c, 'Comment text and userId required');
    const beat = new BeatEntity(c.env, c.req.param('id'));
    if (!await beat.exists()) return notFound(c, 'Beat not found');
    const comment: Comment = {
      id: crypto.randomUUID(),
      beatId: c.req.param('id'),
      userId,
      userName: userName || 'Anonymous',
      text,
      timestamp: Date.now()
    };
    await beat.addComment(comment);
    return ok(c, comment);
  });
  // BATTLES
  app.get('/api/battles', async (c) => {
    await BattleEntity.ensureSeed(c.env);
    return ok(c, await BattleEntity.list(c.env));
  });
  app.get('/api/battles/:id', async (c) => {
    const battle = new BattleEntity(c.env, c.req.param('id'));
    if (!await battle.exists()) return notFound(c, 'Battle not found');
    return ok(c, await battle.getState());
  });
  // USERS / PROFILES
  app.get('/api/users/:id', async (c) => {
    const user = new UserEntity(c.env, c.req.param('id'));
    if (!await user.exists()) return notFound(c, 'User not found');
    return ok(c, await user.getState());
  });
}