export default function SolutionsGrid() {
  const solutions = [
    {
      title: "Solar Panels",
      description: "Generate clean electricity and reduce your energy bills by up to 70%",
      image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      icon: "fas fa-solar-panel",
      color: "text-energy-amber"
    },
    {
      title: "Battery Storage",
      description: "Store excess solar energy for use when you need it most",
      image: "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      icon: "fas fa-battery-full",
      color: "text-blue-500"
    },
    {
      title: "Heat Pumps",
      description: "Efficient heating and cooling with up to 400% efficiency",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      icon: "fas fa-thermometer-half",
      color: "text-red-500"
    },
    {
      title: "EV Chargers",
      description: "Fast, convenient home charging for your electric vehicle",
      image: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      icon: "fas fa-charging-station",
      color: "text-green-500"
    }
  ];

  return (
    <section id="solutions" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Renewable Energy Solutions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive renewable energy solutions tailored to your home's needs and budget
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {solutions.map((solution, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img 
                src={solution.image} 
                alt={solution.title} 
                className="w-full h-48 object-cover" 
              />
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <i className={`${solution.icon} ${solution.color} text-xl mr-2`}></i>
                  <h3 className="text-xl font-semibold text-gray-900">{solution.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{solution.description}</p>
                <div className="flex items-center text-energy-green font-semibold cursor-pointer hover:text-energy-dark transition-colors">
                  <span>Learn More</span>
                  <i className="fas fa-arrow-right ml-2"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
