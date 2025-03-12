import Rating from './Rating';

export default interface Restaurant {
    id: string;
    name: string;
    description: string;
    currency: string;
    image: string;
    address: string;
    ratings: Rating[];
    totalReviews: number;
}
