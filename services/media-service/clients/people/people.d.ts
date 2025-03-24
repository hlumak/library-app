import { type FastifyReply, type FastifyPluginAsync } from 'fastify'
import { type GetHeadersOptions, type StatusCode1xx, type StatusCode2xx, type StatusCode3xx, type StatusCode4xx, type StatusCode5xx } from '@platformatic/client'
import { type FormData } from 'undici'

declare namespace people {
  export type People = {
    /**
     * Get people.
     *
     * Fetch people from the database.
     * @param req - request parameters object
     * @returns the API response body
     */
    getPeople(req: GetPeopleRequest): Promise<GetPeopleResponses>;
    /**
     * Create person.
     *
     * Add new person to the database.
     * @param req - request parameters object
     * @returns the API response body
     */
    createPerson(req: CreatePersonRequest): Promise<CreatePersonResponses>;
    /**
     * Update people.
     *
     * Update one or more people in the database.
     * @param req - request parameters object
     * @returns the API response body
     */
    updatePeople(req: UpdatePeopleRequest): Promise<UpdatePeopleResponses>;
    /**
     * Get Person by id.
     *
     * Fetch Person using its id from the database.
     * @param req - request parameters object
     * @returns the API response body
     */
    getPersonById(req: GetPersonByIdRequest): Promise<GetPersonByIdResponses>;
    /**
     * Update person.
     *
     * Update person in the database.
     * @param req - request parameters object
     * @returns the API response body
     */
    updatePerson(req: UpdatePersonRequest): Promise<UpdatePersonResponses>;
    /**
     * Delete people.
     *
     * Delete one or more people from the Database.
     * @param req - request parameters object
     * @returns the API response body
     */
    deletePeople(req: DeletePeopleRequest): Promise<DeletePeopleResponses>;
  }
  export interface PeopleOptions {
    url: string
  }
  export const people: PeoplePlugin;
  export { people as default };
  export interface FullResponse<T, U extends number> {
    'statusCode': U;
    'headers': Record<string, string>;
    'body': T;
  }

  export type GetPeopleRequest = {
    /**
     * Limit will be applied by default if not passed. If the provided value exceeds the maximum allowed value a validation error will be thrown
     */
    'limit'?: number;
    'offset'?: number;
    'totalCount'?: boolean;
    'fields'?: Array<'createdAt' | 'id' | 'name' | 'updatedAt'>;
    'where.createdAt.eq'?: string;
    'where.createdAt.neq'?: string;
    'where.createdAt.gt'?: string;
    'where.createdAt.gte'?: string;
    'where.createdAt.lt'?: string;
    'where.createdAt.lte'?: string;
    'where.createdAt.like'?: string;
    'where.createdAt.ilike'?: string;
    'where.createdAt.in'?: string;
    'where.createdAt.nin'?: string;
    'where.createdAt.contains'?: string;
    'where.createdAt.contained'?: string;
    'where.createdAt.overlaps'?: string;
    'where.id.eq'?: number;
    'where.id.neq'?: number;
    'where.id.gt'?: number;
    'where.id.gte'?: number;
    'where.id.lt'?: number;
    'where.id.lte'?: number;
    'where.id.like'?: number;
    'where.id.ilike'?: number;
    'where.id.in'?: string;
    'where.id.nin'?: string;
    'where.id.contains'?: string;
    'where.id.contained'?: string;
    'where.id.overlaps'?: string;
    'where.name.eq'?: string;
    'where.name.neq'?: string;
    'where.name.gt'?: string;
    'where.name.gte'?: string;
    'where.name.lt'?: string;
    'where.name.lte'?: string;
    'where.name.like'?: string;
    'where.name.ilike'?: string;
    'where.name.in'?: string;
    'where.name.nin'?: string;
    'where.name.contains'?: string;
    'where.name.contained'?: string;
    'where.name.overlaps'?: string;
    'where.updatedAt.eq'?: string;
    'where.updatedAt.neq'?: string;
    'where.updatedAt.gt'?: string;
    'where.updatedAt.gte'?: string;
    'where.updatedAt.lt'?: string;
    'where.updatedAt.lte'?: string;
    'where.updatedAt.like'?: string;
    'where.updatedAt.ilike'?: string;
    'where.updatedAt.in'?: string;
    'where.updatedAt.nin'?: string;
    'where.updatedAt.contains'?: string;
    'where.updatedAt.contained'?: string;
    'where.updatedAt.overlaps'?: string;
    'where.or'?: Array<string>;
    'orderby.createdAt'?: 'asc' | 'desc';
    'orderby.id'?: 'asc' | 'desc';
    'orderby.name'?: 'asc' | 'desc';
    'orderby.updatedAt'?: 'asc' | 'desc';
  }

  /**
   * Default Response
   */
  export type GetPeopleResponseOK = Array<{ 'id'?: number | null; 'name'?: string | null; 'createdAt'?: string | null; 'updatedAt'?: string | null }>
  export type GetPeopleResponses =
    GetPeopleResponseOK

  export type CreatePersonRequest = {
    'id'?: number;
    'name': string;
    'createdAt'?: string | null;
    'updatedAt'?: string | null;
  }

  /**
   * A Person
   */
  export type CreatePersonResponseOK = { 'id'?: number | null; 'name'?: string | null; 'createdAt'?: string | null; 'updatedAt'?: string | null }
  export type CreatePersonResponses =
    CreatePersonResponseOK

  export type UpdatePeopleRequest = {
    'fields'?: Array<'createdAt' | 'id' | 'name' | 'updatedAt'>;
    'where.createdAt.eq'?: string;
    'where.createdAt.neq'?: string;
    'where.createdAt.gt'?: string;
    'where.createdAt.gte'?: string;
    'where.createdAt.lt'?: string;
    'where.createdAt.lte'?: string;
    'where.createdAt.like'?: string;
    'where.createdAt.ilike'?: string;
    'where.createdAt.in'?: string;
    'where.createdAt.nin'?: string;
    'where.createdAt.contains'?: string;
    'where.createdAt.contained'?: string;
    'where.createdAt.overlaps'?: string;
    'where.id.eq'?: number;
    'where.id.neq'?: number;
    'where.id.gt'?: number;
    'where.id.gte'?: number;
    'where.id.lt'?: number;
    'where.id.lte'?: number;
    'where.id.like'?: number;
    'where.id.ilike'?: number;
    'where.id.in'?: string;
    'where.id.nin'?: string;
    'where.id.contains'?: string;
    'where.id.contained'?: string;
    'where.id.overlaps'?: string;
    'where.name.eq'?: string;
    'where.name.neq'?: string;
    'where.name.gt'?: string;
    'where.name.gte'?: string;
    'where.name.lt'?: string;
    'where.name.lte'?: string;
    'where.name.like'?: string;
    'where.name.ilike'?: string;
    'where.name.in'?: string;
    'where.name.nin'?: string;
    'where.name.contains'?: string;
    'where.name.contained'?: string;
    'where.name.overlaps'?: string;
    'where.updatedAt.eq'?: string;
    'where.updatedAt.neq'?: string;
    'where.updatedAt.gt'?: string;
    'where.updatedAt.gte'?: string;
    'where.updatedAt.lt'?: string;
    'where.updatedAt.lte'?: string;
    'where.updatedAt.like'?: string;
    'where.updatedAt.ilike'?: string;
    'where.updatedAt.in'?: string;
    'where.updatedAt.nin'?: string;
    'where.updatedAt.contains'?: string;
    'where.updatedAt.contained'?: string;
    'where.updatedAt.overlaps'?: string;
    'where.or'?: Array<string>;
    'id'?: number;
    'name': string;
    'createdAt'?: string | null;
    'updatedAt'?: string | null;
  }

  /**
   * Default Response
   */
  export type UpdatePeopleResponseOK = Array<{ 'id'?: number | null; 'name'?: string | null; 'createdAt'?: string | null; 'updatedAt'?: string | null }>
  export type UpdatePeopleResponses =
    UpdatePeopleResponseOK

  export type GetPersonByIdRequest = {
    'fields'?: Array<'createdAt' | 'id' | 'name' | 'updatedAt'>;
    'id': number;
  }

  /**
   * A Person
   */
  export type GetPersonByIdResponseOK = { 'id'?: number | null; 'name'?: string | null; 'createdAt'?: string | null; 'updatedAt'?: string | null }
  export type GetPersonByIdResponses =
    GetPersonByIdResponseOK

  export type UpdatePersonRequest = {
    'fields'?: Array<'createdAt' | 'id' | 'name' | 'updatedAt'>;
    'id': number;
    'name': string;
    'createdAt'?: string | null;
    'updatedAt'?: string | null;
  }

  /**
   * A Person
   */
  export type UpdatePersonResponseOK = { 'id'?: number | null; 'name'?: string | null; 'createdAt'?: string | null; 'updatedAt'?: string | null }
  export type UpdatePersonResponses =
    UpdatePersonResponseOK

  export type DeletePeopleRequest = {
    'fields'?: Array<'createdAt' | 'id' | 'name' | 'updatedAt'>;
    'id': number;
  }

  /**
   * A Person
   */
  export type DeletePeopleResponseOK = { 'id'?: number | null; 'name'?: string | null; 'createdAt'?: string | null; 'updatedAt'?: string | null }
  export type DeletePeopleResponses =
    DeletePeopleResponseOK

}

type PeoplePlugin = FastifyPluginAsync<NonNullable<people.PeopleOptions>>

declare module 'fastify' {
  interface ConfigurePeople {
    getHeaders(req: FastifyRequest, reply: FastifyReply, options: GetHeadersOptions): Promise<Record<string,string>>;
  }
  interface FastifyInstance {
    configurePeople(opts: ConfigurePeople): unknown
  }

  interface FastifyRequest {
    /**
     * Platformatic DB
     *
     * Exposing a SQL database as REST
     */
    'people': people.People;
  }
}

declare function people(...params: Parameters<PeoplePlugin>): ReturnType<PeoplePlugin>;
export = people;
