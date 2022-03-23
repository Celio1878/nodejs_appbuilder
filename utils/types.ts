export enum Category {
	ORIGINAL = 'original',
	ADVENTURE = 'adventure',
	ACTION = 'action',
	TERROR = 'terror',
	THRILLER = 'thriller',
	HUMOR = 'humor',
	ROMANCE = 'romance',
	FANTASY = 'fantasy',
}

export enum Copyright {
	PRIVATE = 'private',
	PUBLIC = 'public',
}

export enum AgeRange {
	FREE = 'free',
	TEN = '10-years',
	TWELVE = '12-years',
	SIXTEEN = '16-years',
	EIGHTEEN = '18-years',
}

export type Tag = {
	id: string;
	title: string;
};
