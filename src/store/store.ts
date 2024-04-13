
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CountState {
  count: number;
  increment: () => void
  decrement: () => void
  complete: boolean;
  toggleComplete: () => void;
  form: {
    address: string,
    state: string,
    country: string,
    industry: string,
    employeeSize: string
    firstName: string
    lastName: string
    role: string
    email: string
    date: string
    phoneNumber: string
    password: string
    confirmPassword: string
    // gender: 'male' | 'female'
    gender: string
    setGender?: (n: string) => void
},
}

const useCountStore = create<CountState>()(persist((set) => ({
    count: 1,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
    complete: false,
    toggleComplete: () => set((state) => ({ complete: !state.complete})),
    form: {
      address: '',
      state: '',
      country: '',
      industry: '',
      employeeSize: '',
      firstName: '',
      lastName: '',
      role: '',
      email: '',
      date: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      gender: '', // 'male', 'female' or '' for unselected
      // setGender: (newGender) => set({ gender: newGender }),
  },
    }),
    {
      name: "count-store",
      storage: createJSONStorage(() => localStorage)
      // Use localStorage for web, AsyncStorage for React Native

    }
  )
);

export default useCountStore; 