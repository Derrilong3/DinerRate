import Review from './Review';

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    image: string | null;
    reviews: Review[];
}
