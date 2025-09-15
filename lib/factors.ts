/**
 * UK Government Emission Factors Database
 * Based on UK Government GHG Conversion Factors for Company Reporting
 * https://www.gov.uk/government/collections/government-conversion-factors-for-company-reporting
 */

import { EmissionFactor } from './types';

/**
 * UK Government emission factors (2024 values)
 * These are the official factors used for SECR reporting
 */
export const EMISSION_FACTORS: EmissionFactor[] = [
  // Scope 1 - Direct Emissions
  {
    key: 'diesel_litre',
    name: 'Diesel (litres)',
    unit: 'litre',
    kgco2e_per_unit: 2.68,
    scope: 1,
    category: 'Fuel',
    source: 'UK Government 2024'
  },
  {
    key: 'petrol_litre',
    name: 'Petrol (litres)',
    unit: 'litre',
    kgco2e_per_unit: 2.31,
    scope: 1,
    category: 'Fuel',
    source: 'UK Government 2024'
  },
  {
    key: 'natural_gas_kwh',
    name: 'Natural Gas (kWh)',
    unit: 'kWh',
    kgco2e_per_unit: 0.202,
    scope: 1,
    category: 'Fuel',
    source: 'UK Government 2024'
  },
  {
    key: 'lpg_litre',
    name: 'LPG (litres)',
    unit: 'litre',
    kgco2e_per_unit: 1.51,
    scope: 1,
    category: 'Fuel',
    source: 'UK Government 2024'
  },

  // Scope 2 - Electricity
  {
    key: 'electricity_kwh',
    name: 'Electricity (kWh)',
    unit: 'kWh',
    kgco2e_per_unit: 0.193,
    scope: 2,
    category: 'Electricity',
    source: 'UK Government 2024'
  },

  // Scope 3 - Business Travel
  {
    key: 'car_diesel_km',
    name: 'Car - Diesel (km)',
    unit: 'km',
    kgco2e_per_unit: 0.171,
    scope: 3,
    category: 'Business Travel',
    source: 'UK Government 2024'
  },
  {
    key: 'car_petrol_km',
    name: 'Car - Petrol (km)',
    unit: 'km',
    kgco2e_per_unit: 0.192,
    scope: 3,
    category: 'Business Travel',
    source: 'UK Government 2024'
  },
  {
    key: 'train_km',
    name: 'Train (km)',
    unit: 'km',
    kgco2e_per_unit: 0.041,
    scope: 3,
    category: 'Business Travel',
    source: 'UK Government 2024'
  },
  {
    key: 'flight_domestic_km',
    name: 'Flight - Domestic (km)',
    unit: 'km',
    kgco2e_per_unit: 0.255,
    scope: 3,
    category: 'Business Travel',
    source: 'UK Government 2024'
  },
  {
    key: 'flight_international_km',
    name: 'Flight - International (km)',
    unit: 'km',
    kgco2e_per_unit: 0.285,
    scope: 3,
    category: 'Business Travel',
    source: 'UK Government 2024'
  },

  // Scope 3 - Waste
  {
    key: 'waste_landfill_kg',
    name: 'Waste - Landfill (kg)',
    unit: 'kg',
    kgco2e_per_unit: 0.5,
    scope: 3,
    category: 'Waste',
    source: 'UK Government 2024'
  },
  {
    key: 'waste_recycling_kg',
    name: 'Waste - Recycling (kg)',
    unit: 'kg',
    kgco2e_per_unit: 0.025,
    scope: 3,
    category: 'Waste',
    source: 'UK Government 2024'
  }
];

/**
 * Find emission factor by key
 */
export function findEmissionFactor(key: string): EmissionFactor | null {
  return EMISSION_FACTORS.find(factor => factor.key === key) || null;
}

/**
 * Find emission factor by activity type and unit
 * This is a simplified matching - in production you'd want more sophisticated matching
 */
export function findEmissionFactorByActivity(activityType: string, unit: string): EmissionFactor | null {
  const normalizedActivity = activityType.toLowerCase().replace(/[^a-z0-9]/g, '');
  const normalizedUnit = unit.toLowerCase().replace(/[^a-z0-9]/g, '');

  // Direct key matching
  const directKey = `${normalizedActivity}_${normalizedUnit}`;
  let factor = findEmissionFactor(directKey);
  if (factor) return factor;

  // Fuzzy matching for common patterns
  const patterns = [
    { pattern: /diesel.*litre?/, key: 'diesel_litre' },
    { pattern: /petrol.*litre?/, key: 'petrol_litre' },
    { pattern: /gas.*kwh/, key: 'natural_gas_kwh' },
    { pattern: /electricity.*kwh/, key: 'electricity_kwh' },
    { pattern: /car.*diesel.*km/, key: 'car_diesel_km' },
    { pattern: /car.*petrol.*km/, key: 'car_petrol_km' },
    { pattern: /train.*km/, key: 'train_km' },
    { pattern: /flight.*domestic.*km/, key: 'flight_domestic_km' },
    { pattern: /flight.*international.*km/, key: 'flight_international_km' },
    { pattern: /waste.*landfill.*kg/, key: 'waste_landfill_kg' },
    { pattern: /waste.*recycling.*kg/, key: 'waste_recycling_kg' }
  ];

  for (const { pattern, key } of patterns) {
    if (pattern.test(normalizedActivity + normalizedUnit)) {
      factor = findEmissionFactor(key);
      if (factor) return factor;
    }
  }

  return null;
}

/**
 * Get all emission factors by scope
 */
export function getEmissionFactorsByScope(scope: 1 | 2 | 3): EmissionFactor[] {
  return EMISSION_FACTORS.filter(factor => factor.scope === scope);
}

/**
 * Get emission factor version info
 */
export function getEmissionFactorVersion(): string {
  return 'UK Government 2024';
}
