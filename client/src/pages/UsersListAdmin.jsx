import { Trash2, Search } from 'lucide-react';
import AdminNav from '../components/AdminNav';
import { useAdminStore } from '../store/adminStore';
import { useState, useEffect } from 'react';

const ROLES = ['admin', 'artist', 'collector'];

const UsersListAdmin = () => {
  const { getUsers, updateUser, deleteUser, users } = useAdminStore();
  const [inputSearch, setInputSearch] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      getUsers(inputSearch);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [inputSearch, getUsers]);

  const handleUpdateUser = (userId, newRole) => {
    if (window.confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
      updateUser(userId, newRole);
    }
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      deleteUser(userId);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <AdminNav />

      <main className="flex-1 p-4 md:p-8 pt-20 md:pt-24 ml-0 md:ml-64">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
          User Management ({users.length} Users)
        </h1>

        <div className="space-y-6">
          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg border dark:border-gray-700">
            <div className="relative w-full sm:w-1/3">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={inputSearch}
                onChange={(e) => setInputSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto shadow-xl rounded-lg border border-gray-200 dark:border-gray-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                    Role
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr
                      key={user._id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={user.avatar}
                            alt={`${user.name} avatar`}
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {user.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <select
                          value={user.role}
                          onChange={(e) => handleUpdateUser(user._id, e.target.value)}
                          className={`
                            px-3 py-1 border rounded-lg focus:ring-primary focus:border-primary
                            dark:bg-gray-800 dark:text-white dark:border-gray-700
                            ${user.role === 'admin' ? 'border-red-500 text-red-500' : 'border-gray-300'}
                          `}
                        >
                          {ROLES.map((role) => (
                            <option key={role} value={role}>
                              {role.charAt(0).toUpperCase() + role.slice(1)}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <button
                          className="text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400 transition-colors duration-150 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                          title="Delete User"
                          onClick={() => handleDeleteUser(user._id)}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                    >
                      {inputSearch
                        ? `No users found matching "${inputSearch}".`
                        : 'No users available.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {users.length > 0 ? (
              users.map((user) => (
                <div
                  key={user._id}
                  className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md border dark:border-gray-700 flex flex-col gap-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      className="h-12 w-12 rounded-full object-cover"
                      src={user.avatar}
                      alt={`${user.name} avatar`}
                    />
                    <div>
                      <p className="text-base font-semibold text-gray-900 dark:text-white">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <select
                      value={user.role}
                      onChange={(e) => handleUpdateUser(user._id, e.target.value)}
                      className={`
                        px-3 py-1 border rounded-lg focus:ring-primary focus:border-primary
                        dark:bg-gray-800 dark:text-white dark:border-gray-700
                        ${user.role === 'admin' ? 'border-red-500 text-red-500' : 'border-gray-300'}
                      `}
                    >
                      {ROLES.map((role) => (
                        <option key={role} value={role}>
                          {role.charAt(0).toUpperCase() + role.slice(1)}
                        </option>
                      ))}
                    </select>
                    <button
                      className="text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400 transition-colors duration-150 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400">
                {inputSearch ? `No users found matching "${inputSearch}".` : 'No users available.'}
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UsersListAdmin;
