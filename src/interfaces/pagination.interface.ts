export interface Pagination<T> {
	data: T[];
	pagination: {
		totalPage: number;
		pageSize: number;
		pageId: number;
	};
}
