import { getCustomRepository, getRepository, In } from 'typeorm';
import csvParse from 'csv-parse';
import fs from 'fs';

import Transaction from '../models/Transaction';
import Category from '../models/Category';
import TransactionsRepository from '../repositories/TransactionsRepository';

class ImportTransactionsService {
  async execute(filePath: string): Promise<Transaction[]> {
    const transactionRepository = getCustomRepository(TransactionsRepository);
    const categoriesRepository = getRepository(Category);

    const contactsReadStream = fs.createReadStream(filePath);

    const parsers = csvParse({
      //delimiter: ";" //if the delimiter for each variable would be a ;. "," is the default.
      from_line: 2, //ignore first line since it is just our header on our file.
    });

    interface CSVTransaction {
      title: string;
      type: 'income' | 'outcome';
      value: number;
      category: string;
    }
    const parseCSV = contactsReadStream.pipe(parsers);

    const transactions: CSVTransaction[] = [];
    const categories: string[] = [];

    parseCSV.on('data', async line => {
      const [title, type, value, category] = line.map((cell: string) =>
        cell.trim(),
      );

      if (!title || !type || !value) return;

      categories.push(category);
      transactions.push({ title, type, value, category });
    });

    await new Promise(resolve => parseCSV.on('end', resolve));

    // check if the categories exists in the database
    const existentCategories = await categoriesRepository.find({
      where: {
        title: In(categories),
      },
    });

    // mapping to only save titles not ID and other variables of categories found.
    const existentCategoriesTitles = existentCategories.map(
      (category: Category) => category.title,
    );

    // find and add categories that are in the file but not on the DB already.
    // second filter to remove duplicates inside the file itself
    const addCategoryTitles = categories
      .filter(category => !existentCategoriesTitles.includes(category))
      .filter((value, index, self) => self.indexOf(value) === index);

    const newCategories = categoriesRepository.create(
      addCategoryTitles.map(title => ({
        title,
      })),
    );

    await categoriesRepository.save(newCategories);
  }
}

export default ImportTransactionsService;
