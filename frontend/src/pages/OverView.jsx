import React from "react";
import { FaHeadset, FaShippingFast, FaShieldAlt, FaUndo } from "react-icons/fa";

function OverView() {
  return (
    <section className="h-[30vh] w-full bg-white pt-20 flex items-center">
      <div className="mx-auto max-w-7xl w-full px-6 grid grid-cols-2 md:grid-cols-4 gap-6">

        {/* Feature 1 */}
        <div className="flex flex-col items-center text-center gap-2">
          <FaHeadset className="text-3xl text-indigo-600" />
          <h3 className="text-sm font-semibold text-gray-900">
            24/7 Support
          </h3>
          <p className="text-xs text-gray-600">
            Always available for help
          </p>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col items-center text-center gap-2">
          <FaShippingFast className="text-3xl text-indigo-600" />
          <h3 className="text-sm font-semibold text-gray-900">
            Fast Delivery
          </h3>
          <p className="text-xs text-gray-600">
            Quick & reliable shipping
          </p>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col items-center text-center gap-2">
          <FaShieldAlt className="text-3xl text-indigo-600" />
          <h3 className="text-sm font-semibold text-gray-900">
            Secure Payments
          </h3>
          <p className="text-xs text-gray-600">
            100% safe transactions
          </p>
        </div>

        {/* Feature 4 */}
        <div className="flex flex-col items-center text-center gap-2">
          <FaUndo className="text-3xl text-indigo-600" />
          <h3 className="text-sm font-semibold text-gray-900">
            Easy Returns
          </h3>
          <p className="text-xs text-gray-600">
            Hassle-free refunds
          </p>
        </div>

      </div>
    </section>
  );
}

export default OverView;
