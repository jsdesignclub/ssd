import {
	HiOutlineViewGrid,
	HiOutlineCube,
	HiOutlineShoppingCart,
	HiOutlineUsers,
	HiOutlineDocumentText,
	HiOutlineAnnotation,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog		
} from 'react-icons/hi'
import { 
	AiFillAccountBook,
	AiFillAppstore,
	AiFillEdit,
	AiFillFolderOpen


} from "react-icons/ai";

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/',
		icon: <HiOutlineViewGrid />
		
	},
	{
		key: 'orders',
		label: 'Orders',
		path: '/orders',
		icon: <HiOutlineShoppingCart />,
		subMenu: [
			{ key: 'sub1', label: 'Create New Order', path: '/New_Order', icon: < AiFillAccountBook/> },
			{ key: 'sub2', label: 'Orders List', path: '/Product_list', icon: <AiFillAppstore /> },
			
		  ],

	},
	{
		key: 'products',
		label: 'Products',
		path: '/products',
		icon: <HiOutlineCube />,
		subMenu: [
			{ key: 'sub1', label: 'Create Product', path: '/New_product', icon: < AiFillAccountBook/> },
			{ key: 'sub2', label: 'Product List', path: '/Product_list', icon: <AiFillAppstore /> },
			{ key: 'sub2', label: 'Add Product', path: '/Add_product', icon: <AiFillEdit /> },
			{ key: 'sub2', label: 'Product Issue', path: '/Issue_product', icon: <AiFillFolderOpen /> },
		  ],
	},
	
	{
		key: 'customers',
		label: 'Customers',
		path: '/customers',
		icon: <HiOutlineUsers />
	},
	{
		key: 'transactions',
		label: 'Transactions',
		path: '/transactions',
		icon: <HiOutlineDocumentText />
	},
	{
		key: 'messages',
		label: 'Messages',
		path: '/messages',
		icon: <HiOutlineAnnotation />
	}
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'settings',
		label: 'Settings',
		path: '/settings',
		icon: <HiOutlineCog />
	},
	{
		key: 'support',
		label: 'Help & Support',
		path: '/support',
		icon: <HiOutlineQuestionMarkCircle />
	}
]