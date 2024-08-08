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
			
			{ key: 'sub4', label: 'Add new order', path: '/Add_new_order', icon: <AiFillAccountBook /> },
			{ key: 'sub5', label: 'List of Order', path: '/List_Of_order', icon: <AiFillAppstore /> },
			{ key: 'sub5', label: 'Add new customer', path: '/Addnewcustomer', icon: <AiFillAppstore /> },
			{ key: 'sub6', label: 'Add product category', path: '/Addproductcatagry', icon: <AiFillAppstore /> },
			{ key: 'sub7', label: 'Add product ', path: '/Addproduct', icon: <AiFillAppstore /> },

		],

	},
	{
		key: 'Stock',
		label: 'Stock Management',
		path: '/products',
		icon: <HiOutlineCube />,
		subMenu: [
			{ key: 'sub1', label: 'Stock Inquiry', path: '/StockManagement', icon: < AiFillAccountBook/> },
			{ key: 'sub2', label: 'Stock List', path: '/Product_list', icon: <AiFillAppstore /> },
			{ key: 'sub2', label: 'Add New Stock', path: '/Add_product', icon: <AiFillEdit /> },
			{ key: 'sub2', label: 'Stock Issue', path: '/Issue_product', icon: <AiFillFolderOpen /> },
			
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
		path: '/PremadeProductPage',
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