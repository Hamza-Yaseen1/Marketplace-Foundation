import Link from "next/link";
import Image from "next/image";

const Hero: React.FC = () => {
    return (
      <section className="bg-gray-100">
        <div className="container mx-auto flex flex-col-reverse md:flex-row items-center px-4 py-12 md:py-20">
          {/* Left Content */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Your Trusted <span className="text-blue-600">Pharmacy</span>, 
              Delivered to Your Doorstep
            </h1>
            <p className="mt-4 text-black text-lg">
              Order medicines, healthcare products, and wellness essentials with fast and reliable delivery. Shop from the comfort of your home!
            </p>
            <div className="mt-6 flex justify-center md:justify-start space-x-4">
              <Link
                href="/Shop"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
              >
                Shop Now
              </Link>
              <Link
                href="/Contact"
                className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg shadow-md hover:bg-gray-300 transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
  
          {/* Right Content */}
            <div className="flex-1 flex justify-center">
            <Image
              src="/images/Deleivr.avif"
              alt="Pharmacy Delivery"
              width={500} 
              height={500} 
              className="w-full md:w-3/4 lg:w-2/3"
            />
            </div>
        </div>
      </section>
    );
  };
  
  export default Hero;
  