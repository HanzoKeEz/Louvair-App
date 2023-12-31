import { Access, CollectionConfig } from 'payload/types'

const adminsAndUser: Access = ({ req: { user } }) => {
	if (user.role === 'admin') return true

	return {
		id: {
			equals: user.id,
		},
	}
}

export const Users: CollectionConfig = {
	slug: 'users',
	fields: [
		{
			name: 'role',
			type: 'select',
			options: [
				{
					label: 'Admin',
					value: 'admin',
				},
				{
					label: 'User',
					value: 'user',
				},
			],
		},
	],
}
