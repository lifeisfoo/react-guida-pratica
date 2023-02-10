#! /usr/bin/env node
// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });
const { randomUUID: uuid } = require("crypto"); // >= v15.6.0, v14.17.0
// https://nodejs.org/docs/latest-v17.x/api/crypto.html#cryptorandomuuidoptions

fastify.get("/api/user", async (request, reply) => {
  return {
    id: 1,
    name: "Alessandro",
    image: "https://github.com/lifeisfoo.png",
  };
});

let lists = [];
let todos = [];

const countUndoneTodoByListId = (listId) =>
  todos.filter((t) => t.listId === listId && !t.done).length;
fastify.get("/api/lists", async (request, reply) => {
  return lists.map((l) => ({
    ...l,
    undone_count: countUndoneTodoByListId(l.id),
  }));
});

const listCU_Schema = {
  body: {
    type: "object",
    additionalProperties: false,
    required: ["name"],
    properties: {
      name: { type: "string" },
    },
  },
};
fastify.post(
  "/api/lists",
  { schema: listCU_Schema },
  async (request, reply) => {
    const newList = { ...request.body, id: uuid() };
    lists.unshift(newList);
    reply.code(201);
    return { ...newList, undone_count: 0 };
  }
);
fastify.patch(
  "/api/lists/:id",
  { schema: listCU_Schema },
  async (request, reply) => {
    const listIdx = lists.findIndex((l) => l.id === request.params.id);
    if (listIdx === -1) {
      reply.code(404).send();
    }
    const patchedList = { ...lists[listIdx], ...request.body };
    lists[listIdx] = patchedList;
    reply.code(200);
    return {
      ...patchedList,
      undone_count: countUndoneTodoByListId(patchedList.id),
    };
  }
);
fastify.delete("/api/lists/:id", async (request, reply) => {
  const listIdx = lists.findIndex((l) => l.id === request.params.id);
  if (listIdx === -1) {
    reply.code(404).send();
  }
  const toDelList = lists.splice(listIdx, 1);
  todos = todos.filter((t) => t.listId !== toDelList.id);
  reply.code(200);
  return toDelList;
});

const todoC_Schema = {
  body: {
    type: "object",
    required: ["text", "done", "listId"],
    properties: {
      listId: { type: "string" },
      text: { type: "string" },
      done: { type: "boolean" },
    },
  },
};

fastify.get("/api/todos", async (request, reply) => {
  if (request.query.listId) {
    return todos.filter((t) => t.listId === request.query.listId);
  } else {
    return todos;
  }
});

fastify.post("/api/todos", { schema: todoC_Schema }, async (request, reply) => {
  const listIdx = lists.findIndex((l) => l.id === request.body.listId);
  if (listIdx === -1) {
    reply.code(404).send();
  }
  todos.unshift({ ...request.body, listId: request.body.listId, id: uuid() });
  reply.code(201);
  return todos[0];
});

const todoP_Schema = { ...todoC_Schema };
delete todoP_Schema.body.required;
delete todoP_Schema.body.properties.listId;

fastify.patch(
  "/api/todos/:id",
  { schema: todoP_Schema },
  async (request, reply) => {
    const todoIdx = todos.findIndex((t) => t.id === request.params.id);
    if (todoIdx === -1) {
      reply.code(404).send();
    }

    todos[todoIdx] = { ...todos[todoIdx], ...request.body };
    reply.code(200);
    return todos[todoIdx];
  }
);
fastify.delete("/api/todos/:id", async (request, reply) => {
  const todoIdx = todos.findIndex((t) => t.id === request.params.id);
  if (todoIdx === -1) {
    reply.code(404).send();
  }

  const toDelTodo = todos.splice(todoIdx, 1);

  reply.code(200);
  return toDelTodo;
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: 4000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
