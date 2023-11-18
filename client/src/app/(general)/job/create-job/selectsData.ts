import { convertArrayToValueLabelArray } from '@/utils/functions/formatToSelect.utils'

export const seniorityData = convertArrayToValueLabelArray(['Junior', 'Mid', 'Senior'])

export const locationData = convertArrayToValueLabelArray(['Remote', 'On-site', 'Hybrid'])

export const typeData = convertArrayToValueLabelArray(['Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary'])

export const currencyData = convertArrayToValueLabelArray(['USD', 'EUR', 'INR'])

export const countryData = convertArrayToValueLabelArray(['United States', 'England', 'India'])
