#!/bin/bash

# Create directories if they don't exist
mkdir -p public/images/{hero,featured,portfolio,about,services,collections}

# Download hero image
curl -o public/images/hero.jpg "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&q=80"

# Download featured images
curl -o public/images/featured-1.jpg "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80"
curl -o public/images/featured-2.jpg "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=800&q=80"
curl -o public/images/featured-3.jpg "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80"

# Download about images
curl -o public/images/about-1.jpg "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?w=1200&q=80"
curl -o public/images/about-2.jpg "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200&q=80"

# Download portfolio images
curl -o public/images/portfolio-1.jpg "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80"
curl -o public/images/portfolio-2.jpg "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80"
curl -o public/images/portfolio-3.jpg "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80"
curl -o public/images/portfolio-4.jpg "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80"
curl -o public/images/portfolio-5.jpg "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80"
curl -o public/images/portfolio-6.jpg "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80"

# Download collections images
curl -o public/images/collection-nature.jpg "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80"
curl -o public/images/collection-portrait.jpg "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=800&q=80"

# Download services images
curl -o public/images/service-couples.jpg "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"
curl -o public/images/service-weddings.jpg "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"
curl -o public/images/service-maternity.jpg "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"
curl -o public/images/service-events.jpg "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"
curl -o public/images/service-graduations.jpg "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"
curl -o public/images/service-family.jpg "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"

# Download contact image
curl -o public/images/contact.jpg "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80" 