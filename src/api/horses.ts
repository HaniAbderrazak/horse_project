// src/api/horses.ts

export interface Horse {
    id: number
    name: string
    breed: string
    age: number
    gender: 'Male' | 'Female' | 'Gelding' | 'Stallion' | 'Mare'
    imageUrl: string
    height: number // in hands
    weight: number // in kg
    color: string
    lastRaceDate?: string
    wins?: number
    races?: number
    owner: string
    sire?: string
    dam?: string
    rating: number // 1-5 stars
    description: string
    price?: number // in USD
    location: string
  }
  
  export const horses: Horse[] = [
    {
      id: 1,
      name: 'Midnight Thunder',
      breed: 'Thoroughbred',
      age: 5,
      gender: 'Stallion',
      imageUrl: 'https://images.unsplash.com/photo-1553284965-e2815db2e5a0',
      height: 16.2,
      weight: 550,
      color: 'Black',
      lastRaceDate: '2024-05-15',
      wins: 8,
      races: 12,
      owner: 'Elite Racing Stables',
      sire: 'Lightning Strike',
      dam: 'Moonlit Dancer',
      rating: 4.5,
      description: 'Powerful sprinter with excellent acceleration. Winner of multiple Grade 1 races.',
      price: 250000,
      location: 'Lexington, KY'
    },
    {
      id: 2,
      name: 'Desert Mirage',
      breed: 'Arabian',
      age: 7,
      gender: 'Mare',
      imageUrl: 'https://images.unsplash.com/photo-1553284965-e2815db2e5a0',
      height: 15.1,
      weight: 450,
      color: 'Bay',
      wins: 5,
      races: 8,
      owner: 'Golden Sands Farm',
      sire: 'Sandstorm',
      dam: 'Mirage Queen',
      rating: 4,
      description: 'Elegant endurance specialist with perfect conformation. Ideal for competitive trail riding.',
      location: 'Scottsdale, AZ'
    },
    {
      id: 3,
      name: 'Silver Dollar',
      breed: 'Quarter Horse',
      age: 6,
      gender: 'Gelding',
      imageUrl: 'https://images.unsplash.com/photo-1553284965-e2815db2e5a0',
      height: 15.3,
      weight: 520,
      color: 'Palomino',
      lastRaceDate: '2024-04-22',
      wins: 12,
      races: 15,
      owner: 'Rocking R Ranch',
      sire: 'Gold Rush',
      dam: 'Silver Charm',
      rating: 5,
      description: 'Versatile all-around champion. Excels in barrel racing, roping, and show events.',
      price: 180000,
      location: 'Fort Worth, TX'
    },
    {
      id: 4,
      name: 'Royal Legacy',
      breed: 'Warmblood',
      age: 8,
      gender: 'Male',
      imageUrl: 'https://images.unsplash.com/photo-1553284965-e2815db2e5a0',
      height: 17.0,
      weight: 600,
      color: 'Dark Bay',
      wins: 3,
      races: 5,
      owner: 'Imperial Equestrian',
      sire: 'Noble King',
      dam: 'Regal Beauty',
      rating: 4,
      description: 'Exceptional dressage prospect with outstanding movement and temperament.',
      price: 320000,
      location: 'Wellington, FL'
    },
    {
      id: 5,
      name: 'Whispering Wind',
      breed: 'Appaloosa',
      age: 4,
      gender: 'Female',
      imageUrl: 'https://images.unsplash.com/photo-1553284965-e2815db2e5a0',
      height: 15.2,
      weight: 480,
      color: 'Leopard Spot',
      lastRaceDate: '2024-03-30',
      wins: 6,
      races: 8,
      owner: 'Prairie Winds Ranch',
      sire: 'Thunder Spot',
      dam: 'Gentle Breeze',
      rating: 3.5,
      description: 'Beautiful spotted mare with excellent jumping ability and gentle disposition.',
      location: 'Boise, ID'
    },
    {
      id: 6,
      name: 'Iron Will',
      breed: 'Friesian',
      age: 9,
      gender: 'Stallion',
      imageUrl: 'https://images.unsplash.com/photo-1553284965-e2815db2e5a0',
      height: 16.1,
      weight: 580,
      color: 'Black',
      wins: 0,
      races: 0,
      owner: 'Black Forest Stud',
      sire: 'Iron Duke',
      dam: 'Willow Grace',
      rating: 4,
      description: 'Magnificent carriage horse with flowing mane and tail. Perfect for driving competitions.',
      price: 275000,
      location: 'Amsterdam, NY'
    },
    {
      id: 7,
      name: 'Summer Breeze',
      breed: 'Morgan',
      age: 10,
      gender: 'Mare',
      imageUrl: 'https://images.unsplash.com/photo-1553284965-e2815db2e5a0',
      height: 14.3,
      weight: 420,
      color: 'Chestnut',
      wins: 9,
      races: 12,
      owner: 'New England Morgans',
      sire: 'Autumn Glory',
      dam: 'Spring Song',
      rating: 4.5,
      description: 'Classic Morgan mare with incredible versatility. Successful in both saddle and harness.',
      location: 'Burlington, VT'
    },
    {
      id: 8,
      name: 'Golden Spirit',
      breed: 'Andalusian',
      age: 6,
      gender: 'Gelding',
      imageUrl: 'https://images.unsplash.com/photo-1553284965-e2815db2e5a0',
      height: 15.3,
      weight: 500,
      color: 'Dun',
      wins: 4,
      races: 7,
      owner: 'Spanish Sun Equestrian',
      sire: 'Royal Andalusian',
      dam: 'Golden Dream',
      rating: 4,
      description: 'Exquisite mover with natural collection. Ideal for classical dressage or showmanship.',
      price: 195000,
      location: 'San Diego, CA'
    }
  ]