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
		label: 'Product',
		path: '/product',
		icon: <HiOutlineShoppingCart />,
		subMenu: [
			
			{ key: 'sub1', label: 'Product List', path: '/ProductList', icon: < AiFillAccountBook/> },
			{ key: 'sub5', label: 'Add new product', path: '/Addnewproduct', icon: <AiFillAppstore /> },
			{ key: 'sub5', label: 'Product category', path: '/ProductCategoryList', icon: <AiFillAppstore /> },
			{ key: 'sub7', label: 'Add product ', path: '/UpdateProduct', icon: <AiFillAppstore /> },
			
		],

	},
	{
		key: 'Customer Management',
		label: 'Customer',
		path: '/products',
		icon: <HiOutlineCube />,
		subMenu: [
			{ key: 'sub2', label: 'Add Customer', path: '/AddCustomer', icon: <AiFillFolderOpen /> },
			{ key: 'sub2', label: 'Customer List', path: '/CustomerList', icon: <AiFillFolderOpen /> },
			
			
		  ],
	},
	{
		key: 'Stock',
		label: 'Sales Rep',
		path: '/products',
		icon: <HiOutlineCube />,
		subMenu: [
			{ key: 'sub1', label: 'Sales Rep List', path: '/SalesRepList', icon: < AiFillAccountBook/> },
			{ key: 'sub2', label: 'Add Sales Rep', path: '/SalesRep', icon: <AiFillAppstore /> },
			{ key: 'sub2', label: 'Set Sales Target', path: '/CreateMonthlySalesTarget', icon: <AiFillAppstore /> },
			
		  ],
	},
	
	{
		key: 'Roots',
		label: 'Vehicle Management',
		path: '/customers',
		icon: <HiOutlineUsers />,
		subMenu: [
			{ key: 'sub1', label: 'Vehicles List', path: '/VehiclesList', icon: < AiFillAccountBook/> },
			{ key: 'sub2', label: 'Add Vehicles', path: '/Vehicles', icon: <AiFillAppstore /> },
			{ key: 'sub2', label: 'Add New Root', path: '/AddRoot', icon: <AiFillEdit /> },
			{ key: 'sub2', label: 'Root List', path: '/RootsList', icon: <AiFillFolderOpen /> },
			
			
		  ],
	},
	{
		key: 'transactions',
		label: 'Transactions',
		path: '/transactions',
		icon: <HiOutlineDocumentText />,
		subMenu: [
			
			{ key: 'sub2', label: 'Daily Sales Plane', path: '/DailySalesPlanForm', icon: <AiFillFolderOpen /> },
			{ key: 'sub2', label: 'List of Daily Sales Plane', path: '/DailySalesPlanList', icon: <AiFillFolderOpen /> },
			{ key: 'sub2', label: 'Create Invoice', path: '/CreateInvoice', icon: <AiFillFolderOpen /> },
			
		  ],
	},
	{
		key: 'messages',
		label: 'Report',
		path: '/PremadeProductPage',
		icon: <HiOutlineAnnotation />,
		subMenu: [
			
			
			{ key: 'sub2', label: 'Sales Rep Achievement', path: '/SalesRepAchievement', icon: <AiFillFolderOpen /> },
			{ key: 'sub2', label: 'Company Sales Report', path: '/CompanySalesReport', icon: <AiFillFolderOpen /> },
		  ],
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