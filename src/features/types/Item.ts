import { Currency } from './Currency';

export default interface Item {
    id: string;
    itemType: string;
    name: string;
    currency: Currency;
    image: string;
    description: string;
    price: number;
    avgRating?: number;
    userRating?: number;
}
