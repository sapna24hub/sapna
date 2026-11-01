const API_BASE = import.meta.env.VITE_API_BASE_URL 
  ? `${import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '')}/api`
  : '/api';

export const api = {
  // Categories & Services
  async getCategories() {
    const res = await fetch(`${API_BASE}/categories/`);
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
  },

  async getServices(category = 'all', search = '') {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.append('category', category);
    if (search) params.append('search', search);
    const res = await fetch(`${API_BASE}/services/?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch services');
    return res.json();
  },

  // Beauty Shopping Products
  async getProducts(category = 'all', search = '') {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.append('category', category);
    if (search) params.append('search', search);
    const res = await fetch(`${API_BASE}/products/?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  },

  // Consultants
  async getConsultants() {
    const res = await fetch(`${API_BASE}/consultants/`);
    if (!res.ok) throw new Error('Failed to fetch consultants');
    return res.json();
  },

  // Bookings
  async createBooking(payload) {
    const res = await fetch(`${API_BASE}/bookings/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const err = await res.json();
      throw err;
    }
    return res.json();
  },

  async getBookingDetail(bookingRef) {
    const res = await fetch(`${API_BASE}/bookings/${bookingRef}/`);
    if (!res.ok) throw new Error(`Booking ${bookingRef} not found`);
    return res.json();
  },

  async getAllBookings() {
    const res = await fetch(`${API_BASE}/bookings/all/`);
    if (!res.ok) throw new Error('Failed to fetch all bookings');
    return res.json();
  },

  async simulateBookingStep(bookingRef) {
    const res = await fetch(`${API_BASE}/bookings/${bookingRef}/simulate-step/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) throw new Error('Failed to advance tracking step');
    return res.json();
  },

  async updateBookingStatus(bookingRef, patchData) {
    const res = await fetch(`${API_BASE}/bookings/${bookingRef}/update-status/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patchData)
    });
    if (!res.ok) throw new Error('Failed to update status');
    return res.json();
  },

  // Reviews
  async getReviews() {
    const res = await fetch(`${API_BASE}/reviews/`);
    if (!res.ok) throw new Error('Failed to fetch reviews');
    return res.json();
  },

  async createReview(payload) {
    const res = await fetch(`${API_BASE}/reviews/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Failed to submit review');
    return res.json();
  },

  // Location coverage
  async checkLocation(pincode) {
    const res = await fetch(`${API_BASE}/locations/check/?pincode=${encodeURIComponent(pincode)}`);
    if (!res.ok) throw new Error('Failed to check location');
    return res.json();
  },

  // Parlour stats
  async getStats() {
    const res = await fetch(`${API_BASE}/stats/`);
    if (!res.ok) throw new Error('Failed to fetch stats');
    return res.json();
  }
};
