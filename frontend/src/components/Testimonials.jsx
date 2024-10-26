import { testimonials } from "../constants";


const Testimonials = () => {
  return (
    <div className="mt-20 text-black tracking-wide">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-10 lg:my-20">
        My Clients{" "}
        <span className="bg-gradient-to-r from-blue-500 to-blue-900 text-transparent bg-clip-text">
          Reviews
        </span>
      </h2>
      <div className="flex flex-wrap justify-center text-black">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="w-full text-black sm:w-1/2 lg:w-1/3 px-4 py-2">
            <div className="bg-white rounded-md p-6 text-md border border-black ">
              <p>{testimonial.text}</p>
              <div className="flex mt-8 items-start">
                <img
                  className="w-12 h-12 mr-6 rounded-full border border-black"
                  src={testimonial.image}
                  alt=""
                />
                <div>
                  <h6 className="text-blue-700">{testimonial.user}</h6>
                  <span className="text-sm font-normal italic text-black">
                    {testimonial.company}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
