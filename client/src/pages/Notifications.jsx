import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Bell, CheckCircle, XCircle, Gavel } from "lucide-react";
import { useNotificationStore } from "../store/notificationStore";
import { formatDistanceToNow } from "date-fns";

const NotificationIcon = ({ type }) => {
  switch (type) {
    case "bid":
      return <Bell className="text-yellow-500" />;
    case "order":
      return <CheckCircle className="text-green-500" />;
    case "message":
      return <XCircle className="text-blue-500" />;
    case "auction":
      return <Gavel className="text-purple-500" />;
    default:
      return <Bell />;
  }
};

const Notifications = () => {

  const { getNotifications, notifications, isLoading, error } = useNotificationStore();

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  return (
    <main className="bg-gray-50 text-black dark:bg-gray-900 dark:text-white min-h-screen">
      <Navbar />

      <section className="pt-28 pb-16 px-4 md:px-12 lg:px-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-semibold mb-6">Notifications</h1>

          {notifications?.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">No new notifications.</p>
          ) : (
            <ul className="space-y-4">
              {notifications.map((note) => (
                <li
                  key={note._id}
                  className={`flex items-start gap-4 p-4 rounded-lg border transition ${!note.isRead
                    ? "bg-gray-100 dark:bg-gray-800 border-primary"
                    : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    }`}
                >
                  <div className="mt-1">{<NotificationIcon type={note.type} />}</div>
                  <div className="flex-1">
                    <h2 className="font-semibold">{note.title}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{note.message}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Notifications;