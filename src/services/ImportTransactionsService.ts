import csvParse from 'csv-parse';
import fs from 'fs';
import Transaction from '../models/Transaction';

class ImportTransactionsService {
  async execute(filePath: string): Promise<Transaction[]> {
    const contactsReadStream = fs.createReadStream(filePath);

    const parsers = csvParse({
      //delimiter: ";" //if the delimiter for each variable would be a ;. "," is the default.
      from_line: 2, //ignore first line since it is just our header on our file.
    });

    const parseCSV = contactsReadStream.pipe(parsers);

    const transactions = [];
    const categories = [];

    parseCSV.on('data', async line => {
      const [title, type, value, category] = line.map((cell: string) =>
        cell.trim(),
      );

      if (!title || !type || !value) return;

      categories.push(category);
      transactions.push({ title, type, value, category });
    });

    await new Promise(resolve => parseCSV.on('end', resolve));
    return { categories, transactions };
  }
}

export default ImportTransactionsService;
