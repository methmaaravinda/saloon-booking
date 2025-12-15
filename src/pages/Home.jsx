const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Our Salon test change
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Book your appointment and get the best salon experience
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Placeholder cards */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">Hair Services</h2>
            <p className="text-gray-600">Professional hair care services</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">Nail Services</h2>
            <p className="text-gray-600">Manicure and pedicure services</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">Styling</h2>
            <p className="text-gray-600">Hair styling and makeup</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

