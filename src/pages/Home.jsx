import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Home() {
  const [recentListings, setRecentListings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/listings?limit=6")
      .then((res) => res.json())
      .then((data) => setRecentListings(data))
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-16">

      {/* 1️⃣ BANNER SECTION */}
      <div className="mt-4">
        <Swiper
          autoplay={{ delay: 2500 }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          className="rounded-xl overflow-hidden"
        >
          <SwiperSlide>
            <img
              src="/images/Banner01.jpg"
              className="w-full h-[420px] object-cover"
              alt="banner"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/images/Banner02.jpg"
              className="w-full h-[420px] object-cover"
              alt="banner"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/images/Banner03.jpg"
              className="w-full h-[420px] object-cover"
              alt="banner"
            />
          </SwiperSlide>
        </Swiper>

        <div className="text-center mt-6 space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
            Find Your Furry Friend Today! 🐾
          </h1>
          <p className="text-lg text-slate-600">
            Adopt, Don’t Shop — Give a Pet a Loving Home
          </p>
        </div>
      </div>

     <section>
  <h2 className="text-3xl font-semibold text-center mb-8">Browse Categories</h2>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

    {/* Pets */}
    <Link to="/category-filtered-product/Pets" className="bg-white shadow hover:shadow-lg rounded-lg overflow-hidden cursor-pointer group">
      <img src="/images/pets.jpg" className="h-36 w-full object-cover group-hover:scale-105 transition" />
      <div className="p-4 text-center"><h3 className="text-lg font-semibold">Pets (Adoption)</h3></div>
    </Link>

    {/* Pet Food */}
    <Link to="/category-filtered-product/Pet Food" className="bg-white shadow hover:shadow-lg rounded-lg overflow-hidden cursor-pointer group">
      <img src="/images/food.avif" className="h-36 w-full object-cover group-hover:scale-105 transition" />
      <div className="p-4 text-center"><h3 className="text-lg font-semibold">Pet Food</h3></div>
    </Link>

    {/* Accessories */}
    <Link to="/category-filtered-product/Accessories" className="bg-white shadow hover:shadow-lg rounded-lg overflow-hidden cursor-pointer group">
      <img src="/images/accessories.jpg" className="h-36 w-full object-cover group-hover:scale-105 transition" />
      <div className="p-4 text-center"><h3 className="text-lg font-semibold">Accessories</h3></div>
    </Link>

    {/* Care Products */}
    <Link to="/category-filtered-product/Care Products" className="bg-white shadow hover:shadow-lg rounded-lg overflow-hidden cursor-pointer group">
      <img src="/images/care.jpg" className="h-36 w-full object-cover group-hover:scale-105 transition" />
      <div className="p-4 text-center"><h3 className="text-lg font-semibold">Care Products</h3></div>
    </Link>

  </div>
</section>


      {/* 3️⃣ RECENT LISTINGS */}
      <section>
        <h2 className="text-3xl font-semibold text-center mb-8">Recent Listings</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

          {recentListings.length === 0 ? (
            <p className="text-center col-span-3 text-slate-500">No recent items found.</p>
          ) : (
            recentListings.map((item) => (
              <div
                key={item._id}
                className="bg-white shadow rounded-lg p-4 space-y-3"
              >
               <img 
  src={item.image.startsWith("http") ? item.image : `http://localhost:5000/uploads/${item.image}`}
  className="w-full h-48 object-cover rounded"
/>




                <h3 className="font-bold text-xl">{item.name}</h3>
                <p className="text-slate-600">{item.category}</p>
                <p className="font-semibold">
                  {item.price === 0 ? "Free for Adoption" : `$${item.price}`}
                </p>
                <p className="text-sm text-slate-500">{item.location}</p>
                <Link
                  to={`/listing/${item._id}`}
                  className="block w-full bg-[#2b7a78] text-white text-center py-2 rounded mt-2 hover:bg-[#1f615f]"
                >
                  See Details
                </Link>
              </div>
            ))
          )}

        </div>
      </section>

      {/* 4️⃣ EXTRA SECTION — WHY ADOPT */}
      <section className="bg-[#f1f8f8] p-8 rounded-xl">
        <h2 className="text-3xl font-semibold text-center mb-6">Why Adopt from PawMart?</h2>
        <p className="text-center text-lg text-slate-700 max-w-3xl mx-auto">
          Adopting a pet not only gives them a second chance at life, 
          but also brings unconditional love to your home. PawMart helps connect kind-hearted
          adopters with pets looking for a family.
        </p>
      </section>

      {/* 5️⃣ EXTRA SECTION — PET HEROES */}
      <section>
        <h2 className="text-3xl font-semibold text-center mb-8">Meet Our Pet Heroes</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {[
            { name: "Sarah & Rocky", img: "/images/hero1.jpg" },
            { name: "John & Bella", img: "/images/hero2.webp" },
            { name: "Mira & Simba", img: "/images/hero3.avif" },
          ].map((hero) => (
            <div
              key={hero.name}
              className="bg-white shadow p-4 rounded-lg text-center space-y-3"
            >
              <img
                src={hero.img}
                alt={hero.name}
                className="w-full h-56 object-cover rounded"
              />
              <h4 className="font-semibold text-lg">{hero.name}</h4>
            </div>
          ))}

        </div>
      </section>

    </div>
  );
}
