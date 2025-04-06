"use client";
import { useState } from "react";
// import Image from "next/image";
// import { CountryDropdown } from "./CountryDropdown";

export default function UpdateProfileForm() {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      country: "",
    });
    // const [avatar, setAvatar] = useState<File | null>(null);
    // const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});
  
    const validateForm = () => {
      const newErrors: typeof errors = {};
      if (formData.name.length < 3) newErrors.name = "Name must be at least 3 characters";
      if (!formData.email.includes("@")) newErrors.email = "Invalid email format";
      if (formData.password && formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    // const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //   const file = event.target.files?.[0];
    //   if (file) {
    //     setAvatar(file);
    //     setAvatarPreview(URL.createObjectURL(file));
    //   }
    // };
  
    // const handleCountryChange = (value: string) => {
    //   setFormData({ ...formData, country: value });
    // };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (validateForm()) {
        console.log("Updated Profile:", formData);
      }
    };
  
    return (
      <div className="max-w-md mx-auto  p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-center mb-4 text-white">Update Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-white">Name</label>
            <input name="name" value={formData.name} onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
          </div>
  
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-white">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          </div>
  
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-white">Password (optional)</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
          </div>
  
          {/* <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-white">Country</label>
            <CountryDropdown selected={formData.country} onChange={handleCountryChange} />
          </div> */}
{/*   
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-white">Profile Picture</label>
            <input type="file" onChange={handleAvatarChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            {avatarPreview && (
              <Image src={avatarPreview} alt="Avatar Preview" width={100} height={100} className="mt-2 rounded-full border border-gray-300" />
            )}
          </div> */}
  
          <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-all">Update</button>
        </form>
      </div>
    );
  }
  

