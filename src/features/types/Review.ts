export default interface Review {
    id: string;
    user: {
        id: string;
        name: string;
        image: string;
    };
    rating: number;
    comment: string;
    updatedAt: Date;
    createdAt: Date;
}
