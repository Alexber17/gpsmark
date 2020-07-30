# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.create([
  { user: 'Alex', password: '12346' },
  { user: 'Brittney', password: '23456' }
  
])

Place.create([
  { nick_name:'My house', addrees: 'miami', user_id: 1 },
  { nick_name:'My work', addrees: '316 cameron bridge way', user_id: 1 },
  { nick_name:'My house', addrees: 'atlanta', user_id: 2 }
 
])
