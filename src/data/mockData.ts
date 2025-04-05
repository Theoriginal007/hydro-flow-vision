
import { WaterSample, TreatmentMethod } from "@/types/water";

export const mockWaterData: WaterSample[] = [
  {
    id: 1,
    location: "River Alpha",
    toxicityLevel: 78,
    collectionDate: "2023-02-15",
    timestamp: "2023-02-15T08:30:00Z",
    waterType: "river",
    contaminants: ["Lead", "Mercury", "Phosphates"],
    metrics: {
      pH: 6.2,
      chlorine: 0.15,
      turbidity: 12.5
    }
  },
  {
    id: 2,
    location: "Municipal Plant B",
    toxicityLevel: 42,
    collectionDate: "2023-02-20",
    timestamp: "2023-02-20T10:15:00Z",
    waterType: "municipal",
    contaminants: ["Chlorine", "Fluoride"],
    metrics: {
      pH: 7.8,
      chlorine: 1.2,
      turbidity: 3.1
    }
  },
  {
    id: 3,
    location: "Well 17",
    toxicityLevel: 35,
    collectionDate: "2023-02-22",
    timestamp: "2023-02-22T14:45:00Z",
    waterType: "well",
    contaminants: ["Iron", "Manganese"],
    metrics: {
      pH: 7.1,
      chlorine: 0.02,
      turbidity: 5.6
    }
  },
  {
    id: 4,
    location: "Lake Superior Intake",
    toxicityLevel: 28,
    collectionDate: "2023-02-25",
    timestamp: "2023-02-25T09:00:00Z",
    waterType: "lake",
    contaminants: ["Algae", "Microplastics"],
    metrics: {
      pH: 7.4,
      chlorine: 0.05,
      turbidity: 2.8
    }
  },
  {
    id: 5,
    location: "Industrial Zone Canal",
    toxicityLevel: 89,
    collectionDate: "2023-02-27",
    timestamp: "2023-02-27T16:20:00Z",
    waterType: "canal",
    contaminants: ["Cadmium", "Chromium", "Industrial Waste", "Sulfates"],
    metrics: {
      pH: 5.7,
      chlorine: 0.01,
      turbidity: 18.5
    }
  },
  {
    id: 6,
    location: "Agricultural Runoff Basin",
    toxicityLevel: 65,
    collectionDate: "2023-03-01",
    timestamp: "2023-03-01T11:30:00Z",
    waterType: "basin",
    contaminants: ["Nitrates", "Pesticides", "Phosphates"],
    metrics: {
      pH: 6.8,
      chlorine: 0.03,
      turbidity: 9.4
    }
  },
  {
    id: 7,
    location: "Urban Stream Delta",
    toxicityLevel: 71,
    collectionDate: "2023-03-03",
    timestamp: "2023-03-03T15:10:00Z",
    waterType: "stream",
    contaminants: ["Hydrocarbons", "Microplastics", "Heavy Metals"],
    metrics: {
      pH: 6.5,
      chlorine: 0.08,
      turbidity: 11.2
    }
  },
  {
    id: 8,
    location: "Coastal Treatment Plant",
    toxicityLevel: 32,
    collectionDate: "2023-03-05",
    timestamp: "2023-03-05T09:45:00Z",
    waterType: "coastal",
    contaminants: ["Fluoride", "Sodium"],
    metrics: {
      pH: 7.9,
      chlorine: 0.9,
      turbidity: 2.3
    }
  }
];

export const mockTreatmentMethods: TreatmentMethod[] = [
  {
    id: "reverse-osmosis",
    name: "Reverse Osmosis",
    description: "Uses a semipermeable membrane to remove ions, unwanted molecules and larger particles from water",
    effectivenessRating: 95,
    contaminantsTargeted: ["Lead", "Arsenic", "Fluoride", "Nitrates", "Pesticides", "Sulfates"]
  },
  {
    id: "uv-disinfection",
    name: "UV Disinfection",
    description: "Uses ultraviolet light to kill or inactivate microorganisms by destroying nucleic acids",
    effectivenessRating: 99,
    contaminantsTargeted: ["Bacteria", "Viruses", "Protozoa", "Algae"]
  },
  {
    id: "activated-carbon",
    name: "Activated Carbon Filtration",
    description: "Uses activated carbon to remove contaminants through chemical adsorption",
    effectivenessRating: 80,
    contaminantsTargeted: ["Chlorine", "Volatile Organic Compounds", "Pesticides", "Herbicides", "Odors"]
  },
  {
    id: "ion-exchange",
    name: "Ion Exchange",
    description: "Exchange of ions between two electrolytes or between an electrolyte solution and a complex",
    effectivenessRating: 85,
    contaminantsTargeted: ["Hardness Minerals", "Nitrates", "Arsenic", "Chromium", "Radium"]
  },
  {
    id: "ozonation",
    name: "Ozonation",
    description: "Uses ozone to break down pollutants and microorganisms through an oxidation process",
    effectivenessRating: 90,
    contaminantsTargeted: ["Bacteria", "Viruses", "Odors", "Iron", "Manganese", "Organic Matter"]
  }
];
