export function removeWhitespaces(input: string): string {
    return input.replace(/\s+/g, '');
}

export function formatSince(dateInput: Date | string): string {
    const date = new Date(dateInput)
  
    if (isNaN(date.getTime())) {
        return "Invalid date"
    }
  
    const month = date.toLocaleString('default', { month: 'long' })
    const year = date.getFullYear();
  
    return `since ${month} ${year}`;
}


export function formatAmenity(amenity: string): string {
    return amenity
      .toLowerCase()                  
      .split('_')                    
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');                    
  }