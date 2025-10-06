import { useState, useEffect } from 'react';
import { Search, Trash2, ChevronDown } from 'lucide-react';
import AdminNav from '../components/AdminNav';
import { useAdminStore } from '../store/adminStore';

const STATUS_OPTIONS = ["pending", "processing", "shipped", "delivered", "cancelled"];

const StatusBadge = ({ status }) => {
    let colorClasses = '';
    switch (status) {
        case 'delivered':
            colorClasses = 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
            break;
        case 'shipped':
            colorClasses = 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300';
            break;
        case 'processing':
            colorClasses = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
            break;
        case 'cancelled':
            colorClasses = 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
            break;
        case 'pending':
        default:
            colorClasses = 'bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-300';
    }

    const baseClasses = "inline-flex items-center px-3 py-1 text-xs font-medium rounded-full capitalize";
    return <span className={`${baseClasses} ${colorClasses}`}>{status}</span>;
};

const OrderListAdmin = () => {
    const { getAllOrders, orders, updateOrderStatus, deleteOrder } = useAdminStore();

    const [inputSearch, setInputSearch] = useState('');
    const [editingOrderId, setEditingOrderId] = useState(null);
    const [loadingId, setLoadingId] = useState(null);

    useEffect(() => {
        const handler = setTimeout(() => {
            getAllOrders(inputSearch.trim());
        }, 500);
        return () => clearTimeout(handler);
    }, [inputSearch, getAllOrders]);

    const handleEditClick = (id) => {
        setEditingOrderId(id === editingOrderId ? null : id);
    };

    const handleStatusChange = async (orderId, newStatus) => {
        setEditingOrderId(null);
        setLoadingId(orderId);
        try {
            await updateOrderStatus(orderId, newStatus);
        } catch (error) {
            console.error("Failed to update order status:", error);
            alert('Failed to update status. Check console for details.');
        } finally {
            setLoadingId(null);
        }
    };

    const handleDelete = (orderId) => {
        if (window.confirm("Are you sure you want to delete this order?")) {
            deleteOrder(orderId);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
    };

    const displayOrders = orders;
    const isSearching = inputSearch.trim().length > 0;
    const totalOrdersCount = orders.length;

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
            <AdminNav />
            <main className="flex-1 p-4 sm:p-8 pt-24 sm:ml-64">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
                    Order Management ({totalOrdersCount} {isSearching ? 'Results' : 'Items'})
                </h1>

                <div className="space-y-6">
                    {/* Search Bar */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg border dark:border-gray-700">
                        <div className="relative w-full sm:w-1/2">
                            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search by Customer name or Artwork title..."
                                value={inputSearch}
                                onChange={(e) => setInputSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white"
                            />
                        </div>
                    </div>

                    {/* Table (hidden on small) */}
                    <div className="hidden md:block overflow-x-auto shadow-xl rounded-lg border border-gray-200 dark:border-gray-700">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-100 dark:bg-gray-800">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Order ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Customer</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Total</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Status</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                                {displayOrders.length > 0 ? (
                                    displayOrders.map((order) => (
                                        <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-semibold text-gray-900 dark:text-white">{order._id}</div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                    {order.artworkDetails?.title || 'Item Details N/A'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {order.customerDetails?.name || order.shippingAddress.fullName || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {formatDate(order.createdAt)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-primary dark:text-primary-light">
                                                ₹ {order.totalAmount ? order.totalAmount.toFixed(2) : 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {loadingId === order._id ? (
                                                    <span className="text-sm text-gray-500 dark:text-gray-400 italic">Updating...</span>
                                                ) : editingOrderId === order._id ? (
                                                    <select
                                                        value={order.status}
                                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                        onBlur={() => setEditingOrderId(null)}
                                                        autoFocus
                                                        className="py-1 px-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white text-sm"
                                                    >
                                                        {STATUS_OPTIONS.map((status) => (
                                                            <option key={status} value={status} className="capitalize">
                                                                {status.charAt(0).toUpperCase() + status.slice(1)}
                                                            </option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    <div className="flex items-center gap-2">
                                                        <StatusBadge status={order.status} />
                                                        <button
                                                            onClick={() => handleEditClick(order._id)}
                                                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800/50"
                                                            title="Change Status"
                                                        >
                                                            <ChevronDown className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                                <button
                                                    onClick={() => handleDelete(order._id)}
                                                    className="text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-10 text-center text-gray-500 dark:text-gray-400">
                                            {isSearching ? 'No orders found matching your search.' : 'No orders available.'}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Card view */}
                    <div className="grid gap-4 md:hidden">
                        {displayOrders.length > 0 ? (
                            displayOrders.map((order) => (
                                <div key={order._id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-md">
                                    <div className="flex justify-between items-center">
                                        <div className="text-sm font-semibold text-gray-900 dark:text-white">{order._id}</div>
                                        <button
                                            onClick={() => handleDelete(order._id)}
                                            className="text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{order.artworkDetails?.title || 'Item Details N/A'}</div>

                                    <div className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                                        <p><span className="font-medium">Customer:</span> {order.customerDetails?.name || order.shippingAddress.fullName || 'N/A'}</p>
                                        <p><span className="font-medium">Date:</span> {formatDate(order.createdAt)}</p>
                                        <p><span className="font-medium">Total:</span> ₹ {order.totalAmount ? order.totalAmount.toFixed(2) : 'N/A'}</p>
                                    </div>

                                    <div className="mt-3 flex items-center gap-2">
                                        {loadingId === order._id ? (
                                            <span className="text-sm text-gray-500 dark:text-gray-400 italic">Updating...</span>
                                        ) : editingOrderId === order._id ? (
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                onBlur={() => setEditingOrderId(null)}
                                                autoFocus
                                                className="py-1 px-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white text-sm"
                                            >
                                                {STATUS_OPTIONS.map((status) => (
                                                    <option key={status} value={status} className="capitalize">
                                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            <>
                                                <StatusBadge status={order.status} />
                                                <button
                                                    onClick={() => handleEditClick(order._id)}
                                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800/50"
                                                >
                                                    <ChevronDown className="w-4 h-4" />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 dark:text-gray-400">
                                {isSearching ? 'No orders found matching your search.' : 'No orders available.'}
                            </p>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default OrderListAdmin;
