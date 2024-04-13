
import { create } from "zustand";
// import { createJSONStorage, persist } from "zustand/middleware";

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
    others: string
    othersHistor: string
    gender: string
    setGender?: (n: string) => void
  },
  resetState: () => void
  chronicCondition: string[]
  dietaryPreference: string[]
  physicalActivity: string[]
  sleepPatterns: string[]
  tobaccoProducts: string[]
  visitDoctor: string[]
  bloodSugarPressure: string[]
  recentLabTests: string[]
  previousSurgeriesorHospitalizations: string[]
}

const useCountStore = create<CountState>()(
  // persist(
    (set) => ({
    count: 1,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
    complete: false,
    toggleComplete: () => set((state) => ({ complete: !state.complete})),
    chronicCondition: [],
    
    dietaryPreference: [],
    physicalActivity: [],
    sleepPatterns: [],
    tobaccoProducts: [],

    visitDoctor: [],
    bloodSugarPressure: [],
    recentLabTests: [],
    previousSurgeriesorHospitalizations: [],
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
      others: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      gender: '', // 'male', 'female' or '' for unselected
      othersHistor: ''
      // setGender: (newGender) => set({ gender: newGender }),
    },
    resetState: () => set({}, true), // Setzen Sie den Zustand auf einen leeren Zustand
    }),
    // {
    //   name: "count-store",
    //   storage: createJSONStorage(() => localStorage)
    //   // Use localStorage for web, AsyncStorage for React Native

    // }
  // )
);

export default useCountStore; 