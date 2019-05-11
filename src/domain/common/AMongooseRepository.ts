import { Document, model, Model, Schema } from 'mongoose';
import IRepository from './IRepository';
import { number } from 'joi';

export default abstract class AMongooseRepository<T extends Document> implements IRepository<T> {
  protected readonly mongooseModel: Model<T>;

  protected constructor(modelName: string, schema: Schema) {
    this.mongooseModel = model<T>(modelName, schema);
  }

  public createOne(item: T): Promise<T> {
    return this.mongooseModel.create(item);
  }

  public createMany(items: T[]): Promise<T[]> {
    return this.mongooseModel.create(items);
  }

  public readOne(idOrPredicate: string): Promise<T | null> {
    const query = (typeof idOrPredicate === 'string') ?
      this.mongooseModel.findById(idOrPredicate) :
      this.mongooseModel.findOne(idOrPredicate);

    return query.exec();
  }

  public read(predicate: any): Promise<T[]> {
    return this.mongooseModel.find(predicate).exec();
  }

  public readAll(): Promise<T[]> {
    return this.mongooseModel.find().exec();
  }

  public deleteOne(id: string): Promise<T | null> {
    return this.mongooseModel.findByIdAndDelete(id).exec();
  }
}
