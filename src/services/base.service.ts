import { EntityManager, EntityTarget, FindOptionsWhere, ObjectLiteral, Repository } from "typeorm";
import { db } from "../config/db";

export default class BaseService<T extends ObjectLiteral> {

    private readonly _em: EntityManager;
    private readonly _repo: Repository<T>;

    constructor(protected entity: EntityTarget<T>) {
        const em = db.createEntityManager();
        this._em = em;
        this._repo = em.getRepository(entity);
    }

    public get em(): EntityManager {
        return this._em;
    }

    public get repo(): Repository<T> {
        return this._repo;
    }

    public async save(value: T): Promise<T> {
        return this.repo.save(value);
    }

    public async getById(id: unknown): Promise<T | null> {
        return this.repo.findOneBy({ id } as FindOptionsWhere<T>);
    }

}
