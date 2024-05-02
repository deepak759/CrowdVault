

const DetailedChampaign = () => {
  return (
    <div className="container w-[80%] mx-auto p-4">
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="md:w-3/4">
          <h1 className="text-3xl font-bold mb-4">I am Title</h1>
          <div className="mb-4">
            <img
              src="https://c4.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fit,w_auto,g_center,q_auto:best,dpr_1.3,f_auto/tme3t0fjths5b452unoi"
              alt=""
              className="w-full h-auto"
            />
          </div>
          <p className="text-gray-700">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex dolor
            ut placeat doloremque perspiciatis rerum culpa id enim, repudiandae
            veniam sit deserunt eligendi reprehenderit, vitae nobis distinctio.
            A perferendis, eos consectetur ut dolorem ad natus quisquam alias
            ipsa. Sed aspernatur quos culpa dignissimos reprehenderit. Quidem
            cumque possimus provident dolorum porro doloremque officiis. Nemo,
            alias, blanditiis harum eum, vero vitae perferendis magnam provident
            accusamus dolorem repudiandae eaque a tempora? Vitae perspiciatis
            incidunt velit exercitationem earum natus blanditiis porro quae,
            quasi aperiam voluptatum impedit architecto illum neque doloribus
            repellat fugiat iste! Corporis itaque tenetur eum quod odit numquam
            quisquam nesciunt, et voluptate.
          </p>
        </div>
        <div className="md:relative">
        <div className="md:w-1/4  md:fixed">
          <h1 className="text-2xl font-bold mb-4">23377 INR raised of 2243434</h1>
          <div className="mb-4">
            <form action="submit" className="space-y-2">
              <div>
                <label htmlFor="amount" className="block">Amount:</label>
                <input type="number" required className="border border-gray-300 rounded-md px-3 py-2 w-full" />
              </div>
              <div>
                <label htmlFor="amount" className="block">Tip:</label>
                <input type="number" required className="border border-gray-300 rounded-md px-3 py-2 w-full" />
              </div>
              <div>
                <label htmlFor="amount" className="block">Equity:</label>
                <input type="number" disabled value={456} className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-100 cursor-not-allowed" />
              </div>
              <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Donate now</button>
            </form>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedChampaign;
