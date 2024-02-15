export interface HealthCheck {
	env: string;
	time_zone: string;
	timestamp: Date;
	local_timestamp: string;
	app: {
		name: string;
		version: string;
	};
}

export interface Page<T> {
	page: number;
	rows: number;
	count: number;
	list: T[];
}

export function createPage<T>({ page = 1, rows = 15, count = 0, list = [] }: Partial<Page<T>>) {
	return {
		page: page,
		rows: rows,
		count: count,
		list: list,
	};
}
