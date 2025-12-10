'use client';

import { useEffect } from 'react';

export default function GoogleMapsLoader() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCiNEb5fno9cyKv2lzu_ammfjSJmpJZE5w&libraries=places';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }, []);

  return null;
}
