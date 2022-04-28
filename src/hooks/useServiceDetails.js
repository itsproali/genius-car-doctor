import { useEffect, useState } from "react";

const useServiceDetails = (serviceId) => {
  const [service, setService] = useState({});

  useEffect(() => {
    fetch(`https://enigmatic-sands-43485.herokuapp.com/service/${serviceId}`)
      .then((res) => res.json())
      .then((data) => setService(data));
  }, [serviceId]);
  return [service];
};

export default useServiceDetails;
