/**
 * Unit conversion utilities
 * Handles conversion between different units for carbon calculations
 */

import { UnitConversion, ConversionResult } from './types';

/**
 * Unit conversion factors
 * All conversions are to the target unit
 */
export const UNIT_CONVERSIONS: UnitConversion[] = [
  // Distance conversions
  { from: 'mile', to: 'km', factor: 1.60934 },
  { from: 'miles', to: 'km', factor: 1.60934 },
  { from: 'km', to: 'mile', factor: 0.621371 },
  { from: 'kilometer', to: 'km', factor: 1 },
  { from: 'kilometre', to: 'km', factor: 1 },

  // Volume conversions
  { from: 'gallon', to: 'litre', factor: 4.54609 },
  { from: 'gallons', to: 'litre', factor: 4.54609 },
  { from: 'gal', to: 'litre', factor: 4.54609 },
  { from: 'liter', to: 'litre', factor: 1 },
  { from: 'l', to: 'litre', factor: 1 },

  // Weight conversions
  { from: 'tonne', to: 'kg', factor: 1000 },
  { from: 'ton', to: 'kg', factor: 1000 },
  { from: 'tonnes', to: 'kg', factor: 1000 },
  { from: 'tons', to: 'kg', factor: 1000 },
  { from: 'pound', to: 'kg', factor: 0.453592 },
  { from: 'pounds', to: 'kg', factor: 0.453592 },
  { from: 'lb', to: 'kg', factor: 0.453592 },
  { from: 'lbs', to: 'kg', factor: 0.453592 },

  // Energy conversions
  { from: 'therm', to: 'kWh', factor: 29.3071 },
  { from: 'therms', to: 'kWh', factor: 29.3071 },
  { from: 'btu', to: 'kWh', factor: 0.000293071 },
  { from: 'btus', to: 'kWh', factor: 0.000293071 }
];

/**
 * Convert quantity from one unit to another
 */
export function convertUnit(quantity: number, fromUnit: string, toUnit: string): ConversionResult {
  // If units are the same, no conversion needed
  if (fromUnit.toLowerCase() === toUnit.toLowerCase()) {
    return {
      success: true,
      convertedQuantity: quantity,
      appliedUnit: toUnit
    };
  }

  // Find direct conversion
  const conversion = UNIT_CONVERSIONS.find(
    conv => conv.from.toLowerCase() === fromUnit.toLowerCase() && 
           conv.to.toLowerCase() === toUnit.toLowerCase()
  );

  if (conversion) {
    return {
      success: true,
      convertedQuantity: quantity * conversion.factor,
      appliedUnit: toUnit
    };
  }

  // Try reverse conversion
  const reverseConversion = UNIT_CONVERSIONS.find(
    conv => conv.from.toLowerCase() === toUnit.toLowerCase() && 
           conv.to.toLowerCase() === fromUnit.toLowerCase()
  );

  if (reverseConversion) {
    return {
      success: true,
      convertedQuantity: quantity / reverseConversion.factor,
      appliedUnit: toUnit
    };
  }

  // No conversion found
  return {
    success: false,
    error: `No conversion found from ${fromUnit} to ${toUnit}`
  };
}

/**
 * Normalize unit name to standard form
 */
export function normalizeUnit(unit: string): string {
  const normalized = unit.toLowerCase().trim();
  
  const unitMap: Record<string, string> = {
    'mile': 'km',
    'miles': 'km',
    'kilometer': 'km',
    'kilometre': 'km',
    'gallon': 'litre',
    'gallons': 'litre',
    'gal': 'litre',
    'liter': 'litre',
    'l': 'litre',
    'tonne': 'kg',
    'ton': 'kg',
    'tonnes': 'kg',
    'tons': 'kg',
    'pound': 'kg',
    'pounds': 'kg',
    'lb': 'kg',
    'lbs': 'kg',
    'therm': 'kWh',
    'therms': 'kWh',
    'btu': 'kWh',
    'btus': 'kWh'
  };

  return unitMap[normalized] || normalized;
}

/**
 * Check if two units are compatible (can be converted)
 */
export function areUnitsCompatible(unit1: string, unit2: string): boolean {
  if (unit1.toLowerCase() === unit2.toLowerCase()) return true;
  
  const conversion = UNIT_CONVERSIONS.find(
    conv => (conv.from.toLowerCase() === unit1.toLowerCase() && conv.to.toLowerCase() === unit2.toLowerCase()) ||
           (conv.from.toLowerCase() === unit2.toLowerCase() && conv.to.toLowerCase() === unit1.toLowerCase())
  );

  return !!conversion;
}

/**
 * Get all available units for a given category
 */
export function getAvailableUnits(category: 'distance' | 'volume' | 'weight' | 'energy'): string[] {
  const categories = {
    distance: ['km', 'mile'],
    volume: ['litre', 'gallon'],
    weight: ['kg', 'tonne', 'pound'],
    energy: ['kWh', 'therm', 'btu']
  };

  return categories[category] || [];
}
