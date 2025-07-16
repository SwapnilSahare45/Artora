import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Bell, CheckCircle, XCircle } from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "bid",
    title: "New Bid on Your Artwork",
    message: "Your artwork 'Twilight Vibes' received a new bid of $1,400.",
    time: "2h ago",
    status: "unread",
  },
  {
    id: 2,
    type: "order",
    title: "Order Confirmed",
    message: "‘Mystic Forest’ has been successfully sold for $1,000.",
    time: "1d ago",
    status: "read",
  },
  {
    id: 3,
    type: "message",
    title: "New Message from Ava Green",
    message: "“Is your artwork still available?”",
    time: "3d ago",
    status: "unread",
  },
];

const NotificationIcon = ({ type }) => {
  switch (type) {
    case "bid":
      return <Bell className="text-yellow-500" />;
    case "order":
      return <CheckCircle className="text-green-500" />;
    case "message":
      return <XCircle className="text-blue-500" />;
    default:
      return <Bell />;
  }
};

const Notifications = () => {
  return (
    <main className="bg-gray-50 text-black dark:bg-gray-900 dark:text-white min-h-screen">
      <Navbar />

      <section className="pt-28 pb-16 px-4 md:px-12 lg:px-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-semibold mb-6">Notifications</h1>

          {notifications.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">No new notifications.</p>
          ) : (
            <ul className="space-y-4">
              {notifications.map((note) => (
                <li
                  key={note.id}
                  className={`flex items-start gap-4 p-4 rounded-lg border transition ${
                    note.status === "unread"
                      ? "bg-gray-100 dark:bg-gray-800 border-primary"
                      : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <div className="mt-1">{<NotificationIcon type={note.type} />}</div>
                  <div className="flex-1">
                    <h2 className="font-semibold">{note.title}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{note.message}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{note.time}</p>
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
