import { useState } from 'react';

export const useProfile = () => {
  const [error, setError] = useState(null);

  const profile = async (email, firstName, lastName, phone, address, dob) => {
    setError(null);

    const response = await fetch("http://localhost:3001/user/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, phone, address, dob,
        company_name: '',
        address: '',
        phone: '',
        website: '',
        medical_service_type: '',
        registration_number: '',
        tin: '',
        insurance_license_number: '',
        logo: '', })
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    } else {
    }
  }

  return { profile, error };

}