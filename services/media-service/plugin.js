/// <reference path="./clients/people/people.d.ts" />

'use strict';

/** @param {import('fastify').FastifyInstance} app */
module.exports = async function peopleDataPlugin(app) {
  function buildOnComposerResponseCallback(peopleProps) {
    return async function addPeopleToResponse(request, reply, body) {
      let entities = await body.json();

      const multipleEntities = Array.isArray(entities);
      if (!multipleEntities) {
        entities = [entities];
      }

      const peopleIds = [];
      for (const entity of entities) {
        for (const {idProp} of peopleProps) {
          peopleIds.push(entity[idProp]);
        }
      }

      const people = await request.people.getPeople({'where.id.in': peopleIds.join(',')});

      const getPersonNameById = (id) => {
        const person = people.find(person => person.id === id);
        return (person) ? person.name : null;
      };

      for (const entity of entities) {
        for (const {idProp, nameProp} of peopleProps) {
          entity[nameProp] = getPersonNameById(entity[idProp]);
        }
      }

      reply.send(multipleEntities ? entities : entities[0]);
    };
  }

  function buildOnComposerRequestHandler(peopleProps) {
    return async function processPeopleInRequest(request) {
      const body = request.body;

      const allPeople = await request.people.getPeople({});

      for (const {idProp, nameProp} of peopleProps) {
        if (body[nameProp] && !body[idProp]) {
          const person = allPeople.find(person => person.name === body[nameProp]);
          if (person) {
            body[idProp] = person.id;
          } else {
            throw new Error(`Person with name "${body[nameProp]}" not found`);
          }
        }
      }

      return body;
    };
  }

  function booksOnGetRouteHook(routeOptions) {
    const responseSchema = routeOptions.schema.response[200];
    const entitySchema = (responseSchema.items) ? responseSchema.items : responseSchema;
    entitySchema.properties.authorName = {type: 'string'};
    entitySchema.required = entitySchema.required || [];
    entitySchema.required.push('authorName');

    routeOptions.config.onComposerResponse = buildOnComposerResponseCallback([
      {idProp: 'authorId', nameProp: 'authorName'}
    ]);
  }

  function booksOnMutationRouteHook(routeOptions) {
    const bodySchema = routeOptions.schema.body;
    bodySchema.properties.authorName = {type: 'string'};

    const originalHandler = routeOptions.preHandler || (async () => {
    });
    routeOptions.preHandler = async (request, reply) => {
      await originalHandler(request, reply);

      const peopleHandler = buildOnComposerRequestHandler([
        {idProp: 'authorId', nameProp: 'authorName'}
      ]);

      request.body = await peopleHandler(request);
    };
  }

  app.platformatic.addComposerOnRouteHook('/books/', ['GET'], booksOnGetRouteHook);
  app.platformatic.addComposerOnRouteHook('/books/{id}', ['GET'], booksOnGetRouteHook);
  app.platformatic.addComposerOnRouteHook('/books/', ['POST'], booksOnMutationRouteHook);
  app.platformatic.addComposerOnRouteHook('/books/{id}', ['PUT'], booksOnMutationRouteHook);

  function moviesOnGetRouteHook(routeOptions) {
    const responseSchema = routeOptions.schema.response[200];
    const entitySchema = (responseSchema.items) ? responseSchema.items : responseSchema;
    entitySchema.properties.directorName = {type: 'string'};
    entitySchema.properties.producerName = {type: 'string'};
    entitySchema.required = entitySchema.required || [];
    entitySchema.required.push('directorName', 'producerName');

    routeOptions.config.onComposerResponse = buildOnComposerResponseCallback([
      {idProp: 'directorId', nameProp: 'directorName'},
      {idProp: 'producerId', nameProp: 'producerName'}
    ]);
  }

  function moviesOnMutationRouteHook(routeOptions) {
    const bodySchema = routeOptions.schema.body;
    bodySchema.properties.directorName = {type: 'string'};
    bodySchema.properties.producerName = {type: 'string'};

    const originalHandler = routeOptions.preHandler || (async () => {
    });
    routeOptions.preHandler = async (request, reply) => {
      await originalHandler(request, reply);

      const peopleHandler = buildOnComposerRequestHandler([
        {idProp: 'directorId', nameProp: 'directorName'},
        {idProp: 'producerId', nameProp: 'producerName'}
      ]);

      request.body = await peopleHandler(request);
    };
  }

  app.platformatic.addComposerOnRouteHook('/movies/', ['GET'], moviesOnGetRouteHook);
  app.platformatic.addComposerOnRouteHook('/movies/{id}', ['GET'], moviesOnGetRouteHook);
  app.platformatic.addComposerOnRouteHook('/movies/', ['POST'], moviesOnMutationRouteHook);
  app.platformatic.addComposerOnRouteHook('/movies/{id}', ['PUT'], moviesOnMutationRouteHook);

  app.get('/people', async (request, reply) => {
    try {
      return await request.people.getPeople({});
    } catch (err) {
      request.log.error({err}, 'Error getting people');
      reply.code(500).send({error: 'Failed to get people'});
    }
  });

  app.post('/people', async (request, reply) => {
    try {
      const {name} = request.body;
      if (!name || typeof name !== 'string') {
        return reply.code(400).send({error: 'Name is required and must be a string'});
      }

      return await request.people.createPerson({name});
    } catch (err) {
      request.log.error({err}, 'Error creating person');
      reply.code(500).send({error: 'Failed to create person'});
    }
  });
};