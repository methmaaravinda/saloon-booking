import { FiCalendar, FiClock, FiDollarSign, FiCheckCircle, FiXCircle, FiAlertCircle } from 'react-icons/fi'

const MyBookings = () => {
  const bookings = [
    {
      id: 1,
      name: "Haircut with John Doe",
      date: "2025-08-20",
      time: "14:30",
      services: ["Haircut", "Beard Trim"],
      status: "pending",
      amount: 45,
    },
    {
      id: 2,
      name: "Color & Style with Anna",
      date: "2025-08-10",
      time: "11:00",
      services: ["Hair Coloring", "Blow Dry"],
      status: "completed",
      amount: 95,
    },
    {
      id: 3,
      name: "Facial Treatment",
      date: "2025-08-05",
      time: "16:00",
      services: ["Deep Cleansing Facial"],
      status: "expired",
      amount: 60,
    },
    {
      id: 4,
      name: "Massage Session",
      date: "2025-08-03",
      time: "18:00",
      services: ["Full Body Massage"],
      status: "cancelled",
      amount: 80,
    },
  ];

  const getStatusStyles = (status) => {
    switch (status) {
      case "pending":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "cancelled":
        return "bg-rose-50 text-rose-800 border-rose-200";
      case "expired":
        return "bg-gray-100 text-gray-600 border-gray-200";
      case "completed":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const getTimeRemainingLabel = (date, time) => {
    const target = new Date(`${date}T${time}:00`);
    const now = new Date();
    const diffMs = target.getTime() - now.getTime();

    if (diffMs <= 0) return "Starts soon";

    const totalMinutes = Math.round(diffMs / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;

    if (hours <= 0) return `${mins} min remaining`;
    return `${hours}h ${mins}m remaining`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <FiAlertCircle className="text-amber-600" />;
      case "completed":
        return <FiCheckCircle className="text-emerald-600" />;
      case "cancelled":
        return <FiXCircle className="text-rose-600" />;
      case "expired":
        return <FiAlertCircle className="text-gray-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">📅 My Bookings</h1>
        
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white border rounded-xl shadow-sm p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {booking.name}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                    <FiCalendar className="text-gray-400" size={14} />
                    {formatDate(booking.date)}
                  </p>
                  <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                    <FiClock className="text-gray-400" size={14} />
                    {booking.time}
                  </p>
                </div>
                <span
                  className={
                    "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border capitalize " +
                    getStatusStyles(booking.status)
                  }
                >
                  {getStatusIcon(booking.status)}
                  {booking.status}
                </span>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Services:</p>
                <div className="flex flex-wrap gap-2">
                  {booking.services.map((service, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 border rounded-lg text-xs text-gray-800"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {booking.status === "pending" && (
                <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm font-medium text-amber-900 flex items-center gap-2">
                    <FiClock className="text-amber-600" size={16} />
                    Time Remaining:{" "}
                    <span className="font-semibold">
                      {getTimeRemainingLabel(booking.date, booking.time)}
                    </span>
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <span className="text-sm text-gray-600 flex items-center gap-1">
                  <FiDollarSign className="text-gray-500" />
                  {booking.status === "pending" ? "Estimated Charges" : "Total Charges"}
                </span>
                <span className="text-xl font-bold text-gray-900">
                  ${booking.amount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
