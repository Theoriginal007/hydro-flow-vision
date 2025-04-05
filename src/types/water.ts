
export interface WaterMetrics {
  pH: number;
  chlorine: number;
  turbidity: number;
  [key: string]: number; // Allow for additional metrics
}

export interface WaterSample {
  id: number;
  location: string;
  toxicityLevel: number; // 0-100, where 100 is most toxic
  collectionDate: string;
  contaminants: string[];
  metrics?: WaterMetrics;
  timestamp: string; // ISO date string for the sample timestamp
  waterType: string; // Type of water (e.g., "river", "well", "municipal")
}

export interface TreatmentMethod {
  id: string;
  name: string;
  description: string;
  effectivenessRating: number; // 0-100
  contaminantsTargeted: string[];
}
