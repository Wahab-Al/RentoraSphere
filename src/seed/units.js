//#region 
import _config from "../../config/env.js";
//#endregion

const units = [
  // --- 1 to 10 ---
  { title: "Modern Family House", unitType: "house", price: 350000, location: "Berlin, Germany", bedrooms: 4, bathrooms: 2, isAvailable: true, owner: "696c85d4c66e69c8f089538b" },
  { title: "Cozy City Apartment", unitType: "apartment", price: 145000, location: "Hamburg, Germany", bedrooms: 2, bathrooms: 1, isAvailable: false, owner: "696c83b192eab96ec799975f" },
  { title: "Luxury Garden Villa", unitType: "villa", price: 890000, location: "Munich, Germany", bedrooms: 5, bathrooms: 3, isAvailable: true, owner: "696c833692eab96ec799975c" },
  { title: "Urban Studio Flat", unitType: "studio", price: 98000, location: "Cologne, Germany", bedrooms: 1, bathrooms: 1, isAvailable: true, owner: "696c82b092eab96ec7999759" },
  { title: "Country Family House", unitType: "house", price: 420000, location: "Leipzig, Germany", bedrooms: 4, bathrooms: 2, isAvailable: true, owner: "696c817892eab96ec7999754" },
  { title: "Riverside Apartment", unitType: "apartment", price: 210000, location: "Dresden, Germany", bedrooms: 3, bathrooms: 1, isAvailable: false, owner: "696c816a92eab96ec7999751" },
  { title: "PentHouse with City View", unitType: "apartment", price: 650000, location: "Frankfurt, Germany", bedrooms: 3, bathrooms: 2, isAvailable: true, owner: "696c812e92eab96ec799974e" },
  { title: "Budget Apartment", unitType: "apartment", price: 78000, location: "Bremen, Germany", bedrooms: 1, bathrooms: 1, isAvailable: true, owner: "696c812292eab96ec799974b" },
  { title: "Historic Renovated House", unitType: "house", price: 310000, location: "Nuremberg, Germany", bedrooms: 3, bathrooms: 2, isAvailable: false, owner: "696c811592eab96ec7999748" },
  { title: "Suburban Family Home", unitType: "house", price: 270000, location: "Hannover, Germany", bedrooms: 3, bathrooms: 2, isAvailable: true, owner: "696c85d4c66e69c8f089538b" },

  // --- 11 to 20 ---
  { title: "Modern Loft Apartment", unitType: "apartment", price: 195000, location: "Stuttgart, Germany", bedrooms: 2, bathrooms: 1, isAvailable: true, owner: "696c83b192eab96ec799975f" },
  { title: "Quiet Village House", unitType: "house", price: 230000, location: "Kassel, Germany", bedrooms: 3, bathrooms: 1, isAvailable: true, owner: "696c833692eab96ec799975c" },
  { title: "Luxury Lake House", unitType: "house", price: 920000, location: "Konstanz, Germany", bedrooms: 5, bathrooms: 3, isAvailable: true, owner: "696c82b092eab96ec7999759" },
  { title: "Affordable Student Flat", unitType: "apartment", price: 65000, location: "Jena, Germany", bedrooms: 1, bathrooms: 1, isAvailable: false, owner: "696c817892eab96ec7999754" },
  { title: "Mountain Cabin Retreat", unitType: "house", price: 180000, location: "Garmisch, Germany", bedrooms: 2, bathrooms: 1, isAvailable: true, owner: "696c816a92eab96ec7999751" },
  { title: "City Center Apartment", unitType: "apartment", price: 260000, location: "Berlin, Germany", bedrooms: 2, bathrooms: 1, isAvailable: true, owner: "696c812e92eab96ec799974e" },
  { title: "Large Family Villa", unitType: "villa", price: 780000, location: "Hamburg, Germany", bedrooms: 6, bathrooms: 3, isAvailable: false, owner: "696c812292eab96ec799974b" },
  { title: "Minimalist Smart Home", unitType: "house", price: 410000, location: "Munich, Germany", bedrooms: 3, bathrooms: 2, isAvailable: true, owner: "696c811592eab96ec7999748" },
  { title: "Eco-Friendly House", unitType: "house", price: 330000, location: "Freiburg, Germany", bedrooms: 3, bathrooms: 2, isAvailable: true, owner: "696c85d4c66e69c8f089538b" },
  { title: "Old Town Apartment", unitType: "apartment", price: 175000, location: "Bonn, Germany", bedrooms: 2, bathrooms: 1, isAvailable: true, owner: "696c83b192eab96ec799975f" },

  // --- 21 to 30 ---
  { title: "Garden Duplex Home", unitType: "house", price: 295000, location: "Dortmund, Germany", bedrooms: 3, bathrooms: 2, isAvailable: true, owner: "696c833692eab96ec799975c" },
  { title: "Modern TownHouse", unitType: "house", price: 360000, location: "Essen, Germany", bedrooms: 4, bathrooms: 2, isAvailable: false, owner: "696c82b092eab96ec7999759" },
  { title: "Studio Near University", unitType: "studio", price: 85000, location: "Münster, Germany", bedrooms: 1, bathrooms: 1, isAvailable: true, owner: "696c817892eab96ec7999754" },
  { title: "Luxury PentHouse Suite", unitType: "apartment", price: 720000, location: "Düsseldorf, Germany", bedrooms: 4, bathrooms: 3, isAvailable: true, owner: "696c816a92eab96ec7999751" },
  { title: "Quiet Suburban House", unitType: "house", price: 250000, location: "Aachen, Germany", bedrooms: 3, bathrooms: 1, isAvailable: true, owner: "696c812e92eab96ec799974e" },
  { title: "Modern Apartment", unitType: "apartment", price: 210000, location: "Karlsruhe, Germany", bedrooms: 2, bathrooms: 1, isAvailable: false, owner: "696c812292eab96ec799974b" },
  { title: "Country Cottage House", unitType: "house", price: 160000, location: "Weimar, Germany", bedrooms: 2, bathrooms: 1, isAvailable: true, owner: "696c811592eab96ec7999748" },
  { title: "Lakefront Apartment", unitType: "apartment", price: 240000, location: "Potsdam, Germany", bedrooms: 2, bathrooms: 1, isAvailable: true, owner: "696c85d4c66e69c8f089538b" },
  { title: "Renovated Loft House", unitType: "house", price: 310000, location: "Leipzig, Germany", bedrooms: 3, bathrooms: 2, isAvailable: true, owner: "696c83b192eab96ec799975f" },
  { title: "Budget-Friendly Flat", unitType: "apartment", price: 70000, location: "Chemnitz, Germany", bedrooms: 1, bathrooms: 1, isAvailable: true, owner: "696c833692eab96ec799975c" },

  // --- 31 to 40 ---
  { title: "Exclusive Mansion", unitType: "villa", price: 1500000, location: "Berlin, Germany", bedrooms: 8, bathrooms: 5, isAvailable: true, owner: "696c82b092eab96ec7999759" },
  { title: "Small Family House", unitType: "house", price: 210000, location: "Hannover, Germany", bedrooms: 3, bathrooms: 1, isAvailable: true, owner: "696c817892eab96ec7999754" },
  { title: "Smart City Apartment", unitType: "apartment", price: 190000, location: "Stuttgart, Germany", bedrooms: 2, bathrooms: 1, isAvailable: true, owner: "696c816a92eab96ec7999751" },
  { title: "Village FarmHouse", unitType: "house", price: 280000, location: "Kiel, Germany", bedrooms: 4, bathrooms: 2, isAvailable: true, owner: "696c812e92eab96ec799974e" },
  { title: "City View Apartment", unitType: "apartment", price: 230000, location: "Frankfurt, Germany", bedrooms: 2, bathrooms: 1, isAvailable: false, owner: "696c812292eab96ec799974b" },
  { title: "Renovated Duplex", unitType: "house", price: 260000, location: "Bremen, Germany", bedrooms: 3, bathrooms: 2, isAvailable: true, owner: "696c811592eab96ec7999748" },
  { title: "Grand Garden Villa", unitType: "villa", price: 980000, location: "Munich, Germany", bedrooms: 6, bathrooms: 4, isAvailable: true, owner: "696c85d4c66e69c8f089538b" },
  { title: "Affordable Studio", unitType: "studio", price: 60000, location: "Jena, Germany", bedrooms: 1, bathrooms: 1, isAvailable: true, owner: "696c83b192eab96ec799975f" },
  { title: "Mountain View House", unitType: "house", price: 320000, location: "Garmisch, Germany", bedrooms: 3, bathrooms: 2, isAvailable: false, owner: "696c833692eab96ec799975c" },
  { title: "Urban Apartment", unitType: "apartment", price: 180000, location: "Berlin, Germany", bedrooms: 2, bathrooms: 1, isAvailable: true, owner: "696c82b092eab96ec7999759" },

  // --- 41 to 50 ---
  { title: "Quiet Forest Cabin", unitType: "house", price: 140000, location: "Black Forest, Germany", bedrooms: 2, bathrooms: 1, isAvailable: true, owner: "696c817892eab96ec7999754" },
  { title: "Modern City Loft", unitType: "apartment", price: 220000, location: "Hamburg, Germany", bedrooms: 2, bathrooms: 1, isAvailable: true, owner: "696c816a92eab96ec7999751" },
  { title: "Large Suburban Villa", unitType: "villa", price: 540000, location: "Cologne, Germany", bedrooms: 5, bathrooms: 3, isAvailable: false, owner: "696c812e92eab96ec799974e" },
  { title: "Economy Apartment", unitType: "apartment", price: 68000, location: "Dresden, Germany", bedrooms: 1, bathrooms: 1, isAvailable: true, owner: "696c812292eab96ec799974b" },
  { title: "Lake House Cabin", unitType: "house", price: 210000, location: "Konstanz, Germany", bedrooms: 2, bathrooms: 1, isAvailable: true, owner: "696c811592eab96ec7999748" },
  { title: "Renovated City Flat", unitType: "apartment", price: 195000, location: "Bonn, Germany", bedrooms: 2, bathrooms: 1, isAvailable: true, owner: "696c85d4c66e69c8f089538b" },
  { title: "Modern Duplex Home", unitType: "house", price: 310000, location: "Dortmund, Germany", bedrooms: 3, bathrooms: 2, isAvailable: true, owner: "696c83b192eab96ec799975f" },
  { title: "Luxury Smart Villa", unitType: "villa", price: 850000, location: "Düsseldorf, Germany", bedrooms: 5, bathrooms: 3, isAvailable: true, owner: "696c833692eab96ec799975c" },
  { title: "Small Apartment", unitType: "apartment", price: 90000, location: "Aachen, Germany", bedrooms: 1, bathrooms: 1, isAvailable: false, owner: "696c82b092eab96ec7999759" },
  { title: "Modern Family Home", unitType: "house", price: 330000, location: "Karlsruhe, Germany", bedrooms: 4, bathrooms: 2, isAvailable: true, owner: "696c817892eab96ec7999754" },

  // --- 51 to 60 ---
  { title: "Rustic Country House", unitType: "house", price: 240000, location: "Weimar, Germany", bedrooms: 3, bathrooms: 1, isAvailable: true, owner: "696c816a92eab96ec7999751" },
  { title: "Lakefront Grand Villa", unitType: "villa", price: 760000, location: "Potsdam, Germany", bedrooms: 5, bathrooms: 3, isAvailable: false, owner: "696c812e92eab96ec799974e" },
  { title: "Urban Smart Apartment", unitType: "apartment", price: 210000, location: "Leipzig, Germany", bedrooms: 2, bathrooms: 1, isAvailable: true, owner: "696c812292eab96ec799974b" },
  { title: "Budget Studio Flat", unitType: "studio", price: 55000, location: "Chemnitz, Germany", bedrooms: 1, bathrooms: 1, isAvailable: true, owner: "696c811592eab96ec7999748" },
  { title: "Elite Mansion Estate", unitType: "villa", price: 1800000, location: "Berlin, Germany", bedrooms: 10, bathrooms: 6, isAvailable: false, owner: "696c85d4c66e69c8f089538b" },
  { title: "Compact TownHouse", unitType: "house", price: 200000, location: "Hannover, Germany", bedrooms: 3, bathrooms: 1, isAvailable: true, owner: "696c83b192eab96ec799975f" },
  { title: "Modern Apartment Loft", unitType: "apartment", price: 185000, location: "Stuttgart, Germany", bedrooms: 2, bathrooms: 1, isAvailable: true, owner: "696c833692eab96ec799975c" },
  { title: "Old Village House", unitType: "house", price: 260000, location: "Kiel, Germany", bedrooms: 4, bathrooms: 2, isAvailable: true, owner: "696c82b092eab96ec7999759" },
  { title: "Executive City Apartment", unitType: "apartment", price: 225000, location: "Frankfurt, Germany", bedrooms: 2, bathrooms: 1, isAvailable: false, owner: "696c817892eab96ec7999754" },
  { title: "Renovated Duplex House", unitType: "house", price: 280000, location: "Bremen, Germany", bedrooms: 3, bathrooms: 2, isAvailable: true, owner: "696c816a92eab96ec7999751" },

  // --- 61 to 70 ---
  { title: "Sunny Terrace Apartment", unitType: "apartment", price: 310000, location: "Mainz, Germany", bedrooms: 3, bathrooms: 2, isAvailable: true, owner: "696c812e92eab96ec799974e" },
  { title: "Woodland Retreat House", unitType: "house", price: 125000, location: "Harz, Germany", bedrooms: 2, bathrooms: 1, isAvailable: true, owner: "696c812292eab96ec799974b" },
  { title: "Harbor View Apartment", unitType: "apartment", price: 420000, location: "Rostock, Germany", bedrooms: 3, bathrooms: 2, isAvailable: true, owner: "696c811592eab96ec7999748" },
  { title: "Minimalist Studio", unitType: "studio", price: 72000, location: "Essen, Germany", bedrooms: 1, bathrooms: 1, isAvailable: true, owner: "696c85d4c66e69c8f089538b" },
  { title: "Classic Brick House", unitType: "house", price: 290000, location: "Duisburg, Germany", bedrooms: 3, bathrooms: 2, isAvailable: true, owner: "696c83b192eab96ec799975f" },
  { title: "Designer PentHouse", unitType: "apartment", price: 890000, location: "Düsseldorf, Germany", bedrooms: 4, bathrooms: 3, isAvailable: true, owner: "696c833692eab96ec799975c" },
  { title: "Green Energy House", unitType: "house", price: 450000, location: "Freiburg, Germany", bedrooms: 4, bathrooms: 3, isAvailable: true, owner: "696c82b092eab96ec7999759" },
  { title: "University View Flat", unitType: "apartment", price: 110000, location: "Heidelberg, Germany", bedrooms: 1, bathrooms: 1, isAvailable: true, owner: "696c817892eab96ec7999754" },
  { title: "Stone Wall Villa", unitType: "villa", price: 1200000, location: "Baden-Baden, Germany", bedrooms: 7, bathrooms: 4, isAvailable: true, owner: "696c816a92eab96ec7999751" },
  { title: "Cozy Loft Studio", unitType: "studio", price: 88000, location: "Augsburg, Germany", bedrooms: 1, bathrooms: 1, isAvailable: true, owner: "696c812e92eab96ec799974e" }
];


const sysManager = {
  name: 'Wahab', surname: 'Al-', email: _config.sysManager_email, password: _config.sysManager_pass, phone:'12xxxxxxxx', role: 'sysManager'
}

export { units, sysManager}