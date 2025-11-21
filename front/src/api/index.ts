import type {
  Spot,
  Reservation,
  Host,
  ReservationInput,
  PaymentInput,
  HostLoginInput,
  HostRegisterInput,
  CreateSpotInput,
} from "../types";

const API_URL = "";

// User API
export const spotApi = {
  getById: async (uuid: string): Promise<Spot> => {
    const res = await fetch(`${API_URL}/api/spots/${uuid}`);
    if (!res.ok) throw new Error("Spot not found");
    return res.json();
  },

  getAll: async (): Promise<Spot[]> => {
    const res = await fetch(`${API_URL}/api/spots`);
    if (!res.ok) throw new Error("Failed to fetch spots");
    return res.json();
  },
};

export const reservationApi = {
  create: async (data: ReservationInput): Promise<Reservation> => {
    const res = await fetch(`${API_URL}/api/reservations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create reservation");
    return res.json();
  },

  getById: async (id: string): Promise<Reservation> => {
    const res = await fetch(`${API_URL}/api/reservations/${id}`);
    if (!res.ok) throw new Error("Reservation not found");
    return res.json();
  },
};

export const paymentApi = {
  create: async (
    data: PaymentInput
  ): Promise<{ success: boolean; payment_id: string; message: string }> => {
    const res = await fetch(`${API_URL}/api/payments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Payment failed");
    return res.json();
  },
};

// Host API
export const hostAuthApi = {
  login: async (
    data: HostLoginInput
  ): Promise<{ success: boolean; host: Host; token: string }> => {
    const res = await fetch(`${API_URL}/api/host/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Login failed");
    }
    return res.json();
  },

  register: async (
    data: HostRegisterInput
  ): Promise<{ success: boolean; host: Host; message: string }> => {
    const res = await fetch(`${API_URL}/api/host/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Registration failed");
    }
    return res.json();
  },
};

const getAuthHeader = () => {
  const token = localStorage.getItem("host_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const hostSpotApi = {
  create: async (data: CreateSpotInput): Promise<Spot> => {
    const res = await fetch(`${API_URL}/api/host/spots`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create spot");
    return res.json();
  },

  getAll: async (): Promise<Spot[]> => {
    const res = await fetch(`${API_URL}/api/host/spots`, {
      headers: getAuthHeader(),
    });
    if (!res.ok) throw new Error("Failed to fetch spots");
    return res.json();
  },

  delete: async (uuid: string): Promise<void> => {
    const res = await fetch(`${API_URL}/api/host/spots/${uuid}`, {
      method: "DELETE",
      headers: getAuthHeader(),
    });
    if (!res.ok) throw new Error("Failed to delete spot");
  },
};

export const hostReservationApi = {
  getAll: async (): Promise<Reservation[]> => {
    const res = await fetch(`${API_URL}/api/host/reservations`, {
      headers: getAuthHeader(),
    });
    if (!res.ok) throw new Error("Failed to fetch reservations");
    return res.json();
  },

  getToday: async (): Promise<Reservation[]> => {
    const res = await fetch(`${API_URL}/api/host/reservations/today`, {
      headers: getAuthHeader(),
    });
    if (!res.ok) throw new Error("Failed to fetch today reservations");
    return res.json();
  },

  updateStatus: async (id: string, status: string): Promise<Reservation> => {
    const res = await fetch(`${API_URL}/api/host/reservations/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error("Failed to update status");
    return res.json();
  },
};
