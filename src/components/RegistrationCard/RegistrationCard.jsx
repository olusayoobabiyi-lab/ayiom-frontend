import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

const RegistrationCard = () => {
  const [activeTab, setActiveTab] = useState("member");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    // Backend integration later
    alert("Registration Submitted");

    reset();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="overflow-hidden rounded-lg bg-white shadow-xl h-full"
    >
      {/* Header */}

      <div className="bg-red-800 text-white p-6">
        <h2 className="text-2xl font-bold uppercase">Become a Member / Partner</h2>

        <p className="mt-2 text-sm text-red-100">Register as a member or partner with us today.</p>
      </div>

      {/* Tabs */}

      <div className="grid grid-cols-2">
        <button
          onClick={() => setActiveTab("member")}
          className={`py-3 text-sm font-semibold transition ${
            activeTab === "member"
              ? "bg-white text-red-700 border-b-4 border-red-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          MEMBER REGISTRATION
        </button>

        <button
          onClick={() => setActiveTab("partner")}
          className={`py-3 text-sm font-semibold transition ${
            activeTab === "partner"
              ? "bg-white text-red-700 border-b-4 border-red-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          PARTNERSHIP
        </button>
      </div>

      {/* Form */}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6">
        {/* Full Name */}

        <div>
          <label className="block text-sm font-semibold mb-1">Full Name *</label>

          <input
            type="text"
            placeholder="Enter your full name"
            {...register("fullName", {
              required: "Full name is required",
            })}
            className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-red-700 focus:outline-none"
          />

          <p className="text-sm text-red-600 mt-1">{errors.fullName?.message}</p>
        </div>

        {/* Email */}

        <div>
          <label className="block text-sm font-semibold mb-1">Email Address *</label>

          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
            })}
            className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-red-700 focus:outline-none"
          />

          <p className="text-sm text-red-600 mt-1">{errors.email?.message}</p>
        </div>

        {/* Phone */}

        <div>
          <label className="block text-sm font-semibold mb-1">Phone Number *</label>

          <input
            type="text"
            placeholder="Enter your phone number"
            {...register("phone", {
              required: "Phone number is required",
            })}
            className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-red-700 focus:outline-none"
          />

          <p className="text-sm text-red-600 mt-1">{errors.phone?.message}</p>
        </div>

        {/* Address */}

        <div>
          <label className="block text-sm font-semibold mb-1">Address *</label>

          <input
            type="text"
            placeholder="Enter your address"
            {...register("address", {
              required: "Address is required",
            })}
            className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-red-700 focus:outline-none"
          />

          <p className="text-sm text-red-600 mt-1">{errors.address?.message}</p>
        </div>

        {/* Registration Type */}

        <div>
          <label className="block text-sm font-semibold mb-1">I want to register as *</label>

          <select
            {...register("type", {
              required: "Please select an option",
            })}
            className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-red-700 focus:outline-none"
          >
            <option value="">Select an option</option>

            <option value="member">Member</option>

            <option value="worker">Worker</option>

            <option value="volunteer">Volunteer</option>

            <option value="partner">Partner</option>
          </select>

          <p className="text-sm text-red-600 mt-1">{errors.type?.message}</p>
        </div>

        {/* Button */}

        <button
          type="submit"
          className="mt-3 w-full rounded-md bg-red-800 py-4 font-semibold uppercase tracking-wide text-white transition hover:bg-red-900"
        >
          Submit Registration
        </button>
      </form>
    </motion.div>
  );
};

export default RegistrationCard;
