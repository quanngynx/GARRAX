'use strict';
import { Models, News } from '@/common/interfaces';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

import { default as slugify } from 'slugify';

export type NewsCreationAttributes = Optional<News, 'id' | 'createdAt' | 'updatedAt'>;

export class NewsModel extends Model<News, NewsCreationAttributes> {
  // id!: number;
  public title!: string;
  public alias!: string;
  // description!: string;
  // detail!: string;
  // image!: string;
  // category!: string;
  // isActive!: boolean;
  // createDate!: Date;
  // createdAt!: Date;
  // updatedAt!: Date;

  // public static associations: {};
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static associate(_models: Models) {
    // define association here
  }
}

export const newsModel = (sequelize: Sequelize) => {
  NewsModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING
      },
      alias: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING
      },
      detail: {
        type: DataTypes.STRING
      },
      image: {
        type: DataTypes.STRING
      },
      category: {
        type: DataTypes.STRING
      },
      isActive: {
        type: DataTypes.BOOLEAN
      },
      createDate: {
        type: DataTypes.DATE
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    },
    {
      sequelize,
      modelName: 'News',
      tableName: 'news',
      timestamps: true,
      hooks: {
        beforeValidate: (news: NewsModel) => {
          news.alias = slugify(news.title, { lower: true, trim: true });
        }
      }
    }
  );
  return NewsModel;
};
export default newsModel;
